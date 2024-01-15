import { Loader } from 'components/loader/Loader';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestReviews } from 'services/api';
import css from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const getReviews = async () => {
      try {
        setIsLoading(true);
        setIsError(null);
        const filmReviews = await requestReviews(movieId);
        setReviews(filmReviews);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <p className={css.text}>
          Sorry... Some error occured while loading movie. Please try again
          later.
        </p>
      )}
      <ul className={css.reviewsList}>
        {!isLoading && !isError && reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => {
            return (
              <li key={id} className={css.reviewsItem}>
                <h4 className={css.author}>{`Author: ${author}`}</h4>
                <p className={css.text}>{content}</p>
              </li>
            );
          })
        ) : (
          <li>
            <p className={css.text}>We don't have any reviews for the film</p>
          </li>
        )}
      </ul>
    </>
  );
};
export default Reviews;
