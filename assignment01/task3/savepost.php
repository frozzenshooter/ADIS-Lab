<?php

$content = array(
    "datetime" => date_format(new DateTime(), 'Y-m-d H:i:s'),
    "name" => filter_var($_POST['fname'], FILTER_SANITIZE_STRING),
    "msg" => filter_var($_POST['fmsg'], FILTER_SANITIZE_STRING),
);

$message = json_encode($content);

$filepath   = "messages.txt"; // [*UWP*] update when published
$file       = fopen($filepath, "a") or die("Unable to open file 'messages.txt'.");

// Server-side input validation: 128 character limit
if (strlen($_POST['fmsg']) <= 128) {
    if (isset($_POST['fname']) && isset($_POST['fmsg'])) {
        fwrite($file, "\n". $message); // write complete message to file
        fclose($file);
        $result = 0; // success
    } else {
        $result = 1; // error: fields not filled
    }
} else {
    $result = 2; // error: message is too long
}
?>