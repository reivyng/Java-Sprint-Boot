package com.sena.crud_basic.controller;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.OrderProductDTO;
import com.sena.crud_basic.service.OrderProductService;
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
@RequestMapping("/api/v1/orderProducts")
public class OrderProductController {

    @Autowired
    private OrderProductService orderProductService;

    @PostMapping("/enviar/")
    public String registerOrderProduct(@RequestBody OrderProductDTO orderProduct) {
        orderProductService.saveOrderProduct(orderProduct);
        return "OrderProduct registered";
    }

    // Listar todos los valores
    @GetMapping("/obtener/")
    public List<OrderProductDTO> getAllOrderProducts() {
        return orderProductService.getAllOrderProducts();
    }

    // Listar con un filtro
    @GetMapping("/search/{filter}")
    public ResponseEntity<Object> search(@PathVariable String filter) {
        var orderProducts = orderProductService.getFilteredOrderProducts(filter);
        return new ResponseEntity<>(orderProducts, HttpStatus.OK);
    }

    // Listar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getOrderProductById(@PathVariable int id) {
        var orderProduct = orderProductService.getOrderProductById(id);
        return new ResponseEntity<>(orderProduct, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<responseDTO> deleteOrderProduct(@PathVariable int id) {
        responseDTO response = orderProductService.deleteOrderProduct(id);
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