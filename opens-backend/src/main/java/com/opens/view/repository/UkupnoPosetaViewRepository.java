package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.UkupnoPosetaView;

@Repository
public interface UkupnoPosetaViewRepository extends JpaRepository<UkupnoPosetaView, Long> {
	
	List<UkupnoPosetaView> findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(Long mestoPoseteId, Integer mesecPosete, Integer godinaPosete);

}
