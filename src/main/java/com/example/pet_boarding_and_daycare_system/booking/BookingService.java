package com.example.pet_boarding_and_daycare_system.booking;
import com.example.pet_boarding_and_daycare_system.room.Room;
import com.example.pet_boarding_and_daycare_system.room.RoomService;
import com.example.pet_boarding_and_daycare_system.room.RoomRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    /*
    Room related code will be enabled after Room.java
    and RoomRepository.java are added.*/
    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    public Booking createBooking(Booking booking) {

        Room room = roomRepository.findById(
                booking.getRoom().getId()
        ).orElseThrow(() ->
                new RuntimeException("Room not found")
        );

        if (!isRoomAvailable(
                room.getId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate()
        )) {

            throw new RuntimeException("Room is not available");
        }

        booking.setTotalCost(
                calculateCost(
                        room,
                        booking.getCheckInDate(),
                        booking.getCheckOutDate()
                )
        );


        booking.setStatus(
                Booking.BookingStatus.PENDING
        );


        return bookingRepository.save(booking);
    }

    private boolean isRoomAvailable(
            Long roomId,
            LocalDate checkIn,
            LocalDate checkOut
    ) {


        List<Booking> bookings =
                bookingRepository.findByRoomIdAndStatusNot(
                        roomId,
                        Booking.BookingStatus.CANCELLED
                );


        for (Booking booking : bookings) {


            if(checkIn.isBefore(
                    booking.getCheckOutDate()
            )
            &&
            checkOut.isAfter(
                    booking.getCheckInDate()
            )) {

                return false;
            }
        }


        return true;
    }

    private double calculateCost(
            Room room,
            LocalDate checkIn,
            LocalDate checkOut
    ) {

        long days =
                ChronoUnit.DAYS.between(
                        checkIn,
                        checkOut
                );
        return days * room.getPricePerDay();
    }
//

    public Booking updateBookingStatus(
            Long id,
            Booking.BookingStatus status
    ) {
        Booking booking = bookingRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Booking not found"));

        //booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long id) {
        Booking booking =
                bookingRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(Booking.BookingStatus.CANCELLED);

        bookingRepository.save(booking);
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

    }
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByOwner(Long ownerId) {
        return bookingRepository.findByPetId(ownerId);
    }

}