package com.opens.view.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.AdminGodisnjeAktivnostiView;

@Repository
public interface AdminGodisnjeAktivnostiViewRepository extends JpaRepository<AdminGodisnjeAktivnostiView, Long> {
	
	List<AdminGodisnjeAktivnostiView> findByGodinaDogadjaja(Integer godinaDogadjaja);

}
