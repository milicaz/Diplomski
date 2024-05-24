package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Dogadjaj;

@Repository
public interface DogadjajRepository extends JpaRepository<Dogadjaj, Long> {

	Dogadjaj findOneById(Long id);
}
