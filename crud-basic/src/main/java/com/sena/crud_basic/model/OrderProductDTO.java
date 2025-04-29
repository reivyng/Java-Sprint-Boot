package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity(name = "order_products")
public class OrderProductDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int idOrderProduct;

    @NotNull(message = "La orden no puede ser nula")
    @ManyToOne
    @JoinColumn(name = "idOrders")
    private ordersDTO order;

    @NotNull(message = "El producto no puede ser nulo")
    @ManyToOne
    @JoinColumn(name = "idProduct")
    private productsDTO product;

    @NotNull(message = "El estado no puede ser nulo")
    @Column(name = "status")
    private Integer status;

    @NotNull(message = "La cantidad no puede ser nula")
    @Min(value = 1, message = "La cantidad debe ser al menos 1")
    @Column(name = "quantity", nullable = false)
    private int quantity;

    @NotNull(message = "El precio no puede ser nulo")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que 0")
    @Column(name = "price", nullable = false)
    private double price;

    @NotNull(message = "El total no puede ser nulo")
    @DecimalMin(value = "0.0", inclusive = false, message = "El total debe ser mayor que 0")
    @Column(name = "total", nullable = false)
    private double total;

    // Constructor vacío (necesario para JPA)
    public OrderProductDTO() {
    }

    // Constructor completo
    public OrderProductDTO(int idOrderProduct, ordersDTO order, productsDTO product, Integer status, int quantity,
            double price, double total) {
        this.idOrderProduct = idOrderProduct;
        this.order = order;
        this.product = product;
        this.status = status;
        this.quantity = quantity;
        this.price = price;
        this.total = total;
    }

    // Getters y setters
    public int getIdOrderProduct() {
        return idOrderProduct;
    }

    public void setIdOrderProduct(int idOrderProduct) {
        this.idOrderProduct = idOrderProduct;
    }

    public ordersDTO getOrder() {
        return order;
    }

    public void setOrder(ordersDTO order) {
        this.order = order;
    }

    public productsDTO getProduct() {
        return product;
    }

    public void setProduct(productsDTO product) {
        this.product = product;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}