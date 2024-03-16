package com.opens.view.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.AdminCoworkingMesecnePoseteView;

@Repository
public interface AdminCoworkingMesecnePoseteViewRepository
		extends JpaRepository<AdminCoworkingMesecnePoseteView, Long> {

}
