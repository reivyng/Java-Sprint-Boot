package com.sena.crud_basic.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.sena.crud_basic.repository.IOrdersRepository;
import com.sena.crud_basic.model.ordersDTO;
import java.util.List;

@Service
public class OrdersService {

    @Autowired
    private IOrdersRepository ordersRepository;

    public List<ordersDTO> listOrders() {
        return ordersRepository.findAll();
    }

    public ordersDTO saveOrder(ordersDTO order) {
        return ordersRepository.save(order);
    }

}