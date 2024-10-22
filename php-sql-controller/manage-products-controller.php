<?php 

include ('../connection/connect.php');

// Database connection info 
$dbDetails = array( 
    'host' => $hostname, 
    'user' => $username, 
    'pass' => $password, 
    'db'   => $database
); 

// insert new laundry shop Product
if(isset($inputData['submitLaundryShopProduct'])){
    global $conn;

    // Data to insert or update (replace with actual values or POST data)
    $productName = isset($inputData['productName']) && $inputData['productName'] !== '' ? $inputData['productName'] : null;
    $productBrand = isset($inputData['productBrand']) && $inputData['productBrand'] !== '' ? $inputData['productBrand'] : null;
    $productPrice = isset($inputData['productPrice']) && $inputData['productPrice'] !== '' ? $inputData['productPrice'] : null;
    $productQuantity = isset($inputData['productQuantity']) && $inputData['productQuantity'] !== '' ? $inputData['productQuantity'] : null;
    $imageLink = isset($inputData['imageLink']) && $inputData['imageLink'] !== '' ? $inputData['imageLink'] : null;
    $shop_id = isset($inputData['shop_id']) && $inputData['shop_id'] !== '' ? $inputData['shop_id'] : null;
    $productStatus = isset($inputData['productStatus']) && $inputData['productStatus'] !== '' ? $inputData['productStatus'] : null;
    $product_id = isset($inputData['product_id']) && $inputData['product_id'] !== '' ? $inputData['product_id'] : null; 
    
    if ($product_id) {
        $service_status = isset($inputData['service_status']) && $inputData['service_status'] !== '' ? $inputData['service_status'] : null;
    
        // Dynamically build the SET clause based on non-null and non-empty fields
        $setClause = [];
        $params = [];
        $types = '';
    
        if ($productName !== null) {
            $setClause[] = "product_name = ?";
            $params[] = $productName;
            $types .= 's';
        }
        if ($productPrice !== null) {
            $setClause[] = "price = ?";
            $params[] = $productPrice;
            $types .= 'i';
        }
        if ($productQuantity !== null) {
            $setClause[] = "quantity = ?";
            $params[] = $productQuantity;
            $types .= 'i';
        }
        if ($imageLink !== null) {
            $setClause[] = "image_link = ?";
            $params[] = $imageLink;
            $types .= 's';
        }
        if ($productBrand !== null) {
            $setClause[] = "product_brand = ?";
            $params[] = $productBrand;
            $types .= 's';
        }
        if ($productStatus !== null) {
            $setClause[] = "product_status = ?";
            $params[] = $productStatus;
            $types .= 's';
        }
    
        // Only proceed with the update if there are fields to update
        if (count($setClause) > 0) {
            $setClauseString = implode(", ", $setClause);
            $sql = "UPDATE product SET $setClauseString WHERE shop_id = ? AND product_id = ?";
    
            // Add shop_id and product_id to the params array
            $params[] = $shop_id;
            $params[] = $product_id;
            $types .= 'ii';
    
            $stmt = $conn->prepare($sql);
            $stmt->bind_param($types, ...$params);
    
            if ($stmt->execute()) {
                $response['message'] = "Product updated successfully";
            } else {
                $response['error'] = "Error: " . $stmt->error;
            }
        } else {
            $response['error'] = "No fields to update.";
        }
    
    } else {
        // If no product_id is provided, perform an INSERT
        $sql = "INSERT INTO `product`(`product_name`, `price`, `quantity`, `image_link`, `product_brand`, `shop_id`) 
                VALUES (?, ?, ?, ?, ?, ?)";
    
        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("siissi", $productName, $productPrice, $productQuantity, $imageLink, $productBrand, $shop_id);
    
        // Execute the statement
        if ($stmt->execute()) {
            // Get the last inserted ID
            $last_id = $conn->insert_id;
            $response['insert_id'] = $last_id;
        } else {
            $response['error'] = "Error: " . $stmt->error;
        }
    }
    
    // Close the connection
    $stmt->close();
    $conn->close();
    
    echo json_encode($response);
       
    
}

// Show the laundry shop Product List
if (isset($_GET['showLaundryProductList'])) {
    $shop_id = $_GET['shop_id'];

    // DB table to use 
    $table = 'product'; 

    // Table's primary key 
    $primaryKey = 'product_id';

    // Array of database columns which should be read and sent back to DataTables.
    $columns = array(
        array('db' => 'product_id', 'dt' => 0, 'field' => 'product_id'), // Removed trailing space
        array('db' => 'image_link', 'dt' => 1, 'field' => 'image_link'),
        array('db' => 'product_name', 'dt' => 2, 'field' => 'product_name'),
        array('db' => 'product_brand', 'dt' => 3, 'field' => 'product_brand'),
        array('db' => 'quantity', 'dt' => 4, 'field' => 'quantity'),
        array('db' => 'price', 'dt' => 5, 'field' => 'price', 'formatter' => function($d, $row) {
            return formatCurrency($d);
        }),
        array('db' => 'product_status', 'dt' => 6, 'field' => 'product_status'),
    );

    // Include SQL query processing class 
    require 'ssp.class.php';

    // SQL Join and Where conditions, ensuring correct structure
    $joinQuery = ", product_id, product_name, price, quantity, image_link, product_brand, shop_id, product_status FROM `{$table}`";  // No need for join if you're just selecting from one table
    $where = "shop_id = '$shop_id'";

    // Output data as json format 
    echo json_encode(SSP::simple($_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where));
}


?>