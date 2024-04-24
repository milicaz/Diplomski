package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.DirektniOmladinskiView;

@Repository
public interface DirektniOmladinskiViewRepository extends JpaRepository<DirektniOmladinskiView, Long> {

	List<DirektniOmladinskiView> findByMesecPoseteAndGodinaPosete(Integer mesecPosete, Integer godinaPosete);

}
