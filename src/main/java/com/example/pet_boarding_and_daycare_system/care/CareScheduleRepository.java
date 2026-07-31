package com.example.pet_boarding_and_daycare_system.care;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.time.LocalDateTime;

public interface CareScheduleRepository extends JpaRepository<CareSchedule, Long> {

    //  to get schedules related to Booking
    List<CareSchedule> findByBookingId(Long bookingId);

    //  to get schedules assign for the Staff
    List<CareSchedule> findByStaffId(Long staffId);

    // finally get  schedule list (from start-end time range )
    List<CareSchedule> findByScheduledTimeBetween(LocalDateTime start, LocalDateTime end);
}