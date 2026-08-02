package com.example.pet_boarding_and_daycare_system.review;

<<<<<<< HEAD
import com.example.pet_boarding_and_daycare_system.booking.Booking;
import com.example.pet_boarding_and_daycare_system.owner.Owner;
=======
>>>>>>> feature/vandana-pet-frontend-only
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

<<<<<<< HEAD
=======
    // I comment these lines until Booking and Owner classes ready
    /*
>>>>>>> feature/vandana-pet-frontend-only
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Owner owner;
<<<<<<< HEAD
=======
    */
>>>>>>> feature/vandana-pet-frontend-only

    private int rating;   // 1 - 5
    private String comment;
    private LocalDate reviewDate;

<<<<<<< HEAD
=======

>>>>>>> feature/vandana-pet-frontend-only
    public Review() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

<<<<<<< HEAD
    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

=======
>>>>>>> feature/vandana-pet-frontend-only
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }
}