package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity(name = "products")
public class productsDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int idProduct;

    @NotBlank(message = "El nombre del producto no puede estar vacío")
    @Size(max = 50, message = "El nombre del producto no puede exceder los 50 caracteres")
    @Column(name = "name", nullable = false, length = 50)
    private String nameProduct;

    @NotNull(message = "El precio del producto no puede ser nulo")
    @DecimalMin(value = "0.0", inclusive = false, message = "El precio del producto debe ser mayor que 0")
    @Column(name = "price")
    private double priceProduct;

    @NotNull(message = "El estado no puede ser nulo")
    @Column(name = "status")
    private Integer status;

    // Constructor vacío (necesario para JPA)
    public productsDTO() {
    }

    // Constructor completo
    public productsDTO(int idProduct, String nameProduct, double priceProduct, Integer status) {
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.priceProduct = priceProduct;
        this.status = status;
    }

    // Getters y setters
    public int getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(int idProduct) {
        this.idProduct = idProduct;
    }

    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    public double getPriceProduct() {
        return priceProduct;
    }

    public void setPriceProduct(double priceProduct) {
        this.priceProduct = priceProduct;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}