# Task 1

### Apache installation:
`sudo apt install apache2`

### PHP mod installation
`sudo apt install php libapache2-mod-php`

### PHP mod installation
`sudo apt install php libapache2-mod-php`

### Enable mod_php
`sudo a2enmod php7.4`

### Test if php works

Create file in /var/www/html/: phpinfo.php

`<?php
    phpinfo();
?>`

Restart the service `sudo systemctl restart apache2.service ` and navigate to 127.0.0.1/phpinfo.php 

### Enable mod_cgi

`sudo a2enmod cgi`
