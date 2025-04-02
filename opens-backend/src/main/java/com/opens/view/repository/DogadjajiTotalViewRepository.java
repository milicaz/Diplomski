package com.opens.view.repository;

import java.util.List;

import com.opens.view.DogadjajiTotalView;

public interface DogadjajiTotalViewRepository extends ReadOnlyRepository<DogadjajiTotalView, Long> {

	List<DogadjajiTotalView> findByMesecAndGodinaAndVrsta(Long mesec, Long godina, String vrsta);
}
