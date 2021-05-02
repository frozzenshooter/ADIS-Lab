<?php

    header('Content-Type: application/json');
    try
    {
        // Create (connect to) SQLite database in file
        $db = new PDO('sqlite:roary.db');
        // Set errormode to exceptions
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        //To make sure that the table exists + unqiue username only
        $db->query('CREATE TABLE IF NOT EXISTS "roars"(
            "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            "username" VARCHAR, 
            "message" VARCHAR,
            "created" DATETIME DEFAULT CURRENT_TIMESTAMP
        )');

        $stmt = $db->query("SELECT * FROM roars");
        $result_string = "[";

        $count= 0;

        while ($row = $stmt->fetch()) {
            if($count > 0)
            {
                $result_string = $result_string.', ';
            }

            // add roar to result json
            $result_string = $result_string.'{ "username": "'.$row['username'].'", "message": "'.$row['message'].'", "timestamp": "'.$row['created'].'"}';
            $count = $count+1;
        }

        $result_string = $result_string."]";

        echo $result_string;

    }catch(Exception $e){
        echo "[]";
    }
?>

