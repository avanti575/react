import React from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

const Search = () => {
    const [value, setValue] = React.useState();

    const { setSearchValue } = React.useContext(SearchContext);

    const inputRef = React.useRef();

    const onClickClear = () => {
        setSearchValue('');
        setValue('');
        // document.querySelector('input').focus();
        inputRef.current.focus();
    };

    const updateSearchValue = React.useCallback(
        debounce(str => {
            setSearchValue(str);
        }, 250),
        []
    );
    const onChangeInput = event => {
        setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    // console.log(inputRef);

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" x2="16.65" y1="21" y2="16.65" />
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />
            {value && (
                <svg
                    onClick={onClickClear}
                    className={styles.clearIcon}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            )}
        </div>
    );
};

export default Search;
