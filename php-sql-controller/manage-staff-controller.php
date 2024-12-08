<?php 

include ('../connection/connect.php');

// Database connection info 
$dbDetails = array( 
    'host' => $hostname, 
    'user' => $username , 
    'pass' => $password, 
    'db'   => $database
); 

// to insert new staff
if(isset($inputData['addStaff'])){

    // Database connection
    global $conn; // Ensure your global connection is active

    // Data to insert (you can replace these values or get them from POST request)
    $userId = $conn->real_escape_string($inputData['user_id']);
    $shopId = $conn->real_escape_string($inputData['shop_id']);

    // Prepare the SQL query for insertion
    $sql = "INSERT INTO laundry_shop_staff (user_id, shop_id) VALUES ('$userId', '$shopId')";

    // Execute the query and check for success
    if ($conn->query($sql) === TRUE) {
        // Get the last inserted ID
        $insertId = $conn->insert_id;
        
        // Return the inserted ID as a response
        $response = array('insert_id' => $insertId);
    } else {
        // Handle error
        $response = array('error' => "Error: " . $conn->error);
    }

    // Close the connection
    $conn->close();

    // Return the response as JSON
    echo json_encode($response);

}

// show the list of laundry shop staff through table
if(isset($_GET['showStaffList'])){

    // DB table to use 
    $table = 'laundry_shop_staff'; 

    $shop_id = $_GET['shop_id'];

    // Table's primary key 
    $primaryKey = 'laundry_shop_staff_id';
    
    // Array of database columns which should be read and sent back to DataTables.
    // The `db` parameter represents the column name in the database.
    // The `dt` parameter represents the DataTables column identifier.
    $columns = array(
        array('db' => '(u.user_id)', 'dt' => 0, 'field' => 'user_id'),
        array('db' => 'first_name', 'dt' => 1, 'field' => 'first_name'),
        array('db' => 'last_name', 'dt' => 2, 'field' => 'last_name'),
        array('db' => 'username', 'dt' => 3, 'field' => 'username'),
        array('db' => 'email', 'dt' => 4, 'field' => 'email'),
        array('db' => 'phone_number', 'dt' => 5, 'field' => 'phone_number'),
        array('db' => 'address', 'dt' => 6, 'field' => 'address'),
        array('db' => 'user_activation_status', 'dt' => 7, 'field' => 'user_activation_status'),
        array('db' => 'active_status', 'dt' => 8, 'field' => 'active_status'),
    );
    
    // Include SQL query processing class 
    require 'ssp.class.php'; 

    $joinQuery = ",  u.active_status AS active_status, u.user_id AS user_id, u.first_name AS first_name, u.last_name AS last_name, u.username AS username, 
    u.email AS email, u.phone_number AS phone_number,  u.position AS position, u.address AS address, u.user_activation_status AS user_activation_status  
    FROM `{$table}` AS lss 
    LEFT JOIN user AS u ON lss.user_id = u.user_id 
    LEFT JOIN shop AS s ON lss.shop_id = s.shop_id ";
    $where = " u.position = 'Laundry Staff'  AND lss.shop_id = '{$shop_id}'";

    // Output data as json format 
    echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where) );
}

?>