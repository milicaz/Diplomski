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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Logo;
import com.opens.model.TipDogadjaja;
import com.opens.repository.LogoRepository;
import com.opens.repository.TipDogadjajaRepository;
import com.opens.view.DogadjajiTotalView;
import com.opens.view.DogadjajiView;
import com.opens.view.repository.DogadjajiTotalViewRepository;
import com.opens.view.repository.DogadjajiViewRepository;

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
@CrossOrigin(origins = "http://localhost:3000")
public class DogadjajViewController {
	
	@Autowired
	private DogadjajiViewRepository dogRepo;
	
	@Autowired
	private TipDogadjajaRepository tipRepo;
	
	@Autowired
	private LogoRepository logoRepository;
	
	@Autowired
	private DogadjajiTotalViewRepository dogTotalRepo;
	
	@GetMapping("/dogadjajiView")
	public ResponseEntity<List<DogadjajiView>> getAll() {
		List<DogadjajiView> dogadjaji = new ArrayList<>();
		
		dogadjaji = dogRepo.findAll();
		
		return new ResponseEntity<>(dogadjaji, HttpStatus.OK);
	}
	
	@GetMapping(path = "/dogadjajiView/{mesec}/{godina}/{id}")
	public ResponseEntity<byte[]> getAllByMesecVrsta(@PathVariable Long mesec, @PathVariable Long godina, @PathVariable Long id, @RequestParam String ime, @RequestParam String prezime,
			@RequestParam(required = false) Long headerImageId, @RequestParam(required = false) Long footerImageId) throws JRException, FileNotFoundException {
		//, @RequestParam String ime, @RequestParam String prezime
		
		TipDogadjaja tip = tipRepo.findOneById(id);		
		String vrsta = tip.getNaziv();
		
		
		List<DogadjajiView> dogadjaji = dogRepo.findByMesecAndGodinaAndVrsta(mesec, godina, vrsta);
		File file = ResourceUtils.getFile("classpath:dogadjajireport.jrxml");
		JRBeanCollectionDataSource dogadjajiDataSource = new JRBeanCollectionDataSource(dogadjaji);
		JRBeanCollectionDataSource dogadjajiDataSourceDva = new JRBeanCollectionDataSource(dogadjaji);
		
		//subreport
		List<DogadjajiTotalView> dogadjajiTotal = dogTotalRepo.findByMesecAndGodinaAndVrsta(mesec, godina, vrsta);
		System.out.println("Januar eksterne pdf: " + dogadjajiTotal.toString());
		JRBeanCollectionDataSource dogadjajiUkupnoDataSource = new JRBeanCollectionDataSource(dogadjajiTotal);
		
		Map<String, Object> dogadjajiUkupnoParameter = new HashMap<>();
		dogadjajiUkupnoParameter.put("dogadjajiUkupnoDataSet", dogadjajiUkupnoDataSource);
		dogadjajiUkupnoParameter.put("mesec", mesec);
		
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
		parameters.put("ime_zaposlenog", ime);
		parameters.put("prezime_zaposlenog", prezime);
		parameters.put("mesec", mesec);
		parameters.put("godina", godina);
		parameters.put("vrsta", vrsta);
		parameters.put("dogadjajiDataSet", dogadjajiDataSource);
		parameters.put("dogadjajiDataSetDva", dogadjajiDataSourceDva);
		parameters.put("dogadjajiUkupnoParametar", dogadjajiUkupnoParameter);
		parameters.put("dogadjajiUkupnoReport", getDogadjajiUkupnoReport());
		
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
//		System.out.println("Izvestaj je kreiran!");
		
		HttpHeaders headers = new HttpHeaders();
		// set the PDF format
		headers.setContentType(MediaType.APPLICATION_PDF);
		headers.setContentDispositionFormData("attachment", "dogadjajireport.pdf");

		return new ResponseEntity<byte[]>(JasperExportManager.exportReportToPdf(print), headers, HttpStatus.OK);
		
	}
	
	@GetMapping(path = "/dogadjajiView/{mesec}/{godina}/{id}/excel")
    public ResponseEntity<byte[]> getAllByMesecVrstaForExcel(
            @PathVariable Long mesec,
            @PathVariable Long godina,
            @PathVariable Long id,
            @RequestParam String ime,
            @RequestParam String prezime,
            @RequestParam(required = false) Long headerImageId,
            @RequestParam(required = false) Long footerImageId) throws JRException, FileNotFoundException {

        TipDogadjaja tip = tipRepo.findOneById(id);
        String vrsta = tip.getNaziv();

        List<DogadjajiView> dogadjajiMesecVrsta = dogRepo.findByMesecAndGodinaAndVrsta(mesec, godina, vrsta);
        System.out.println("Januar externe posle file");
        File file = ResourceUtils.getFile("classpath:dogadjajireport.jrxml");
        System.out.println("Januar externe posle file");
        JRBeanCollectionDataSource dogadjajiDataSource = new JRBeanCollectionDataSource(dogadjajiMesecVrsta);
        System.out.println("Januar externe pre total");
        
      //subreport
      	List<DogadjajiTotalView> dogadjajiTotal = dogTotalRepo.findByMesecAndGodinaAndVrsta(mesec, godina, vrsta);
      	System.out.println("Januar eksterne excel: " + dogadjajiTotal.toString());
      	JRBeanCollectionDataSource dogadjajiUkupnoDataSource = new JRBeanCollectionDataSource(dogadjajiTotal);
      		
      	Map<String, Object> dogadjajiUkupnoParameter = new HashMap<>();
      	dogadjajiUkupnoParameter.put("dogadjajiUkupnoDataSet", dogadjajiUkupnoDataSource);
      	dogadjajiUkupnoParameter.put("mesec", mesec);

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
        parameters.put("ime_zaposlenog", ime);
        parameters.put("prezime_zaposlenog", prezime);
        parameters.put("mesec", mesec);
        parameters.put("godina", godina);
        parameters.put("vrsta", vrsta);
        parameters.put("dogadjajiDataSet", dogadjajiDataSource);
        parameters.put("dogadjajiUkupnoParametar", dogadjajiUkupnoParameter);
		parameters.put("dogadjajiUkupnoReport", getDogadjajiUkupnoReport());

        // Handling images for header and footer
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
            e.printStackTrace();
        }

        // Compile the Jasper report from JRXML template
        JasperReport report = JasperCompileManager.compileReport(file.getAbsolutePath());
        JasperPrint print = JasperFillManager.fillReport(report, parameters, new JREmptyDataSource());

        // Create the Excel exporter
        JRXlsxExporter exporter = new JRXlsxExporter();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        exporter.setExporterInput(new SimpleExporterInput(print));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

        // Export the report to Excel
        exporter.exportReport();

        // Set response headers for Excel file
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "dogadjajireport.xlsx");

        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }
    
    private JasperReport getDogadjajiUkupnoReport() throws FileNotFoundException, JRException {
    	File file = ResourceUtils.getFile("classpath:dogadjajiUkupnoReport.jrxml");
    	JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
    	return jasperReport;
    }

}
