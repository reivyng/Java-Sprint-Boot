package com.sena.crud_basic.controller;

import com.sena.crud_basic.model.sellersDTO;
import com.sena.crud_basic.service.SellersService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("api/v1/sellers")
public class SellersController {
    @Autowired
    private SellersService sellersService;

    @PostMapping("/")
    public String registerSellers(@RequestBody sellersDTO sellers)
    {
        sellersService.saveSellers(sellers);
        return "Sellers registered";
    }

}
