<?php

include ('../connection/connect.php');

// Database connection info 
$dbDetails = array( 
    'host' => $hostname, 
    'user' => $username , 
    'pass' => $password, 
    'db'   => $database
); 

// show the laundry shop requirement table
if(isset($_GET['showLaundryShopRequirementList'])){

    // DB table to use 
    $table = 'laundry_shop_requirements'; 

    // Table's primary key 
    $primaryKey = 'laundry_shop_requirements_id';
    
    // Array of database columns which should be read and sent back to DataTables.
    // The `db` parameter represents the column name in the database.
    // The `dt` parameter represents the DataTables column identifier.
    $columns = array(
        array('db' => 'laundry_shop_requirements_id', 'dt' => 0, 'field' => 'laundry_shop_requirements_id'),
        array('db' => 'requirement_name', 'dt' => 1, 'field' => 'requirement_name'),
        array('db' => 'field_data_type', 'dt' => 2, 'field' => 'field_data_type'),
        array('db' => 'upload_photo', 'dt' => 3, 'field' => 'upload_photo'),
    );
    
    // Include SQL query processing class 
    require 'ssp.class.php'; 

    $joinQuery = ",  `laundry_shop_requirements_id`, `requirement_name`, `field_data_type`, `upload_photo` FROM `{$table}`";
    $where = "";

    // Output data as json format 
    echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where) );
}

// show the laundry shop table
if(isset($_GET['showLaundryShopList'])){

    $userId = $_GET['userId'];

    // DB table to use 
    $table = 'shop'; 

    // Table's primary key 
    $primaryKey = 'shop_id';
    
    // Array of database columns which should be read and sent back to DataTables.
    // The `db` parameter represents the column name in the database.
    // The `dt` parameter represents the DataTables column identifier.
    $columns = array(
        array('db' => 'shop_id', 'dt' => 0, 'field' => 'shop_id'),
        array('db' => 'shop_name', 'dt' => 1, 'field' => 'shop_name'),
        array('db' => 'shop_address', 'dt' => 2, 'field' => 'shop_address'),
        array('db' => 'contact_number', 'dt' => 3, 'field' => 'contact_number'),
        array('db' => "CONCAT(u.first_name, ' ', u.last_name)", 'dt' => 4, 'field' => 'full_name'),
        array('db' => 'requirement_status', 'dt' => 5, 'field' => 'requirement_status'),
    );
    
    // Include SQL query processing class 
    require 'ssp.class.php'; 

    $joinQuery = ", s.shop_name AS shop_name, s.shop_address AS shop_address, s.contact_number AS contact_number, `s`.`requirement_status` AS requirement_status, u.username AS username, CONCAT(u.first_name, ' ', u.last_name) AS full_name, s.user_id AS shop_user_id
    FROM `{$table}` AS s 
    LEFT JOIN user AS u ON s.user_id = u.user_id ";
    $where = " s.user_id != '0'";

    if($userId != 0){
        $where = " s.user_id =  $userId";
    }

    // Output data as json format 
    echo json_encode( SSP::simple( $_GET, $dbDetails, $table, $primaryKey, $columns, $joinQuery, $where) );
}

// add new laundry shop requirements
if(isset($inputData['addLaundryShopRequirement'])){

    global $conn;

    $requirementId = isset($inputData['requirementId']) && $inputData['requirementId'] !== null && $inputData['requirementId'] !== '' 
        ? $conn->real_escape_string($inputData['requirementId']) 
        : null;
    
    $requirementTypeInput = $conn->real_escape_string($inputData['requirementTypeInput']);
    $allowPhotoUploadSelect = $conn->real_escape_string($inputData['allowPhotoUploadSelect']);
    $fieldType = $conn->real_escape_string($inputData['fieldType']);
    
    if ($requirementId) {
        // Update operation if requirementId exists
        $sql = "UPDATE `laundry_shop_requirements` 
                SET `requirement_name` = '$requirementTypeInput', `upload_photo` = '$allowPhotoUploadSelect', `field_data_type` = '$fieldType'
                WHERE `laundry_shop_requirements_id` = '$requirementId'";
    } else {
        // Insert operation if requirementId does not exist
        $sql = "INSERT INTO `laundry_shop_requirements`(`requirement_name`, `upload_photo`, `field_data_type`) 
                VALUES ('$requirementTypeInput', '$allowPhotoUploadSelect', '$fieldType')";
    }
    
    // Execute the query and check for success
    if ($conn->query($sql) === TRUE) {
        $response = $requirementId ? "Requirement updated successfully." : "A Shop Requirement added successfully.";
    } else {
        $response = "Error: " . $conn->error;
    }
    
    // Close the connection
    $conn->close();
    
    echo json_encode($response);
    
}

// delete laundry sho[ requirements
if(isset($inputData['deleteLaundryShopRequirement'])){
    global $conn;

    $requirementId = isset($inputData['requirementId']) && $inputData['requirementId'] !== null && $inputData['requirementId'] !== '' 
        ? $conn->real_escape_string($inputData['requirementId']) 
        : null;

    if ($requirementId) {
        // Delete operation if requirementId exists
        $sql = "DELETE FROM `laundry_shop_requirements` 
                WHERE `laundry_shop_requirements_id` = '$requirementId'";
        
        // Execute the query and check for success
        if ($conn->query($sql) === TRUE) {
            $response = "Requirement deleted successfully.";
        } else {
            $response = "Error: " . $conn->error;
        }
    } else {
        $response = "Error: Requirement ID not provided.";
    }

    // Close the connection
    $conn->close();

    echo json_encode($response);

}

// query list of requirements for validating new laundry shop
if(isset($inputData['queryRequirements'])){

    // Database connection
    global $conn; // Assuming you have a global $conn for your database connection

    // Define the query
    $sql = "SELECT `laundry_shop_requirements_id`, `requirement_name`, `upload_photo`, `field_data_type` FROM `laundry_shop_requirements`";

    // Execute the query
    $result = $conn->query($sql);

    // Check if any results were returned
    if ($result->num_rows > 0) {
        // Fetch all rows and store them in an array
        $laundryShopRequirements = array();
        
        while($row = $result->fetch_assoc()) {
            $laundryShopRequirements[] = $row;
        }

        // Return the data as JSON
        echo json_encode($laundryShopRequirements);
    } else {
        // No results found
        echo json_encode([]);
    }

    // Close the connection
    $conn->close();


}

// insert new laundry shop 
if(isset($inputData['submitLaundryShopInfo'])){

    global $conn;

    // Data to insert or update (replace with actual values or POST data)
    $openTime = isset($inputData['openTime']) ? $inputData['openTime'] : null;
    $closeTime = isset($inputData['closeTime']) ? $inputData['closeTime'] : null;
    $additionalSchedule = isset($inputData['additionalSchedule']) ? $inputData['additionalSchedule'] : null;
    $selectedDays = isset($inputData['selectedDays']) ? $inputData['selectedDays'] : null;
    $shop_name = isset($inputData['laundryShopName']) ? $inputData['laundryShopName'] : null;
    $shop_address = isset($inputData['laundryShopAddress']) ? $inputData['laundryShopAddress'] : null;
    $contact_number = isset($inputData['laundryShopContactNumber']) ? $inputData['laundryShopContactNumber'] : null;
    $user_id = isset($inputData['ownerId']) ? $inputData['ownerId'] : null;
    $shop_id = isset($inputData['shopId']) ? $inputData['shopId'] : null; // Check if shop_id is provided
    $isApproved = isset($inputData['isApproved']) ? $inputData['isApproved'] : null; // Check if shop_id is provided
    
    if ($shop_id) {

        if($isApproved){
            // If shop_id is provided, perform an UPDATE
            $sql = "UPDATE shop SET requirement_status = ? WHERE shop_id = ?";

            // Prepare and bind parameters, including the shop_id at the end
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $isApproved, $shop_id);
        }
        else{
            // If shop_id is provided, perform an UPDATE
            $sql = "UPDATE shop SET shop_name = ?, shop_address = ?, contact_number = ?, user_id = ?, open_time = ?, close_time = ?, additional_schedule_details = ?, days_open = ?  WHERE shop_id = ?";

            // Prepare and bind parameters, including the shop_id at the end
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssissssi", 
            $shop_name,
            $shop_address,
            $contact_number,
            $user_id,
            $openTime,
            $closeTime,
            $additionalSchedule,
            $selectedDays,
            $shop_id);
        }
    
        // Execute the statement
        if ($stmt->execute()) {
            $response['message'] = "Shop updated successfully";
        } else {
            $response['error'] = "Error: " . $stmt->error;
        }
    } else {
        // If no shop_id is provided, perform an INSERT
        $sql = "INSERT INTO shop (shop_name, shop_address, contact_number, user_id, open_time, close_time, additional_schedule_details, days_open) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssissss", $shop_name, $shop_address, $contact_number, $user_id, $openTime,
        $closeTime,
        $additionalSchedule,
        $selectedDays,);
    
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

// upload the requirements needed for laundry shop
if(isset($inputData['uploadRequirementsNeeded'])){

    global $conn;

    // Data to insert/update (replace with actual values or POST data)
    $imageLink = isset($inputData['imageLink']) ? $inputData['imageLink'] : null;
    $id = isset($inputData['id']) ? $inputData['id'] : null; // Primary key or unique identifier (if provided)
    $isForUpadate = isset($inputData['isForUpadate']) ? $inputData['isForUpadate'] : null; // Primary key or unique identifier (if provided)
    
    // Check if the id is provided for update operation
    if ($id) {
        

        if($isForUpadate){
            $details = $inputData['details'];
            
            // Prepare the SQL UPDATE statement
            $sql = "UPDATE submitted_requirements 
            SET  details = ?
            WHERE submitted_requirements_id = ?";

            // Prepare and bind parameters
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $details, $id);
        }
        else{
            // Prepare the SQL UPDATE statement
            $sql = "UPDATE submitted_requirements 
            SET image_link = ? 
            WHERE submitted_requirements_id = ?";

            // Prepare and bind parameters
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $imageLink, $id);
        }
    
    
    } else {

        $requirementId = $inputData['requirementId'];
        $shopId = $inputData['shopId'];
        $details = $inputData['details'];

        // Prepare the SQL INSERT statement
        $sql = "INSERT INTO submitted_requirements (laundry_shop_requirements_id, details, shop_id) 
                VALUES (?, ?, ?)";
    
        // Prepare and bind parameters
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isi", $requirementId, $details, $shopId);
    }
    
    // Execute the statement
    if ($stmt->execute()) {
        if ($id) {
            // For update operation
            $response['message'] = "Record updated successfully";
        } else {
            // For insert operation
            $response['insert_id'] = $conn->insert_id;
        }
    } else {
        $response['error'] = "Error: " . $stmt->error;
    }
    
    // Close the connection
    $stmt->close();
    $conn->close();
    
    echo json_encode($response);
    
}

// query submitted requirements for new laundry shop
if(isset($inputData['queryRequirementsDetails'])){

    $shopId = $inputData['shopId'];

    // Database connection
    global $conn; // Assuming you have a global $conn for your database connection

    // Define the query
    $sql = "SELECT sr.submitted_requirements_id AS submitted_requirements_id, sr.laundry_shop_requirements_id AS laundry_shop_requirements_id,
    sr.details AS details, sr.image_link AS image_link, sr.shop_id AS shop_id, lsr.requirement_name AS requirement_name, lsr.upload_photo AS upload_photo,
    lsr.field_data_type AS field_data_type
    FROM submitted_requirements AS sr
    LEFT JOIN laundry_shop_requirements AS lsr ON sr.laundry_shop_requirements_id = lsr.laundry_shop_requirements_id
    WHERE sr.shop_id = $shopId";

    // Execute the query
    $result = $conn->query($sql);

    // Check if any results were returned
    if ($result->num_rows > 0) {
        // Fetch all rows and store them in an array
        $laundryShopRequirementDetails = array();
        
        while($row = $result->fetch_assoc()) {
            $laundryShopRequirementDetails[] = $row;
        }

        // Return the data as JSON
        echo json_encode($laundryShopRequirementDetails);
    } else {
        // No results found
        echo json_encode([]);
    }

    // Close the connection
    $conn->close();


}

// Query shop details and schedule with user details
if (isset($inputData['queryShopSchedule'])) {
    $shopId = $inputData['shopId'];

    // Prepare the SQL query with a LEFT JOIN to include user details
    $sql = "SELECT 
                shop.shop_id, 
                shop.shop_name, 
                shop.shop_address, 
                shop.contact_number, 
                shop.user_id, 
                shop.requirement_status, 
                shop.days_open, 
                shop.open_time, 
                shop.close_time, 
                shop.additional_schedule_details, 
                user.first_name, 
                user.last_name, 
                user.username, 
                user.email, 
                user.phone_number, 
                user.address, 
                user.position, 
                user.user_activation_status
            FROM 
                shop
            LEFT JOIN 
                user ON shop.user_id = user.user_id
            WHERE 
                shop.shop_id = ?";

    // Prepare and bind parameters
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $shopId); // 'i' for integer type

    // Execute the statement
    if ($stmt->execute()) {
        // Get the result
        $result = $stmt->get_result();
        $shopDetails = $result->fetch_assoc(); // Fetch details of the shop with user info

        if ($shopDetails) {
            // Return shop details as a JSON response
            echo json_encode($shopDetails);
        } else {
            echo json_encode(['error' => 'No shop found with the provided ID.']);
        }
    } else {
        echo json_encode(['error' => $stmt->error]);
    }

    $stmt->close();
}




?>