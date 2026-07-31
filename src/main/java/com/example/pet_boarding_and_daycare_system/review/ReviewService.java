package com.example.pet_boarding_and_daycare_system.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, Review review) {
        Review existing = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
        existing.setRating(review.getRating());
        existing.setComment(review.getComment());
        existing.setReviewDate(review.getReviewDate());
        existing.setBooking(review.getBooking());
        existing.setOwner(review.getOwner());
        return reviewRepository.save(existing);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found with id: " + id));
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
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
}