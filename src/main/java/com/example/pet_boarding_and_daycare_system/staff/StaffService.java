package com.example.pet_boarding_and_daycare_system.staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StaffService{

    @Autowired
    private StaffRepository staffRepository;

    public Staff addStaff(Staff staff){
        return staffRepository.save(staff);
    }

    public Staff updateStaff(Long id, Staff staff){
        Staff existingStaff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));

        existingStaff.setFullName(staff.getFullName());
        existingStaff.setRole(staff.getRole());
        existingStaff.setContact(staff.getContact());
        existingStaff.setShiftStart(staff.getShiftStart());
        existingStaff.setShiftEnd(staff.getShiftEnd());

        return staffRepository.save(existingStaff);
    }

    public void deleteStaff(Long id){
        staffRepository.deleteById(id);
    }

    public Staff getStaffById(Long id){
        return staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found with id: " + id));
    }

    public List<Staff> getAllStaff(){
        return staffRepository.findAll();
    }

    public List<Staff> getStaffByRole(StaffRole role){
        return staffRepository.findByRole(role);
    }
}
