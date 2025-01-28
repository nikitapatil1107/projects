package com.cybage.boot.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class PdfDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fileName;

    @Lob
    private byte[] data;
    
    private int userId;

    // Constructors, Getters, and Setters
}
