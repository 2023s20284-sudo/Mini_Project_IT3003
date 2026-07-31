package com.example.pet_boarding_and_daycare_system.staff;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StaffRepository extends JpaRepository<Staff,Long>{

    List<Staff>findByRole(StaffRole role);
}
