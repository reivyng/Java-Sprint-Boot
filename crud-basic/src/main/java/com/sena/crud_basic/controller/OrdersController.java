package com.sena.crud_basic.controller;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.ordersDTO;
import com.sena.crud_basic.service.OrdersService;
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
@RequestMapping("/api/v1/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/enviar/")
    public String registerOrder(@RequestBody ordersDTO order) {
        ordersService.saveOrder(order);
        return "Order registered";
    }

    // Listar todos los valores activos
    @GetMapping("/obtener/")
    public List<ordersDTO> getAllOrders() {
        return ordersService.getAllOrders();
    }

    // Listar con un filtro
    @GetMapping("/search/{filter}")
    public ResponseEntity<Object> search(@PathVariable String filter) {
        var orders = ordersService.getFilteredOrders(filter);
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    // Listar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getOrderById(@PathVariable int id) {
        var order = ordersService.getOrderById(id);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<responseDTO> deleteOrder(@PathVariable int id) {
        responseDTO response = ordersService.deleteOrder(id);
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