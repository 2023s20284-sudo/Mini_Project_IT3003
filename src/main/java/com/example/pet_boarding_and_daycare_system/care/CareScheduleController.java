package com.example.pet_boarding_and_daycare_system.care;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/care-schedules")
public class CareScheduleController {

    @Autowired
    private CareScheduleService careScheduleService;

    // Create new schedule
    @PostMapping
    public CareSchedule createSchedule(@RequestBody CareSchedule schedule) {
        return careScheduleService.createSchedule(schedule);
    }

    // Get all schedules
    @GetMapping
    public List<CareSchedule> getAllSchedules() {
        return careScheduleService.getAllSchedules();
    }

    // Get schedule by ID
    @GetMapping("/{id}")
    public CareSchedule getScheduleById(@PathVariable Long id) {
        return careScheduleService.getScheduleById(id);
    }

    // Update schedule
    @PutMapping("/{id}")
    public CareSchedule updateSchedule(@PathVariable Long id, @RequestBody CareSchedule schedule) {
        return careScheduleService.updateSchedule(id, schedule);
    }

    // Mark schedule as completed
    @PutMapping("/{id}/complete")
    public CareSchedule markAsCompleted(@PathVariable Long id) {
        return careScheduleService.markAsCompleted(id);
    }

    // Delete schedule
    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        careScheduleService.deleteSchedule(id);
    }

    // Get daily schedule (e.g. /api/care-schedules/daily?date=2026-08-01)
    @GetMapping("/daily")
    public List<CareSchedule> getDailySchedule(@RequestParam("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        return careScheduleService.getDailySchedule(localDate);
    }
}