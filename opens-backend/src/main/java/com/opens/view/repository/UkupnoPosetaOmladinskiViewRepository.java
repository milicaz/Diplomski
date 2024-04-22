package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.UkupnoPosetaOmladinskiView;

@Repository
public interface UkupnoPosetaOmladinskiViewRepository extends JpaRepository<UkupnoPosetaOmladinskiView, Long> {
	
	List<UkupnoPosetaOmladinskiView> findByMesecPoseteAndGodinaPosete(Integer mesecPosete, Integer godinaPosete);

}
