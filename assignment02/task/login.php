<?php  
	session_start();   // session starts with the help of this function 

	if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == TRUE)   // Checking whether the session is already there or not if 
		header("Location: index.php"); 

	if (isset($_POST['login']))   // it checks whether the user clicked login button or not 
	{
		$user = $_POST['loginname'];
		$pass = $_POST['loginpw'];
		$_SESSION['loggedin'] = TRUE;
		header("Location: index.php"); 
	}
	$db = new SQLite3("db.db");
?>
<html>
	<head>
		<title>Login Page</title>
		<?php include "element-header.php" ?>
	</head>
	<body>
		<main>
			<div class="login-container">
				<h1>Login</h1>
				<form method="POST">
					<div class="form-group row">
						<label for="loginname" class="col-sm-2 col-form-label">Username</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" id="loginname" value="" autocomplete="off">
						</div>
					</div>
					<div class="form-group row">
						<label for="loginpw" class="col-sm-2 col-form-label">Password</label>
						<div class="col-sm-10">
							<input type="password" class="form-control" id="loginpw" placeholder="" autocomplete="off">
						</div>
					</div>
					<button type="submit" class="btn btn-primary" id="login-btn" name="login" value="login">Login</button>
					<a href="signup.php" class="btn-instead">» Sign up instead</a>
				</form>
			</div>
			<a href="index.php" class="btn-back">« Back to Roary</a>
		</main>
	</body>
</html>