package com.example.pet_boarding_and_daycare_system.room;

import jakarta.persistence.*;

//marks this class as a database table blueprint
@Entity
@Table(name = "rooms") //Spring will default to naming the database table room (taking the class name in lowercase)
public class Room {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) //automatically generate and increment this ID whenever a new room is saved.
        private Long id;

        private String roomNumber;

        @Enumerated(EnumType.STRING)
        private RoomType type; // SMALL, MEDIUM, LARGE

        private int capacity;//Acts as weight limit / size constraint per room
        private double pricePerDay;


        public enum RoomType {
            SMALL, MEDIUM, LARGE
        }

        // Default Constructor
        public Room() {}

        // Parameterized Constructor
        public Room(String roomNumber, RoomType type, int capacity, double pricePerDay) {
            this.roomNumber = roomNumber;
            this.type = type;
            this.capacity = capacity;
            this.pricePerDay = pricePerDay;

        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getRoomNumber() { return roomNumber; }
        public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }

        public RoomType getType() { return type; }
        public void setType(RoomType type) { this.type = type; }

        public int getCapacity() { return capacity; }
        public void setCapacity(int capacity) { this.capacity = capacity; }

        public double getPricePerDay() { return pricePerDay; }
        public void setPricePerDay(double pricePerDay) { this.pricePerDay = pricePerDay; }


}
