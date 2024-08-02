package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.DirektniView;

@Repository
public interface DirektniViewRepository extends JpaRepository<DirektniView, Long> {
	
	List<DirektniView> findByMestoPoseteIdAndMesecPoseteAndGodinaPosete(Long mestoPoseteId, Integer mesecPosete, Integer godinaPosete);

}
