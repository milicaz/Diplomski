package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Ucesnik;

@Repository
public interface UcesnikRepository extends JpaRepository<Ucesnik, Long>  {

}
