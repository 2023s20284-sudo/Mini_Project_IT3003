package com.example.pet_boarding_and_daycare_system.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id);
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

<<<<<<< HEAD
    @GetMapping("/booking/{bookingId}")
    public List<Review> getReviewsByBooking(@PathVariable Long bookingId) {
        return reviewService.getReviewsByBooking(bookingId);
    }

    @GetMapping("/owner/{ownerId}")
    public List<Review> getReviewsByOwner(@PathVariable Long ownerId) {
        return reviewService.getReviewsByOwner(ownerId);
    }

=======
>>>>>>> feature/vandana-pet-frontend-only
    @GetMapping("/top")
    public List<Review> getTopReviews(@RequestParam(defaultValue = "4") int minRating) {
        return reviewService.getTopReviews(minRating);
    }
}