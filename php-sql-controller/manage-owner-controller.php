<?php

include ('../connection/connect.php');

// Database connection info 
$dbDetails = array( 
    'host' => $hostname, 
    'user' => $username , 
    'pass' => $password, 
    'db'   => $database
); 

// show the list of laundry owner through table
if(isset($_GET['showLaundryOwnerList'])){

    // DB table to use 
    $table = 'user'; 

    // Table's primary key 
    $primaryKey = 'user_id';
    
    // Array of database columns which should be read and sent back to DataTables.
    // The `db` parameter represents the column name in the database.
    // The `dt` parameter represents the DataTables column identifier.
    $columns = array(
        array('db' => 'user_id', 'dt' => 0, 'field' => 'user_id'),
        array('db' => 'first_name', 'dt' => 1, 'field' => 'first_name'),
        array('db' => 'last_name', 'dt' => 2, 'field' => 'last_name'),
        array('db' => 'username', 'dt' => 3, 'field' => 'username'),
        array('db' => 'email', 'dt' => 4, 'field' => 'email'),
        array('db' => 'phone_number', 'dt' => 5, 'field' => 'phone_number'),
        array('db' => 'address', 'dt' => 6, 'field' => 'address'),
        array('db' => 'user_activation_status', 'dt' => 7, 'field' => 'user_activation_status'),
    );
    
    // Include SQL query processing class 
    require 'ssp.class.php'; 

    $joinQuery = ", user_id, first_name, last_name, username, email, phone_number, address, user_activation_status FROM `{$table}`";
    $where = " position = 'Laundry Owner'";

    // Output data as json format 
    echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where) );
}

// update the laundry owner activation status
if(isset($inputData['activateDeactivateLaundryOwner'])){

    $laundryOwnerId = $inputData['laundryOwnerId'];
    $updatedActivationStatus = $inputData['updatedActivationStatus'];

    // Prepare an update statement
    $user_id = $laundryOwnerId; // Set your specific user_id 
    $new_status = $updatedActivationStatus; // Set the new activation status

    $sql = "UPDATE `user` 
            SET `user_activation_status` = ? 
            WHERE `user_id` = ?";

    if ($stmt = $conn->prepare($sql)) {
        // Bind parameters (s = string, i = integer, etc.)
        $stmt->bind_param("si", $new_status, $user_id);
        
        // Execute the statement
        if ($stmt->execute()) {
            $response = "User activation status updated successfully.";
        } else {
            $response = "Error updating user: " . $conn->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        $response =  "Error preparing the statement: " . $conn->error;
    }

    // Close the connection
    $conn->close();

    echo json_encode($response);

}

?>