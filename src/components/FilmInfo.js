import React, { useState, useEffect } from 'react';
import axios from "axios";
import Comments from './Comments';

const getRatingColor = (rating) => {
    if (rating >= 7.5) {
        return 'text-green-400'; 
    } else if (rating >= 6) {
        return 'text-yellow-400'; 
    } else {
        return 'text-red-400'; 
    }
};

const FilmInfo = ({id}) => {
    const [film, setFilm] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true`);
            const data = response.data.data;
            setFilm(data.movie);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        if (id) {
            fetchData();
        }
    }, [id]); 

    if (!film) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-600 rounded-xl container max-w-6xl mx-auto pb-10 xs:px-1 md:px-4 my-9 xs:py-4 md:py-8">
            <div className="grid grid-cols-1 xs:grid-cols-3 xs:gap-2 sm:gap-2 md:gap-4">
                <div className="col-span-1 xs:col-span-1">
                    <img className="rounded-xl w-full h-auto" src={film.large_cover_image} alt={film.title}/>
                </div>

                <div className="col-span-2 md:col-span-2 xs:p-1 sm:p-2 md:p-4">
                    <div className="text-gray-100 font-bold xs:text-md sm:text-xl md:text-3xl">
                        {film.title} ({film.year})
                    </div>
                    <div className="hidden md:block text-gray-200 font-bold xs:text-xs sm:text-xs md:text-base mb-1 md:mt-3">
                        {film.description_full}
                    </div>
                    <div className="text-gray-200 font-bold xs:text-sm sm:text-sm md:text-lg mb-1 md:mt-3">
                        <p>Genres:</p>
                    </div>
                    <div className="text-white font-bold xs:text-xs sm:text-xs md:text-base mb-1 md:mt-3">
                        {film.genres.map((genre, index) => (
                            <li key={index}>{genre}</li>
                        ))}
                    </div>
                    <div className="text-gray-100 font-bold xs:text-sm sm:text-sm md:text-lg mb-1 md:mt-3">
                        <p>Duration: {film.runtime} min. </p>
                    </div>
                    <div className="hidden lg:block text-gray-200 font-bold sm:text-md md:text-lg mb-1 md:mt-3">
                        <p>Torrents:</p>
                    </div>
                    <div className="hidden lg:block text-white font-bold sm:text-xs md:text-base mb-1 md:mt-3">
                        {film.torrents.map((torrent, index) => (
                            <a key={index} href={torrent.url} target="_blank" rel="noopener noreferrer">{torrent.url} </a>
                        ))}
                    </div>
                    <p className={`xs:text-sm smtext-xl md:text-2xl font-bold mb-1 md:mt-3 ${getRatingColor(film.rating)}`}>
                        Rating: {film.rating}
                    </p>
                </div>
                {/* Комментарии снизу */}
                <div className="col-span-3">
                    <Comments filmId= {film.id}/>   
                </div>
            </div>
        </div>
    );
};

export default FilmInfo