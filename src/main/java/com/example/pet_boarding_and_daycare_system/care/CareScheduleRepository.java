package com.example.pet_boarding_and_daycare_system.care;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CareScheduleRepository extends JpaRepository<CareSchedule, Long> {

    // Get schedules related to Booking
    List<CareSchedule> findByBookingId(Long bookingId);

    // Get schedules assigned for the Staff
    List<CareSchedule> findByStaffId(Long staffId);

    // Get schedule list within a specific time range
    List<CareSchedule> findByScheduledTimeBetween(LocalDateTime start, LocalDateTime end);
}