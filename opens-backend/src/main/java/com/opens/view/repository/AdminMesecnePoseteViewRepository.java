package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.AdminMesecnePoseteView;

@Repository
public interface AdminMesecnePoseteViewRepository
		extends JpaRepository<AdminMesecnePoseteView, Long> {
	
	List<AdminMesecnePoseteView> findByMestoPoseteId(Long mestoPoseteId);

}
