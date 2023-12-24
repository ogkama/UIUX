import Link from "next/link";

const getRatingColor = (rating) => {
    if (rating >= 7.5) {
        return 'text-green-400'; 
    } else if (rating >= 6) {
        return 'text-yellow-400'; 
    } else {
        return 'text-red-400'; 
    }
};

const FilmCard = ({film}) => {
    return (
        <Link className="bg-white shadow-sm rounded-md cursor cursor-pointer max-w-full min-h-200" href={`/film/${film.id}`}>
            
                <img className="rounded-t-md w-full h-auto" src={film.medium_cover_image} alt={film.title}/>
                <div className="px-6 py-2">
                    <div className="font-bold xs:text-xs sm:text-sm lg:text-xl mb-1">
                        {film.title}
                    </div>
                    <p className={`hidden sm:block sm:text-sm lg:text-lg mb-1 ${getRatingColor(film.rating)}`}>
                        Rating: {film.rating}
                    </p>
                    <p className="hidden sm:block text-gray-700 sm:text-sm lg:text-base mb-1">
                        Year: {film.year}
                    </p>
                </div>
           
        </Link>
    );
};

export default FilmCard