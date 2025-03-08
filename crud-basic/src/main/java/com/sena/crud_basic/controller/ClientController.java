package com.sena.crud_basic.controller;

import com.sena.crud_basic.model.clientDTO;
import com.sena.crud_basic.service.ClientService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("api/v1/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @PostMapping("/")
    public String registerClient(@RequestBody clientDTO client) {
        clientService.saveClient(client);
        return "Client registered";
    }
}
