package com.opens.service;

import java.util.List;

import com.opens.dto.PosetaDTO;
import com.opens.model.Poseta;
import com.opens.view.PoseteView;

public interface PosetaService {

	public List<Poseta> findAll();

	public List<Poseta> getNeodjavljenePosete();

	public List<PoseteView> getPosetePoMestuPosete(Long mestoPoseteId);

	public List<Poseta> getTrenutnePosetePoMestuPosete(Long mestoPoseteId);

	public Poseta addPoseta(PosetaDTO posetaDTO);

	public Poseta odjaviOpremuTrenutno(Long id);

	public Poseta checkOutTrenutno(Long id);

	public Poseta checkOutNevracene(Long id);

	public Poseta checkStatus(String email);

	public Poseta findPoseta(String email);

	public Poseta checkOutQRcode(String email);

	public Poseta checkOutOpremaQRcode(String email);

}
