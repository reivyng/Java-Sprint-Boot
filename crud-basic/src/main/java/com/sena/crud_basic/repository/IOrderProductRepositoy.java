package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.OrderProductDTO;

public interface IOrderProductRepositoy  extends JpaRepository<OrderProductDTO, Integer> {

}
