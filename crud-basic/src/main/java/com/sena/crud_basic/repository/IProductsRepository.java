package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.productsDTO;

public interface IProductsRepository extends JpaRepository<productsDTO, Integer> {

}
