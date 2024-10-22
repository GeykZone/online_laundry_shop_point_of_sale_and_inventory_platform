<?php

include ('../connection/connect.php');

// Database connection info 
$dbDetails = array( 
    'host' => $hostname, 
    'user' => $username, 
    'pass' => $password, 
    'db'   => $database
); 

// insert new laundry shop service
if(isset($inputData['submitLaundryShopService'])){

    global $conn;

    // Data to insert or update (replace with actual values or POST data)
    $serviceName = isset($inputData['serviceName']) ? $inputData['serviceName'] : null;
    $serviceDescription = isset($inputData['serviceDescription']) ? $inputData['serviceDescription'] : null;
    $servicePrice = isset($inputData['servicePrice']) ? $inputData['servicePrice'] : null;
    $shop_id = isset($inputData['shop_id']) ? $inputData['shop_id'] : null;
    $service_id = isset($inputData['service_id']) ? $inputData['service_id'] : null; // Check if service_id is provided
    
    if ($service_id) {

        $service_status = isset($inputData['service_status']) ? $inputData['service_status'] : null;

        $sql = "UPDATE services SET service_name = ?, description = ?, price = ?, service_status = ? WHERE shop_id = ? AND service_id = ?";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssisii", $serviceName, $serviceDescription, $servicePrice, $service_status, $shop_id, $service_id);
    
        if ($stmt->execute()) {
            $response['message'] = "Service updated successfully";
        } else {
            $response['error'] = "Error: " . $stmt->error;
        }

    } else {
        // If no shop_id is provided, perform an INSERT
        $sql = "INSERT INTO services (service_name, description, price, shop_id) VALUES (?, ?, ?, ?)";
    
        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssii", $serviceName, $serviceDescription, $servicePrice, $shop_id);
    
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

// show the laundry shop details
if(isset($_GET['showLaundryServiceList'])){

    $shop_id = $_GET['shop_id'];

    // DB table to use 
    $table = 'services'; 

    // Table's primary key 
    $primaryKey = 'service_id';
    
    // Array of database columns which should be read and sent back to DataTables.
    // The `db` parameter represents the column name in the database.
    // The `dt` parameter represents the DataTables column identifier.
    $columns = array(
        array('db' => 'service_id', 'dt' => 0, 'field' => 'service_id'),
        array('db' => 'service_name', 'dt' => 1, 'field' => 'service_name'),
        array('db' => 'description', 'dt' => 2, 'field' => 'description'),
        array('db' => 'price', 'dt' => 3, 'field' => 'price', 'formatter' => function($d, $row) {return formatCurrency($d);}),
        array('db' => 'service_status', 'dt' => 4, 'field' => 'service_status'),
    );
    
    // Include SQL query processing class 
    require 'ssp.class.php'; 

    $joinQuery = ",  `service_id`, `service_name`, `description`, `price`, `service_status` FROM `{$table}`";
    $where = " `shop_id` = '$shop_id' ";

    // Output data as json format 
    echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where) );
}

// query service from spicific shop
if(isset($inputData['queryServicesFromSpicificShop'])){

    // Database connection
    global $conn; 

    // Set the shop_id (replace this with actual value or parameter from user input)
    $shop_id = $inputData['shop_id'];

    // Prepare the SQL query
    $sql = "SELECT `service_id`, `service_name`, `description`, `price`, `shop_id` 
            FROM `services` 
            WHERE `shop_id` = ? AND `service_status` = 'Active'";

    // Prepare the statement
    $stmt = $conn->prepare($sql);

    // Bind the shop_id parameter to the SQL statement
    $stmt->bind_param("i", $shop_id);

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    // Fetch all rows and store them in an array
    if ($result->num_rows > 0) {
        // Fetch all rows and store them in an array
        $serviceList = array();
        
        while($row = $result->fetch_assoc()) {
            $serviceList[] = $row;
        }

        // Return the data as JSON
        echo json_encode($serviceList);
    } else {
        // No results found
        echo json_encode([]);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
  
}

// show the discount table
if(isset($_GET['showDiscountList'])){

    // DB table to use 
    $table = 'discount'; 

    // Table's primary key 
    $primaryKey = 'discount_id';

    $shop_id = $_GET['shop_id'];
    
    // Array of database columns which should be read and sent back to DataTables.
    // The `db` parameter represents the column name in the database.
    // The `dt` parameter represents the DataTables column identifier.
    $columns = array(
        array('db' => 'discount_id', 'dt' => 0, 'field' => 'discount_id'),
        array('db' => 'discount_name', 'dt' => 1, 'field' => 'discount_name'),
        array('db' => 'discount_percent', 'dt' => 2, 'field' => 'discount_percent'),
        array('db' => 'discount_description', 'dt' => 3, 'field' => 'discount_description'),
        array('db' => 'discount_status', 'dt' => 4, 'field' => 'discount_status'),
    );
    
    // Include SQL query processing class 
    require 'ssp.class.php'; 

    $joinQuery = ",  `discount_name`, `discount_percent`, `discount_description`, `discount_status` `shop_id` FROM `{$table}`";
    $where = " `shop_id` = '{$shop_id}'";

    // Output data as json format 
    echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where) );
}

// upsert discount details
if(isset($inputData['discountUpsert'])){

    global $conn; // Assuming $conn is your database connection

    // Sample input variables
    $id = isset($inputData['id']) ? $inputData['id'] : null;
    $discount_status = isset($inputData['discount_status']) ? $inputData['discount_status'] : null;
    $discount_name = $conn->real_escape_string($inputData['discount_name']);
    $discount_percent = $conn->real_escape_string($inputData['discount_percent']);
    $discount_description = $conn->real_escape_string($inputData['discount_description']);

    // If $id and $discount_status exist, update only the discount_status
    if ($id && $discount_status) {
        $sql = "UPDATE discount SET discount_status = ? WHERE discount_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $discount_status, $id);
        
        if ($stmt->execute()) {
            $response = "Discount status updated successfully.";
        } else {
            $response = "Error updating discount status: " . $conn->error;
        }
        $stmt->close();

    // If only $id exists, update all fields except discount_status
    } elseif ($id) {
        $sql = "UPDATE discount SET discount_name = ?, discount_percent = ?, discount_description = ? WHERE discount_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $discount_name, $discount_percent, $discount_description, $id);
        
        if ($stmt->execute()) {
            $response = "Discount details updated successfully.";
        } else {
            $response = "Error updating discount details: " . $conn->error;
        }
        $stmt->close();

    // If neither $id nor $discount_status exist, insert a new record
    } else {
        $shop_id = isset($inputData['shop_id']) ? $inputData['shop_id'] : null;
        $sql = "INSERT INTO discount (discount_name, discount_percent, discount_description, shop_id) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi", $discount_name, $discount_percent, $discount_description, $shop_id);
        
        if ($stmt->execute()) {
            $response = "Discount successfully inserted.";
        } else {
            $response = "Error inserting discount: " . $conn->error;
        }
        $stmt->close();
    }

    $conn->close();

    // Output the response
    echo json_encode($response);


}



?>