package com.sena.crud_basic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sena.crud_basic.model.clientDTO;
import java.util.List;

public interface IClientRepository extends JpaRepository<clientDTO, Integer> {

    // Listar todos los valores activos
    @Query("SELECT b FROM client b WHERE b.status=1")
    List<clientDTO> findAllClientActive();

    // Listar con un filtro
    @Query("SELECT b FROM client b WHERE b.name LIKE %?1%")
    List<clientDTO> search(String filter);

    // Listar por ID (ya está incluido en JpaRepository)
    // Este método no necesita una consulta personalizada porque JpaRepository ya proporciona el método findById.
}
