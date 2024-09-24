package com.opens.service;

import java.util.List;

import com.opens.dto.DogadjajDTO;
import com.opens.model.Dogadjaj;

public interface DogadjajService {

	public Dogadjaj findOneById(Long id);
	public List<Dogadjaj> findAll();
	public Dogadjaj addDogadjaj(DogadjajDTO dogadjajDTO);
	
}
