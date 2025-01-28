package com.cybage.boot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cybage.boot.models.PdfDocument;
import com.cybage.boot.services.PdfDocumentService;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.OutputStream;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "http://localhost:4200")
public class PdfDocumentController {

	@Autowired
	private PdfDocumentService pdfDocumentService;

	@PostMapping("/upload")
	public ResponseEntity<String> uploadPdfDocument(@RequestParam("file") MultipartFile file,
			@RequestParam("userId") int userId) {
		try {
			pdfDocumentService.savePdfDocument(file.getOriginalFilename(), file.getBytes(), userId);
			return ResponseEntity.ok("PDF document uploaded successfully");
		} catch (IOException e) {
			return ResponseEntity.badRequest().body("Failed to upload PDF document");
		}
	}

	@GetMapping("/download/{id}")
	public void downloadPdfDocument(@PathVariable int id, HttpServletResponse response) {
		PdfDocument pdfDocument = pdfDocumentService.getPdfDocumentById(id);
		if (pdfDocument != null) {
			try {
				response.setHeader("Content-Disposition", "attachment; filename=" + pdfDocument.getFileName());
				OutputStream outputStream = response.getOutputStream();
				outputStream.write(pdfDocument.getData());
				outputStream.flush();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			// Handle document not found
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
	}

	// Other methods as needed
	@GetMapping(path = "/getNameOfPdf")
	public ResponseEntity<String> getNameOfPdf(@RequestParam("userId") int userId) {
		return new ResponseEntity<>(pdfDocumentService.getNameOfPdf(userId), HttpStatus.OK);
	}
}
