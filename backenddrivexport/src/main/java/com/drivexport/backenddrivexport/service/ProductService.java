package com.drivexport.backenddrivexport.service;

import com.drivexport.backenddrivexport.model.Product;

import java.util.List;

public interface ProductService {

    //* Crearte a new product
    Product saveProduct(Product product);

    List<Product> getAllProductByUser(Integer id);

    Product getSingleProductByUserId( Integer userId, Integer productId);

    Product updateProduct(Product product, Integer productId, Integer id);

    void deleteProductByUserId(Integer userId, Integer producId);
}
