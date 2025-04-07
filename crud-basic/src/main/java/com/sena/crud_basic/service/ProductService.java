package com.sena.crud_basic.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.sena.crud_basic.repository.IProductsRepository;
import com.sena.crud_basic.model.productsDTO;
import com.sena.crud_basic.DTO.responseDTO;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private IProductsRepository productsRepository;

    // Listar todos los valores activos
    public List<productsDTO> getAllProducts() {
        return productsRepository.findAllProductsActive();
    }

    // Listar con un filtro
    public List<productsDTO> getFilteredProducts(String filter) {
        return productsRepository.search(filter);
    }

    // Listar por ID
    public productsDTO getProductById(int id) {
        return productsRepository.findById(id).orElse(null); // Manejo de null si no se encuentra
    }

    public productsDTO saveProduct(productsDTO product) {
        return productsRepository.save(product);
    }

    public responseDTO deleteProduct(int id) {
        productsDTO product = getProductById(id);
        if (product != null) {
            product.setStatus(0); // Cambia el estado a 0 (inactivo)
            productsRepository.save(product); // Usa la instancia inyectada para guardar los cambios
            return new responseDTO("OK", "Producto eliminado correctamente");
        } else {
            return new responseDTO("ERROR", "Producto no encontrado");
        }
    }
}