package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.sellersDTO;

public interface ISellersRepository  extends JpaRepository<sellersDTO, Integer> {

}
