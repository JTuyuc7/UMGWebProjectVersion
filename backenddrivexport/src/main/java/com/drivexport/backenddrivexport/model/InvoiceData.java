package com.drivexport.backenddrivexport.model;

public class InvoiceData {

    private String full_name;
    private String phone_number;
    private String email_address;
    private String postal_code;

    private String address;

    private Integer proudctId;

    private Integer quantityToSell;

    public InvoiceData(String full_name, String phone_number, String email_address, String postal_code, String address, Integer proudctId, Integer quantityToSell) {
        this.full_name = full_name;
        this.phone_number = phone_number;
        this.email_address = email_address;
        this.postal_code = postal_code;
        this.address = address;
        this.proudctId = proudctId;
        this.quantityToSell = quantityToSell;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getFull_name() {
        return full_name;
    }

    public void setFull_name(String full_name) {
        this.full_name = full_name;
    }

    public String getEmail_address() {
        return email_address;
    }

    public void setEmail_address(String email_address) {
        this.email_address = email_address;
    }

    public String getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(String postal_code) {
        this.postal_code = postal_code;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getProudctId() {
        return proudctId;
    }

    public void setProudctId(Integer proudctId) {
        this.proudctId = proudctId;
    }

    public Integer getQuantityToSell() {
        return quantityToSell;
    }

    public void setQuantityToSell(Integer quantityToSell) {
        this.quantityToSell = quantityToSell;
    }
}
