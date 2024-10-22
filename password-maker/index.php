<?php
// AES encryption function
require ("../connection/connect.php");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $password = $_POST['password'];
    $encryptedPassword = encrypt_decrypt('encrypt', $password);
    echo "Encrypted Password: " . $encryptedPassword;
} else {
?>
    <form method="post" action="">
        <label for="password">Enter Password:</label>
        <input type="text" id="password" name="password" required>
        <input type="submit" value="Encrypt">
    </form>
<?php
}
?>
