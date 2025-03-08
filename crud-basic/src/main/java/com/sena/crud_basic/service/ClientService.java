package com.sena.crud_basic.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.sena.crud_basic.repository.IClientRepository;
import com.sena.crud_basic.model.clientDTO;
import java.util.List;

@Service
public class ClientService {

    @Autowired
    private IClientRepository clientRepository;

    public List<clientDTO> listClients() {
        return clientRepository.findAll();
    }

    public clientDTO saveClient(clientDTO client) {
        return clientRepository.save(client);
    }

    
}
