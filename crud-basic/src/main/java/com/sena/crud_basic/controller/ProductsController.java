package com.sena.crud_basic.controller;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.productsDTO;
import com.sena.crud_basic.service.ProductService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductsController {

    @Autowired
    private ProductService productService;

    @PostMapping("/enviar/")
    public String registerProduct(@RequestBody productsDTO product) {
        productService.saveProduct(product);
        return "Product registered";
    }

    // Listar todos los valores activos
    @GetMapping("/obtener/")
    public List<productsDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    // Listar con un filtro
    @GetMapping("/search/{filter}")
    public ResponseEntity<Object> search(@PathVariable String filter) {
        var products = productService.getFilteredProducts(filter);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Listar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getProductById(@PathVariable int id) {
        var product = productService.getProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<responseDTO> deleteProduct(@PathVariable int id) {
        responseDTO response = productService.deleteProduct(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
     * GET: consultar
     * POST: crear registros
     * PUT: actualizar todo
     * DELETE: eliminar
     * PATCH: actualizar parcial
     */
}