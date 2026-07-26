package com.example.pet_boarding_and_daycare_system;

public class Pet {

    private String petId;
    private String petName;
    private String species;
    private String breed;
    private int age;
    private String gender;
    private double weight;
    private String medicalHistory;
    private String vaccinationStatus;
    private String ownerId;

    // Default Constructor
    public Pet() {

    }

    // Parameterized Constructor
    public Pet(String petId, String petName, String species, String breed,
               int age, String gender, double weight,
               String medicalHistory, String vaccinationStatus, String ownerId) {

        this.petId = petId;
        this.petName = petName;
        this.species = species;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.weight = weight;
        this.medicalHistory = medicalHistory;
        this.vaccinationStatus = vaccinationStatus;
        this.ownerId = ownerId;
    }

    public String getPetId() {
        return petId;
    }

    public void setPetId(String petId) {
        this.petId = petId;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
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

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public String getVaccinationStatus() {
        return vaccinationStatus;
    }

    public void setVaccinationStatus(String vaccinationStatus) {
        this.vaccinationStatus = vaccinationStatus;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    @Override
    public String toString() {
        return "Pet{" +
                "petId='" + petId + '\'' +
                ", petName='" + petName + '\'' +
                ", species='" + species + '\'' +
                ", breed='" + breed + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", weight=" + weight +
                ", medicalHistory='" + medicalHistory + '\'' +
                ", vaccinationStatus='" + vaccinationStatus + '\'' +
                ", ownerId='" + ownerId + '\'' +
                '}';
    }
}