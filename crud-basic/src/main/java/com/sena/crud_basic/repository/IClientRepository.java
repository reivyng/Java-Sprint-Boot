package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.clientDTO;

public interface IClientRepository extends JpaRepository<clientDTO, Integer> {
    
}
