<?php
    
?>
<!DOCTYPE html>
<html>
    <head>
        <title>ADIS Roary</title>

        <!-- BOOTSTRAP & JQUERY -->		
		<script src="../bootstrap/js/jquery-1.10.2.min.js"></script>
		<script src="../bootstrap/js/jquery-3.5.1.min.js"></script>
		<script src="../bootstrap/js/popper.min.js"crossorigin="anonymous"></script>
		<script src="../bootstrap/js/bootstrap-beta.min.js" crossorigin="anonymous"></script>
		<link rel="stylesheet" type="text/css" href="../bootstrap/js/DataTables/datatables.min.css"/>
		<script type="text/javascript" src="../bootstrap/js/DataTables/datatables.min.js"></script>
        <script src="../bootstrap/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css"/>

        <!-- STYLE -->
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <main>
            <h1>Roary</h1>

            <!-- The container to create new roaries -->
            <div id="new-roary">
                <div id="new-roary-header">
                    <p>New Post</p>
                </div>
                <div id="new-roary-content">
                    <div class="alert alert-success d-none" role="alert">
                        Your message was successfully posted! =)
                    </div>
                    <form action="">
                        <div class="mb-3">
                            <label for="fname" class="form-label">Name</label>
                            <input type="email" class="form-control" id="fname">
                        </div>
                        <div class="mb-3">
                            <label for="fmessage" class="form-label">Message</label>
                            <textarea class="form-control" id="fmessage" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Post Message</button>
                    </form>
                </div>
            </div>

            <!-- The container of the posted roaries -->
            <div id="roary-list">
                <div class="roary-list-item">
                    <div class="roary-list-item-head">
                        Tim Berners-Lee
                    </div>
                    <div class="roary-list-item-msg">
                        Hello World
                    </div>
                    <div class="roary-list-item-date">
                        2020-03-18 17:11:30
                    </div>
                </div>
            </div>
        </main>
    </body>
</html>