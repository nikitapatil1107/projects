package com.cybage.boot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.EventDTO;
import com.cybage.boot.models.AppliedEventInfoModel;
import com.cybage.boot.models.EventInfoModel;
import com.cybage.boot.models.JobDetailInfoModel;
import com.cybage.boot.services.EventService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {

	@Autowired
	private EventService eventService;

	@GetMapping(path = "/getEventDetail")
	public ResponseEntity<EventDTO> getEventDetailById(@RequestParam("eventId") int eventId) {
		return new ResponseEntity<>(eventService.getEventById(eventId), HttpStatus.OK);
	}

	@GetMapping(path = "/getIfEventAlreadyApplied")
	public boolean getIfEventAlreadyApplied(@RequestParam("eventId") int eventId, @RequestParam("custId") int userId) {
		return eventService.getIfEventAlreadyApplied(eventId, userId);
	}

	@PostMapping(path = "/applyToEvent")
	public ResponseEntity<AppliedEventInfoModel> applyToEvent(@RequestBody AppliedEventInfoModel appliedEvent) {
		return new ResponseEntity<>(eventService.applyToEvent(appliedEvent), HttpStatus.CREATED);
	}

	@Transactional
	@DeleteMapping(path = "/removeAppliedEvent")
	public ResponseEntity<String> removeAppliedEvent(@RequestParam("eventId") int eventId,
			@RequestParam("custId") int userId) {
		eventService.removeAppliedEvent(eventId, userId);
		return new ResponseEntity<>("Event is Not Applied Anymore!!!", HttpStatus.OK);
	}
	
	@GetMapping(path = "getAppliedEvents")
	public ResponseEntity<List<EventInfoModel>> getAllAppliedEventsOfUser(@RequestParam("userId") int userId) {
		return new ResponseEntity<>(eventService.getAllAppliedEvents(userId), HttpStatus.OK);
	}
}
