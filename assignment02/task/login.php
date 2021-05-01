<?php  
	session_start();   // session starts with the help of this function 
	$error = 0;
	if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == TRUE)   // Checking whether the session is already there or not if 
		header("Location: index.php"); 

	if (isset($_POST['login']))   // it checks whether the user clicked login button or not 
	{
		try{
			if($_POST['loginname'] != null && $_POST['loginpw'] != null) 
			{
				$user = $_POST['loginname'];
				$pass = $_POST['loginpw'];
				
				// Create (connect to) SQLite database in file
				$db = new PDO('sqlite:roary.db');
				// Set errormode to exceptions
				$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				//To make sure that the table exists + unqiue username only
				$db->query('CREATE TABLE IF NOT EXISTS "users"(
					"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
					"username" VARCHAR UNIQUE, 
					"password" VARCHAR
				)');

				$stmt = $db->prepare('SELECT "password" FROM users WHERE username=:username');
				$stmt->bindValue(':username', $user, SQLITE3_TEXT);
				$result = $stmt->execute();
				
				
				$rows = $stmt->fetchAll();

				// get the hash for the username
				$hash = $rows[0]['password'];

				if(password_verify($pass, $hash)){
					// Login user and redirect
					$_SESSION['loggedin'] = TRUE;
					$_SESSION['username'] = $user;
					header("Location: index.php");
				}else{
					$error = 2;
				}

			}else{
				$error = 1;
			}

		}catch(Exception $e){
			$error = 1;
		}
	}

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
					<?php if($error == 1){ ?>
                        <div class="alert alert-danger" role="alert">
							Error: Missing data for login. 
                        </div>
                    <?php } else if($error == 2){ ?>
						<div class="alert alert-danger" role="alert">
							Error: Login unsuccessful!
                        </div>
					<?php
						};
					?>
					<div class="form-group row">
						<label for="loginname" class="col-sm-2 col-form-label">Username</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="loginname" id="loginname" value="" autocomplete="off">
						</div>
					</div>
					<div class="form-group row">
						<label for="loginpw" class="col-sm-2 col-form-label">Password</label>
						<div class="col-sm-10">
							<input type="password" class="form-control" name="loginpw" id="loginpw" placeholder="" autocomplete="off">
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