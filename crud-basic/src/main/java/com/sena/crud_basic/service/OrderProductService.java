package com.sena.crud_basic.service;

import com.sena.crud_basic.model.OrderProductDTO;
import com.sena.crud_basic.repository.IOrderProductRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderProductService {

    @Autowired
    private IOrderProductRepositoy orderProductRepositoy;

    public List<OrderProductDTO> listOrderProducts() {
        return orderProductRepositoy.findAll();
    }

    public OrderProductDTO saveOrderProduct(OrderProductDTO orderProduct) {
        return orderProductRepositoy.save(orderProduct);
    }

}
