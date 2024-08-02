package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.PoseteView;

@Repository
public interface PoseteViewRepository extends JpaRepository<PoseteView, Long> {
	
	List<PoseteView> findByMestoPoseteId(Long mestoPoseteId);

}
