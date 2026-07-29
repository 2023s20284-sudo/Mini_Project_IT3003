package com.example.pet_boarding_and_daycare_system.owner;

public class OwnerNotFoundException extends RuntimeException {
    public OwnerNotFoundException(String message) {
        super(message);
    }
}