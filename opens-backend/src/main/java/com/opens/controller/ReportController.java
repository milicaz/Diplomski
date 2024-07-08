package com.opens.controller;



import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
	@GetMapping("/generate")
    public ResponseEntity<byte[]> generateReport(
            @RequestParam("headerImage") String headerImage,
            @RequestParam("footerImage") String footerImage) {

        // Generate your PDF using JasperReports
        byte[] reportBytes = generatePdfReport(headerImage, footerImage);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "report.pdf");

        return new ResponseEntity<>(reportBytes, headers, HttpStatus.OK);
    }

    private byte[] generatePdfReport(String headerImage, String footerImage) {
        // Logic to generate PDF using JasperReports
        // Load .jrxml, compile, fill parameters, export to byte array, etc.
        // Ensure to set parameters headerImage and footerImage
        return null; // Replace with actual PDF byte array
    }
}
