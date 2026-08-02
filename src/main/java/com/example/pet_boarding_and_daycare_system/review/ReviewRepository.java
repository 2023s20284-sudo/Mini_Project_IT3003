package com.example.pet_boarding_and_daycare_system.review;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {


    List<Review> findByBookingId(Long bookingId);


    List<Review> findByOwnerId(Long ownerId);


    List<Review> findByRatingGreaterThanEqual(int rating);
}