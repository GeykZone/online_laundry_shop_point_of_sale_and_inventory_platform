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

$inputData = json_decode(file_get_contents('php://input'), true);
?>
