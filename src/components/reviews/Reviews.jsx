import { Loader } from 'components/loader/Loader';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestReviews } from 'services/api';

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
        <p>
          Sorry... Some error occured while loading movie. Please try again
          later.
        </p>
      )}
      <ul>
        {!isLoading && !isError && reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <h4>{`Author: ${author}`}</h4>
                <p>{content}</p>
              </li>
            );
          })
        ) : (
          <li>
            <p>We don't have any reviews for the film</p>
          </li>
        )}
      </ul>
    </>
  );
};
export default Reviews;
