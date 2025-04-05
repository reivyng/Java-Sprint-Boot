package com.sena.crud_basic.controller;

import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.model.clientDTO;
import com.sena.crud_basic.service.ClientService;
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
@RequestMapping("/api/v1/clients")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @PostMapping("/enviar/")
    public String registerClient(@RequestBody clientDTO client) {
        clientService.saveClient(client);
        return "Client registered";
    }

    // Listar todos los valores activos
    @GetMapping("/obtener/")
    public List<clientDTO> getAllClients() {
        return clientService.getAllClients();
    }

    // Listar con un filtro
    @GetMapping("/search/{filter}")
    public ResponseEntity<Object> search(@PathVariable String filter) {
        var client = clientService.getFilteredClients(filter);
        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    // Listar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getClientById(@PathVariable int id) {
        var Client= clientService.getClientById(id);
        return new ResponseEntity<>(Client,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<responseDTO> deleteClient(@PathVariable int id) {
        responseDTO response = clientService.delete(id);
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
