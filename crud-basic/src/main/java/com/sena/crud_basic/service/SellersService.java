package com.sena.crud_basic.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.sena.crud_basic.repository.ISellersRepository;
import com.sena.crud_basic.model.sellersDTO;
import com.sena.crud_basic.DTO.responseDTO;
import java.util.List;

@Service
public class SellersService {

    @Autowired
    private ISellersRepository sellersRepository;

    // Listar todos los valores activos
    public List<sellersDTO> getAllSellers() {
        return sellersRepository.findAllClientActive();
    }

    // Listar con un filtro
    public List<sellersDTO> getFilteredSellers(String filter) {
        return sellersRepository.search(filter);
    }

    // Listar por ID
    public sellersDTO getSellerById(int id) {
        return sellersRepository.findById(id).orElse(null); // Manejo de null si no se encuentra
    }

    public sellersDTO saveSeller(sellersDTO seller) {
        return sellersRepository.save(seller);
    }

    public responseDTO deleteSeller(int id) {
        sellersDTO seller = getSellerById(id);
        if (seller != null) {
            seller.setStatus(0); // Cambia el estado a 0 (inactivo)
            sellersRepository.save(seller); // Usa la instancia inyectada para guardar los cambios
            return new responseDTO("OK", "Vendedor eliminado correctamente");
        } else {
            return new responseDTO("ERROR", "Vendedor no encontrado");
        }
    }
}