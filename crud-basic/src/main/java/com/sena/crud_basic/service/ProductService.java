package com.sena.crud_basic.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.sena.crud_basic.repository.IProductsRepository;
import com.sena.crud_basic.model.productsDTO;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private IProductsRepository productsRepository;

    public List<productsDTO> listProducts() {
        return productsRepository.findAll();
    }

    public productsDTO saveProduct(productsDTO product) {
        return productsRepository.save(product);
    }

}
