/* eslint-disable react/prop-types */
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import {Image, List, ReviewsContainer, Span2 } from './styledComponents';
import {  SpanItem } from '../Home/styledComponents';

function Reviews({ doctors }) {
  const reviewsList = doctors.flatMap((doc) => doc.reviews || []);

  return (
    <ReviewsContainer>
        
      {reviewsList.length > 0 ? (
        <>
        <h1>Reviews</h1>
        <Carousel 
          showArrows={false} 
          autoPlay={true} 
          infiniteLoop={true} 
          showThumbs={false} 
          showStatus={false} 
          interval={3000}
          
          
        >
            
          { reviewsList.map((review, index) => (
            <List key={index}>
              <Image src={review.reviewer_image} alt="reviewer" />
              <SpanItem>{review.review_text}</SpanItem>
              <Span2>{review.reviewer_name}</Span2>
            </List>
          ))}
        </Carousel>
        </>
      ) : (
        <li>No reviews available</li>
      )}
    </ReviewsContainer>
  );
}

export default Reviews;
