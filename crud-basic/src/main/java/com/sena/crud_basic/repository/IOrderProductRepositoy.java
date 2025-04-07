package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sena.crud_basic.model.OrderProductDTO;
import java.util.List;

public interface IOrderProductRepositoy  extends JpaRepository<OrderProductDTO, Integer> {
// Listar todos los valores activos
    @Query("SELECT b FROM order_products b WHERE b.status=1")
    List<OrderProductDTO> findAllOrderProductActive();

    // Listar con un filtro
    @Query("SELECT b FROM order_products b WHERE b.order LIKE %?1% OR b.product LIKE %?1%")
    List<OrderProductDTO> search(String filter);
}