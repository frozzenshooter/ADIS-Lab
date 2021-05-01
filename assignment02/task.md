## Assignment 2

We assume apache is installed and php enabled (as already done in assignment 1 - task 1)

### Configuration and installation
Additional to this, a new folder has to be created:
`sudo mkdir exercise2` under `/var/www/html/` 

All the files in the task folder have to be copied into this folder.

The user-group has to be modified in order to be able to create a database file:
`sudo chown www-data /var/www/html/exercise2/`

Installation of the sqlite db:
`sudo apt-get install php7.4-sqlite3`

with a restart afterwards: `sudo systemctl restart apache2`



