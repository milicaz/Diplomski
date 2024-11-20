package com.opens.controller;

import java.awt.Image;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Dogadjaj;
import com.opens.model.Logo;
import com.opens.repository.DogadjajRepository;
import com.opens.repository.LogoRepository;
import com.opens.view.UcesniciView;
import com.opens.view.repository.UcesniciViewRepository;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

@RestController
@RequestMapping("/api")
public class UcesniciViewContorller {
	
	@Autowired
	private UcesniciViewRepository ucRepo;
	
	@Autowired
	private DogadjajRepository dogadjajRepo;
	
	@Autowired
	private LogoRepository logoRepository;
	
	@GetMapping("/ucesniciView")
	public ResponseEntity<List<UcesniciView>> getAll() {
		List<UcesniciView> ucesnici = new ArrayList<>();
		
		ucesnici = ucRepo.findAll();
		
		return new ResponseEntity<>(ucesnici, HttpStatus.OK);
	}
	
	@GetMapping("/ucesniciView/{doznaka}")
	public ResponseEntity<byte[]> getAllByOznaka(@PathVariable Long doznaka,
			@RequestParam(required = false) Long headerImageId, @RequestParam(required = false) Long footerImageId) throws JRException, FileNotFoundException {
		List<UcesniciView> ucesniciOznaka = new ArrayList<>();
		
		Dogadjaj dogadjaj = new Dogadjaj();
		
		dogadjaj = dogadjajRepo.findOneById(doznaka);
		
		System.out.println("Dogadjaj je: " + dogadjaj);
		
		ucesniciOznaka = ucRepo.findByDoznaka(doznaka);
		
//		File filePath = "D:\\Diplomski - git\\Diplomski\\opens-backend\\src\\main\\resources\\ucesniciReport.jrxml";
		
		File file = ResourceUtils.getFile("classpath:ucesniciReport.jrxml");
		
		JRBeanCollectionDataSource ucesniciDataSource = new JRBeanCollectionDataSource(ucesniciOznaka);
		
		byte[] headerImageByte = null;
		if (headerImageId != null) {
			Optional<Logo> header = logoRepository.findById(headerImageId);
			if (header.isPresent()) {
				headerImageByte = header.get().getPicByte();
			}
		}

		byte[] footerImageByte = null;
		if (footerImageId != null) {
			Optional<Logo> footer = logoRepository.findById(footerImageId);
			if (footer.isPresent()) {
				footerImageByte = footer.get().getPicByte();
			}
		}
		
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("dogadjaj", dogadjaj.getNaziv());
		parameters.put("organizator", dogadjaj.getOrganizacija().getNaziv());
		parameters.put("datum", dogadjaj.getDatum());
		parameters.put("mesto", dogadjaj.getMesto().getNazivSale());
		parameters.put("pocetak", dogadjaj.getPocetakDogadjaja());
		parameters.put("kraj", dogadjaj.getKrajDogadjaja());
		parameters.put("ucesniciDataSet", ucesniciDataSource);
		
		try {
	        if (headerImageByte != null) {
	            Image headerImage = ImageIO.read(new ByteArrayInputStream(headerImageByte));
	            parameters.put("headerImage", headerImage);
	        }
	        if (footerImageByte != null) {
	            Image footerImage = ImageIO.read(new ByteArrayInputStream(footerImageByte));
	            parameters.put("footerImage", footerImage);
	        }
	    } catch (IOException e) {
	        e.printStackTrace(); // Log the error
	    }
		
		JasperReport report = JasperCompileManager.compileReport(file.getAbsolutePath());
		JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
//		JasperExportManager.exportReportToPdfFile(print, "D:\\Diplomski - git\\Diplomski\\opens-backend\\src\\main\\resources\\ucesniciReport.pdf");
		
		HttpHeaders headers = new HttpHeaders();
		// set the PDF format
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("attachment", "ucesnici.pdf");
		
		System.out.println("Izvestaj je kreiran!");
		
		return new ResponseEntity<byte[]>(JasperExportManager.exportReportToPdf(print), headers, HttpStatus.OK);
	}
	
	@GetMapping("/ucesniciView/{doznaka}/excel")
	public ResponseEntity<byte[]> getAllByOznakaExcel(@PathVariable Long doznaka,
			@RequestParam(required = false) Long headerImageId, @RequestParam(required = false) Long footerImageId) throws JRException, FileNotFoundException {
				
List<UcesniciView> ucesniciOznaka = new ArrayList<>();
		
		Dogadjaj dogadjaj = new Dogadjaj();
		
		dogadjaj = dogadjajRepo.findOneById(doznaka);
		
		System.out.println("Dogadjaj je: " + dogadjaj);
		
		ucesniciOznaka = ucRepo.findByDoznaka(doznaka);
		
//		File filePath = "D:\\Diplomski - git\\Diplomski\\opens-backend\\src\\main\\resources\\ucesniciReport.jrxml";
		
		File file = ResourceUtils.getFile("classpath:ucesniciReport.jrxml");
		
		JRBeanCollectionDataSource ucesniciDataSource = new JRBeanCollectionDataSource(ucesniciOznaka);
		
		byte[] headerImageByte = null;
		if (headerImageId != null) {
			Optional<Logo> header = logoRepository.findById(headerImageId);
			if (header.isPresent()) {
				headerImageByte = header.get().getPicByte();
			}
		}

		byte[] footerImageByte = null;
		if (footerImageId != null) {
			Optional<Logo> footer = logoRepository.findById(footerImageId);
			if (footer.isPresent()) {
				footerImageByte = footer.get().getPicByte();
			}
		}
		
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("dogadjaj", dogadjaj.getNaziv());
		parameters.put("organizator", dogadjaj.getOrganizacija().getNaziv());
		parameters.put("datum", dogadjaj.getDatum());
		parameters.put("mesto", dogadjaj.getMesto().getNazivSale());
		parameters.put("pocetak", dogadjaj.getPocetakDogadjaja());
		parameters.put("kraj", dogadjaj.getKrajDogadjaja());
		parameters.put("ucesniciDataSet", ucesniciDataSource);
		
		try {
	        if (headerImageByte != null) {
	            Image headerImage = ImageIO.read(new ByteArrayInputStream(headerImageByte));
	            parameters.put("headerImage", headerImage);
	        }
	        if (footerImageByte != null) {
	            Image footerImage = ImageIO.read(new ByteArrayInputStream(footerImageByte));
	            parameters.put("footerImage", footerImage);
	        }
	    } catch (IOException e) {
	        e.printStackTrace(); // Log the error
	    }
		
		JasperReport report = JasperCompileManager.compileReport(file.getAbsolutePath());
		JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
//		JasperExportManager.exportReportToPdfFile(print, "D:\\Diplomski - git\\Diplomski\\opens-backend\\src\\main\\resources\\ucesniciReport.pdf");
		
		JRXlsxExporter exporter = new JRXlsxExporter();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		
		exporter.setExporterInput(new SimpleExporterInput(print));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

        // Export the report to Excel
        exporter.exportReport();
		
		HttpHeaders headers = new HttpHeaders();
		// set the PDF format
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("attachment", "ucesnici.xlsx");
		
		System.out.println("Izvestaj je kreiran!");
		
		return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);	
	}

}
