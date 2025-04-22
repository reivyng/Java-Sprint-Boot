package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "sellers")
public class sellersDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int idSeller;

    @Column(name = "name", nullable = false, length = 100)
    private String nameSeller;

    @Column(name = "status")
    private int status;

    // Constructor vacío (necesario para JPA)
    public sellersDTO() {
    }

    // Constructor completo
    public sellersDTO(int idSeller, String nameSeller, int status) {
        this.idSeller = idSeller;
        this.nameSeller = nameSeller;
        this.status = status;
    }

    // Getters y setters
    public int getIdSeller() {
        return idSeller;
    }

    public void setIdSeller(int idSeller) {
        this.idSeller = idSeller;
    }

    public String getNameSeller() {
        return nameSeller;
    }

    public void setNameSeller(String nameSeller) {
        this.nameSeller = nameSeller;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}