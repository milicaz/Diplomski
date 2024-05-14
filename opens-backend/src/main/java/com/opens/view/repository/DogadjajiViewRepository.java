package com.opens.view.repository;

import java.util.List;

import com.opens.view.DogadjajiView;

public interface DogadjajiViewRepository extends ReadOnlyRepository<DogadjajiView, Long> {
	
	List<DogadjajiView> findByMesecAndGodinaAndVrsta(Long mesec, Long godina, String vrsta);
	
//	List<DogadjajiView> findByVrsta_dogadjaja(String vrsta_dogadjaja);

}
