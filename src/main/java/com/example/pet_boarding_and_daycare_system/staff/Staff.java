package com.example.pet_boarding_and_daycare_system.staff;
<<<<<<< HEAD
import com.example.pet_boarding_and_daycare_system.care.CareSchedule;
=======
>>>>>>> feature/vandana-pet-frontend-only

import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.List;

@Entity
public class Staff{

    @Id
    @GeneratedValue
    private Long id;

    private String fullName;

    @Enumerated(EnumType.STRING)
    private StaffRole role;

    private String contact;

    private LocalTime shiftStart;
    private LocalTime shiftEnd;

<<<<<<< HEAD
     @OneToMany(mappedBy = "staff")
     private List<CareSchedule> assignedSchedules;
=======
    /*put as a comment untill push the careshedule class
     @OneToMany(mappedBy = "staff")
     private List<CareSchedule> assignedSchedules;*/
>>>>>>> feature/vandana-pet-frontend-only

    public Staff() {
    }

    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id=id;
    }

    public String getFullName(){
        return fullName;
    }

    public void setFullName(String fullName){
        this.fullName=fullName;
    }

    public StaffRole getRole(){
        return role;
    }

    public void setRole(StaffRole role) {
        this.role=role;
    }

    public String getContact(){
        return contact;
    }

    public void setContact(String contact){
        this.contact=contact;
    }

    public LocalTime getShiftStart(){
        return shiftStart;
    }

    public void setShiftStart(LocalTime shiftStart){
        this.shiftStart=shiftStart;
    }

    public LocalTime getShiftEnd(){
        return shiftEnd;
    }

    public void setShiftEnd(LocalTime shiftEnd){
        this.shiftEnd=shiftEnd;
    }
}