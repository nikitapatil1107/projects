package com.cybage.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.UserProfileModel;

public interface UserRepository extends JpaRepository<UserProfileModel, Integer> {
	boolean existsByUserEmail(String userEmail);
	UserProfileModel findByUserEmail(String userEmail);
}
