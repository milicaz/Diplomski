package com.opens.view.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.AdminUcesniciCountView;

@Repository
public interface AdminUcesniciCountViewRepository extends JpaRepository<AdminUcesniciCountView, Long> {

}
