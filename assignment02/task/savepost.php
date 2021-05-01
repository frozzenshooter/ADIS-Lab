<?php

    session_start();   

    // Only a logged in user can save a post
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == TRUE && isset($_SESSION['username']))
    {  
        // Server-side input validation: 128 character limit
        if (strlen($_POST['fmsg']) <= 128) {
            if (isset($_POST['fmsg'])) {

                // Create (connect to) SQLite database in file
                $db = new PDO('sqlite:roary.db');
                // Set errormode to exceptions
                $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                //To make sure that the table exists - username just the name - no relationship to other table modeled
                $db->query('CREATE TABLE IF NOT EXISTS "roars"(
                    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                    "username" VARCHAR, 
                    "message" VARCHAR,
                    "created" DATETIME DEFAULT CURRENT_TIMESTAMP
                )');
                
                $message = filter_var($_POST['fmsg'], FILTER_SANITIZE_STRING);
                $user = $_SESSION['username'];

                $stmt = $db->prepare("INSERT INTO roars ('username', 'message') VALUES (:username, :message)");
                $stmt->bindValue(":username",$user, SQLITE3_TEXT);
                $stmt->bindValue(":message",$message, SQLITE3_TEXT);
                $result = $stmt->execute();

                $result = 0; // success
            } else {
                $result = 1; // error: fields not filled
            }
        } else {
            $result = 2; // error: message is too long
        }
    }
?>