package com.sena.crud_basic.controller;

import com.sena.crud_basic.model.productsDTO;
import com.sena.crud_basic.service.ProductService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("api/v1/products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @PostMapping("/products")
    public productsDTO registerProduct(@RequestBody productsDTO product)
    {
        return productService.saveProduct(product);
    }

}
