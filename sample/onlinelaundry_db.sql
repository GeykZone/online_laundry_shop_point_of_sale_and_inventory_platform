-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2024 at 04:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `onlinelaundry_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

CREATE TABLE `discount` (
  `discount_id` bigint(20) NOT NULL,
  `discount_name` char(50) NOT NULL,
  `discount_percent` char(10) NOT NULL,
  `discount_description` char(255) NOT NULL,
  `discount_status` char(50) DEFAULT 'Active',
  `shop_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `discounted_transactions`
--

CREATE TABLE `discounted_transactions` (
  `discounted_transaction_id` bigint(20) NOT NULL,
  `transaction_id` bigint(20) NOT NULL,
  `discount_id` bigint(20) NOT NULL,
  `discounted_transaction_status` char(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hashing_settings`
--

CREATE TABLE `hashing_settings` (
  `secret_key` char(50) NOT NULL,
  `secret_iv` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hashing_settings`
--

INSERT INTO `hashing_settings` (`secret_key`, `secret_iv`) VALUES
('jnfkjsnfknszfnkjscfsgrggmerm', 'mfweje8483f9jrfjfsijfisfs');

-- --------------------------------------------------------

--
-- Table structure for table `laundry_shop_requirements`
--

CREATE TABLE `laundry_shop_requirements` (
  `laundry_shop_requirements_id` bigint(20) NOT NULL,
  `requirement_name` char(50) NOT NULL,
  `upload_photo` char(5) NOT NULL,
  `field_data_type` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry_shop_requirements`
--

INSERT INTO `laundry_shop_requirements` (`laundry_shop_requirements_id`, `requirement_name`, `upload_photo`, `field_data_type`) VALUES
(15, 'Owner\'s Valid Id', 'True', 'Text');

-- --------------------------------------------------------

--
-- Table structure for table `laundry_shop_staff`
--

CREATE TABLE `laundry_shop_staff` (
  `laundry_shop_staff_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `shop_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_token`
--

CREATE TABLE `login_token` (
  `login_token_id` bigint(20) NOT NULL,
  `token` char(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `expiration_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `order_products_id` bigint(20) NOT NULL,
  `order_name` char(55) NOT NULL,
  `transaction_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `order_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `item_quantity` bigint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` bigint(20) NOT NULL,
  `product_name` char(50) NOT NULL,
  `price` float NOT NULL,
  `quantity` bigint(10) NOT NULL,
  `image_link` char(255) NOT NULL,
  `product_brand` char(50) NOT NULL,
  `shop_id` bigint(20) NOT NULL,
  `product_status` char(50) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` bigint(20) NOT NULL,
  `service_name` char(50) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `shop_id` bigint(20) NOT NULL,
  `service_status` char(50) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `shop_id` bigint(20) NOT NULL,
  `shop_name` char(50) NOT NULL,
  `shop_address` char(50) NOT NULL,
  `contact_number` char(50) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `requirement_status` char(50) NOT NULL DEFAULT 'Pending',
  `days_open` char(255) NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL,
  `additional_schedule_details` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop_logo`
--

CREATE TABLE `shop_logo` (
  `shop_logo_id` bigint(20) NOT NULL,
  `shop_id` bigint(20) NOT NULL,
  `image_link` longtext NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shop_rating`
--

CREATE TABLE `shop_rating` (
  `shop_rating_id` bigint(20) NOT NULL,
  `shop_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `rate` decimal(10,0) NOT NULL DEFAULT 0,
  `comment` char(255) NOT NULL,
  `rating_created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submitted_requirements`
--

CREATE TABLE `submitted_requirements` (
  `submitted_requirements_id` bigint(20) NOT NULL,
  `laundry_shop_requirements_id` bigint(20) NOT NULL,
  `details` longtext NOT NULL,
  `image_link` longtext NOT NULL,
  `shop_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` bigint(20) NOT NULL,
  `shop_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `transaction_name` char(55) NOT NULL,
  `transaction_date` datetime NOT NULL,
  `pick_up_date` datetime NOT NULL,
  `total` float NOT NULL,
  `transaction_status` char(55) NOT NULL,
  `clothes_weight` decimal(10,0) NOT NULL,
  `service_id` bigint(20) NOT NULL,
  `initial` float NOT NULL,
  `transaction_changes_other_details` char(255) NOT NULL,
  `notification_is_read` char(5) NOT NULL DEFAULT 'False',
  `last_update_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `first_name` char(50) NOT NULL,
  `last_name` char(50) NOT NULL,
  `username` char(50) NOT NULL,
  `password` char(100) NOT NULL,
  `email` char(100) NOT NULL,
  `phone_number` char(20) NOT NULL,
  `address` char(255) NOT NULL,
  `position` char(50) NOT NULL,
  `user_activation_status` char(50) NOT NULL DEFAULT 'Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `username`, `password`, `email`, `phone_number`, `address`, `position`, `user_activation_status`) VALUES
(0, 'Admin_First_Name', 'Admin_Last_Name', 'Admin', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'test_admin@gmail.com', '09123456789', 'Test Address', 'Admin', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `discount`
--
ALTER TABLE `discount`
  ADD PRIMARY KEY (`discount_id`),
  ADD UNIQUE KEY `discount_name` (`discount_name`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `discounted_transactions`
--
ALTER TABLE `discounted_transactions`
  ADD PRIMARY KEY (`discounted_transaction_id`),
  ADD KEY `transaction_id` (`transaction_id`),
  ADD KEY `discount_id` (`discount_id`);

--
-- Indexes for table `laundry_shop_requirements`
--
ALTER TABLE `laundry_shop_requirements`
  ADD PRIMARY KEY (`laundry_shop_requirements_id`),
  ADD UNIQUE KEY `requirement_name` (`requirement_name`);

--
-- Indexes for table `laundry_shop_staff`
--
ALTER TABLE `laundry_shop_staff`
  ADD PRIMARY KEY (`laundry_shop_staff_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `login_token`
--
ALTER TABLE `login_token`
  ADD UNIQUE KEY `login_token_id` (`login_token_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`order_products_id`),
  ADD KEY `transaction_id` (`transaction_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`shop_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `shop_logo`
--
ALTER TABLE `shop_logo`
  ADD PRIMARY KEY (`shop_logo_id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `shop_rating`
--
ALTER TABLE `shop_rating`
  ADD PRIMARY KEY (`shop_rating_id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `submitted_requirements`
--
ALTER TABLE `submitted_requirements`
  ADD PRIMARY KEY (`submitted_requirements_id`),
  ADD KEY `laundry_shop_requirements_id` (`laundry_shop_requirements_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `shop_id` (`shop_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `discount`
--
ALTER TABLE `discount`
  MODIFY `discount_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `discounted_transactions`
--
ALTER TABLE `discounted_transactions`
  MODIFY `discounted_transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `laundry_shop_requirements`
--
ALTER TABLE `laundry_shop_requirements`
  MODIFY `laundry_shop_requirements_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `laundry_shop_staff`
--
ALTER TABLE `laundry_shop_staff`
  MODIFY `laundry_shop_staff_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `login_token`
--
ALTER TABLE `login_token`
  MODIFY `login_token_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `order_products_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `shop_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `shop_logo`
--
ALTER TABLE `shop_logo`
  MODIFY `shop_logo_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `shop_rating`
--
ALTER TABLE `shop_rating`
  MODIFY `shop_rating_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `submitted_requirements`
--
ALTER TABLE `submitted_requirements`
  MODIFY `submitted_requirements_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discount`
--
ALTER TABLE `discount`
  ADD CONSTRAINT `discount_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `discounted_transactions`
--
ALTER TABLE `discounted_transactions`
  ADD CONSTRAINT `dt_discount_id` FOREIGN KEY (`discount_id`) REFERENCES `discount` (`discount_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dt_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `laundry_shop_staff`
--
ALTER TABLE `laundry_shop_staff`
  ADD CONSTRAINT `staff_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `staff_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `login_token`
--
ALTER TABLE `login_token`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_transaction_id` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`transaction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `user_name` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shop_logo`
--
ALTER TABLE `shop_logo`
  ADD CONSTRAINT `logo_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `logo_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shop_rating`
--
ALTER TABLE `shop_rating`
  ADD CONSTRAINT `shop_rating_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shop_rating_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `submitted_requirements`
--
ALTER TABLE `submitted_requirements`
  ADD CONSTRAINT `laundry_shop_requirements_id` FOREIGN KEY (`laundry_shop_requirements_id`) REFERENCES `laundry_shop_requirements` (`laundry_shop_requirements_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transaction_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_shop_id` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
