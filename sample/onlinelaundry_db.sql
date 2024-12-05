-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2024 at 05:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
(29, 'test A', '20', 'qwqwq', 'Active', 127),
(30, 'test B', '10', 'asasas', 'Active', 127);

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
(38, 55, 29, 'Approved'),
(39, 55, 30, 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `email_api_config`
--

CREATE TABLE `email_api_config` (
  `user_id` char(255) NOT NULL,
  `service_id` char(255) NOT NULL,
  `template_id` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `email_api_config`
--

INSERT INTO `email_api_config` (`user_id`, `service_id`, `template_id`) VALUES
('u1QtBn3n80EM9pmGI', 'service_9odki4a', 'template_dvesgk5');

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
('jnfkjsnfknszfnkjscfsgrggmerm', 'mfweje8483f9jrfjfsijfisfs'),
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
(128, 'YzcrSC8zUFJnS3hNR3NsazgreGNhWE5pT0F5L2JGbnhyajRKNzBsSE9mNW9SblZrUjE0QjNrdVg5V2Q1b3RwOQ==', 92, '2025-01-02 22:04:00');

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
(68, 'test product - test', 55, 15, '2024-12-05 00:02:23', 1),
(69, 'cppasas - test', 55, 16, '2024-12-05 00:02:23', 1);

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
(15, 'test product', 250, 98, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2FScreenshot%202023-11-20%20132433.png?alt=media&token=27fbb97c-b554-40c8-8f25-26352c507635', 'test', 127, 'Active'),
(16, 'cppasas', 250, 97, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2FScreenshot%202023-11-20%20132433.png?alt=media&token=27fbb97c-b554-40c8-8f25-26352c507635', 'test', 127, 'Active');

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
(23, 'test service', 'Per Kilo', 30, 127, 'Active');

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
  `additional_schedule_details` char(255) NOT NULL,
  `overall_rating` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`shop_id`, `shop_name`, `shop_address`, `contact_number`, `user_id`, `requirement_status`, `days_open`, `open_time`, `close_time`, `additional_schedule_details`, `overall_rating`) VALUES
(0, 'default_dont_delete', 'default_dont_delete', 'default_dont_delete', 0, 'Approved', 'default_dont_delete', '00:00:00', '00:00:00', 'default_dont_delete', 0),
(127, 'Test A', 'Oroqueta City, Misamis Occidental Philippines', '09700780041', 92, 'Approved', 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday', '08:00:00', '16:00:00', '', 0);

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
(34, 0, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fcreative-laundry-logo-template-rhdd5wf1f57963.webp?alt=media&token=9e5ce7c3-5493-443f-b8ef-d3c043e7ad70', 0);

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
-- Table structure for table `sms_api_config`
--

CREATE TABLE `sms_api_config` (
  `api_secret` char(255) NOT NULL,
  `mode` char(50) NOT NULL,
  `device` char(255) NOT NULL,
  `sim` int(11) NOT NULL DEFAULT 1,
  `priority` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sms_api_config`
--

INSERT INTO `sms_api_config` (`api_secret`, `mode`, `device`, `sim`, `priority`) VALUES
('88d4207add7bb79958cafc5db09149b0301ea0f1', 'devices', '00000000-0000-0000-f99b-4050bd494c9f', 1, 1);

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
(67, 15, '122222', 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fqr.png?alt=media&token=53a0834a-a714-4cdf-b086-08e8a5f16dc5', 127),
(68, 16, '121', 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2F462553817_2074191979644403_865619313457853401_n.jpg?alt=media&token=08925b26-14ea-4ec8-b5a5-183bdb27554f', 127);

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
(55, 127, 0, 'undefined - test service - Transaction', '2024-12-05 00:02:23', '2024-12-05 21:22:25', 381.6, 'Picked-Up', 0, 23, 30, '', 'False', '2024-12-05 21:22:25');

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
(0, 'Admin_First_Name', 'Admin_Last_Name', 'Admin', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'matildogeykson@gmail.com', '639700780041', 'Test Address', 'Admin', 'Active'),
(92, 'Geykson', 'Maravillas', 'geykson', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'donna@alphasys.com.au', '639700780041', 'Oroquieta City, Misamis Occidental, Philippines', 'Laundry Owner', 'Active'),
(94, 'Geykson', 'Maravillas', 'customerTest', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'donna@alphasys.com.au', '09700780041', 'Oroquieta City, Misamis Occidental, Philippines', 'Customer', 'Active');

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
-- Indexes for table `email_api_config`
--
ALTER TABLE `email_api_config`
  ADD UNIQUE KEY `user_id` (`user_id`);

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
-- Indexes for table `sms_api_config`
--
ALTER TABLE `sms_api_config`
  ADD UNIQUE KEY `api_secret` (`api_secret`);

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
  MODIFY `discount_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `discounted_transactions`
--
ALTER TABLE `discounted_transactions`
  MODIFY `discounted_transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

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
  MODIFY `login_token_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `order_products_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `shop_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `shop_logo`
--
ALTER TABLE `shop_logo`
  MODIFY `shop_logo_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `shop_rating`
--
ALTER TABLE `shop_rating`
  MODIFY `shop_rating_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `submitted_requirements`
--
ALTER TABLE `submitted_requirements`
  MODIFY `submitted_requirements_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

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
