package com.drivexport.backenddrivexport.controller;

import com.drivexport.backenddrivexport.model.Product;
import com.drivexport.backenddrivexport.model.User;
import com.drivexport.backenddrivexport.service.ProductService;
import com.drivexport.backenddrivexport.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    public ProductController(ProductService productService, UserService userService) {
        super();
        this.productService = productService;
        this.userService = userService;
    }


    //* Create a new Product with user?
    @PostMapping
    public ResponseEntity<Product> newProductDb(@RequestBody Product product){
        User user = userService.getSingleUser(product.getUser().getId());
        if( user != null){
            product.setUser(user);
            Product savedProduct = productService.saveProduct(product);
            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
//        return new ResponseEntity<>(productService.saveProduct(product), HttpStatus.CREATED);
    }

    //* GetAllproductsByUser
    @GetMapping("/all/{id}")
    public ResponseEntity<List> getAllProductsByUserId(@PathVariable("id") Integer id){
        List<Product> productsByuser = productService.getAllProductByUser(id);

        if(!productsByuser.isEmpty()){
            return ResponseEntity.ok(productsByuser);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{userId}/{productId}")
    public ResponseEntity<Product> updateProductByuser(@PathVariable("userId") Integer userId, @PathVariable("productId") Integer productId, @RequestBody Product product){
        return new ResponseEntity<>(productService.updateProduct(product, productId, userId), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{userId}/{productId}")
    public ResponseEntity<String> deleteProductByUserId(@PathVariable("userId") Integer userId, @PathVariable("productId") Integer productId){
        productService.deleteProductByUserId(userId, productId);

        return new ResponseEntity<>("Product deleted correctly", HttpStatus.OK);
    }

    @GetMapping("/single/{userId}/{productId}")
    public ResponseEntity<Product> getSingleProductByUserId(@PathVariable("userId") Integer userId, @PathVariable("productId") Integer productId){
        return new ResponseEntity<>(productService.getSingleProductByUserId(userId, productId), HttpStatus.OK);
    }
}
