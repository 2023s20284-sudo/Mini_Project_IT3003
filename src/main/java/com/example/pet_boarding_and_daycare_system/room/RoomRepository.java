package com.example.pet_boarding_and_daycare_system.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    // Custom query to find only available rooms
    List<Room> findByIsAvailableTrue();
}
