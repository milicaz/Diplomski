package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.DirektniCoworkingView;

@Repository
public interface DirektniCoworkingViewRepository extends JpaRepository<DirektniCoworkingView, Long> {
	
	List<DirektniCoworkingView> findByMesecPoseteAndGodinaPosete(Integer mesecPosete, Integer godinaPosete);

}
