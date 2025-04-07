package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sena.crud_basic.model.ordersDTO;

public interface IOrdersRepository  extends JpaRepository<ordersDTO, Integer> {

    // Listar todos los valores activos
    @Query("SELECT b FROM orders b WHERE b.status=1")
    List<ordersDTO> findAllOrdersActive();

    // Listar con un filtro
    @Query("SELECT b FROM orders b WHERE b.client LIKE %?1% OR b.seller LIKE %?1%")
    List<ordersDTO> search(String filter);
}