package com.example.pet_boarding_and_daycare_system.booking;


import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
public class Booking {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    //
    @ManyToOne
    private Pet pet;

    @ManyToOne
    private Room room;
    //



    private LocalDate checkInDate;

    private LocalDate checkOutDate;
    //
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private double totalCost;

    public enum BookingStatus {
        PENDING,
        CONFIRMED,
        CHECKED_IN,
        COMPLETED,
        CANCELLED
    }



}