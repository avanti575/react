import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem, minusItem } from '../redux/slices/cartSlice';

const CartItem = ({ id, title, type, size, price, count, imageUrl }) => {
    const dispatch = useDispatch();

    const onClickPlus = () => {
        dispatch(
            addItem({
                id,
            })
        );
    };
    const onClickMinus = () => {
        dispatch(minusItem(id));
    };
    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить пиццу из корзины')) {
            dispatch(removeItem(id));
        }
    };

    return (
        <div className="cart__item">
            <div className="cart__item-img">
                <img src={imageUrl} className="pizza-block__image" alt="Pizza" />
            </div>
            <div className="cart__item-info">
                <h3>{title}</h3>
                <p>
                    {type}, {size} см.
                </p>
            </div>
            <div className="cart__item-count">
                <div onClick={onClickMinus} className="button button--outline button--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 21 21">
                        <path
                            fill="none"
                            stroke="#888888"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.5 10.5h10"
                        />
                    </svg>
                </div>
                <div className="cart__item-price">
                    <b>{count}</b>
                </div>

                <div onClick={onClickPlus} className="button button--outline button--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="#888888" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
                    </svg>
                </div>
                <div className="cart__item-price">
                    <b>{price * count} Р</b>
                </div>
            </div>

            <div className="cart__item-remove">
                <div onClick={onClickRemove} className="button button--outline button-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path
                            fill="#888888"
                            d="m8.382 17.025l-1.407-1.4L10.593 12L6.975 8.4L8.382 7L12 10.615L15.593 7L17 8.4L13.382 12L17 15.625l-1.407 1.4L12 13.41z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
export default CartItem;
