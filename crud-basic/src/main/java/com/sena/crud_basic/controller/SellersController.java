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
import org.springframework.web.bind.annotation.PutMapping;
import java.util.List;

@RestController
@RequestMapping("/api/v1/sellers")
public class SellersController {

    @Autowired
    private SellersService sellersService;

    // Registrar un vendedor
    @PostMapping("/enviar/")
    public ResponseEntity<responseDTO> registerSeller(@RequestBody sellersDTO seller) {
        sellersService.saveSeller(seller);
        return new ResponseEntity<>(new responseDTO("OK", "Vendedor registrado correctamente"), HttpStatus.CREATED);
    }

    // Listar todos los valores activos
    @GetMapping("/obtener/")
    public ResponseEntity<List<sellersDTO>> getAllSellers() {
        List<sellersDTO> sellers = sellersService.getAllSellers();
        return new ResponseEntity<>(sellers, HttpStatus.OK);
    }

    // Listar con un filtro
    @GetMapping("/search/{filter}")
    public ResponseEntity<List<sellersDTO>> search(@PathVariable String filter) {
        List<sellersDTO> sellers = sellersService.getFilteredSellers(filter);
        return new ResponseEntity<>(sellers, HttpStatus.OK);
    }

    // Listar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getSellerById(@PathVariable int id) {
        sellersDTO seller = sellersService.getSellerById(id);
        if (seller != null) {
            return new ResponseEntity<>(seller, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new responseDTO("ERROR", "Vendedor no encontrado"), HttpStatus.NOT_FOUND);
        }
    }

    // Actualizar todos los datos excepto el ID
    @PutMapping("/update/{id}")
    public ResponseEntity<responseDTO> updateSeller(
            @PathVariable int id,
            @RequestBody sellersDTO updatedSeller) {
        responseDTO response = sellersService.updateSeller(id, updatedSeller);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Eliminar un vendedor físicamente por ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<responseDTO> deleteSellerById(@PathVariable int id) {
        responseDTO response = sellersService.deleteSellerById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Eliminar un vendedor lógicamente (cambiar estado a inactivo)
    @DeleteMapping("/{id}")
    public ResponseEntity<responseDTO> deleteSeller(@PathVariable int id) {
        responseDTO response = sellersService.deleteSeller(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}