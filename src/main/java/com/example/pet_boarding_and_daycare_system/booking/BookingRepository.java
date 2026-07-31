package com.example.pet_boarding_and_daycare_system.booking;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface BookingRepository
        extends JpaRepository<Booking, Long> {


    List<Booking> findByPetId(Long petId);



    List<Booking> findByRoomIdAndStatusNot(
            Long roomId,
            Booking.BookingStatus status
    );


}

