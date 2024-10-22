<?php 

include ('../connection/connect.php');

if(isset($inputData['queryShops'])){
    // Database connection
    global $conn;

    $limit = 100; // Number of shops to fetch per request
    $page = isset($inputData['page']) ? (int)$inputData['page'] : 1; // Page number from JS
    $offset = ($page - 1) * $limit; // Calculate the offset

    // SQL query to fetch shops
    $sql = "SELECT s.shop_id AS shop_id,
                   s.shop_name AS shop_name, 
                   s.shop_address AS shop_address, 
                   s.contact_number AS contact_number, 
                   s.user_id AS user_id, 
                   s.requirement_status  AS requirement_status,
                   days_open, open_time, close_time, additional_schedule_details,
                   sl.image_link AS image_link
            FROM shop AS s
            LEFT JOIN shop_logo AS sl ON s.shop_id = sl.shop_id  
            WHERE s.shop_id != 0 AND s.requirement_status = 'Approved'
            LIMIT $limit OFFSET $offset";
    $result = $conn->query($sql);

    // Fetch the results as an associative array
    $shops = $result->fetch_all(MYSQLI_ASSOC);

    // Send the result as JSON
    echo json_encode($shops);
}
?>
