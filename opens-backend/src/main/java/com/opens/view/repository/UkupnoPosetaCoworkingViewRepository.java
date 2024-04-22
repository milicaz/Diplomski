package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.UkupnoPosetaCoworkingView;

@Repository
public interface UkupnoPosetaCoworkingViewRepository extends JpaRepository<UkupnoPosetaCoworkingView, Long> {
	
	List<UkupnoPosetaCoworkingView> findByMesecPoseteAndGodinaPosete(Integer mesecPosete, Integer godinaPosete);

}
