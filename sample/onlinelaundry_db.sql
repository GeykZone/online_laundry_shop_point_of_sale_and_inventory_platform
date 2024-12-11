-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2024 at 05:37 PM
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
(33, 'Suki Discount', '25.00', 'If suki tika matic you are approved', 'Active', 129),
(34, 'New Customer Discount', '10.00', 'For all new customer', 'Active', 129),
(35, 'Luck Discount', '50.00', 'If you have suki card', 'Active', 129);

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
(53, 72, 33, 'Approved');

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
('jnfkjsnfknszfnkjscfsgrggmerm', 'mfweje8483f9jrfjfsijfisfs'),
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
  `item_quantity` float NOT NULL,
  `unit_measurement` char(50) NOT NULL,
  `order_product_price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`order_products_id`, `order_name`, `transaction_id`, `product_id`, `order_date`, `item_quantity`, `unit_measurement`, `order_product_price`) VALUES
(82, 'Tide Powder - Tide', 73, 29, '2024-12-11 20:49:24', 1000, 'Grams', 25),
(83, 'Tide Powder - Tide', 75, 29, '2024-12-11 22:24:47', 1, 'Kg', 25);

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
  `product_status` char(50) NOT NULL DEFAULT 'Active',
  `unit_measurement` char(50) NOT NULL DEFAULT 'Kg',
  `amount_per_stock` float NOT NULL,
  `product_type` char(50) NOT NULL DEFAULT 'Powder',
  `amount_per_price` float NOT NULL,
  `base_stock` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `price`, `quantity`, `image_link`, `product_brand`, `shop_id`, `product_status`, `unit_measurement`, `amount_per_stock`, `product_type`, `amount_per_price`, `base_stock`) VALUES
(29, 'Tide Powder', 25, 100, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2F61k7LBJiN7L.jpg?alt=media&token=e0b2a09b-9700-4f02-87d3-99a05d5fc5d9', 'Tide', 129, 'Active', 'Kg', 8, 'Powder', 1, 10),
(30, 'Downy Fabcon', 54, 100, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fimages.jpg?alt=media&token=cffe3dfb-f21e-4677-9758-9e5ddb2a02c3', 'Donwy', 129, 'Active', 'Ml', 1000, 'Liquid', 38, 1000);

-- --------------------------------------------------------

--
-- Table structure for table `product_log`
--

CREATE TABLE `product_log` (
  `product_log_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `changes_details` varchar(535) NOT NULL,
  `change_date` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_log`
--

INSERT INTO `product_log` (`product_log_id`, `product_id`, `changes_details`, `change_date`, `user_id`) VALUES
(30, 29, 'New Product Inserted:\nProduct Nam: Tide Powder\nProduct Brand: Tide\nProduct Type: Powder\nProduct Unit of Measurement: Kg\nProduct Amount per Stock: 10.00\nProduct Amount per Price: 1.00\nProduct Price: ₱25.00\nProduct Stock: 100', '2024-12-11 20:41:51', 361),
(31, 30, 'New Product Inserted:\nProduct Nam: Downy Fabcon\nProduct Brand: Donwy\nProduct Type: Liquid\nProduct Unit of Measurement: Ml\nProduct Amount per Stock: 1000.00\nProduct Amount per Price: 38.00\nProduct Price: ₱54.00\nProduct Stock: 100', '2024-12-11 20:44:54', 361),
(32, 29, 'Changes detected:\nAmount per Stock:\nField old value: 10\nField new value: 9\n', '2024-12-11 20:51:13', 361),
(33, 29, 'Changes detected:\nAmount per Stock:\nField old value: 9\nField new value: 8\n', '2024-12-11 22:25:00', 361);

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
  `service_status` char(50) NOT NULL DEFAULT 'Active',
  `service_type` char(50) NOT NULL DEFAULT 'All Types',
  `unit_measurement` char(50) NOT NULL DEFAULT 'N/A',
  `service_load` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `description`, `price`, `shop_id`, `service_status`, `service_type`, `unit_measurement`, `service_load`) VALUES
(31, 'All in one package', 'All in one (Wash, Dry and Fold) for all kids of clothes.', 140, 129, 'Active', 'Package', 'N/A', 0),
(32, 'Wash (All Kinds)', 'Wash all type of clothes', 70, 129, 'Active', 'Wash', 'Kg', 1),
(33, 'Dry (All Kinds)', 'Dry all kinds of clothes', 40, 129, 'Active', 'Dry', 'Kg', 1),
(34, 'Fold (All kinds)', 'Dry all kinds of clothes with no criteria.', 35.75, 129, 'Active', 'Fold', 'N/A', 0);

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
  `overall_rating` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`shop_id`, `shop_name`, `shop_address`, `contact_number`, `user_id`, `requirement_status`, `days_open`, `open_time`, `close_time`, `additional_schedule_details`, `overall_rating`) VALUES
(0, 'default_dont_delete', 'default_dont_delete', 'default_dont_delete', 0, 'Approved', 'default_dont_delete', '00:00:00', '00:00:00', 'default_dont_delete', 0),
(129, 'Geykson Shop A', 'Oroqueta City, Misamis Occidental Philippines', '639700780041', 361, 'Approved', 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday', '08:00:00', '17:00:00', 'Open Saturdays from 10:00am - 4:00pm', 3.6);

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
(34, 0, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fcreative-laundry-logo-template-rhdd5wf1f57963.webp?alt=media&token=9e5ce7c3-5493-443f-b8ef-d3c043e7ad70', 0),
(41, 0, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fsmiling-young-man-illustration_1308-174669.avif?alt=media&token=d33a4738-d37c-4b1a-ba44-b3587a5d48c4', 0),
(42, 129, 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2F853d1413b661782c6e109f2557b679bcf1be2f9f2f9a7178650de9e0a0a08737.jpg?alt=media&token=540961c4-ff8e-47fd-9a49-0e3904ed0b47', 0);

-- --------------------------------------------------------

--
-- Table structure for table `shop_rating`
--

CREATE TABLE `shop_rating` (
  `shop_rating_id` bigint(20) NOT NULL,
  `shop_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `rate` float NOT NULL DEFAULT 0,
  `comment` char(255) NOT NULL,
  `rating_created_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shop_rating`
--

INSERT INTO `shop_rating` (`shop_rating_id`, `shop_id`, `user_id`, `rate`, `comment`, `rating_created_date`) VALUES
(14, 129, 366, 3, 'Nice', '2024-12-12 00:21:03'),
(15, 129, 367, 4.2, 'Okay for me', '2024-12-12 00:26:18');

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
(71, 15, 'testing-987654321', 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2Fimage-88.png?alt=media&token=bba4c38e-a16c-4998-b7c6-53dec5a962b8', 129),
(72, 16, 'tesing-1234567', 'https://firebasestorage.googleapis.com/v0/b/onlinelaundryshoppos.appspot.com/o/image-files%2FRFQ-Services-of-a-Drug-testing-laboratory-2.jpg?alt=media&token=4d893d21-d8a0-4065-9cbb-b8df62f51419', 129);

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
(72, 129, 362, 'Geykson-Maravillas-All in one package-Transaction', '2024-12-11 20:46:54', '0000-00-00 00:00:00', 105, 'Approved', 3, 31, 140, '', 'False', '2024-12-11 20:51:32'),
(73, 129, 363, 'Geykson-Maravillas-Wash (All Kinds)-Transaction', '2024-12-11 20:49:24', '0000-00-00 00:00:00', 95, 'Approved', 0, 32, 70, '', 'False', '2024-12-11 20:51:13'),
(74, 129, 364, 'Geykson-Maravillas-Dry (All Kinds)-Transaction', '2024-12-11 20:50:24', '0000-00-00 00:00:00', 40, 'Approved', 0, 33, 40, '', 'False', '2024-12-11 20:50:58'),
(75, 129, 365, 'Geykson-Maravillas-Wash (All Kinds)-Transaction', '2024-12-11 22:24:47', '0000-00-00 00:00:00', 95, 'Approved', 0, 32, 70, '', 'False', '2024-12-11 22:25:00');

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
  `user_activation_status` char(50) NOT NULL DEFAULT 'Inactive',
  `active_status` char(50) NOT NULL DEFAULT 'Offline',
  `last_activity` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `username`, `password`, `email`, `phone_number`, `address`, `position`, `user_activation_status`, `active_status`, `last_activity`) VALUES
(0, 'Admin_First_Name', 'Admin_Last_Name', 'Admin', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'matildogeykson@gmail.com', '639700780041', 'Test Address', 'Admin', 'Active', 'Offline', '2024-12-11 20:14:04'),
(361, 'Geykson', 'Maravillas', 'geykson', 'aTZvdWMwaFVjSUhxdXorRFNLdEkrZz09', 'geykson@posimente.com', '639700780041', 'Oroqueta City, Misamis Occidental Philippines', 'Laundry Owner', 'Active', 'Offline', '2024-12-12 00:20:13'),
(362, 'Geykson', 'Maravillas', 'Geykson-Maravillas-805681', 'Y3hXbGdPaGw0dWdpdlNZcEFXQTgzdz09', 'matildogeykson@gmail.com', '639700780041', 'test address', 'Customer', 'Active', 'Offline', NULL),
(363, 'Geykson', 'Maravillas', 'Geykson-Maravillas-122723', 'SHFXVWRtWnM5MGZDUUZQcVg1U0g0QT09', 'matildogeykson@gmail.com', '639700780041', 'test address', 'Customer', 'Active', 'Offline', NULL),
(364, 'Geykson', 'Maravillas', 'Geykson-Maravillas-472116', 'dTU4MGtRdjBYbHNFeWhIY1Z3VHZKQT09', 'matildogeykson@gmail.com', '639700780041', 'test address', 'Customer', 'Active', 'Offline', NULL),
(365, 'Geykson', 'Maravillas', 'Geykson-Maravillas-214300', 'KzdXR1ZiR3RxbmNyR1dTRmVaUkh5QT09', 'matildogeykson@gmail.com', '639700780041', 'test address', 'Customer', 'Active', 'Offline', NULL),
(366, 'Geykson', 'Maravillas', 'Geykson-Maravillas-690772', 'b1FTUDBWc1JXSW5ZUStZV3hCc0grZz09', 'donna@alphasys.com.au', '639700780041', 'Oroqueta City, Misamis Occidental Philippines', 'Customer', 'Active', 'Offline', NULL),
(367, 'Winnie', 'Pagett', 'Winnie-Pagett-535691', 'SE5GdERSU0d1MFhnZ3lrZnlObWtqUT09', 'donna@alphasys.com.au', '639700780041', '1 Norton Street', 'Customer', 'Active', 'Offline', NULL);

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
-- Indexes for table `product_log`
--
ALTER TABLE `product_log`
  ADD PRIMARY KEY (`product_log_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

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
  MODIFY `discount_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `discounted_transactions`
--
ALTER TABLE `discounted_transactions`
  MODIFY `discounted_transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `laundry_shop_requirements`
--
ALTER TABLE `laundry_shop_requirements`
  MODIFY `laundry_shop_requirements_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `laundry_shop_staff`
--
ALTER TABLE `laundry_shop_staff`
  MODIFY `laundry_shop_staff_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `login_token`
--
ALTER TABLE `login_token`
  MODIFY `login_token_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `order_products_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `product_log`
--
ALTER TABLE `product_log`
  MODIFY `product_log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `shop_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `shop_logo`
--
ALTER TABLE `shop_logo`
  MODIFY `shop_logo_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `shop_rating`
--
ALTER TABLE `shop_rating`
  MODIFY `shop_rating_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `submitted_requirements`
--
ALTER TABLE `submitted_requirements`
  MODIFY `submitted_requirements_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=368;

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
-- Constraints for table `product_log`
--
ALTER TABLE `product_log`
  ADD CONSTRAINT `product_log_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `product_log_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
