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

?>
