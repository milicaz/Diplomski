package com.opens.service;

import com.opens.dto.PosetilacDTO;
import com.opens.dto.ZaposleniDTO;

public interface AuthService {
	
	public void registerZaposleni(ZaposleniDTO zaposleniDTO);
	public void registerPosetilac(PosetilacDTO posetilacDTO);
	
}
