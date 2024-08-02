package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.DirektniUkupnoView;

@Repository
public interface DirektniUkupnoViewRepository extends JpaRepository<DirektniUkupnoView, Long> {
	
	List<DirektniUkupnoView> findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(Long mestoPoseteId, Integer mesecPosete, Integer godinaPosete);

}
