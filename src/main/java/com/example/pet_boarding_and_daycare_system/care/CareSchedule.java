package com.example.pet_boarding_and_daycare_system.care;
import com.example.pet_boarding_and_daycare_system.booking.Booking;
import com.example.pet_boarding_and_daycare_system.staff.Staff;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "care_schedule")
public class CareSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;


    @Enumerated(EnumType.STRING)
    private ActivityType activityType;

    private LocalDateTime scheduledTime;

    @Enumerated(EnumType.STRING)
    private ScheduleStatus status;

    private String notes;

    //  No-argument Constructor ( it is Spring Boot requirement)
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
}