package com.sena.crud_basic.controller;

import com.sena.crud_basic.model.ordersDTO;
import com.sena.crud_basic.service.OrdersService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("api/v1/orders")
public class OrdersController {

    @Autowired
    private OrdersService ordersService;

    @PostMapping("/")
    public String registerOrder(@RequestBody ordersDTO order)
    {
        ordersService.saveOrder(order);
        return "Order registered";
    }

}
