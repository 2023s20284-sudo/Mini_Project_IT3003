package com.example.pet_boarding_and_daycare_system.owner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepository;

    public Owner registerOwner(Owner owner) {
        return ownerRepository.save(owner);
    }

    public Owner updateOwner(Long id, Owner ownerDetails) {
        Owner owner = ownerRepository.findById(id)
                .orElseThrow(() -> new OwnerNotFoundException("Owner not found with id: " + id));
        owner.setFullName(ownerDetails.getFullName());
        owner.setEmail(ownerDetails.getEmail());
        owner.setPhone(ownerDetails.getPhone());
        owner.setAddress(ownerDetails.getAddress());
        return ownerRepository.save(owner);
    }

    public void deleteOwner(Long id) {
        if (!ownerRepository.existsById(id)) {
            throw new OwnerNotFoundException("Owner not found with id: " + id);
        }
        ownerRepository.deleteById(id);
    }

    public Owner getOwnerById(Long id) {
        return ownerRepository.findById(id)
                .orElseThrow(() -> new OwnerNotFoundException("Owner not found with id: " + id));
    }

    public List<Owner> getAllOwners() {
        return ownerRepository.findAll();
    }

    public Owner findByEmail(String email) {
        return ownerRepository.findByEmail(email).orElse(null);
    }
}