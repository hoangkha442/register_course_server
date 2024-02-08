/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(100) NOT NULL,
  `contact_name` varchar(100) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `industry_type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `quantity_change` int NOT NULL,
  `reason_for_change` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order_details` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `company_id` int DEFAULT NULL,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','shipped','delivered') NOT NULL,
  `total_amount` int NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `payment_details` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `payment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int NOT NULL,
  `payment_method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `payment_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payment_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `product_categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `product_picture` varchar(100) DEFAULT NULL,
  `description` text,
  `price` int NOT NULL,
  `quantity_in_stock` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `supplier_id` int DEFAULT NULL,
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `hinh_anh` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`) ON DELETE SET NULL,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `review_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `product_id` (`product_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `shipping_details` (
  `shipping_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `estimated_delivery_date` datetime DEFAULT NULL,
  `actual_delivery_date` datetime DEFAULT NULL,
  PRIMARY KEY (`shipping_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `shipping_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(100) NOT NULL,
  `contact_name` varchar(100) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` enum('admin','customer') NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_date` datetime DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `is_visible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `companies` (`company_id`, `company_name`, `contact_name`, `contact_email`, `address`, `phone`, `industry_type`) VALUES
(1, 'Công Ty Y Tế A', 'Nguyễn Văn A', 'contacta@example.com', '123 Đường ABC, TP.HCM', '0123456789', 'Bệnh Viện');
INSERT INTO `companies` (`company_id`, `company_name`, `contact_name`, `contact_email`, `address`, `phone`, `industry_type`) VALUES
(2, 'Công Ty Y Tế B', 'Trần Thị B', 'contactb@example.com', '456 Đường XYZ, Hà Nội', '0987654321', 'Phòng Mạch');


INSERT INTO `inventory` (`inventory_id`, `product_id`, `date_modified`, `quantity_change`, `reason_for_change`) VALUES
(1, 1, '2024-01-02 11:36:56', -1, 'Bán hàng');
INSERT INTO `inventory` (`inventory_id`, `product_id`, `date_modified`, `quantity_change`, `reason_for_change`) VALUES
(2, 2, '2024-01-02 11:36:56', -2, 'Bán hàng');
INSERT INTO `inventory` (`inventory_id`, `product_id`, `date_modified`, `quantity_change`, `reason_for_change`) VALUES
(3, 2, '2024-01-18 10:25:25', 1, 'bị hỏng');

INSERT INTO `order_details` (`order_detail_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 1, 100000);
INSERT INTO `order_details` (`order_detail_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(2, 2, 2, 2, 500);
INSERT INTO `order_details` (`order_detail_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(3, 6, 3, 2, 1231231);
INSERT INTO `order_details` (`order_detail_id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(4, 7, 3, 2, 1231231),
(5, 8, 3, 2, 1231231),
(8, 11, 1, 2, 25),
(16, 20, 2, 0, 0);

INSERT INTO `orders` (`order_id`, `user_id`, `company_id`, `order_date`, `status`, `total_amount`) VALUES
(1, 2, NULL, '2024-01-02 11:36:43', 'pending', 105000);
INSERT INTO `orders` (`order_id`, `user_id`, `company_id`, `order_date`, `status`, `total_amount`) VALUES
(2, 1, 1, '2024-01-02 11:36:43', 'shipped', 200000);
INSERT INTO `orders` (`order_id`, `user_id`, `company_id`, `order_date`, `status`, `total_amount`) VALUES
(3, 1, 1, '2024-01-02 11:36:43', 'shipped', 200000);
INSERT INTO `orders` (`order_id`, `user_id`, `company_id`, `order_date`, `status`, `total_amount`) VALUES
(4, 2, NULL, '2024-01-02 11:36:43', 'pending', 105000),
(6, 1, 1, '2024-01-17 07:50:13', 'pending', 2),
(7, 1, NULL, '2024-01-17 07:50:58', 'pending', 2),
(8, 1, NULL, '2024-01-17 07:57:41', 'pending', 2),
(11, 1, 1, '2024-01-01 00:00:00', 'pending', 3),
(20, 1, 1, '2024-01-01 00:00:00', 'pending', 0);

INSERT INTO `payment_details` (`payment_id`, `order_id`, `payment_date`, `amount`, `payment_method`, `payment_status`) VALUES
(1, 1, '2024-01-02 11:37:23', 105000, 'Thanh toán qua ngân hàng', 'completed');
INSERT INTO `payment_details` (`payment_id`, `order_id`, `payment_date`, `amount`, `payment_method`, `payment_status`) VALUES
(2, 20, '2024-01-01 00:00:00', 0, 'Thanh toán qua ngân hàng!', 'string');


INSERT INTO `product_categories` (`category_id`, `category_name`, `description`) VALUES
(1, 'Thiết Bị Điều Trị', 'Thiết bị sử dụng trong điều trị bệnh');
INSERT INTO `product_categories` (`category_id`, `category_name`, `description`) VALUES
(2, 'Vật Tư Y Tế', 'Vật tư tiêu hao trong y tế');


INSERT INTO `products` (`product_id`, `product_name`, `product_picture`, `description`, `price`, `quantity_in_stock`, `category_id`, `supplier_id`, `is_visible`, `hinh_anh`) VALUES
(1, 'Máy X-Quang', '1704966947382_hinh1.jpg', 'Máy X-Quang hiện đại dùng trong chẩn đoán hình ảnh', 100000, 5, 1, 1, 1, NULL);
INSERT INTO `products` (`product_id`, `product_name`, `product_picture`, `description`, `price`, `quantity_in_stock`, `category_id`, `supplier_id`, `is_visible`, `hinh_anh`) VALUES
(2, 'Găng Tay Y Tế', 'abc.png', 'Găng tay y tế dùng một lần, kích cỡ vừa', 500, 200, 2, 1, 0, NULL);
INSERT INTO `products` (`product_id`, `product_name`, `product_picture`, `description`, `price`, `quantity_in_stock`, `category_id`, `supplier_id`, `is_visible`, `hinh_anh`) VALUES
(3, 'Găng Tay Y Tế2', 'abc.png', 'Găng tay y tế dùng một lần, kích cỡ vừaaaaaaaaaa', 100000, 5, 2, 1, 1, NULL);
INSERT INTO `products` (`product_id`, `product_name`, `product_picture`, `description`, `price`, `quantity_in_stock`, `category_id`, `supplier_id`, `is_visible`, `hinh_anh`) VALUES
(4, 'test function create', 'abc.png', '123123123', 12314, 123123, 2, 1, 1, NULL),
(5, 'test function create', 'abc.png', 'décription', 12314, 123123, 2, 1, 0, NULL),
(15, 'test function create', '1704965798515_hinh1.jpg', '123123', 123123, 2, 1, 1, 1, NULL),
(16, 'test function create', '1705637656033_hinh1.jpg', '123123', 123123, 2, 1, 1, 1, NULL);

INSERT INTO `reviews` (`review_id`, `product_id`, `user_id`, `rating`, `comment`, `review_date`) VALUES
(3, 1, 1, 5, 'Sản phẩm tuyệt vời', '2024-01-18 09:35:22');


INSERT INTO `shipping_details` (`shipping_id`, `order_id`, `shipping_address`, `estimated_delivery_date`, `actual_delivery_date`) VALUES
(1, 1, '123 Đường ABC, TP.HCM', '2023-01-15 00:00:00', NULL);
INSERT INTO `shipping_details` (`shipping_id`, `order_id`, `shipping_address`, `estimated_delivery_date`, `actual_delivery_date`) VALUES
(3, 11, 'string', '2024-01-01 00:00:00', '2024-01-02 00:00:00');
INSERT INTO `shipping_details` (`shipping_id`, `order_id`, `shipping_address`, `estimated_delivery_date`, `actual_delivery_date`) VALUES
(4, 20, 'string', '2024-01-01 00:00:00', '2024-01-02 00:00:00');

INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `contact_name`, `contact_email`, `address`, `phone`) VALUES
(1, 'Nhà Cung Cấp X', 'Nguyễn Văn X', 'supplierx@example.com', '789 Đường KLM, Đà Nẵng', '0123465789');
INSERT INTO `suppliers` (`supplier_id`, `supplier_name`, `contact_name`, `contact_email`, `address`, `phone`) VALUES
(3, 'nhà cung cấp 2', 'nhà cung cấp 1', 'nhacungcap1@gmail.com', 'HCM', '09312663162');


INSERT INTO `users` (`user_id`, `password`, `full_name`, `email`, `phone`, `role`, `creation_date`, `last_login_date`, `avatar`, `is_visible`) VALUES
(1, '$2b$10$DkjhszKPFrDTYnHCRDF8HeOVpC72kYAT69LQg33zAZbSlNaILlYjO', 'Quản Trị Viên A', 'admin@example.com', '0123456789', 'admin', '2024-01-02 11:36:18', NULL, '1704442911464_hinh1.jpg', 1);
INSERT INTO `users` (`user_id`, `password`, `full_name`, `email`, `phone`, `role`, `creation_date`, `last_login_date`, `avatar`, `is_visible`) VALUES
(2, '$2b$10$DkjhszKPFrDTYnHCRDF8HeOVpC72kYAT69LQg33zAZbSlNaILlYjO', 'Khách Hàng B', 'customer1@example.com', '0987654321', 'customer', '2024-01-02 11:36:18', NULL, NULL, 1);
INSERT INTO `users` (`user_id`, `password`, `full_name`, `email`, `phone`, `role`, `creation_date`, `last_login_date`, `avatar`, `is_visible`) VALUES
(5, '$2b$10$/AXfsjNtAgTxIuVuAd1DZu0A/PlgNB0XKtKpIrQ9lp3zcnYVPo9SS', 'string', 'string', 'string', 'admin', '2024-01-05 02:50:08', NULL, NULL, 1);
INSERT INTO `users` (`user_id`, `password`, `full_name`, `email`, `phone`, `role`, `creation_date`, `last_login_date`, `avatar`, `is_visible`) VALUES
(6, '$2b$10$mG9FGqI2LCwL5a1Y3wqDxeY00miL1wLO4OrcRLYDIu4Mhg/HLX3Qa', 'Minh Duy', 'minhduy@gmail.com', '0988712123', 'admin', '2024-01-05 08:35:03', NULL, NULL, 1),
(7, '$2b$10$wTew.uAUDmVJhsCMaIzpmugXWTwPpK8pVwac.ZOkSQdkPlyvyGKOq', 'Hoàng Kha', 'hoang@gmail.com.com', '098721721', 'customer', '2024-01-06 09:24:11', NULL, NULL, 1),
(8, '$2b$10$6tal9tVUj/3U71v8g52eYeJNUk/XlxF.ebDg0IpsQ5.oq4wj4HMbS', 'Hoà', 'hoa@gmail.com.com', '098721721', 'customer', '2024-01-06 09:24:22', NULL, NULL, 1),
(9, '$2b$10$Z4VL.TRlG.jsm7tOEAcJ6uyM7PunrVAzohtbYjcMCzoAMKMI0Dc3S', 'Hoàng', 'hoang@gmail.com', '098721721', 'customer', '2024-01-06 09:25:33', NULL, NULL, 1),
(10, '$2b$10$B8gMXA0F4hKIoloKtAnU2uJ.f1FZeJR/p9bpC8CVnLWAonp/LBSI.', 'Lâm', 'lam@gmail.com', '098721721', 'customer', '2024-01-06 09:25:40', NULL, NULL, 1),
(11, '$2b$10$OLDK2B3o0R5eOh63eiZQRejAHrWvJmgicnppQV8aHCCqs0CPRhMj2', 'John Doe', 'user@example.com', '+1234567890', 'admin', '2024-01-06 09:25:50', '2024-01-20 15:30:00', NULL, 1),
(13, '$2b$10$AtDFoyaFVbun8FCLy1xFReTBTzHgRjoySrsCFaFo57qxViyzZr9ui', 'Khánh', 'Khanhh@gmail.com', '098721721', 'customer', '2024-01-06 09:26:23', NULL, NULL, 1),
(14, '$2b$10$5pzwYmg3HRFiuFBtGljKqe4V3mfgpGTpP1CLJTAt1POYblf/bjgMS', 'Minh Duy', 'minhthu@gmail.com', '0988712123', 'customer', '2024-01-19 05:57:48', NULL, NULL, 1),
(15, '$2b$10$mout4HcJ4JFPLPOHYg3/Kukx4og31.Y3unCvT9eAZrShpVekk2ctO', 'John Doe', 'example@gmail.com', '123456789', 'admin', '2024-01-20 02:30:49', '2022-01-20 12:00:00', NULL, 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;