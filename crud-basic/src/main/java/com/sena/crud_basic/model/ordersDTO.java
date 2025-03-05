package com.sena.crud_basic.model;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity(name = "orders")
public class ordersDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int idOrders;

    @ManyToOne
    @JoinColumn(name = "idClient")
    private clientDTO client;

    @ManyToOne
    @JoinColumn(name = "idSeller")
    private sellersDTO seller;

    @Column(name = "date")
    private LocalDate dateOrder;

    // Getters and Setters

    public int getIdProduct() {
        return idOrders;
    }

    public void setIdProduct(int idProduct) {
        this.idOrders = idProduct;
    }

    public LocalDate getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(LocalDate dateOrder) {
        this.dateOrder = dateOrder;
    }

    public clientDTO getClient() {
        return client;
    }

}
