<?php
    session_start();
    $loggedin = false;
    if (isset($_SESSION['loggedin'])) {
        $loggedin = true;
    }
    if (isset($_POST['form_submitted']))
        include 'savepost.php';
    
?>
<!DOCTYPE html>
<html>
    <head>
        <title>ADIS Roary</title>

        <?php include "element-header.php" ?>
    </head>
    <body>
        <main>
            <h1>Roary</h1>

            <?php if ($loggedin) { ?>
            
            <!-- The container to create new roaries -->
            <div id="new-roary">
                <div id="new-roary-header">
                    <p>New Post</p>
                </div>
                <div id="new-roary-content">
                    <?php
                        if (isset($_POST['form_submitted']) && $result == 0) {
                    ?>
                    <div class="alert alert-success" role="alert">
                        Your message was successfully posted! =)
                    </div>
                    <?php 
                        } else if (isset($_POST['form_submitted']) && $result == 1) {
                    ?>
                    <div class="alert alert-danher" role="alert">
                        Error: Your message could not be posted. Input invalid.
                    </div>
                    <?php 
                        } else if (isset($_POST['form_submitted']) && $result == 2) {
                    ?>
                    <div class="alert alert-danger" role="alert">
                        Error: Your input is too long! (128 character limit)
                    </div>
                    <?php 
                        }
                    ?>

                    <form action="" method="post">
                        <div class="mb-3">
                            <label for="fname" class="form-label">Name</label>
                            <input type="text" class="form-control" id="fname" name="fname" required>
                        </div>
                        <div class="mb-3">
                            <label for="fmessage" class="form-label">Message</label>
                            <textarea class="form-control" id="fmsg" rows="3" name="fmsg" required></textarea>
                        </div>
                        <input type="hidden" name="form_submitted" value="1" />
                        <button type="submit" class="btn btn-primary">Post Message</button>
                    </form>
                </div>
            </div>
            <?php } else { ?>
            <div class="session-container">
                <div id="session-container-buttons">
                    <a type="button" class="btn btn-primary" href="login.php">Login</a>
                    <a type="button" class="btn btn-primary" href="signup.php">Sign up</a>
                </div>

                
                <div class="signup-container" style="display: none;">
                    
                </div>
            </div>
            <?php } ?>

            <!-- The container of the posted roaries -->
            <div id="roary-list">
                <?php include 'getposts.php'; ?>
            </div>
        </main>
    </body>
</html>