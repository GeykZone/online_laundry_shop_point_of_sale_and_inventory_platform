<?php 

include ('../connection/connect.php');

// login event control
if(isset($inputData['login'])){

    // Set the time zone to Philippines
    date_default_timezone_set('Asia/Manila');
    

    $username = $inputData['username'];
    $password = $inputData['password'];
    $isLogin = $inputData['login'];
    $expirationTime = time() + (30 * 86400); // 86400 seconds in a day
    $userTokenExpiry = date('Y-m-d H:i:s', $expirationTime);
    $hashedPassword = encrypt_decrypt('encrypt', $password);
    $newAccessToken = encrypt_decrypt('encrypt', $password.":".$username.":".$userTokenExpiry);
    $cookieName = 'laundryLoginToken';
    $cookieValue = $newAccessToken;
    
    if(isset($inputData['userId'])){
        $userId = $inputData['userId'];
        $selectUserTokenSql = "SELECT * FROM `user` WHERE `username` = ?  AND  `password` = ? AND `user_id` = ?";
        $stmt = $conn->prepare($selectUserTokenSql);
        $stmt->bind_param("ssi", $username,$hashedPassword,$userId);
    }
    else{
        $selectUserTokenSql = "SELECT * FROM `user` WHERE `username` = ?  AND  `password` = ?";
        $stmt = $conn->prepare($selectUserTokenSql);
        $stmt->bind_param("ss", $username,$hashedPassword);
    }
    
    // Execute the query
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if there are any results
    if ($result->num_rows > 0) {

        if($isLogin === true){

            // Loop through the results
            while ($row = $result->fetch_assoc()) {
                $response['user_id'] = (isset($row['user_id']) ? $row['user_id'] : null);
                $response['first_name'] = (isset($row['first_name']) ? $row['first_name'] : null);
                $response['last_name'] = (isset($row['last_name']) ? $row['last_name'] : null);
                $response['username'] = (isset($row['username']) ? $row['username'] : null);
                $response['email'] = (isset($row['email']) ? $row['email'] : null);
                $response['phone_number'] = (isset($row['phone_number']) ? $row['phone_number'] : null);
                $response['address'] = (isset($row['address']) ? $row['address'] : null);
                $response['position'] = (isset($row['position']) ? $row['position'] : null);
                $response['user_activation_status'] = (isset($row['user_activation_status']) ? $row['user_activation_status'] : null);
            }

            $userId = $response['user_id'];
            $userPosition = $response['position'];
            $activationStatus =  $response['user_activation_status'];

            if($userId != 0 && ($userPosition != 'Admin' || $userPosition != 'Customer') && $activationStatus == 'Inactive'){
                echo json_encode('Your account must be activated first.');
            }
            else{
                // Insert token after user creation
                $tokenInsertSQL = "INSERT INTO `login_token`(`token`, `user_id`,`expiration_date`) 
                VALUES ('$newAccessToken', '$userId','$userTokenExpiry')";
                if ($conn->query($tokenInsertSQL) === true) {
                    setcookie($cookieName, $cookieValue, $expirationTime, "/");
                }

                echo json_encode($response);
            }

        }
        else if($isLogin === 'for confirmation'){
            echo json_encode('User Confirmed.');
        }

    } else {
        echo json_encode('User does not exist.');
    }

}

// add new laundry owner
if(isset($inputData['addNewLaundryOwner'])){

        global $conn;

        $firstName = isset($inputData['firstName']) ? $conn->real_escape_string($inputData['firstName']) : null;
        $lastName = isset($inputData['lastName']) ? $conn->real_escape_string($inputData['lastName']) : null;
        $username = isset($inputData['username']) ? $conn->real_escape_string($inputData['username']) : null;
        $password = isset($inputData['password']) ? $inputData['password'] : null; // To be hashed later
        $email = isset($inputData['email']) ? $conn->real_escape_string($inputData['email']) : null;
        $phoneNumber = isset($inputData['phoneNumber']) ? $conn->real_escape_string($inputData['phoneNumber']) : null;
        $address = isset($inputData['address']) ? $conn->real_escape_string($inputData['address']) : null;
        $isForStaff = isset($inputData['isForStaff']) ? (bool) $inputData['isForStaff'] : false;
        $position = $isForStaff ? 'Laundry Staff' : 'Laundry Owner';
        $userId = isset($inputData['userId']) ? $inputData['userId'] : 'empty'; // Assuming you have a userId for the update
        $isForSuperAdmin = isset($inputData['isForSuperAdmin']) ? (bool) $inputData['isForSuperAdmin'] : false;
        $isForCustomer = isset($inputData['isForCustomer']) ? (bool) $inputData['isForCustomer'] : false;

        if($isForSuperAdmin){
            $userId = 0;
            $position = 'Admin';
        }

        if($isForCustomer){
            $position = 'Customer';
        }

        // Hash the password securely if it's provided
        $hashedPassword = $password ? $conn->real_escape_string(encrypt_decrypt('encrypt', $password)) : null;

        if ($userId != 'empty') {
            // Update operation
            $setClauses = [];
            
            if ($firstName !== null) {
                $setClauses[] = "first_name = '$firstName'";
            }
            if ($lastName !== null) {
                $setClauses[] = "last_name = '$lastName'";
            }
            if ($username !== null) {
                $setClauses[] = "username = '$username'";
            }
            if ($hashedPassword) {
                $setClauses[] = "password = '$hashedPassword'";
            }
            if ($email !== null) {
                $setClauses[] = "email = '$email'";
            }
            if ($phoneNumber !== null) {
                $setClauses[] = "phone_number = '$phoneNumber'";
            }
            if ($address !== null) {
                $setClauses[] = "address = '$address'";
            }
            if ($position !== null) {
                $setClauses[] = "position = '$position'";
            }

            // Join set clauses into a single string
            $setString = implode(', ', $setClauses);
            
            // Prepare the final update SQL query
            $sql = "UPDATE user SET $setString WHERE user_id = $userId";

        } else {
            // Insert operation
            $sql = "INSERT INTO user (first_name, last_name, username, password, email, phone_number, address, position) 
                    VALUES ('$firstName', '$lastName', '$username', '$hashedPassword', '$email', '$phoneNumber', '$address', '$position')";

            if ($isForStaff ||  $isForCustomer) {
                // SQL Insert Query
                $sql = "INSERT INTO user (first_name, last_name, username, password, email, phone_number, address, position, user_activation_status) 
                    VALUES ('$firstName', '$lastName', '$username', '$hashedPassword', '$email', '$phoneNumber', '$address', '$position', 'Active')";
            }
        }

        // Execute the query and check for success
        if ($conn->query($sql) === TRUE) {
            if ($isForStaff) {
                $response = $conn->insert_id;
            } elseif ($userId != 'empty') {
                $response = "User updated successfully.";
            } else {
                $response = "New Laundry Owner added successfully.";
            }
            
        } else {
            $response = "Error: " . $conn->error;
        }

        // Close the connection
        $conn->close();

        echo json_encode($response);

    
}


?>