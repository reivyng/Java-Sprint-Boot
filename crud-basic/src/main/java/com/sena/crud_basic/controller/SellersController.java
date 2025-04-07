package com.sena.crud_basic.controller;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.sellersDTO;
import com.sena.crud_basic.service.SellersService;
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
@RequestMapping("/api/v1/sellers")
public class SellersController {

    @Autowired
    private SellersService sellersService;

    @PostMapping("/enviar/")
    public String registerSeller(@RequestBody sellersDTO seller) {
        sellersService.saveSeller(seller);
        return "Seller registered";
    }

    // Listar todos los valores activos
    @GetMapping("/obtener/")
    public List<sellersDTO> getAllSellers() {
        return sellersService.getAllSellers();
    }

    // Listar con un filtro
    @GetMapping("/search/{filter}")
    public ResponseEntity<Object> search(@PathVariable String filter) {
        var sellers = sellersService.getFilteredSellers(filter);
        return new ResponseEntity<>(sellers, HttpStatus.OK);
    }

    // Listar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getSellerById(@PathVariable int id) {
        var seller = sellersService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<responseDTO> deleteSeller(@PathVariable int id) {
        responseDTO response = sellersService.deleteSeller(id);
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