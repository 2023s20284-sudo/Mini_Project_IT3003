package com.example.pet_boarding_and_daycare_system.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
    }

    public List<Review> getReviewsByBooking(Long bookingId) {
        return reviewRepository.findByBookingId(bookingId);
    }

    public List<Review> getReviewsByOwner(Long ownerId) {
        return reviewRepository.findByOwnerId(ownerId);
    }

    public List<Review> getTopReviews(int minRating) {
        return reviewRepository.findByRatingGreaterThanEqual(minRating);
    }

    public Review updateReview(Long id, Review reviewDetails) {
        Review existing = getReviewById(id);
        existing.setRating(reviewDetails.getRating());
        existing.setComment(reviewDetails.getComment());
        existing.setReviewDate(reviewDetails.getReviewDate());
        existing.setBooking(reviewDetails.getBooking());
        existing.setOwner(reviewDetails.getOwner());
        return reviewRepository.save(existing);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}