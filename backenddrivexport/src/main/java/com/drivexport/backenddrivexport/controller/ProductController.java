package com.drivexport.backenddrivexport.controller;
import com.drivexport.backenddrivexport.model.InvoiceData;
import com.drivexport.backenddrivexport.model.Product;
import com.drivexport.backenddrivexport.model.User;
import com.drivexport.backenddrivexport.service.ProductService;
import com.drivexport.backenddrivexport.service.UserService;
import com.drivexport.backenddrivexport.utils.InvoicePdfReport;
import com.drivexport.backenddrivexport.utils.NameGenerator;
import com.drivexport.backenddrivexport.utils.PdfReport;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;
    private final UserService userService;

    float IVA_price = 0.12f;

    String desktopPath = System.getProperty("user.home") + File.separator +"Desktop";

    PdfReport pdfReport = new PdfReport();
    InvoicePdfReport invoicePdfReport = new InvoicePdfReport();

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

    //*Generate report of products by user
    @GetMapping("/report/{id}")
    public ResponseEntity<String> generateReportByUser(@PathVariable("id") Integer userId) {
        User userData = userService.getSingleUser(userId);
        NameGenerator nameGenerator = new NameGenerator();

        List<Product> productsByuser = productService.getAllProductByUser(userId);

        if(productsByuser.isEmpty()){
            return new ResponseEntity<>("User does not have any products yet", HttpStatus.BAD_REQUEST);
        }

        try {
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream(nameGenerator.generatePathToSaveInfo("Inventario", desktopPath)));


            document.open();
            pdfReport.addTitlePage( document, userData.getUser_name() + " "+ userData.getLast_name(), userData.getIsSuperAdmin());

            pdfReport.createContentTable(document, productsByuser);
            document.close();

            return new ResponseEntity<>("Generated", HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>("Unable to create the report", HttpStatus.INTERNAL_SERVER_ERROR);
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

    @PostMapping("/invoice/{userId}")
    public ResponseEntity<String> createInvoice(@PathVariable("userId") Integer userId, @RequestBody InvoiceData invoiceDataBody){
        NameGenerator nameGenerator = new NameGenerator();

        Integer proudctId = invoiceDataBody.getProudctId();
        String customer_full_name = invoiceDataBody.getFull_name();
        String phone_number = invoiceDataBody.getPhone_number();
        String email_address = invoiceDataBody.getEmail_address();
        String address = invoiceDataBody.getAddress();
        String postal_code = invoiceDataBody.getPostal_code();
        Integer amount_to_sell = invoiceDataBody.getQuantityToSell();

        Product productFound = productService.getSingleProductByUserId(userId, proudctId);
        System.out.println(proudctId + customer_full_name+ phone_number+ email_address+address+postal_code+amount_to_sell);
        float total_sell_price_with_no_iva = 0f, iva_price = 0f, price_with_iva = 0f;
        total_sell_price_with_no_iva = amount_to_sell * productFound.getProduct_price();
        iva_price = IVA_price * total_sell_price_with_no_iva;
        price_with_iva = iva_price + total_sell_price_with_no_iva;

        try {
            Document document = invoicePdfReport.generateSingleInvoice(nameGenerator.generatePathToSaveInfo("Invoice", desktopPath));
            invoicePdfReport.createHeader(document);
            invoicePdfReport.billingCustomerInfo(document, customer_full_name, phone_number, email_address, address, postal_code);
            invoicePdfReport.productInfoTable(document, productFound.getProduct_name(), amount_to_sell, total_sell_price_with_no_iva, IVA_price, iva_price );
            invoicePdfReport.tableTotalProduct(document, price_with_iva);
            invoicePdfReport.footerContent(document);
            document.newPage();
            document.close();
            return new ResponseEntity<>("Invoice created", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Unable to create the invoice", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

