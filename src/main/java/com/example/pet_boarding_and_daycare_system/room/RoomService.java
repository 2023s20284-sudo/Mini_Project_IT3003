package com.example.pet_boarding_and_daycare_system.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    // Add a new room
    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    // Update room details (Price, Capacity, Type, etc.)
    public Room updateRoom(Long id, Room roomDetails) {
        Room room = getRoomById(id);
        room.setRoomNumber(roomDetails.getRoomNumber());
        room.setType(roomDetails.getType());
        room.setCapacity(roomDetails.getCapacity());
        room.setPricePerDay(roomDetails.getPricePerDay());
        room.setAvailable(roomDetails.isAvailable());
        return roomRepository.save(room);
    }

    // Delete a room
    public void deleteRoom(Long id) {
        Room room = getRoomById(id);
        roomRepository.delete(room);
    }
    // 4. Get room by ID
    // (Mandatory for Dilara's Booking module to fetch room details & calculate price)
    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
    }


    // Get all rooms in the system
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    // Get only available rooms
    public List<Room> getAvailableRooms() {
        return roomRepository.findByIsAvailableTrue();
    }
    //7. Manual toggle for Sashini (e.g. Set room as Out of order)
    // Method called by Dilara's Booking module to update availability status
    public void updateAvailabilityStatus(Long roomId, boolean status) {
        Room room = getRoomById(roomId);
        room.setAvailable(status);
        roomRepository.save(room);
    }
}