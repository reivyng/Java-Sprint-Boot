package com.sena.crud_basic.service;

import com.sena.crud_basic.model.OrderProductDTO;
import com.sena.crud_basic.repository.IOrderProductRepositoy;
import com.sena.crud_basic.DTO.responseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrderProductService {

    @Autowired
    private IOrderProductRepositoy orderProductRepositoy;

    // Listar todos los valores
    public List<OrderProductDTO> getAllOrderProducts() {
        return orderProductRepositoy.findAll();
    }

    // Listar con un filtro
    public List<OrderProductDTO> getFilteredOrderProducts(String filter) {
        return orderProductRepositoy.search(filter);
    }

    // Listar por ID
    public OrderProductDTO getOrderProductById(int id) {
        return orderProductRepositoy.findById(id).orElse(null); // Manejo de null si no se encuentra
    }

    public OrderProductDTO saveOrderProduct(OrderProductDTO orderProduct) {
        return orderProductRepositoy.save(orderProduct);
    }

    public responseDTO deleteOrderProduct(int id) {
        OrderProductDTO orderProduct = getOrderProductById(id);
        if (orderProduct != null) {
            orderProduct.setStatus(0); // Cambia el estado a 0 (inactivo)
            orderProductRepositoy.save(orderProduct); // Usa la instancia inyectada para guardar los cambios
            return new responseDTO("OK", "Producto de la orden eliminado correctamente");
        } else {
            return new responseDTO("ERROR", "Producto de la orden no encontrado");
        }
    }
}