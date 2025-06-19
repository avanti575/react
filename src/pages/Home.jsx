import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas } from '../redux/slices/pizzaSlice';
const Home = () => {
    // console.log(searchValue);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const items = useSelector(state => state.pizza.items);
    const sortType = sort.sortProperty;
    // const setCategoryId = () => {};
    const { searchValue } = React.useContext(SearchContext);
    // const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    // const [categoryId, setCategoryId] = React.useState(0);
    // const [currentPage, setCurrentPage] = React.useState(1);
    // const [sortType, setSortType] = React.useState({
    //     name: 'популярности',
    //     sortProperty: 'rating',
    // });
    // const setCategoryId = id => {
    //     return { type: 'filters/setCategoryId', payload: 1 };
    // };
    const onChangeCategory = id => {
        console.log(id);
        dispatch(setCategoryId(id));
    };
    const onChangePage = number => {
        dispatch(setCurrentPage(number));
    };
    const getPizzas = async () => {
        setIsLoading(true);
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';
        // fetch(
        //     `https://645a73b865bd868e931b84fe.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        // )
        //     .then(res => {
        //         return res.json();
        //     })
        //     .then(arr => {
        //         setItems(arr);
        //         setIsLoading(false);
        //     });
        try {
            // const { data } = await axios.get(
            //     `https://645a73b865bd868e931b84fe.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            // );

            dispatch(
                fetchPizzas({
                    order,
                    sortBy,
                    category,
                    search,
                    currentPage,
                })
            );
        } catch (error) {
            console.log('ERROR', error);
            alert('Ошибка при получении пицц');
        } finally {
            setIsLoading(false);
        }
    };
    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const params = {
                categoryId: categoryId > 0 ? categoryId : null,
                sortProperty: sort.sortProperty,
                currentPage,
            };
            // const queryString = qs.stringify({
            //     sortProperty: sort.sortProperty,
            //     categoryId,
            //     currentPage,
            // });
            // navigate(`?${queryString}`);
        }
        isMounted.current = true;
        // console.log(queryString);
    }, [categoryId, sortType, searchValue, currentPage]);
    // Если был первый рендер, то проверяем URL- параметры и сохраняем в redux
    React.useEffect(() => {
        getPizzas();
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);
    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const pizzas = items
        .filter(obj => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
            return false;
        })
        .map(obj => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
                <Pagination currentPage={currentPage} onChangePage={onChangePage} />
            </div>
        </div>
    );
};
export default Home;
