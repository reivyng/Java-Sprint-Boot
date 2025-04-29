package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity(name = "sellers")
public class sellersDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int idSeller;

    @NotBlank(message = "El nombre del vendedor no puede estar vacío")
    @Size(max = 100, message = "El nombre del vendedor no puede exceder los 100 caracteres")
    @Column(name = "name", nullable = false, length = 100)
    private String nameSeller;

    @NotNull(message = "El estado no puede ser nulo")
    @Column(name = "status")
    private Integer status;

    // Constructor vacío (necesario para JPA)
    public sellersDTO() {
    }

    // Constructor completo
    public sellersDTO(int idSeller, String nameSeller, Integer status) {
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}