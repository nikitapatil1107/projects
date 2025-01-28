package com.cybage.boot.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.EventDTO;
import com.cybage.boot.models.AppliedEventInfoModel;
import com.cybage.boot.models.EventInfoModel;
import com.cybage.boot.repository.AppliedEventRepository;
import com.cybage.boot.repository.EventRepository;

@Service
public class EventService {
	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private AppliedEventRepository applyEventRepo;

	@Autowired
	private ModelMapper modelMapper;

	public EventDTO getEventById(int eventId) {
		return modelMapper.map(eventRepository.findById(eventId).get(), EventDTO.class);
	}

	public boolean getIfEventAlreadyApplied(int eventId, int userId) {
		if (applyEventRepo.findByEventIdAndCustId(eventId, userId) != null) {
			return true;
		}
		return false;
	}

	public AppliedEventInfoModel applyToEvent(AppliedEventInfoModel applyInfoModel) {
		return applyEventRepo.save(applyInfoModel);
	}

	public void removeAppliedEvent(int eventId, int userId) {
		applyEventRepo.deleteByEventIdAndCustId(eventId, userId);
	}
	
	public List<EventInfoModel> getAllAppliedEvents(int userId) {
		List<AppliedEventInfoModel> appliedList = applyEventRepo.findAllByCustId(userId);
		
		List<EventInfoModel> appliedEventList = new ArrayList<>();
		for(AppliedEventInfoModel event: appliedList) {
			EventInfoModel eventInfo = eventRepository.findById(event.getEventId()).get();
			appliedEventList.add(eventInfo);
		}
		return appliedEventList;
	}
}
