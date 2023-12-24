import FilmInfo from '@/components/FilmInfo';
import { useRouter } from 'next/router';


function Movie() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <FilmInfo id={id}></FilmInfo>
    )
}
export default Movie