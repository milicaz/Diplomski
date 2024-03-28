package com.opens.view.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.PoseteCoworkingView;

@Repository
public interface PoseteCoworkingViewRepository extends JpaRepository<PoseteCoworkingView, Long> {

}
