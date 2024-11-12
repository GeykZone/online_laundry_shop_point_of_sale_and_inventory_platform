-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2024 at 01:26 PM
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

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`discount_id`, `discount_name`, `discount_percent`, `discount_description`, `discount_status`, `shop_id`) VALUES
(28, 'Lucky Sale', '30', 'minimum of 300 Php', 'Active', 116);

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

--
-- Dumping data for table `discounted_transactions`
--

INSERT INTO `discounted_transactions` (`discounted_transaction_id`, `transaction_id`, `discount_id`, `discounted_transaction_status`) VALUES
(36, 47, 28, 'Approved');

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
(15, 'Owner\'s Valid Id', 'True', 'Text'),
(16, 'Bossiness permit', 'True', 'Text');

-- --------------------------------------------------------

--
-- Table structure for table `laundry_shop_staff`
--

CREATE TABLE `laundry_shop_staff` (
  `laundry_shop_staff_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `shop_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `laundry_shop_staff`
--

INSERT INTO `laundry_shop_staff` (`laundry_shop_staff_id`, `user_id`, `shop_id`) VALUES
(22, 90, 116);

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

--
-- Dumping data for table `login_token`
--

INSERT INTO `login_token` (`login_token_id`, `token`, `user_id`, `expiration_date`) VALUES
(101, 'czJlcVBBdnJJMElZSW5OQXZNWW5wTzA0a2tmZmV4MUNsRjFVWEVtdnU2YmluK3ZkQzV1VzBuQWV4YjFIWDBxOQ==', 0, '2024-12-10 15:28:59'),
(102, 'N3BESHVMQUg2dmRLZFV3ZkdXc3haZVQ1S0NkOGJiREhLTEhNeFRBNFZRSEphWkhyRkZkSlJHWUxZRmgxMkdEOExmZGMrajVkV2IvajAvWGs5WVZzRWc9PQ==', 89, '2024-12-10 15:29:50'),
(103, 'STFROGVsQWd1VjJON29uUVNNdWl1NXpqMWZBbnJmSHMyMEh4MXpIR0VkRnhocFQyRkRQL2RWMEtzUlNtTW54OUJtQ3VkbTBCWS9xdWdsdW13cU5CL3c9PQ==', 90, '2024-12-10 15:38:59'),
(104, 'N3BESHVMQUg2dmRLZFV3ZkdXc3haZVQ1S0NkOGJiREhLTEhNeFRBNFZRSHZ5Ky9GZGZPVDd4aHhHQk5nUWxETmEwaEVnRURvV2c5Zzc4dXM3Y0pjY3c9PQ==', 89, '2024-12-10 20:18:33');

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

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`order_products_id`, `order_name`, `transaction_id`, `product_id`, `order_date`, `item_quantity`) VALUES
(62, 'Sabon - Tide', 47, 14, '2024-11-10 15:52:57', 6);

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

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `price`, `quantity`, `image_link`, `product_brand`, `shop_id`, `product_status`) VALUES
(14, 'Sabon', 75, 94, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fistockphoto-187248786-612x612.jpg?alt=media&token=40c28c31-da70-45ce-a1d3-8880476a428c', 'Tide', 116, 'Active');

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

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `description`, `price`, `shop_id`, `service_status`) VALUES
(22, 'Dry Cleaning', 'Minimum 1kg  to 5kg', 75, 116, 'Active');

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

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`shop_id`, `shop_name`, `shop_address`, `contact_number`, `user_id`, `requirement_status`, `days_open`, `open_time`, `close_time`, `additional_schedule_details`) VALUES
(0, 'default_dont_delete', 'default_dont_delete', 'default_dont_delete', 89, 'Approved', 'default_dont_delete', '00:00:00', '00:00:00', 'default_dont_delete'),
(116, 'Test Shop A', 'Test Shop A Adress', '09123456789', 89, 'Approved', 'Monday, Tuesday, Wednesday, Thursday, Friday, Sunday', '08:40:00', '18:02:00', 'Open Saturday Pero Half Day ra');

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

--
-- Dumping data for table `shop_logo`
--

INSERT INTO `shop_logo` (`shop_logo_id`, `shop_id`, `image_link`, `user_id`) VALUES
(23, 116, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fimages.jpg?alt=media&token=4f6a818b-15e8-428d-b35b-354df48cd070', 0),
(30, 0, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fimages%20(1).jpg?alt=media&token=dc256a4c-94d6-49a8-8473-b181fae9363c', 88),
(31, 0, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fmonkey-man-with-thumb-up_1368-7198.avif?alt=media&token=7cea6cbe-67c8-47c2-9f35-9c89d38ae41c', 89);

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

--
-- Dumping data for table `submitted_requirements`
--

INSERT INTO `submitted_requirements` (`submitted_requirements_id`, `laundry_shop_requirements_id`, `details`, `image_link`, `shop_id`) VALUES
(63, 15, '12356', 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fimages.jpg?alt=media&token=af06df05-19fb-4f39-bd83-af88f06a2023', 116),
(64, 16, 'ahasjjajskas', 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fimages%20(1).png?alt=media&token=b0bc90ce-47b4-4bc8-a6e2-7ba8c6d39666', 116);

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

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `shop_id`, `user_id`, `transaction_name`, `transaction_date`, `pick_up_date`, `total`, `transaction_status`, `clothes_weight`, `service_id`, `initial`, `transaction_changes_other_details`, `notification_is_read`, `last_update_date`) VALUES
(47, 116, 88, 'test_customer - Dry Cleaning - Transaction', '2024-11-10 15:50:08', '2024-11-10 15:55:47', 329, 'Picked-Up', 4, 22, 20, 'Wala kaabot emung kwarta', 'True', '2024-11-10 15:55:47');

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
(0, 'Admin_First_Name', 'Admin_Last_Name', 'Admin', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'test_admin@gmail.com', '09123456789', 'Test Address', 'Admin', 'Active'),
(88, 'Test Customer A', 'Test Customer A', 'test_customer', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'emailA@test.com', '95556565', 'test', 'Customer', 'Active'),
(89, 'Geykson', 'Maravillas', 'test_laundry_owner', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'geykson@posimente.com', '09123456789', 'Test Shop Adress B', 'Laundry Owner', 'Active'),
(90, 'Test_Pogi', 'Test', 'Test_Pogi_Test_8298', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'geykson@posimente.com', '09123456789', 'Test Shop Adress B', 'Laundry Staff', 'Active');

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
  MODIFY `discount_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `discounted_transactions`
--
ALTER TABLE `discounted_transactions`
  MODIFY `discounted_transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `laundry_shop_requirements`
--
ALTER TABLE `laundry_shop_requirements`
  MODIFY `laundry_shop_requirements_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `laundry_shop_staff`
--
ALTER TABLE `laundry_shop_staff`
  MODIFY `laundry_shop_staff_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `login_token`
--
ALTER TABLE `login_token`
  MODIFY `login_token_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `order_products_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `shop_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `shop_logo`
--
ALTER TABLE `shop_logo`
  MODIFY `shop_logo_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `shop_rating`
--
ALTER TABLE `shop_rating`
  MODIFY `shop_rating_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `submitted_requirements`
--
ALTER TABLE `submitted_requirements`
  MODIFY `submitted_requirements_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

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
