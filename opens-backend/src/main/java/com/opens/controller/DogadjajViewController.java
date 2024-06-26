package com.opens.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.TipDogadjaja;
import com.opens.repository.TipDogadjajaRepository;
import com.opens.view.DogadjajiView;
import com.opens.view.repository.DogadjajiViewRepository;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DogadjajViewController {
	
	@Autowired
	private DogadjajiViewRepository dogRepo;
	
	@Autowired
	private TipDogadjajaRepository tipRepo;
	
	@GetMapping("/dogadjajiView")
	public ResponseEntity<List<DogadjajiView>> getAll() {
		List<DogadjajiView> dogadjaji = new ArrayList<>();
		
		dogadjaji = dogRepo.findAll();
		
		return new ResponseEntity<>(dogadjaji, HttpStatus.OK);
	}
	
	@GetMapping(path = "/dogadjajiView/{mesec}/{godina}/{id}")
	public ResponseEntity<byte[]> getAllByMesecVrsta(@PathVariable Long mesec, @PathVariable Long godina, @PathVariable Long id, @RequestParam String ime, @RequestParam String prezime) throws JRException, FileNotFoundException {
		//, @RequestParam String ime, @RequestParam String prezime
		
		TipDogadjaja tip = tipRepo.findOneById(id);
		
		String vrsta = tip.getNaziv();
		
		List<DogadjajiView> dogadjajiMesecVrsta = new ArrayList<>();
		
		dogadjajiMesecVrsta = dogRepo.findByMesecAndGodinaAndVrsta(mesec, godina, vrsta);
		
//		String filePath = "classpath:dogadjajireport.jrxml";
		
		File file = ResourceUtils.getFile("classpath:dogadjajireport.jrxml");
		
		JRBeanCollectionDataSource dogadjajiDataSource = new JRBeanCollectionDataSource(dogadjajiMesecVrsta);
		
		JRBeanCollectionDataSource dogadjajiDataSourceDva = new JRBeanCollectionDataSource(dogadjajiMesecVrsta);
		
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("ime_zaposlenog", ime);
		parameters.put("prezime_zaposlenog", prezime);
		parameters.put("mesec", mesec);
		parameters.put("godina", godina);
		parameters.put("vrsta", vrsta);
		parameters.put("dogadjajiDataSet", dogadjajiDataSource);
		parameters.put("dogadjajiDataSetDva", dogadjajiDataSourceDva);
		
		JasperReport report = JasperCompileManager.compileReport(file.getAbsolutePath());
		JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());
//		System.out.println("Izvestaj je kreiran!");
		
		HttpHeaders headers = new HttpHeaders();
		// set the PDF format
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("attachment", "direktni.pdf");

		return new ResponseEntity<byte[]>(JasperExportManager.exportReportToPdf(print), headers, HttpStatus.OK);
		
	}

}
