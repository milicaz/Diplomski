package com.opens.view.repository;

import java.util.List;

import com.opens.view.UcesniciView;

public interface UcesniciViewRepository extends ReadOnlyRepository<UcesniciView, Long> {
	

	List<UcesniciView> findByDoznaka(Long doznaka);
}
