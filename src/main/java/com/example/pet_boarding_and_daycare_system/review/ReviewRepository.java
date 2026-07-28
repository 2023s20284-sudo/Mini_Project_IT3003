package com.example.pet_boarding_and_daycare_system.review;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    //  to get reviews related to Booking
    // List<Review> findByBookingId(Long bookingId);  // I will uncomment when Booking class ready

    //  to get reviews related to Owner
    // List<Review> findByOwnerId(Long ownerId);  // I will uncomment when Owner class ready

    // finally get all reviews with rating >= given value
    List<Review> findByRatingGreaterThanEqual(int rating);
}