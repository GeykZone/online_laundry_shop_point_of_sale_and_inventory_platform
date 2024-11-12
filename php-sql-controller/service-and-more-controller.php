<?php

include ('../connection/connect.php');

// query  services with pagination
if (isset($inputData['queryServices']) && $inputData['queryServices'] == true) {
    $page = isset($inputData['page']) ? intval($inputData['page']) : 1;
    $limit = 5; // Number of services per page
    $offset = ($page - 1) * $limit;
    $shop_id = $inputData['shop_id'];

    // Query to count total active services
    $countSql = "SELECT COUNT(*) as total FROM `services` WHERE `service_status` = 'active'";
    $countResult = $conn->query($countSql);
    $totalCount = $countResult->fetch_assoc()['total'];

    // Calculate total pages
    $totalPages = ceil($totalCount / $limit);

    // Query the services from the database with LIMIT and OFFSET for pagination
    $sql = "SELECT `service_id`, `service_name`, `description`, `price`, `shop_id`, `service_status` 
            FROM `services` 
            WHERE `service_status` = 'active'  AND `shop_id` = '$shop_id'
            LIMIT $limit OFFSET $offset";

    $result = $conn->query($sql); // Assuming $conn is your database connection

    $services = [];
    while ($row = $result->fetch_assoc()) {
        $services[] = $row;
    }

    // Return the services and total pages as JSON
    echo json_encode([
        'services' => $services,
        'totalPages' => $totalPages
    ]);
}

// query  products with pagination
if (isset($inputData['queryProducts']) && $inputData['queryProducts'] == true) {
    $page = isset($inputData['currentPage']) ? intval($inputData['currentPage']) : 1;
    $limit = 5; // Number of products per page
    $offset = ($page - 1) * $limit;
    $shop_id = $inputData['shop_id'];

    // Query to count total active products
    $countSql = "SELECT COUNT(*) as total FROM `product` WHERE `product_status` = 'Active' AND `shop_id` = '$shop_id'";
    $countResult = $conn->query($countSql);
    $totalCount = $countResult->fetch_assoc()['total'];

    // Calculate total pages
    $totalPages = ceil($totalCount / $limit);

    // Query the products from the database with LIMIT and OFFSET for pagination
    $sql = "SELECT `product_id`, `product_name`, `price`, `quantity`, `image_link`, `product_brand`, `shop_id`, `product_status` 
            FROM `product` 
            WHERE `product_status` = 'Active' AND `shop_id` = '$shop_id'
            LIMIT $limit OFFSET $offset";

    $result = $conn->query($sql);

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Return the products and total pages as JSON
    echo json_encode([
        'products' => $products,
        'totalPages' => $totalPages
    ]);
}

// query  discounts with pagination
if (isset($inputData['queryDiscounts']) && $inputData['queryDiscounts'] === true) {
    global $conn;

    $limit = 5; // Number of discounts to fetch per request
    $page = isset($inputData['page']) ? (int)$inputData['page'] : 1; // Page number from JS
    $offset = ($page - 1) * $limit; // Calculate the offset
    
    // Retrieve shop_id from session storage
    $shop_id = isset($inputData['shop_id']) ? (int)$inputData['shop_id'] : 0;
    
    if ($shop_id > 0) {
        // SQL query to fetch discounts for the specified shop_id
        $sql = "SELECT d.discount_id AS discount_id,
                       d.discount_name AS discount_name, 
                       d.discount_percent AS discount_percent, 
                       d.discount_description AS discount_description, 
                       d.discount_status AS discount_status,
                       d.shop_id AS shop_id
                FROM discount AS d
                WHERE d.shop_id = ? AND d.discount_status = 'active'
                LIMIT ? OFFSET ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $shop_id, $limit, $offset);
        $stmt->execute();
        $result = $stmt->get_result();
    
        // Fetch the results as an associative array
        $discounts = $result->fetch_all(MYSQLI_ASSOC);
    
        // Send the result as JSON
        echo json_encode($discounts);
    } else {
        echo json_encode(["error" => "Invalid shop ID"]);
    }
    
}

// Check if verifyQuantity exists in $inputData and is set to true
if (isset($inputData['verifyQuantity']) && $inputData['verifyQuantity'] === true) {
    $productId = $inputData['productId'];
    $productQuantity = $inputData['productQuantity'];

    // Prepare SQL query to get the product details for the given productId
    $query = "SELECT `product_id`, `quantity` FROM `product` WHERE `product_id` = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $productId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
        
        // Respond with product details in JSON format
        echo json_encode([
            "product_id" => $product['product_id'],
            "quantity" => $product['quantity']
        ]);
    } else {
        // Respond with an error message if the product was not found
        echo json_encode([
            "error" => "Product not found"
        ]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}

// insert new transaction
if(isset($inputData['insertTransaction']) ){
    $response = []; // Initialize response

    if (isset($inputData['transaction_id']) && !empty($inputData['transaction_id'])) {
        // If transaction_id is provided, prepare an UPDATE statement
        $transactionId = $inputData['transaction_id'];
        
        // Initialize an array for the fields to be updated
        $fieldsToUpdate = [];
        if (isset($inputData['shop_id'])) $fieldsToUpdate[] = "shop_id = '{$inputData['shop_id']}'";
        if (isset($inputData['service_id'])) $fieldsToUpdate[] = "service_id = '{$inputData['service_id']}'";
        if (isset($inputData['user_id'])) $fieldsToUpdate[] = "user_id = '{$inputData['user_id']}'";
        if (isset($inputData['transaction_name'])) $fieldsToUpdate[] = "transaction_name = '{$inputData['transaction_name']}'";
        if (isset($inputData['transaction_date'])) $fieldsToUpdate[] = "transaction_date = '{$inputData['transaction_date']}'";
        if (isset($inputData['last_update_date'])) $fieldsToUpdate[] = "last_update_date = '{$inputData['last_update_date']}'";
        if (isset($inputData['pick_up_date'])) $fieldsToUpdate[] = "pick_up_date = '{$inputData['pick_up_date']}'";
        if (isset($inputData['total'])) $fieldsToUpdate[] = "total = '{$inputData['total']}'";
        if (isset($inputData['initial'])) $fieldsToUpdate[] = "initial = '{$inputData['initial']}'";
        if (isset($inputData['transaction_status'])) $fieldsToUpdate[] = "transaction_status = '{$inputData['transaction_status']}'";
        if (isset($inputData['clothes_weight'])) $fieldsToUpdate[] = "clothes_weight = '{$inputData['clothes_weight']}'";
        if (isset($inputData['transaction_changes_other_details'])) $fieldsToUpdate[] = "transaction_changes_other_details = '{$inputData['transaction_changes_other_details']}'";
        if (isset($inputData['notification_is_read'])) $fieldsToUpdate[] = "notification_is_read = '{$inputData['notification_is_read']}'";
    
        // Join fields to update in SQL query
        $updateQuery = "UPDATE transactions SET " . implode(", ", $fieldsToUpdate) . " WHERE transaction_id = '$transactionId'";
        
        if (mysqli_query($conn, $updateQuery)) {
            $response['status'] = 'success';
            $response['message'] = 'Transaction updated successfully.';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Update failed: ' . mysqli_error($conn);
        }
    } else {
        // If no transaction_id, prepare an INSERT statement
        $shopId = $inputData['shop_id'] ?? null;
        $userId = $inputData['user_id'] ?? null;
        $transactionName = $inputData['transaction_name'] ?? null;
        $transactionDate = $inputData['transaction_date'] ?? null;
        $lastUpdateDate = $inputData['last_update_date'] ?? null;
        $pickUpDate = $inputData['pick_up_date'] ?? null;
        $total = $inputData['total'] ?? null;
        $initial = $inputData['initial'] ?? null;
        $transactionStatus = $inputData['transaction_status'] ?? null;
        $clothesWeight = $inputData['clothes_weight'] ?? null;
        $serviceId = $inputData['service_id'] ?? null;
    
        $insertQuery = "INSERT INTO transactions (service_id, shop_id, user_id, transaction_name,
         transaction_date, pick_up_date, total, transaction_status, clothes_weight, initial, last_update_date) 
                        VALUES ('$serviceId', '$shopId', '$userId', '$transactionName', '$transactionDate',
                         '$pickUpDate', '$total', '$transactionStatus', '$clothesWeight', '$initial', '$lastUpdateDate')";
    
        if (mysqli_query($conn, $insertQuery)) {
            $response['status'] = 'success';
            $response['transaction_id'] = mysqli_insert_id($conn); // Return the newly inserted ID
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Insertion failed: ' . mysqli_error($conn);
        }
    }
    
    // Return response as JSON
    echo json_encode($response);
}

// Check if order_products_id is provided and determine if it's an update, delete, or insert operation
if (isset($inputData['insertOrderProduct']) && $inputData['insertOrderProduct'] === true) {
    $orderProductsId = $inputData['order_products_id'] ?? null;
    $isRemoveProduct = $inputData['isRemoveProduct'] ?? false;

    // Prepare common parameters
    $orderName = $inputData['order_name'] ?? null;
    $transactionId = $inputData['transaction_id'] ?? null;
    $productId = $inputData['product_id'] ?? null;
    $orderDate = $inputData['order_date'] ?? null;
    $itemQuantity = $inputData['item_quantity'] ?? null;

    if ($isRemoveProduct && $orderProductsId) {
        // Delete operation
        $deleteSql = "DELETE FROM `order_products` WHERE `order_products_id` = '$orderProductsId'";

        if ($conn->query($deleteSql) === TRUE) {
            $response = [
                'status' => 'success',
                'message' => 'Product successfully removed.'
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Deletion failed: ' . $conn->error
            ];
        }

    } elseif ($orderProductsId) {
        // Update operation
        $updateSql = "UPDATE `order_products` 
                      SET `order_name` = '$orderName', `transaction_id` = '$transactionId', `product_id` = '$productId', 
                          `order_date` = '$orderDate', `item_quantity` = '$itemQuantity'
                      WHERE `order_products_id` = '$orderProductsId'";

        if ($conn->query($updateSql) === TRUE) {
            $response = [
                'status' => 'success',
                'message' => 'Product updated successfully.'
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Update failed: ' . $conn->error
            ];
        }

    } else {
        // Insert operation
        $insertSql = "INSERT INTO `order_products` (`order_name`, `transaction_id`, `product_id`, `order_date`, `item_quantity`) 
                      VALUES ('$orderName', '$transactionId', '$productId', '$orderDate', '$itemQuantity')";

        if ($conn->query($insertSql) === TRUE) {
            $newOrderProductId = $conn->insert_id;

            // Update product quantity in the product table
            $updateQuantitySql = "UPDATE `product` 
                                  SET `quantity` = `quantity` - $itemQuantity 
                                  WHERE `product_id` = '$productId'";

            if ($conn->query($updateQuantitySql) === TRUE) {
                $response = [
                    'status' => 'success',
                    'order_products_id' => $newOrderProductId
                ];
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Quantity update failed: ' . $conn->error
                ];
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Insertion failed: ' . $conn->error
            ];
        }
    }

    // Output response as JSON
    echo json_encode($response);
}

// insert new discounted transaction
if (isset($inputData['insertDiscountedTransaction']) && $inputData['insertDiscountedTransaction'] === true) {
    // Capture input data
    $transactionId = $inputData['transaction_id'] ?? null;
    $discountId = $inputData['discount_id'] ?? null;
    $status = $inputData['discounted_transaction_status'] ?? null;
    $discountedTransactionId = $inputData['discounted_transaction_id'] ?? null;

    // Check if we're updating an existing discounted transaction
    if ($discountedTransactionId) {
        // Update statement
        $updateFields = [];
        if (isset($transactionId)) $updateFields[] = "transaction_id = '$transactionId'";
        if (isset($discountId)) $updateFields[] = "discount_id = '$discountId'";
        if (isset($status)) $updateFields[] = "discounted_transaction_status = '$status'";

        $sql = "UPDATE `discounted_transactions` SET " . implode(", ", $updateFields) . " WHERE `discounted_transaction_id` = '$discountedTransactionId'";

        if ($conn->query($sql) === TRUE) {
            $response = [
                'status' => 'success',
                'message' => 'Discounted transaction updated successfully',
                'discounted_transaction_id' => $discountedTransactionId
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Update failed: ' . $conn->error
            ];
        }
    } else {
        // Insert statement
        $sql = "INSERT INTO `discounted_transactions` (`transaction_id`, `discount_id`, `discounted_transaction_status`) 
                VALUES ('$transactionId', '$discountId', '$status')";

        if ($conn->query($sql) === TRUE) {
            $newDiscountedTransactionId = $conn->insert_id; // Capture the ID of the newly inserted record
            $response = [
                'status' => 'success',
                'discounted_transaction_id' => $newDiscountedTransactionId,
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Insertion failed: ' . $conn->error
            ];
        }
    }

    // Output response as JSON
    echo json_encode($response);
}

// Check if the request is to query ratings
if (isset($inputData['queryRatingFromShop']) && $inputData['queryRatingFromShop'] === true) {
    $shopId = $inputData['shop_id'];
    $page = isset($inputData['page']) ? (int)$inputData['page'] : 1;
    $limit = isset($inputData['limit']) ? (int)$inputData['limit'] : 10; // Number of comments per request
    $offset = ($page - 1) * $limit;

    // Query to fetch ratings with pagination
    $sql = "SELECT shop_rating_id, shop_id, user_id, rate, comment, rating_created_date 
            FROM shop_rating 
            WHERE shop_id = ? 
            ORDER BY rating_created_date DESC 
            LIMIT ? OFFSET ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iii", $shopId, $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch results as an associative array
    $ratings = [];
    while ($row = $result->fetch_assoc()) {
        $ratings[] = $row;
    }

    // Output ratings as JSON
    echo json_encode($ratings);
    exit;
}


?>
