package com.sena.crud_basic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import com.sena.crud_basic.model.sellersDTO;

public interface ISellersRepository extends JpaRepository<sellersDTO, Integer> {

    // Listar todos los valores activos
    @Query("SELECT b FROM sellers b WHERE b.status=1")
    List<sellersDTO> findAllSellersActive();

    // Listar con un filtro
    @Query("SELECT b FROM sellers b WHERE b.nameSeller LIKE %?1%")
    List<sellersDTO> search(String filter);

    // Actualizar todos los campos excepto el ID
    @Transactional
    @Modifying
    @Query("UPDATE sellers b SET b.nameSeller = ?2, b.status = ?3 WHERE b.idSeller = ?1")
    int updateSellerById(Integer id, String nameSeller, Integer status);

    // Eliminar por ID (físico)
    @Transactional
    @Modifying
    @Query("DELETE FROM sellers b WHERE b.idSeller = ?1")
    void deleteById(Integer id);
}