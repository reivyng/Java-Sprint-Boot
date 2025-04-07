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

    @Column(name = "status")
    private int status;

    public ordersDTO(int idOrders, clientDTO client, sellersDTO seller, LocalDate dateOrder, int status) {
        this.idOrders = idOrders;
        this.client = client;
        this.seller = seller;
        this.dateOrder = dateOrder;
        this.status = status;
    }

    public int getIdOrders() {
        return idOrders;
    }

    public void setIdOrders(int idOrders) {
        this.idOrders = idOrders;
    }

    public clientDTO getClient() {
        return client;
    }

    public void setClient(clientDTO client) {
        this.client = client;
    }

    public sellersDTO getSeller() {
        return seller;
    }

    public void setSeller(sellersDTO seller) {
        this.seller = seller;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalDate getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(LocalDate dateOrder) {
        this.dateOrder = dateOrder;
    }

}
