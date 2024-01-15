import { useSearchParams } from 'react-router-dom';
import css from './SearchForm.module.css';

export const SearchForm = () => {
  const [, setSearchParams] = useSearchParams();

  const handleFormSubmit = e => {
    e.preventDefault();
    const query = e.currentTarget.elements.searchQuery.value.trim();
    if (!query) {
      setSearchParams({});
    }
    setSearchParams({ sQuery: query });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className={css.form}>
        <input
          className={css.input}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter movie"
          required
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
