package com.sena.crud_basic.controller;

import com.sena.crud_basic.model.OrderProductDTO;
import com.sena.crud_basic.service.OrderProductService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("api/v1/orderProduct")
public class OrderProductController {

    @Autowired
    private OrderProductService OrderProductService;

    @PostMapping("/")
    public String registerOrderProduct(@RequestBody OrderProductDTO OrderProduct)
    {
        OrderProductService.saveOrderProduct(OrderProduct);
        return "OrderProduct registered";
    }

}