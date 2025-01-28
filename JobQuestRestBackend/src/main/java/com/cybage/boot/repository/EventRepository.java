package com.cybage.boot.repository;



import org.springframework.data.jpa.repository.JpaRepository;


import com.cybage.boot.models.EventInfoModel;

public interface EventRepository extends JpaRepository<EventInfoModel, Integer> {
	
}
