package com.opens.view.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.view.AdminOmladinskiMesecnePoseteView;

@Repository
public interface AdminOmladinskiMesecnePoseteViewRepository extends JpaRepository<AdminOmladinskiMesecnePoseteView, Long> {

}
