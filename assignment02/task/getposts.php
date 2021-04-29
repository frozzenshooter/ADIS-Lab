<?php 

$filepath   = "messages.txt";
$openfile = fopen($filepath, "r") or die("Unable to open file 'messages.txt'.");

if ($openfile) {
    while (($line = fgets($openfile)) !== false) {
        $result = json_decode($line, true);
?>
    <div class="roary-list-item">
        <div class="roary-list-item-head">
            <?=$result["name"]?>
        </div>
        <div class="roary-list-item-date">
            <?=$result["datetime"]?>
        </div>
        <div class="roary-list-item-msg">
            <?=$result["msg"]?>
        </div>
    </div>
<?php
    }
    fclose($openfile);
} else {
    echo "ERROR opening file";
} 
?>
