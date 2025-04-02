package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.opens.view.DogadjajiView;

public interface DogadjajiViewRepository extends ReadOnlyRepository<DogadjajiView, Long> {
	
//	List<DogadjajiView> findByMesecAndGodinaAndVrsta(Long mesec, Long godina, String vrsta);
	
	@Query("SELECT d FROM DogadjajiView d WHERE d.mesec = :mesec AND d.godina = :godina AND d.vrsta = :vrsta AND d.naziv_aktivnosti IS NOT NULL")
	List<DogadjajiView> findByMesecAndGodinaAndVrsta(@Param("mesec") Long mesec, @Param("godina") Long godina, @Param("vrsta") String vrsta);
	
//	List<DogadjajiView> findByVrsta_dogadjaja(String vrsta_dogadjaja);

}
