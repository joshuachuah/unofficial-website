<?php
// database connection code
if(isset($_POST['username']))
{
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');
$con = mysqli_connect('localhost', 'root', '','gidle_merch');

// get the post records

$username = $_POST['username'];
$password = $_POST['password'];
$phone = $_POST['phone'];
$created_at = "CURRENT_TIMESTAMP";

// database insert SQL code
$sql = "INSERT INTO `user` (`username`, `password`, `phone`, `created_at`) VALUES ('$username', '$password', '$phone', '$create_at')";

// insert in database 
$rs = mysqli_query($con, $sql);
if($rs)
{
	echo "Contact Records Inserted";
}
}
else
{
	echo "Are you a genuine visitor?";
	
}
?>


<!-- <?php
    $con = new mysqli('localhost', 'root', '','gidle_merch');
    if ($con->connect_error) {
        echo "connection failed";
    }
?> -->