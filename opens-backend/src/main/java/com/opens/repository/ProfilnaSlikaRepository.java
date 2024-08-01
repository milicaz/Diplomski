package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.ProfilnaSlika;

@Repository
public interface ProfilnaSlikaRepository extends JpaRepository<ProfilnaSlika, Long> {
	
	ProfilnaSlika findByPosetilacId(Long posetilacId);

}
