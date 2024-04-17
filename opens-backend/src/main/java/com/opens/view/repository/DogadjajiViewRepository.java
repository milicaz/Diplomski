package com.opens.view.repository;

import java.util.List;

import com.opens.view.DogadjajiView;

public interface DogadjajiViewRepository extends ReadOnlyRepository<DogadjajiView, Long> {
	
	List<DogadjajiView> findByMesecAndVrsta(Long mesec, String vrsta);
	
//	List<DogadjajiView> findByVrsta_dogadjaja(String vrsta_dogadjaja);

}
