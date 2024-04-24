package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.DirektniUkupnoOmladinskiView;

@Repository
public interface DirektniUkupnoOmladinskiViewRepository extends JpaRepository<DirektniUkupnoOmladinskiView, Long> {
	
	List<DirektniUkupnoOmladinskiView> findByMesecPoseteAndGodinaPosete(Integer mesecPosete, Integer godinaPosete);

}
