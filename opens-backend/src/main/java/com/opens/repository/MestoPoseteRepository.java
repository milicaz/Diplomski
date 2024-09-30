package com.opens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.MestoPosete;

@Repository
public interface MestoPoseteRepository extends JpaRepository<MestoPosete, Long> {
	
	List<MestoPosete> findByDeletedFalse();

}
