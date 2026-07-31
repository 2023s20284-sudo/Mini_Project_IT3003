package com.example.pet_boarding_and_daycare_system.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    //
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }


    // Uncomment this method after your teammates merge the required code
    // (BookingStatus enum and BookingService.updateBookingStatus()).

    @PutMapping("/{id}/status")
    public Booking updateBookingStatus(
            @PathVariable Long id,
            @RequestParam Booking.BookingStatus status
    ) {
        return bookingService.updateBookingStatus(id, status);
    }


    @DeleteMapping("/{id}")
    public String cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return "Booking cancelled successfully";
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
}
