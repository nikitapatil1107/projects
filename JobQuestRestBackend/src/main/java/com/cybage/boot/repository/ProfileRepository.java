package com.cybage.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.UserProfileModel;

public interface ProfileRepository extends JpaRepository<UserProfileModel, Integer> {

}
