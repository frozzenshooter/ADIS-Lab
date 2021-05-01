<?php  
	session_start();   // session starts with the help of this function 

	if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == TRUE)   // Checking whether the session is already there or not if 
		header("Location: index.php"); 

	if (isset($_POST['signup']))   // it checks whether the user clicked login button or not 
	{
		$user = $_POST['loginname'];
		$pass = $_POST['loginpw'];
        $pass = password_hash($pass, PASSWORD_DEFAULT);

        $db = new SQLite3("roary.db");
        $db->query('CREATE TABLE IF NOT EXISTS "users"(
            "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            "username" VARCHAR,
            "password" VARCHAR
        )');

        $stmt = $db->prepare("INSERT INTO users ('username', 'password') VALUES (:username, :password)");
        $stmt->bindValue(":username",$user,SQLITE3_TEXT);
        $stmt->bindValue(":password",$pass,SQLITE3_TEXT);
        $result = $stmt->execute();
        
        
        $_SESSION['loggedin'] = TRUE;
        $_SESSION['username'] = $user;

        header("Location: index.php");
	}
?>
<html>
	<head>
		<title>Sign up Page</title>
		<?php include "element-header.php" ?>
	</head>
	<body>
        <main>
            <div class="login-container">
                <h1>Sign up</h1>
                <form method="POST">
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
                    <button type="submit" class="btn btn-primary" id="login-btn" name="signup" value="signup">Sign up</button>
                    <a href="login.php" class="btn-instead">» Login instead</a>
                </form>
            </div>
            <a href="index.php" class="btn-back">« Back to Roary</a>
        </main>
	</body>
</html>