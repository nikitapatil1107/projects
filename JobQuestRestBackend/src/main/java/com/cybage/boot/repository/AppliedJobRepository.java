package com.cybage.boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.AppliedJobInfoModel;

public interface AppliedJobRepository extends JpaRepository<AppliedJobInfoModel, Integer> {

}
