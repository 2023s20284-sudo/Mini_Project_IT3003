package com.example.pet_boarding_and_daycare_system.pet;

// TODO: Uncomment this import once Wathsala creates the Owner entity
// import com.example.pet_boarding_and_daycare_system.owner.Owner;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String breed;
    private int age;
    private String gender;
    private String medicalNotes;

    // TODO: Owner entity not created yet - uncomment below once it exists,
    // and remove the temporary ownerId field.
    // @ManyToOne
    // @JoinColumn(name = "owner_id")
    // private Owner owner;

    // Temporary placeholder until Owner entity is ready
    private Long ownerId;

    public Pet() {
    }

    public Pet(String name, String breed, int age, String gender, String medicalNotes, Long ownerId) {
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.medicalNotes = medicalNotes;
        this.ownerId = ownerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMedicalNotes() {
        return medicalNotes;
    }

    public void setMedicalNotes(String medicalNotes) {
        this.medicalNotes = medicalNotes;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    // TODO: Once Owner entity exists, replace getOwnerId/setOwnerId above with:
    // public Owner getOwner() { return owner; }
    // public void setOwner(Owner owner) { this.owner = owner; }
}