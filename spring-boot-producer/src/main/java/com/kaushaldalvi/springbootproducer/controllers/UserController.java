package com.kaushaldalvi.springbootproducer.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/users")
public class UserController {
    public static class User {
        private final int id;
        private final String name;
        private final String email;

        public User(int id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
        }

        public int getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        // In a real application, this would query the database.
        return new User(id, "John Doe", "johndoe@example.com");
    }

    @GetMapping(value = "/{id}/orders", produces = "application/json")
    public OrderDetails getOrderDetailsByUserId(@PathVariable int id) {
        return new OrderDetails(
            id, 
            "John Doe", 
            "johndoe@example.com", 
            List.of(
                new Order(101, "2023-10-10", 150.5, List.of(
                    new Item("A1", "Product A", 2, 50.25),
                    new Item("B2", "Product B", 1, 50.0)
                ))
            )
        );
    }

    public static class OrderDetails {
        private int userId;
        private String name;
        private String email;
        private List<Order> orders;

        public OrderDetails(int userId, String name, String email, List<Order> orders) {
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.orders = orders;
        }

        public int getUserId() { return userId; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public List<Order> getOrders() { return orders; }
    }

    public static class Order {
        private int orderId;
        private String date;
        private double total;
        private List<Item> items;

        public Order(int orderId, String date, double total, List<Item> items) {
            this.orderId = orderId;
            this.date = date;
            this.total = total;
            this.items = items;
        }

        public int getOrderId() { return orderId; }
        public String getDate() { return date; }
        public double getTotal() { return total; }
        public List<Item> getItems() { return items; }
    }

    public static class Item {
        private String productId;
        private String name;
        private int quantity;
        private double price;

        public Item(String productId, String name, int quantity, double price) {
            this.productId = productId;
            this.name = name;
            this.quantity = quantity;
            this.price = price;
        }

        public String getProductId() { return productId; }
        public String getName() { return name; }
        public int getQuantity() { return quantity; }
        public double getPrice() { return price; }
    }
}
