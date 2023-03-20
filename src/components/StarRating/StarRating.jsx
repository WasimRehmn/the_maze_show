import React from "react";
import styles from './StarRating.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

export const StarRating = ({ rating }) => {
  // Calculate the number of full stars
  const fullStars = Math.floor(rating);

  // Calculate the number of half stars
  const halfStars = Math.ceil(rating - fullStars);

  // Create an array of stars to display
  const stars = [];

  // Add full stars to the array
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon key={i} className={styles.star} icon={faStar} />);
  }

  // Add half stars to the array
  for (let i = 0; i < halfStars; i++) {
    stars.push(<FontAwesomeIcon key={fullStars + i} className={styles.half_star} icon={faStarHalfStroke} />);
  }

  // Add empty stars to the array
  for (let i = 0; i < 10 - (fullStars + halfStars); i++) {
    stars.push(<FontAwesomeIcon key={fullStars + halfStars + i} className={styles.empty_star} icon={faStar} />);
  }

  return <div className={styles.rating}>{stars}</div>;
};

