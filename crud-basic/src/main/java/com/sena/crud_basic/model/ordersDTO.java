package com.sena.crud_basic.model;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

@Entity(name = "orders")
public class ordersDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int idOrders;

    @NotNull(message = "El cliente no puede ser nulo")
    @ManyToOne
    @JoinColumn(name = "idClient")
    private clientDTO client;

    @NotNull(message = "El vendedor no puede ser nulo")
    @ManyToOne
    @JoinColumn(name = "idSeller")
    private sellersDTO seller;

    @NotNull(message = "La fecha de la orden no puede ser nula")
    @PastOrPresent(message = "La fecha de la orden no puede ser futura")
    @Column(name = "date")
    private LocalDate dateOrder;

    @NotNull(message = "El estado no puede ser nulo")
    @Column(name = "status")
    private Integer status;

    // Constructor vacío (necesario para JPA)
    public ordersDTO() {
    }

    // Constructor completo
    public ordersDTO(int idOrders, clientDTO client, sellersDTO seller, LocalDate dateOrder, Integer status) {
        this.idOrders = idOrders;
        this.client = client;
        this.seller = seller;
        this.dateOrder = dateOrder;
        this.status = status;
    }

    // Getters y setters
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDate getDateOrder() {
        return dateOrder;
    }

    public void setDateOrder(LocalDate dateOrder) {
        this.dateOrder = dateOrder;
    }
}