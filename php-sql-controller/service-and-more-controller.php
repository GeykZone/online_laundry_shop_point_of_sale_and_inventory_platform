<?php

include ('../connection/connect.php');

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


?>
