package com.sena.crud_basic.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.sena.crud_basic.repository.ISellersRepository;
import com.sena.crud_basic.model.sellersDTO;
import java.util.List;

@Service
public class SellersService {
    
    @Autowired
    private ISellersRepository sellersRepository;

    public List<sellersDTO> listSellers() {
        return sellersRepository.findAll();
    }

    public sellersDTO saveSellers(sellersDTO sellers) {
        return sellersRepository.save(sellers);
    }

}
