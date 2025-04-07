package com.sena.crud_basic.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.sena.crud_basic.repository.IOrdersRepository;
import com.sena.crud_basic.model.ordersDTO;
import com.sena.crud_basic.DTO.responseDTO;
import java.util.List;

@Service
public class OrdersService {

    @Autowired
    private IOrdersRepository ordersRepository;

    // Listar todos los valores activos
    public List<ordersDTO> getAllOrders() {
        return ordersRepository.findAllOrdersActive();
    }

    // Listar con un filtro
    public List<ordersDTO> getFilteredOrders(String filter) {
        return ordersRepository.search(filter);
    }

    // Listar por ID
    public ordersDTO getOrderById(int id) {
        return ordersRepository.findById(id).orElse(null); // Manejo de null si no se encuentra
    }

    public ordersDTO saveOrder(ordersDTO order) {
        return ordersRepository.save(order);
    }

    public responseDTO deleteOrder(int id) {
        ordersDTO order = getOrderById(id);
        if (order != null) {
            order.setStatus(0); // Cambia el estado a 0 (inactivo)
            ordersRepository.save(order); // Usa la instancia inyectada para guardar los cambios
            return new responseDTO("OK", "Se eliminó correctamente");
        } else {
            return new responseDTO("ERROR", "Orden no encontrada");
        }
    }
}