package com.drivexport.backenddrivexport.service.impl;

import com.drivexport.backenddrivexport.exception.ResourceNotFoundException;
import com.drivexport.backenddrivexport.model.Product;
import com.drivexport.backenddrivexport.repository.ProductRepository;
import com.drivexport.backenddrivexport.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;


    public ProductServiceImpl(ProductRepository productRepository) {
        super();
        this.productRepository = productRepository;
    }


    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProductByUser(Integer id) {
        return productRepository.findByUserId(id);
    }

    @Override
    public Product getSingleProductByUserId(Integer userId, Integer productId) {
        Product existingProduct = productRepository.findById(productId).orElseThrow( () -> new ResourceNotFoundException("Product", "product", productId));

        if(!existingProduct.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("User", "product", userId);
        }
        return existingProduct;
    }

    @Override
    public Product updateProduct(Product product, Integer productId, Integer id) {
        Product existingProduct = productRepository.findById(productId).orElseThrow( () -> new ResourceNotFoundException("Product", "product", productId));

        if(!existingProduct.getUser().getId().equals(id)) {
            throw new ResourceNotFoundException("User", "product", id);
        }
        existingProduct.setProduct_name( product.getProduct_name());
        existingProduct.setProduct_qty(product.getProduct_qty());
        existingProduct.setProduct_price(product.getProduct_price());

        productRepository.save(existingProduct);
        return existingProduct;
    }

    @Override
    public void deleteProductByUserId(Integer userId, Integer producId) {
        Product existingProudct = productRepository.findById(producId).orElseThrow( ()-> new ResourceNotFoundException("Product", "id", producId));

        if(!existingProudct.getUser().getId().equals(userId)){
            throw new ResourceNotFoundException("user", "user", userId);
        }
        productRepository.deleteById(producId);
    }

//    @Override
//    public Product productInvoice(Integer userId, Integer productId) {
//        Optional<Product> productFound = Optional.ofNullable(productRepository.singleProductByUserIdAndProductId(userId, productId));
//        if(productFound.isPresent()){
//            return productFound.get();
//        }else {
//            throw new ResourceNotFoundException("Product", "productId", userId);
//        }
//    }

}
