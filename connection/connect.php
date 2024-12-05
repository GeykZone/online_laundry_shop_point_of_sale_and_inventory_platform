<?php
$hostname = "localhost";
$database = "onlinelaundry_db";
$username = "root";
$password = "";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


function formatCurrency($amount) {
  return '₱' . number_format($amount, 2);
}

// AES encryption function
function encrypt_decrypt($action, $string) {
  $output = false;
  global $conn;

  // Fetch secret key and IV from the database
  $query = "SELECT secret_key, secret_iv FROM hashing_settings LIMIT 1";
  $result = $conn->query($query);

  if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $secret_key = $row['secret_key'];
    $secret_iv = $row['secret_iv'];
  } else {
    die("Failed to retrieve encryption settings from database.");
  }

  $encrypt_method = "AES-256-CBC";
  $key = hash('sha256', $secret_key);
  $iv = substr(hash('sha256', $secret_iv), 0, 16);

  if ($action == 'encrypt') {
      $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
      $output = base64_encode($output);
  } else if ($action == 'decrypt') {
      $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
  }

  return $output;
}

function sms_api($message, $userId) {
  global $conn;

  // Query API configuration from the database
  $configQuery = "SELECT `api_secret`, `mode`, `device`, `sim`, `priority` FROM `sms_api_config` LIMIT 1";
  $configResult = $conn->query($configQuery);

  if ($configResult && $configResult->num_rows > 0) {
      $config = $configResult->fetch_assoc();

      // Query phone number using the userId
      $userQuery = "SELECT `phone_number` FROM `user` WHERE `user_id` = ?";
      if ($userStmt = $conn->prepare($userQuery)) {
          $userStmt->bind_param("i", $userId);
          $userStmt->execute();
          $userResult = $userStmt->get_result();

          if ($userResult && $userResult->num_rows > 0) {
              $user = $userResult->fetch_assoc();
              $phoneNumber = $user['phone_number'];

              // Prepare the message array using the queried configuration and phone number
              $messageData = [
                  "secret" => $config['api_secret'],
                  "mode" => $config['mode'],
                  "device" => $config['device'],
                  "sim" => $config['sim'],
                  "priority" => $config['priority'],
                  "phone" => $phoneNumber,
                  "message" => $message
              ];

              // Initialize cURL request
              $cURL = curl_init("https://sms.teamssprogram.com/api/send/sms");
              curl_setopt($cURL, CURLOPT_RETURNTRANSFER, true);
              curl_setopt($cURL, CURLOPT_POSTFIELDS, $messageData);
              $response = curl_exec($cURL);
              curl_close($cURL);

              // Decode and return the response
              return json_decode($response, true);
          } else {
              return [
                  'status' => 'error',
                  'message' => 'Failed to retrieve phone number for the specified user ID'
              ];
          }
      } else {
          return [
              'status' => 'error',
              'message' => 'Failed to prepare user query: ' . $conn->error
          ];
      }
  } else {
      return [
          'status' => 'error',
          'message' => 'Failed to retrieve API configuration'
      ];
  }
}


function getEmailApiConfig() {
  global $conn;
    // Prepare the response array
    $response = [];

    // SQL query
    $sql = "SELECT `user_id`, `service_id`, `template_id` FROM `email_api_config`";

    // Execute the query
    if ($result = $conn->query($sql)) {
        // Fetch data into an associative array
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Build the response
        $response = [
            'status' => 'success',
            'data' => $data
        ];
    } else {
        // Handle query error
        $response = [
            'status' => 'error',
            'message' => $conn->error
        ];
    }

    // Return JSON-encoded response
    return json_encode($response);
}



$inputData = json_decode(file_get_contents('php://input'), true);
?>
