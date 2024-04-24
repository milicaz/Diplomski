package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.DirektniUkupnoCoworkingView;

@Repository
public interface DirektniUkupnoCoworkingViewRepository extends JpaRepository<DirektniUkupnoCoworkingView, Long> {
	
	List<DirektniUkupnoCoworkingView> findByMesecPoseteAndGodinaPosete(Integer mesecPosete, Integer godinaPosete);

}
