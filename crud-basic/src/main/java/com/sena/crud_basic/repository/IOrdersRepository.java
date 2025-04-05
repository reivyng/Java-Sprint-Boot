package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.sena.crud_basic.model.ordersDTO;

public interface IOrdersRepository  extends JpaRepository<ordersDTO, Integer> {

    // Listar todos los valores activos
    @Query("SELECT b FROM client b WHERE b.status=1")
    List<ordersDTO> findAllClientActive();

    // Listar con un filtro
    @Query("SELECT b FROM client b WHERE b.nameClient LIKE %:filter%")
    List<ordersDTO> search(@Param("filter") String filter);

    // Listar por ID (ya está incluido en JpaRepository)
    // Este método no necesita una consulta personalizada porque JpaRepository ya proporciona el método findById.
}