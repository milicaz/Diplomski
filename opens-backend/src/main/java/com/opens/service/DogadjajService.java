package com.opens.service;

import java.util.List;

import com.opens.dto.DogadjajDTO;
import com.opens.model.Dogadjaj;

public interface DogadjajService {

	public Dogadjaj findOneById(Long id);

	public List<Dogadjaj> findAllActive();

	public Dogadjaj findActiveById(Long id);
	
	public String updateDogadjaj(Long id, Dogadjaj dogadjaj);

	public Dogadjaj addDogadjaj(DogadjajDTO dogadjajDTO);

	public String deleteDogadjaj(Long id);
}
