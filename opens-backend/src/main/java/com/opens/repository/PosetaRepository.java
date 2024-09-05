package com.opens.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Poseta;

@Repository
public interface PosetaRepository extends JpaRepository<Poseta, Long> {

	List<Poseta> findByMestoPoseteIdAndDatumPosete(Long mestoPoseteId, LocalDate datumPosete);

	Boolean existsByPosetilacEmailAndDatumPosete(String posetilacEmail, LocalDate datumPosete);

	Boolean existsByPosetilacEmailAndDatumPoseteAndVremeOdjaveNotNull(String posetilacEmail, LocalDate datumPosete);

	Poseta findTopByPosetilacEmailAndDatumPoseteAndVremeOdjaveIsNullOrderByVremePoseteDesc(String posetilaEmail,
			LocalDate datumPosete);

	List<Poseta> findByVremeOdjaveIsNullAndDatumPoseteBefore(LocalDate today);

}
