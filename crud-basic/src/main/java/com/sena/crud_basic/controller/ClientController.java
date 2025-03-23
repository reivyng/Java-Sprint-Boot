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
import org.springframework.web.bind.annotation.RequestParam;
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
    @GetMapping("/")
    public List<clientDTO> getAllClients() {
        return clientService.getAllClients();
    }

    // Listar con un filtro
    @GetMapping("/search")
    public List<clientDTO> getFilteredClients(@RequestParam String filter) {
        return clientService.getFilteredClients(filter);
    }

    // Listar por ID
    @GetMapping("/{id}")
    public clientDTO getClientById(@PathVariable int id) {
        return clientService.getClientById(id);
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
