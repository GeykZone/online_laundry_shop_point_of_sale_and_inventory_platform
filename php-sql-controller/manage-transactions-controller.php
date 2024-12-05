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
        array('db' => " CONCAT(u.first_name, ' ', u.last_name)", 'dt' => 1, 'field' => 'full_name'),
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

    $joinQuery = ", CONCAT(u.first_name, ' ', u.last_name) AS full_name,  u.username AS username, s.shop_name AS shop_name, sv.service_name AS service_name, ts.total AS total, ts.transaction_status AS transaction_status,
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


// Show the list of transactions if 'showTransactionReport' is set in the GET request
if (isset($_GET['showTransactionReport'])) {

    // Create a new connection to the database
    $mysqli = new mysqli($dbDetails['host'], $dbDetails['user'], $dbDetails['pass'], $dbDetails['db']);

    // Check connection
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }

    $reportYear = $_GET['reportYear'];
    $SalesType = $_GET['SalesType']; // eg. Daily, Monthly, Weekly
    $shop_id = $_GET['shop_id'];

    // Determine grouping and date format based on SalesType
    if ($SalesType === 'Daily') {
        $dateFormat = "%Y-%m-%d";
        $groupBy = "DATE(transaction_date)";
    } elseif ($SalesType === 'Weekly') {
        $dateFormat = "%Y-%u"; // %u for week number
        $groupBy = "YEARWEEK(transaction_date)";
    } else { // Default to Monthly
        $dateFormat = "%Y-%m";
        $groupBy = "DATE_FORMAT(transaction_date, '%Y-%m')";
    }

    // SQL query to fetch data with dynamic grouping
    $sql = "
        SELECT 
            DATE_FORMAT(transaction_date, '$dateFormat') AS period,
            SUM(total) AS total_sum,
            COUNT(transaction_id) AS transaction_count,
            AVG(total) AS average_total
        FROM transactions
        WHERE YEAR(transaction_date) = $reportYear
        AND shop_id = $shop_id
        AND transaction_status IN ('Approved', 'In-Progress', 'Ready-to-Pick-Up', 'Picked-Up') 
        GROUP BY $groupBy
        ORDER BY period
    ";

    // Executing the SQL query
    $result = $mysqli->query($sql);

    // Preparing the data to be returned in JSON format
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = array(
            $row['period'],               // Grouped period (formatted date)
            $row['total_sum'],            // Sum of total
            $row['transaction_count'],    // Count of transactions
            $row['average_total']         // Average of total
        );
    }

    // Output the processed data as a JSON response
    echo json_encode(array(
        "draw"            => isset($_GET['draw']) ? $_GET['draw'] : 1,  // DataTables draw count
        "recordsTotal"    => count($data),                              // Total records
        "recordsFiltered" => count($data),                              // Filtered records (same as total in this case)
        "data"            => $data                                       // Data to be displayed
    ));

    // Close the database connection
    $mysqli->close();
}


?>