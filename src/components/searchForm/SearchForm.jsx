import { useSearchParams } from 'react-router-dom';

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
      <form onSubmit={handleFormSubmit}>
        <input
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter movie"
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
