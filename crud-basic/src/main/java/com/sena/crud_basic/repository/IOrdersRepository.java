package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.ordersDTO;

public interface IOrdersRepository  extends JpaRepository<ordersDTO, Integer> {

}