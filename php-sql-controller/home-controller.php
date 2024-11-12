<?php 

include ('../connection/connect.php');

if (isset($inputData['queryShops'])) {
    // Database connection
    global $conn;

    $limit = 100; // Number of shops to fetch per request
    $page = isset($inputData['page']) ? (int)$inputData['page'] : 1; // Page number from JS
    $offset = ($page - 1) * $limit; // Calculate the offset

    // Start building the SQL query
    $sql = "SELECT s.shop_id AS shop_id,
                   s.shop_name AS shop_name, 
                   s.shop_address AS shop_address, 
                   s.contact_number AS contact_number, 
                   s.user_id AS user_id, 
                   s.requirement_status  AS requirement_status,
                   s.overall_rating  AS overall_rating,
                   s.days_open, s.open_time, s.close_time, s.additional_schedule_details,
                   sl.image_link AS image_link
            FROM shop AS s
            LEFT JOIN shop_logo AS sl ON s.shop_id = sl.shop_id
            WHERE s.shop_id != 0 AND s.requirement_status = 'Approved'";

    // Check if 'shop_id' is provided and add to WHERE clause
    if (isset($inputData['shop_id'])) {
        $shopId = (int)$inputData['shop_id'];
        $sql .= " AND s.shop_id = $shopId";
    }

    // Check if 'user_id' is provided and add to WHERE clause
    if (isset($inputData['user_id'])) {
        $userId = (int)$inputData['user_id'];
        $sql .= " AND s.user_id = $userId";
    }

    // Order by overall_rating in descending order
    $sql .= " ORDER BY s.overall_rating DESC";

    // Apply pagination
    $sql .= " LIMIT $limit OFFSET $offset";

    // Execute the query
    $result = $conn->query($sql);

    // Fetch the results as an associative array
    $shops = $result->fetch_all(MYSQLI_ASSOC);

    // Send the result as JSON
    echo json_encode($shops);
}


?>
