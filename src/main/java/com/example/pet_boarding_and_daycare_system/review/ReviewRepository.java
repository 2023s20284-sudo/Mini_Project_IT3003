package com.example.pet_boarding_and_daycare_system.review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Get reviews related to Booking
    List<Review> findByBookingId(Long bookingId);

    // Get reviews related to Owner
    List<Review> findByOwnerId(Long ownerId);

    // Get all reviews with rating >= given value
    List<Review> findByRatingGreaterThanEqual(int rating);
}