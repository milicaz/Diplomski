package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.TipOpreme;

@Repository
public interface TipOpremeRepository extends JpaRepository<TipOpreme, Long> {

}
