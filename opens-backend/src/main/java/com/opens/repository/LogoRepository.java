package com.opens.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.opens.model.Logo;


@Repository
public interface LogoRepository extends JpaRepository<Logo, Long> {
	

}
