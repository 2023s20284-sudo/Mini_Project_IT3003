package com.example.pet_boarding_and_daycare_system.staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController

@RequestMapping("/api/staff")
public class StaffController{

    @Autowired
    private StaffService staffService;

    @PostMapping
    public Staff addStaff(@RequestBody Staff staff){
        return staffService.addStaff(staff);
    }

    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Long id, @RequestBody Staff staff){
        return staffService.updateStaff(id, staff);
    }

    @DeleteMapping("/{id}")
    public void deleteStaff(@PathVariable Long id){
        staffService.deleteStaff(id);
    }

    @GetMapping("/{id}")
    public Staff getStaffById(@PathVariable Long id){
        return staffService.getStaffById(id);
    }

    @GetMapping
    public List<Staff> getAllStaff(){
        return staffService.getAllStaff();
    }

    @GetMapping("/role/{role}")
    public List<Staff> getStaffByRole(@PathVariable StaffRole role){
        return staffService.getStaffByRole(role);
    }
}