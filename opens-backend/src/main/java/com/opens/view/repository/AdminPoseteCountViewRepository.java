package com.opens.view.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.AdminPoseteCountView;

@Repository
public interface AdminPoseteCountViewRepository extends JpaRepository<AdminPoseteCountView, Long> {

}
