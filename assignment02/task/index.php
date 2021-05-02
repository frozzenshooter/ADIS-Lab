<?php
    session_start();
    $loggedin = false;
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == TRUE) {
        $loggedin = true;
        $username = "unknown";
        if (isset($_SESSION['username']))
            $username = $_SESSION['username'];
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
                    <div class="alert alert-danger" role="alert">
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
                            <input type="text" class="form-control" id="fname" name="fname" value="<?=$username?>" readonly>
                        </div>
                        <div class="mb-3">
                            <label for="fmessage" class="form-label">Message</label>
                            <textarea class="form-control" id="fmsg" rows="3" name="fmsg" required></textarea>
                        </div>
                        <input type="hidden" name="form_submitted" value="1" />
                        <button type="submit" class="btn btn-primary">Post Message</button>
                        <a class="btn btn-secondary" href="logout.php">Logout instead</a>                 
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
                
            </div>
        </main>
        <script>

            function createRoary(roary){

                const roaryListItem = document.createElement("DIV"); 
                roaryListItem.className="roary-list-item";
                
                const roaryListItemHead = document.createElement("DIV"); 
                roaryListItemHead.className="roary-list-item-head";
                roaryListItemHead.innerHTML= roary.username;

                roaryListItem.appendChild(roaryListItemHead);

                const roaryListItemDate = document.createElement("DIV"); 
                roaryListItemDate.className="roary-list-item-date";
                roaryListItemDate.innerHTML= roary.timestamp;

                roaryListItem.appendChild(roaryListItemDate);

                const roaryListItemMsg = document.createElement("DIV"); 
                roaryListItemMsg.className="roary-list-item-msg";
                roaryListItemMsg.innerHTML= roary.message;

                roaryListItem.appendChild(roaryListItemMsg);

                return roaryListItem;
            }

            function updateRoarys(){
                fetch('getposts.php')
                .then(response => response.json())
                .then(roarys => 
                {

                    // remove old posts and create new ones

                    const roary_container = document.getElementById("roary-list");
                    roary_container.innerHTML = "";
                    for(let roary of roarys){
                        roary_container.appendChild(createRoary(roary));
                    }
                });
            }

            document.addEventListener('DOMContentLoaded', () => {
                updateRoarys();

                setInterval(() => {
                    updateRoarys();
                }, 5000);
            }, false);

        </script>
    </body>
</html>