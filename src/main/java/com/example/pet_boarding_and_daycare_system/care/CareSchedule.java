package com.example.pet_boarding_and_daycare_system.care;
<<<<<<< HEAD
import com.example.pet_boarding_and_daycare_system.booking.Booking;
import com.example.pet_boarding_and_daycare_system.staff.Staff;
=======
>>>>>>> feature/vandana-pet-frontend-only

import jakarta.persistence.*;
import java.time.LocalDateTime;

<<<<<<< HEAD





=======
>>>>>>> feature/vandana-pet-frontend-only
@Entity
@Table(name = "care_schedule")
public class CareSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

<<<<<<< HEAD


=======
    // I comment these lines until Booking  and Staff classes ready
    /*
>>>>>>> feature/vandana-pet-frontend-only
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;
<<<<<<< HEAD

=======
    */
>>>>>>> feature/vandana-pet-frontend-only

    @Enumerated(EnumType.STRING)
    private ActivityType activityType;

    private LocalDateTime scheduledTime;

    @Enumerated(EnumType.STRING)
    private ScheduleStatus status;

    private String notes;

<<<<<<< HEAD
    //  No-argument Constructor ( it is Spring Boot requirement)
=======
    //  No-argument Constructor (Spring Boot requirement)
>>>>>>> feature/vandana-pet-frontend-only
    public CareSchedule() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ActivityType getActivityType() {
        return activityType;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    public ScheduleStatus getStatus() {
        return status;
    }

    public void setStatus(ScheduleStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
<<<<<<< HEAD
    public Staff getStaff() {  return staff; }

    public void setStaff(Staff staff) { this.staff = staff; }
=======
>>>>>>> feature/vandana-pet-frontend-only
}