import { Loader } from 'components/loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestMovieCast } from 'services/api';
import { IMAGE_URL_BASE } from 'utils/constants';
import default_image from '../../images/default-featured-image.png.jpg';
const Cast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [castInfo, setCastInfo] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      if (!movieId) return;
      try {
        setIsLoading(true);
        setIsError(null);
        const castInfo = await requestMovieCast(movieId);
        setCastInfo(castInfo);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <p>
          Sorry... Some error occured while loading movie. Please try again
          later.
        </p>
      )}

      <ul>
        {!isLoading &&
          !isError &&
          castInfo &&
          castInfo.map(({ id, name, character, profile_path }) => {
            const imagePath = profile_path
              ? `${IMAGE_URL_BASE}${profile_path}`
              : default_image;
            return (
              <li key={id}>
                <img src={imagePath} alt={name} />
                <ul>
                  <li>{name}</li>
                  <li>{`Character: ${character}`}</li>
                </ul>
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default Cast;
