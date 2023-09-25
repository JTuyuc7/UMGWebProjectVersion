package com.drivexport.backenddrivexport.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_code;

    @Column(name = "product_name", nullable = false)
    private String product_name;

    @Column(name = "product_qty", nullable = false)
    private int product_qty;

    @Column(name = "product_price", nullable = false)
    private float product_price;

    @ManyToOne
    @JoinColumn(name = "product_belongs_to", referencedColumnName = "id")
    private User user;

    @Column(name = "created_at", nullable = false, updatable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp // Automatically sets the creation timestamp
    private Date createdAt;
}
