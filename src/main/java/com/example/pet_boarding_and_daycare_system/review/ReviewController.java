package com.example.pet_boarding_and_daycare_system.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/booking/{bookingId}")
    public List<Review> getReviewsByBooking(@PathVariable Long bookingId) {
        return reviewService.getReviewsByBooking(bookingId);
    }

    @GetMapping("/owner/{ownerId}")
    public List<Review> getReviewsByOwner(@PathVariable Long ownerId) {
        return reviewService.getReviewsByOwner(ownerId);
    }

    @GetMapping("/top")
    public List<Review> getTopReviews(@RequestParam(defaultValue = "4") int minRating) {
        return reviewService.getTopReviews(minRating);
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review review) {
        return reviewService.updateReview(id, review);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build(); // HTTP 204
    }
}