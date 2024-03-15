package com.opens.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Logo;

import lombok.Builder;

@Repository
public interface LogoRepository extends JpaRepository<Logo, Long> {
	
	Optional <Logo> findByNaziv(String naziv);

}
