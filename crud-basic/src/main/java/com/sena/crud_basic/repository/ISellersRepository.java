package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sena.crud_basic.model.sellersDTO;

public interface ISellersRepository  extends JpaRepository<sellersDTO, Integer> {
// Listar todos los valores activos
    @Query("SELECT b FROM sellers b WHERE b.status=1")
    List<sellersDTO> findAllClientActive();

    // Listar con un filtro
    @Query("SELECT b FROM sellers b WHERE b.nameSeller LIKE %?1%")
    List<sellersDTO> search(String filter);
}