package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sena.crud_basic.model.productsDTO;
import java.util.List;

public interface IProductsRepository extends JpaRepository<productsDTO, Integer> {
   
    // Listar todos los valores activos
    @Query("SELECT b FROM products b WHERE b.status=1")
    List<productsDTO> findAllProductsActive();

    // Listar con un filtro
    @Query("SELECT b FROM products b WHERE b.nameProduct LIKE %?1% OR b.priceProduct LIKE %?1%")
    List<productsDTO> search(String filter);
}
