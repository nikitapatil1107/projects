package com.cybage.boot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.models.PdfDocument;
import com.cybage.boot.repository.PdfDocumentRepository;

@Service
public class PdfDocumentService {

	@Autowired
	private PdfDocumentRepository pdfDocumentRepository;

	public void savePdfDocument(String fileName, byte[] data, int userId) {
		PdfDocument pdfDoc = pdfDocumentRepository.findByUserId(userId);
		if (pdfDoc == null) {
			PdfDocument pdfDocument = new PdfDocument();
			pdfDocument.setFileName(fileName);
			pdfDocument.setData(data);
			pdfDocument.setUserId(userId);
			pdfDocumentRepository.save(pdfDocument);
		} else {
			pdfDoc.setFileName(fileName);
			pdfDoc.setData(data);
			pdfDoc.setUserId(userId);
			pdfDocumentRepository.save(pdfDoc);
		}
	}

	public PdfDocument getPdfDocumentById(int userId) {
		return pdfDocumentRepository.findByUserId(userId);
	}

	public String getNameOfPdf(int userId) {
		return pdfDocumentRepository.findByUserId(userId).getFileName();
	}

	// Other methods as needed
}
