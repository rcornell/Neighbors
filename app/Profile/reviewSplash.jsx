import React from 'react';
import { Modal, ButtonToolbar, Button } from 'react-bootstrap';
const Rating = require('react-rating');
import ModalCommentForm from './modalCommentForm.jsx'

const reviewSplash = ({ showReviewSplash, handleRatingClick }) => (
  <div>
    <Modal show={showReviewSplash}>
      <Modal.Header>
        <Modal.Title>How would you rate your borrowing experience?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Rating
          initialRate={ 3 }
          onClick={(rate, event) => handleRatingClick(rate, event)}
          empty={<img src="assets/star-grey.png" className="icon" alt="" />}
          full={<img src="assets/star-yellow.png" className="icon" alt="" />}
        />
        <ModalCommentForm />
      </Modal.Body>
    </Modal>
  </div>


);

module.exports = reviewSplash;
