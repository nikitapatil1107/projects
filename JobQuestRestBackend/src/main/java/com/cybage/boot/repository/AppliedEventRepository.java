package com.cybage.boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybage.boot.models.AppliedEventInfoModel;

public interface AppliedEventRepository extends JpaRepository<AppliedEventInfoModel, Integer> {
	void deleteByEventIdAndCustId(int eventId, int custId);

	AppliedEventInfoModel findByEventIdAndCustId(int eventId, int custId);

	List<AppliedEventInfoModel> findAllByCustId(int custId);
}
