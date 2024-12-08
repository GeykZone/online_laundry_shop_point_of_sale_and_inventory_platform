<?php 

include ('../connection/connect.php');

// function to clear the login token
function clearToken(){
    $expirationTime = time() - 3600;
    $cookieName = 'laundryLoginToken';
    setcookie($cookieName, '', $expirationTime, "/");
    echo json_encode('login.php');
}

// udate to offline user
if (isset($inputData['queryUserTosSetOffline']) && $inputData['queryUserTosSetOffline'] === true) {
    // Set the timezone to the Philippines
    date_default_timezone_set('Asia/Manila');
    $currentDateTime = date('Y-m-d H:i:s');
    
    // SQL to update active_status based on last_activity
    $sql = "UPDATE user 
            SET active_status = 'Offline' 
            WHERE TIMESTAMPDIFF(MINUTE, last_activity, ?) >= 3";  // mark ass offline if 3 minutes inactive
    
    $stmt = $conn->prepare($sql);
    
    if ($stmt === false) {
        die("Error preparing the SQL statement: " . $conn->error);
    }
    
    $stmt->bind_param("s", $currentDateTime);
    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Users updated to Offline."];
    } else {
        $response = ["status" => "error", "message" => $conn->error];
    }

    echo json_encode($response);
    exit;
}

// delete the login token if it is already expired
if (isset($inputData['check_login_token'])){
    // Set the time zone to Philippines
    date_default_timezone_set('Asia/Manila');
    $currentDatedatetime = date('Y-m-d H:i:s');
    $response;

    $searchTokenSql = "SELECT `login_token_id`, `token`, `expiration_date` FROM `login_token` WHERE DATE(`expiration_date`) <= ?";
    $stmt = $conn->prepare($searchTokenSql);
    $stmt->bind_param("s", $currentDatedatetime);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        
        $deleteSql = "DELETE FROM `login_token` WHERE DATE(`expiration_date`) <= ?";
        $deleteStmt = $conn->prepare($deleteSql);
        $response = 'login_token_deleted';

        if ($deleteStmt === false) {
            $response = 'login_token_deletion_failed';
            die("Failed to prepare the DELETE statement: " . $conn->error);
        }
        
        $deleteStmt->bind_param("s", $currentDatedatetime);
        $deleteStmt->execute();
    }
    else {
        $response = 'no_deletable_token_found';
    }

    echo json_encode($response);
}

// route the page to login or stay in page if the user is logged in or not
if (isset($inputData['page_route'])) {

    $response;

    if (!isset($_COOKIE['laundryLoginToken'])) {  
        echo json_encode('login.php');
    }
    else if(isset($_COOKIE['laundryLoginToken'])) {
      $laundryLoginToken = $_COOKIE['laundryLoginToken'];
      // SQL query with INNER JOIN and WHERE clause
        $selectUserSql = "
        SELECT 
           *
        FROM 
            user AS us
        LEFT JOIN 
            login_token AS lt
            ON us.user_id = lt.user_id
        WHERE 
            lt.token = ?
        ";
        
      $stmt = $conn->prepare($selectUserSql);
      $stmt->bind_param("s", $laundryLoginToken);
      
       // Execute the query
        $stmt->execute();
        $result = $stmt->get_result();
        
        // Check if there are any results
        if ($result->num_rows > 0) {
            // Loop through the results
            while ($row = $result->fetch_assoc()) {
                $response['user_id'] = (isset($row['user_id']) ? $row['user_id'] : null);
                $response['first_name'] = (isset($row['first_name']) ? $row['first_name'] : null);
                $response['last_name'] = (isset($row['last_name']) ? $row['last_name'] : null);
                $response['username'] = (isset($row['username']) ? $row['username'] : null);
                $response['email'] = (isset($row['email']) ? $row['email'] : null);
                $response['phone_number'] = (isset($row['phone_number']) ? $row['phone_number'] : null);
                $response['address'] = (isset($row['address']) ? $row['address'] : null);
                $response['user_activation_status'] = (isset($row['user_activation_status']) ? $row['user_activation_status'] : null);
                $response['position'] = (isset($row['position']) ? $row['position'] : null);
                $response['login_token_id'] = (isset($row['login_token_id']) ? $row['login_token_id'] : null);
                $response['token'] = (isset($row['token']) ? $row['token'] : null);
                $response['expiration_date'] = (isset($row['expiration_date']) ? $row['expiration_date'] : null);
            }

            $userId = $response['user_id'];
            $userPosition = $response['position'];
            $activationStatus =  $response['user_activation_status'];
    
            if($userId != 0 && ($userPosition != 'Admin' || $userPosition != 'Customer') && $activationStatus == 'Inactive'){
                clearToken();
            }
            else{
                echo json_encode($response);
            }

        } else {

            clearToken();
        }
    
    }

}

// query shop logo
if (isset($inputData['query_shop_logo'])) {

    $response;

    if( isset($inputData['isShopView'])) {
        $shop_id = $inputData['shop_id'];
        // SQL query with INNER JOIN and WHERE clause
          $selectUserSql = "
          SELECT 
             *
          FROM 
            shop_logo
          WHERE 
             shop_id = ? AND user_id = 0
          ";
          
        $stmt = $conn->prepare($selectUserSql);
        $stmt->bind_param("i", $shop_id);
    }
    else{
        $user_id = $inputData['user_main_logo'];
        // SQL query with INNER JOIN and WHERE clause
          $selectUserSql = "
          SELECT 
             *
          FROM 
            shop_logo
          WHERE 
             user_id = ? AND shop_id = 0
          ";
          
        $stmt = $conn->prepare($selectUserSql);
        $stmt->bind_param("i", $user_id);
    }

    
     // Execute the query
      $stmt->execute();
      $result = $stmt->get_result();
      
      // Check if there are any results
      if ($result->num_rows > 0) {
          // Loop through the results
          while ($row = $result->fetch_assoc()) {
              $response = (isset($row['image_link']) ? $row['image_link'] : null);
          }

          echo json_encode($response);

      } else {
          echo json_encode('not found');
      }

}

// logout session
if (isset($inputData['logout'])) {
    $expirationTime = time() - 3600;// Calculate the expiration time for 30 days from now
    $cookieName = 'laundryLoginToken';
    $cookieValue = (isset($_COOKIE['laundryLoginToken']) ? $_COOKIE['laundryLoginToken'] : null);

    if($cookieValue !== null) {
        
        $selectUserTokenSql = "SELECT `login_token_id` FROM `login_token` WHERE `token` = ?";
        $stmt = $conn->prepare($selectUserTokenSql);
        $stmt->bind_param("s", $cookieValue);
        
        // Execute the query
        $stmt->execute();
        $result = $stmt->get_result();
        
        // Check if there are any results
        if ($result->num_rows > 0) {
            // Loop through the results
            while ($row = $result->fetch_assoc()) {
                $response = 'found';
            }
        } else {
            $response = 'not found';
        }

    }

    if($response == 'found') {
        $deleteTokenSql = "DELETE FROM `login_token` WHERE `token` = ?";
        $stmt = $conn->prepare($deleteTokenSql);
        $stmt->bind_param("s", $cookieValue);
        $executionResult = $stmt->execute();

        if ($executionResult) {
            setcookie($cookieName, '', $expirationTime, "/");
            $response = 'Logout successfully.' ;
        } else {
            $response = $stmt->error ;
        }
    }
    
    echo json_encode($response);
}

// insert update shop main logo
if (isset($inputData['changeLogo'])) {

    // Database connection
    global $conn; // Assuming you have a global connection setup

    // Input data (from POST or actual values)
    $userId = isset($inputData['user_id']) ? $inputData['user_id'] : null;
    $shop_id = isset($inputData['shop_id']) ? $inputData['shop_id'] : null;
    $isSuperAdmin = isset($inputData['isSuperAdmin']) ? $inputData['isSuperAdmin'] : null;
    $logo_id = null;
    $imageLink = $inputData['imageLink'];
    $whereClause = "user_id = ?";
    $identifierId =  $userId;

    if($shop_id){
        $whereClause = "shop_id = ?";
        $identifierId = $shop_id;
    }

    if($isSuperAdmin){
        $whereClause = "shop_id = ? AND user_id = '0'";
        $identifierId = $shop_id;
    }

    // First, check if a record with the given user_id already exists
    $checkQuery = "SELECT shop_logo_id FROM shop_logo WHERE ".$whereClause;
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("i", $identifierId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $logo_id = $row['shop_logo_id'];
    }

    if ($logo_id) {
        // If record exists, perform an UPDATE operation
        $updateQuery = "UPDATE shop_logo SET ".$whereClause.", image_link = ? WHERE shop_logo_id = ?";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param("isi", $identifierId, $imageLink, $logo_id);

        if ($stmt->execute()) {
            $response['status'] = "success";
            $response['message'] = "Logo updated successfully.";
        } else {
            $response['status'] = "error";
            $response['error'] = "Error updating logo: " . $stmt->error;
        }
    } else {

        if(!$shop_id){
            $shop_id = 0;
        }
        
        // If no record exists, perform an INSERT operation
        $insertQuery = "INSERT INTO shop_logo (shop_id, image_link, user_id) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("isi", $shop_id, $imageLink, $userId);

        if ($stmt->execute()) {
            $response['status'] = "success";
            $response['message'] = "Logo uploaded successfully.";
        } else {
            $response['status'] = "error";
            $response['error'] = "Error uploading logo: " . $stmt->error;
        }
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();

    // Output the response as JSON
    echo json_encode($response);

}

// query staff necessary info
if (isset($inputData['queryStaffDetails'])) {
    global $conn; // Assuming $conn is your database connection

    // Prepare the SQL statement
    $sql = "SELECT lss.laundry_shop_staff_id AS laundry_shop_staff_id, lss.user_id AS user_id, lss.shop_id AS shop_id, 
            s.shop_name AS shop_name, s.shop_address AS shop_address, s.contact_number AS contact_number, 
            s.requirement_status AS requirement_status
            FROM laundry_shop_staff AS lss
            LEFT JOIN shop AS s ON lss.shop_id = s.shop_id 
            WHERE lss.user_id = ? AND s.requirement_status = 'Approved'";

    // Initialize the prepared statement
    $stmt = $conn->prepare($sql);

    // Bind the user_id parameter to the query
    $user_id = $inputData['user_id']; // Replace this with the actual user_id
    $stmt->bind_param("i", $user_id);

    // Execute the statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Fetch all rows
    $laundryShopStaff = $result->fetch_all(MYSQLI_ASSOC);

    // Close the statement and connection
    $stmt->close();
    $conn->close();

    // Check if no results are found
    if (empty($laundryShopStaff)) {
        // Call the clearToken() function if no results are returned
        clearToken();
    } else {
        // Return the result (you can encode as JSON or process as needed)
        echo json_encode($laundryShopStaff);
    }

    
    
}

// check if shop exist
if (isset($inputData['checkIfShopExist'])) {
    // Get the shop_id from the request data
    $shop_id = isset($inputData['shop_id']) ? $inputData['shop_id'] : null;

    if ($shop_id) {
        global $conn; // Assuming $conn is your database connection

        // SQL query to check if the shop exists
        $sql = "SELECT shop_id FROM shop WHERE shop_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $shop_id);
        $stmt->execute();

        // Check if the query found any result
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            // If a record is found
            $response['exists'] = true;
        } else {
            // If no record is found
            $response['exists'] = false;
        }

        $stmt->close();
    } else {
        $response['error'] = "No shop_id provided";
    }

    // Return the response as JSON
    echo json_encode($response);
}

// transaction listener to return the counts
if (isset($inputData['listenToTransaction'])) {
    $userRole = isset($inputData['userRole']) ? $inputData['userRole'] : null;
    $userId = isset($inputData['userId']) ? $inputData['userId'] : null;
    $shop_id = isset($inputData['shop_id']) ? $inputData['shop_id'] : null;

    // Set status condition based on the user role
    if ($userRole === 'Laundry Owner' || $userRole === 'Laundry Staff') {
        $statusCondition = "transaction_status = 'Pending' AND shop_id = '$shop_id'";
    } elseif ($userRole === 'Customer') {
        $statusCondition = "transaction_status IN ('Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up', 'Rejected') AND user_id = '$userId' AND notification_is_read = 'False'";
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid user role']);
        exit;
    }

    // Query for the count only
    $countQuery = "SELECT COUNT(*) AS total_count FROM transactions WHERE $statusCondition";
    $countResult = $conn->query($countQuery);

    if ($countResult) {
        $totalCount = $countResult->fetch_assoc()['total_count'];
        echo json_encode(['status' => 'success', 'total_count' => $totalCount]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to retrieve count']);
    }

    $conn->close();
}

// load the transaction info
if (isset($inputData['queryTransaction'])) {
    $transactionId = $inputData['transactionId'];

    // SQL query with additional LEFT JOINs
    $query = "
        SELECT 
            t.transaction_id, t.shop_id, t.user_id, t.transaction_name, t.transaction_date,
            t.pick_up_date, t.total, t.initial, t.transaction_status, t.clothes_weight, t.service_id,
            t.transaction_changes_other_details, t.notification_is_read, t.last_update_date,

            op.order_products_id, op.order_name, op.product_id AS order_product_id, 
            op.order_date, op.item_quantity,

            dt.discounted_transaction_id, dt.discount_id, dt.discounted_transaction_status,

            p.product_id, p.product_name, p.price AS product_price, p.quantity AS product_quantity, 
            p.image_link, p.product_brand, p.product_status,

            s.service_id AS svc_service_id, s.service_name, s.description AS service_description,
            s.price AS service_price, s.service_status,

            d.discount_id AS disc_discount_id, d.discount_name, d.discount_percent, 
            d.discount_description, d.discount_status,

            u.user_id AS user_id, u.first_name AS first_name, u.last_name AS last_name, 
            u.username AS username, u.email AS email, u.phone_number AS phone_number, 
            u.address AS address, u.position AS position, u.user_activation_status AS user_activation_status

        FROM 
            transactions t
        LEFT JOIN 
            order_products op ON t.transaction_id = op.transaction_id
        LEFT JOIN 
            discounted_transactions dt ON t.transaction_id = dt.transaction_id
        LEFT JOIN 
            product p ON op.product_id = p.product_id
        LEFT JOIN 
            services s ON t.service_id = s.service_id
        LEFT JOIN 
            discount d ON dt.discount_id = d.discount_id
        LEFT JOIN 
            user u ON t.user_id = u.user_id

        WHERE 
            t.transaction_id = ?

    ";

    // Prepare and execute the query
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $transactionId);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    // Initialize an array to store formatted output
    $formattedResult = [];
    
    // Loop through result and format the data
    foreach ($result as $item) {
        // Populate transaction details (only once)
        if (!isset($formattedResult['transaction'])) {
            $formattedResult['transaction'] = [
                'transaction_id' => $item['transaction_id'],
                'shop_id' => $item['shop_id'],
                'user_id' => $item['user_id'],
                'transaction_name' => $item['transaction_name'],
                'transaction_date' => $item['transaction_date'],
                'pick_up_date' => $item['pick_up_date'],
                'total' => $item['total'],
                'initial' => $item['initial'],
                'transaction_status' => $item['transaction_status'],
                'clothes_weight' => $item['clothes_weight'],
                'transaction_changes_other_details' => $item['transaction_changes_other_details'],
                'notification_is_read' => $item['notification_is_read'],
                'last_update_date' => $item['last_update_date']
            ];
        }

        // Add product if not already in the list
        if (!isset($formattedResult['products'])) {
            $formattedResult['products'] = [];
        }

        $productExists = false;
        foreach ($formattedResult['products'] as $product) {
            if ($product['order_products_id'] == $item['order_products_id']) {
                $productExists = true;
                break;
            }
        }

        if (!$productExists) {
            $formattedResult['products'][] = [
                'order_products_id' => $item['order_products_id'],
                'order_name' => $item['order_name'],
                'order_product_id' => $item['order_product_id'],
                'order_date' => $item['order_date'],
                'item_quantity' => $item['item_quantity'],
                'product_id' => $item['product_id'],
                'product_name' => $item['product_name'],
                'product_price' => $item['product_price'],
                'product_quantity' => $item['product_quantity'],
                'image_link' => $item['image_link'],
                'product_brand' => $item['product_brand'],
                'product_status' => $item['product_status']
            ];
        }

        // Add service (assuming it’s the same across items)
        if (!isset($formattedResult['service'])) {
            $formattedResult['service'] = [
                'service_id' => $item['svc_service_id'],
                'service_name' => $item['service_name'],
                'service_description' => $item['service_description'],
                'service_price' => $item['service_price'],
                'service_status' => $item['service_status']
            ];
        }

        // Add discount if not already in the list
        if (!isset($formattedResult['discounts'])) {
            $formattedResult['discounts'] = [];
        }

        $discountExists = false;
        foreach ($formattedResult['discounts'] as $discount) {
            if ($discount['discount_id'] == $item['discount_id']) {
                $discountExists = true;
                break;
            }
        }

        if (!$discountExists) {
            $formattedResult['discounts'][] = [
                'discounted_transaction_id' => $item['discounted_transaction_id'],
                'discount_id' => $item['discount_id'],
                'discounted_transaction_status' => $item['discounted_transaction_status'],
                'discount_name' => $item['discount_name'],
                'discount_percent' => $item['discount_percent'],
                'discount_description' => $item['discount_description'],
                'discount_status' => $item['discount_status']
            ];
        }

        // Populate user details (only once)
        if (!isset($formattedResult['user'])) {
            $formattedResult['user'] = [
                'user_id' => $item['user_id'],
                'first_name' => $item['first_name'],
                'last_name' => $item['last_name'],
                'username' => $item['username'],
                'email' => $item['email'],
                'phone_number' => $item['phone_number'],
                'address' => $item['address'],
                'position' => $item['position'],
                'user_activation_status' => $item['user_activation_status']
            ];
        }
    }

    // Output the formatted result as JSON
    echo json_encode($formattedResult, JSON_PRETTY_PRINT);
}

// order product common dmls
if (isset($inputData['orderProductsCommonDml'])) {

    if (isset($inputData['queryDml']) && $inputData['queryDml'] === true) {
        // Capture input data
        $transactionId = $inputData['transaction_id'] ?? null;
        $productId = $inputData['product_id'] ?? null;
    
        // Query for order products based on transaction_id and product_id
        $sql = "SELECT `order_products_id`, `order_name`, `transaction_id`, `product_id`, `order_date`, `item_quantity`
                FROM `order_products`
                WHERE `transaction_id` = ? AND `product_id` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $transactionId, $productId);
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            $data = $result->fetch_all(MYSQLI_ASSOC);
    
            $response = [
                'status' => 'query success',
                'message' => 'Data retrieved successfully',
                'data' => $data
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Query failed: ' . $stmt->error
            ];
        }
    } elseif (isset($inputData['updateDml']) && $inputData['updateDml'] === true) {
        // Capture input data
        $orderProductId = $inputData['order_products_id'] ?? null;
        $orderName = $inputData['order_name'] ?? null;
        $transactionId = $inputData['transaction_id'] ?? null;
        $productId = $inputData['product_id'] ?? null;
        $orderDate = $inputData['order_date'] ?? null;
        $itemQuantity = $inputData['item_quantity'] ?? null;
        $addQuantity = isset($inputData['addQuantity']) && $inputData['addQuantity'] !== '' ? $inputData['addQuantity'] : null;
    
        // Build update fields dynamically based on non-null and non-empty fields
        $updateFields = [];
        $params = [];
        $types = '';
    
        if ($orderName !== null) {
            $updateFields[] = "order_name = ?";
            $params[] = $orderName;
            $types .= 's';
        }
        if ($transactionId !== null) {
            $updateFields[] = "transaction_id = ?";
            $params[] = $transactionId;
            $types .= 'i';
        }
        if ($productId !== null && $addQuantity == null) {
            $updateFields[] = "product_id = ?";
            $params[] = $productId;
            $types .= 'i';
        }
        if ($orderDate !== null) {
            $updateFields[] = "order_date = ?";
            $params[] = $orderDate;
            $types .= 's';
        }
        if ($itemQuantity !== null) {
            $updateFields[] = "item_quantity = ?";
            $params[] = $itemQuantity;
            $types .= 'i';
        }

        if ($addQuantity !== null) {
            $updateFields[] = "item_quantity = item_quantity + ?";
            $params[] = $addQuantity;
            $types .= 'i';
        }
    
        if (count($updateFields) > 0 && $orderProductId !== null) {
            $updateClause = implode(", ", $updateFields);
            $sql = "UPDATE `order_products` SET $updateClause WHERE `order_products_id` = ?";
            $params[] = $orderProductId;
            $types .= 'i';
    
            $stmt = $conn->prepare($sql);
            $stmt->bind_param($types, ...$params);
    
            if ($stmt->execute()) {
                $response = [
                    'status' => 'success',
                    'message' => 'Order product updated successfully'
                ];

                if($addQuantity !== null){
                    // Update product quantity in the product table
                    $updateQuantitySql = "UPDATE `product` 
                    SET `quantity` = `quantity` - $addQuantity 
                    WHERE `product_id` = '$productId'";

                    if ($conn->query($updateQuantitySql) === TRUE) {
                        $response = [
                        'status' => 'success',
                        'message' => 'Order product updated successfully and product quantity subracted.'
                        ];
                    } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Quantity update failed: ' . $conn->error
                        ];
                    }
                }

            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Update failed: ' . $stmt->error
                ];
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'No fields to update or order_products_id missing.'
            ];
        }
    }
    
    // Output the response as JSON
    echo json_encode($response);
}

// Insert rating
if (isset($inputData['insertRating']) && $inputData['insertRating'] === true) {
    // Capture input data
    $ratingCreatedDate = $inputData['rating_created_date'] ?? null;
    $rate = $inputData['rate'] ?? null;
    $comment = $inputData['comment'] ?? null;
    $shopId = $inputData['shop_id'] ?? null; // Assume `shop_id` and `user_id` are sent or available through session.
    $userId = $inputData['user_id'] ?? null;

    // Check required fields
    if ($shopId && $userId && $rate !== null && $ratingCreatedDate) {
        // Insert statement
        $sql = "INSERT INTO `shop_rating` (`shop_id`, `user_id`, `rate`, `comment`, `rating_created_date`) 
                VALUES ('$shopId', '$userId', '$rate', '$comment', '$ratingCreatedDate')";

        if ($conn->query($sql) === TRUE) {
            $newRatingId = $conn->insert_id; // Capture the ID of the newly inserted record

            // Now calculate the overall rating for the shop
            $query = "SELECT AVG(rate) AS overall_rating FROM `shop_rating` WHERE `shop_id` = '$shopId'";
            $result = $conn->query($query);

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $overallRating = round($row['overall_rating'], 2); // Compute average and round to 2 decimal places

                // Update the shop's overall rating
                $updateSql = "UPDATE `shop` SET `overall_rating` = '$overallRating' WHERE `shop_id` = '$shopId'";
                if ($conn->query($updateSql) === TRUE) {
                    $response = [
                        'status' => 'success',
                        'message' => 'Rating inserted successfully and overall rating updated.',
                        'shop_rating_id' => $newRatingId,
                        'overall_rating' => $overallRating, // Include the new overall rating
                    ];
                } else {
                    $response = [
                        'status' => 'error',
                        'message' => 'Failed to update shop overall rating: ' . $conn->error
                    ];
                }
            } else {
                $response = [
                    'status' => 'error',
                    'message' => 'Failed to calculate overall rating'
                ];
            }
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Insertion failed: ' . $conn->error
            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Missing required fields'
        ];
    }

    // Output response as JSON
    echo json_encode($response);
}

if(isset($inputData['sendSMS'])){

    $message = isset($inputData['message']) ? $inputData['message'] : null;
    $cusomerIdUsed = isset($inputData['cusomerIdUsed']) ? $inputData['cusomerIdUsed'] : null;

    if($message !== null && $cusomerIdUsed !== null){
        $response = sms_api($message, $cusomerIdUsed);
    }
    else{
        $response = [
            'status' => 'error',
            'message' => 'Missing required fields'
        ];
    }

    echo json_encode($response);
}

if(isset($inputData['sendEmail'])){
    $response = getEmailApiConfig();
    echo json_encode($response);
}



?>