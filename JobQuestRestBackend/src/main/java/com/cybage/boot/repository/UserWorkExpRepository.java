package com.cybage.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.UserWorkExperience;

public interface UserWorkExpRepository extends JpaRepository<UserWorkExperience, Integer> {

}
