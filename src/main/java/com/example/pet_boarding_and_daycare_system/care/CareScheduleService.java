package com.example.pet_boarding_and_daycare_system.care;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class CareScheduleService {

    @Autowired
    private CareScheduleRepository careScheduleRepository;

    //  1. Create Schedule (Time Conflict Check)
    public CareSchedule createSchedule(CareSchedule schedule) {

        // if the Staff object exist ,only can do conflict check
        //  I will un comment when Staff class ready
        /*
        List<CareSchedule> existingSchedules = careScheduleRepository.findByStaffId(schedule.getStaff().getId());

        for (CareSchedule existing : existingSchedules) {
            if (existing.getScheduledTime().equals(schedule.getScheduledTime())) {
                throw new RuntimeException("This staff member already has a schedule at this time!");
            }
        }
        */

        // Status will  PENDING default
        schedule.setStatus(ScheduleStatus.PENDING);

        return careScheduleRepository.save(schedule);
    }

    // 2. Get Schedule by ID
    public CareSchedule getScheduleById(Long id) {
        return careScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Care Schedule not found with id: " + id));
    }

    // 3. Get All Schedules
    public List<CareSchedule> getAllSchedules() {
        return careScheduleRepository.findAll();
    }

    //  4. Update Schedule
    public CareSchedule updateSchedule(Long id, CareSchedule updatedSchedule) {
        CareSchedule existing = getScheduleById(id);

        existing.setActivityType(updatedSchedule.getActivityType());
        existing.setScheduledTime(updatedSchedule.getScheduledTime());
        existing.setNotes(updatedSchedule.getNotes());

        return careScheduleRepository.save(existing);
    }

    // 5. Mark as Completed
    public CareSchedule markAsCompleted(Long id) {
        CareSchedule schedule = getScheduleById(id);
        schedule.setStatus(ScheduleStatus.DONE);
        return careScheduleRepository.save(schedule);
    }

    // 6. Delete Schedule
    public void deleteSchedule(Long id) {
        CareSchedule schedule = getScheduleById(id);
        careScheduleRepository.delete(schedule);
    }

    //  7. Get Daily Schedule ( schedule list for a day)
    public List<CareSchedule> getDailySchedule(LocalDate date) {
        LocalDateTime startOfDay = LocalDateTime.of(date, LocalTime.MIN);   // 00:00
        LocalDateTime endOfDay = LocalDateTime.of(date, LocalTime.MAX);     // 23:59:59

        return careScheduleRepository.findByScheduledTimeBetween(startOfDay, endOfDay);
    }

    //  8. Get Schedule by Booking ( after the Booking class ready )
    /*
    public List<CareSchedule> getScheduleByBooking(Long bookingId) {
        return careScheduleRepository.findByBookingId(bookingId);
    }
    */

    // 9. Get Schedule by Staff ( after  the Staff class ready )
    /*
    public List<CareSchedule> getScheduleByStaff(Long staffId) {
        return careScheduleRepository.findByStaffId(staffId);
    }
    */
}