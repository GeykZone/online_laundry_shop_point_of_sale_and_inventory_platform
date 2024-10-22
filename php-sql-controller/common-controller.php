<?php 

include ('../connection/connect.php');

// function to clear the login token
function clearToken(){
    $expirationTime = time() - 3600;
    $cookieName = 'laundryLoginToken';
    setcookie($cookieName, '', $expirationTime, "/");
    echo json_encode('login.php');
}

// delete the login token if it is already expired
if (isset($inputData['check_login_token'])){
    // Set the time zone to Philippines
    date_default_timezone_set('Asia/Manila');
    $currentDatedatetime = date('Y-m-d H:i:s');
    $response;

    $searchTokenSql = "SELECT `login_token_id`, `token`, `expiration_date` FROM `login_token` WHERE DATE(`expiration_date`) <= ?";
    $stmt = $conn->prepare($searchTokenSql);
    $stmt->bind_param("s", $currentDatedatetime);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        
        $deleteSql = "DELETE FROM `login_token` WHERE DATE(`expiration_date`) <= ?";
        $deleteStmt = $conn->prepare($deleteSql);
        $response = 'login_token_deleted';

        if ($deleteStmt === false) {
            $response = 'login_token_deletion_failed';
            die("Failed to prepare the DELETE statement: " . $conn->error);
        }
        
        $deleteStmt->bind_param("s", $currentDatedatetime);
        $deleteStmt->execute();
    }
    else {
        $response = 'no_deletable_token_found';
    }

    echo json_encode($response);
}

// route the page to login or stay in page if the user is logged in or not
if (isset($inputData['page_route'])) {

    $response;

    if (!isset($_COOKIE['laundryLoginToken'])) {  
        echo json_encode('login.php');
    }
    else if(isset($_COOKIE['laundryLoginToken'])) {
      $laundryLoginToken = $_COOKIE['laundryLoginToken'];
      // SQL query with INNER JOIN and WHERE clause
        $selectUserSql = "
        SELECT 
           *
        FROM 
            user AS us
        LEFT JOIN 
            login_token AS lt
            ON us.user_id = lt.user_id
        WHERE 
            lt.token = ?
        ";
        
      $stmt = $conn->prepare($selectUserSql);
      $stmt->bind_param("s", $laundryLoginToken);
      
       // Execute the query
        $stmt->execute();
        $result = $stmt->get_result();
        
        // Check if there are any results
        if ($result->num_rows > 0) {
            // Loop through the results
            while ($row = $result->fetch_assoc()) {
                $response['user_id'] = (isset($row['user_id']) ? $row['user_id'] : null);
                $response['first_name'] = (isset($row['first_name']) ? $row['first_name'] : null);
                $response['last_name'] = (isset($row['last_name']) ? $row['last_name'] : null);
                $response['username'] = (isset($row['username']) ? $row['username'] : null);
                $response['email'] = (isset($row['email']) ? $row['email'] : null);
                $response['phone_number'] = (isset($row['phone_number']) ? $row['phone_number'] : null);
                $response['address'] = (isset($row['address']) ? $row['address'] : null);
                $response['user_activation_status'] = (isset($row['user_activation_status']) ? $row['user_activation_status'] : null);
                $response['position'] = (isset($row['position']) ? $row['position'] : null);
                $response['login_token_id'] = (isset($row['login_token_id']) ? $row['login_token_id'] : null);
                $response['token'] = (isset($row['token']) ? $row['token'] : null);
                $response['expiration_date'] = (isset($row['expiration_date']) ? $row['expiration_date'] : null);
            }

            $userId = $response['user_id'];
            $userPosition = $response['position'];
            $activationStatus =  $response['user_activation_status'];
    
            if($userId != 0 && ($userPosition != 'Admin' || $userPosition != 'Customer') && $activationStatus == 'Inactive'){
                clearToken();
            }
            else{
                echo json_encode($response);
            }

        } else {

            clearToken();
        }
    
    }

}

// query shop logo
if (isset($inputData['query_shop_logo'])) {

    $response;

    if( isset($inputData['isShopView'])) {
        $shop_id = $inputData['shop_id'];
        // SQL query with INNER JOIN and WHERE clause
          $selectUserSql = "
          SELECT 
             *
          FROM 
            shop_logo
          WHERE 
             shop_id = ? AND user_id = 0
          ";
          
        $stmt = $conn->prepare($selectUserSql);
        $stmt->bind_param("i", $shop_id);
    }
    else{
        $user_id = $inputData['user_main_logo'];
        // SQL query with INNER JOIN and WHERE clause
          $selectUserSql = "
          SELECT 
             *
          FROM 
            shop_logo
          WHERE 
             user_id = ? AND shop_id = 0
          ";
          
        $stmt = $conn->prepare($selectUserSql);
        $stmt->bind_param("i", $user_id);
    }

    
     // Execute the query
      $stmt->execute();
      $result = $stmt->get_result();
      
      // Check if there are any results
      if ($result->num_rows > 0) {
          // Loop through the results
          while ($row = $result->fetch_assoc()) {
              $response = (isset($row['image_link']) ? $row['image_link'] : null);
          }

          echo json_encode($response);

      } else {
          echo json_encode('not found');
      }

}

// logout session
if (isset($inputData['logout'])) {
    $expirationTime = time() - 3600;// Calculate the expiration time for 30 days from now
    $cookieName = 'laundryLoginToken';
    $cookieValue = (isset($_COOKIE['laundryLoginToken']) ? $_COOKIE['laundryLoginToken'] : null);

    if($cookieValue !== null) {
        
        $selectUserTokenSql = "SELECT `login_token_id` FROM `login_token` WHERE `token` = ?";
        $stmt = $conn->prepare($selectUserTokenSql);
        $stmt->bind_param("s", $cookieValue);
        
        // Execute the query
        $stmt->execute();
        $result = $stmt->get_result();
        
        // Check if there are any results
        if ($result->num_rows > 0) {
            // Loop through the results
            while ($row = $result->fetch_assoc()) {
                $response = 'found';
            }
        } else {
            $response = 'not found';
        }

    }

    if($response == 'found') {
        $deleteTokenSql = "DELETE FROM `login_token` WHERE `token` = ?";
        $stmt = $conn->prepare($deleteTokenSql);
        $stmt->bind_param("s", $cookieValue);
        $executionResult = $stmt->execute();

        if ($executionResult) {
            setcookie($cookieName, '', $expirationTime, "/");
            $response = 'Logout successfully.' ;
        } else {
            $response = $stmt->error ;
        }
    }
    
    echo json_encode($response);
}

// insert update shop main logo
if (isset($inputData['changeLogo'])) {

    // Database connection
    global $conn; // Assuming you have a global connection setup

    // Input data (from POST or actual values)
    $userId = isset($inputData['user_id']) ? $inputData['user_id'] : null;
    $shop_id = isset($inputData['shop_id']) ? $inputData['shop_id'] : null;
    $logo_id = null;
    $imageLink = $inputData['imageLink'];
    $whereClause = "user_id = ?";
    $identifierId =  $userId;

    if($shop_id){
        $whereClause = "shop_id = ?";
        $identifierId = $shop_id;
    }

    // First, check if a record with the given user_id already exists
    $checkQuery = "SELECT shop_logo_id FROM shop_logo WHERE ".$whereClause;
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("i", $identifierId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $logo_id = $row['shop_logo_id'];
    }

    if ($logo_id) {
        // If record exists, perform an UPDATE operation
        $updateQuery = "UPDATE shop_logo SET ".$whereClause.", image_link = ? WHERE shop_logo_id = ?";
        $stmt = $conn->prepare($updateQuery);
        $stmt->bind_param("isi", $identifierId, $imageLink, $logo_id);

        if ($stmt->execute()) {
            $response['status'] = "success";
            $response['message'] = "Logo updated successfully.";
        } else {
            $response['status'] = "error";
            $response['error'] = "Error updating logo: " . $stmt->error;
        }
    } else {

        if(!$shop_id){
            $shop_id = 0;
        }
        
        // If no record exists, perform an INSERT operation
        $insertQuery = "INSERT INTO shop_logo (shop_id, image_link, user_id) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insertQuery);
        $stmt->bind_param("isi", $shop_id, $imageLink, $userId);

        if ($stmt->execute()) {
            $response['status'] = "success";
            $response['message'] = "Logo uploaded successfully.";
        } else {
            $response['status'] = "error";
            $response['error'] = "Error uploading logo: " . $stmt->error;
        }
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();

    // Output the response as JSON
    echo json_encode($response);

}

// query staff necessary info
if (isset($inputData['queryStaffDetails'])) {
    global $conn; // Assuming $conn is your database connection

    // Prepare the SQL statement
    $sql = "SELECT lss.laundry_shop_staff_id AS laundry_shop_staff_id, lss.user_id AS user_id, lss.shop_id AS shop_id, 
            s.shop_name AS shop_name, s.shop_address AS shop_address, s.contact_number AS contact_number, 
            s.requirement_status AS requirement_status
            FROM laundry_shop_staff AS lss
            LEFT JOIN shop AS s ON lss.shop_id = s.shop_id 
            WHERE lss.user_id = ? AND s.requirement_status = 'Approved'";

    // Initialize the prepared statement
    $stmt = $conn->prepare($sql);

    // Bind the user_id parameter to the query
    $user_id = $inputData['user_id']; // Replace this with the actual user_id
    $stmt->bind_param("i", $user_id);

    // Execute the statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Fetch all rows
    $laundryShopStaff = $result->fetch_all(MYSQLI_ASSOC);

    // Close the statement and connection
    $stmt->close();
    $conn->close();

    // Check if no results are found
    if (empty($laundryShopStaff)) {
        // Call the clearToken() function if no results are returned
        clearToken();
    } else {
        // Return the result (you can encode as JSON or process as needed)
        echo json_encode($laundryShopStaff);
    }

    
    
}

// check if shop exist
if (isset($inputData['checkIfShopExist'])) {
    // Get the shop_id from the request data
    $shop_id = isset($inputData['shop_id']) ? $inputData['shop_id'] : null;

    if ($shop_id) {
        global $conn; // Assuming $conn is your database connection

        // SQL query to check if the shop exists
        $sql = "SELECT shop_id FROM shop WHERE shop_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $shop_id);
        $stmt->execute();

        // Check if the query found any result
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            // If a record is found
            $response['exists'] = true;
        } else {
            // If no record is found
            $response['exists'] = false;
        }

        $stmt->close();
    } else {
        $response['error'] = "No shop_id provided";
    }

    // Return the response as JSON
    echo json_encode($response);
}


?>