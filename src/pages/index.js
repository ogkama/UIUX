import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Films from '@/components/Films';

function FilmsPage() {
  const [films, setFilms] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${currentPage}&query_term=${searchQuery}`);
        const data = response.data.data;
        setFilms(data.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, searchQuery]);


  const nextPage = () => setCurrentPage((currPage) => currPage + 1);
  const prevPage = () => setCurrentPage((currPage) => (currPage > 1 ? currPage - 1 : currPage));

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };
  console.log(films)
  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="mt-4 lg:mt-8">
    <div className="flex justify-center items-center ">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search movies..."
        className="xs:p-1 sm:p-2 border-2 rounded"
      />
    </div>
    
  </form>


      {/* Фильмы и навигация */}
      <Films films={films} prevPage={prevPage} nextPage={nextPage} searchQuery={searchQuery}/>
    </div>
  );
}

export default FilmsPage;
