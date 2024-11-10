<?php

include ('../connection/connect.php');

// Database connection info 
$dbDetails = array( 
    'host' => $hostname, 
    'user' => $username , 
    'pass' => $password, 
    'db'   => $database
); 

// show the list of laundry shop staff through table
if(isset($_GET['showCostumerTransaction'])){

    // DB table to use 
    $table = 'transactions'; 

    $shop_id = isset($_GET['shop_id']) ? $_GET['shop_id'] : null;
    $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
    $position = isset($_GET['position']) ? $_GET['position'] : null;
    $isForNotification = isset($_GET['isForNotification']) ? $_GET['isForNotification'] : null;

    // Table's primary key 
    $primaryKey = 'transaction_id';
    
    // Array of database columns which should be read and sent back to DataTables.
    // The `db` parameter represents the column name in the database.
    // The `dt` parameter represents the DataTables column identifier.
    $columns = array(
        array('db' => 'transaction_id', 'dt' => 0, 'field' => 'transaction_id'),
        array('db' => 'username', 'dt' => 1, 'field' => 'username'),
        array('db' => 'shop_name', 'dt' => 2, 'field' => 'shop_name'),
        array('db' => 'service_name', 'dt' => 3, 'field' => 'service_name'),
        array('db' => 'total', 'dt' => 4, 'field' => 'total'),
        array('db' => 'transaction_status', 'dt' => 5, 'field' => 'transaction_status'),
        array('db' => 'transaction_date', 'dt' => 6, 'field' => 'transaction_date'),
        array('db' => 'pick_up_date', 'dt' => 7, 'field' => 'pick_up_date'),
        array('db' => 'last_update_date', 'dt' => 8, 'field' => 'last_update_date'),
    );
    
    // Include SQL query processing class 
    require 'ssp.class.php'; 

    $joinQuery = ", u.username AS username, s.shop_name AS shop_name, sv.service_name AS service_name, ts.total AS total, ts.transaction_status AS transaction_status,
    ts.transaction_date AS transaction_date, ts.pick_up_date AS pick_up_date, ts.last_update_date AS last_update_date, ts.notification_is_read AS notification_is_read
    FROM `{$table}` AS ts 
    LEFT JOIN user AS u ON ts.user_id = u.user_id 
    LEFT JOIN shop AS s ON ts.shop_id = s.shop_id 
    LEFT JOIN services AS sv ON ts.service_id = sv.service_id ";

    if($position == 'Customer'){
        $where = " u.user_id = '{$userId}'";

        if($isForNotification){
            $where = " u.user_id = '{$userId}' AND transaction_status IN ('Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Rejected', 'Picked-Up') AND ts.notification_is_read = 'False'";
        }
    }
    else{
        $where = " s.shop_id = '{$shop_id}'";

        if($isForNotification){
            $where = " s.shop_id = '{$shop_id}' AND transaction_status = 'Pending'";
        }
    }
    

    // Output data as json format 
    echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where) );
}

?>