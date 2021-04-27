# Task 2

### CGI installation

Installation of the apache server and the activation of the mod_cgi as described in task1.

For this task a java runtime is required: `sudo apt install openjdk-14-jdk`

### Configuration

+ Add index.sh and CGI.java to `/usr/lib/cgi-bin/`

+ Create the directory and copy the css file in it: `/var/www/html/exercise1/task2css/style.css`

+ Add a ScriptAlias and a DirectoryIndex in the global apache configuration file `/etc/apache2/apache2.conf`:
    + `ScriptAlias "/exercise1/task2" "/usr/lib/cgi-bin"`
    + `DirectoryIndex index.sh index.html`
 
+ Update the permissions of the index.sh file, in order to be able to execute it: `sudo chmod 767 /usr/lib/cgi-bin/index.sh`

+ Restart the service: `sudo systemctl restart apache2.service`

If you navigate to `127.0.0.1/exercise1/task2/` the script is executed and delivers the created html file.  

Messages will be found under `/var/www/html/exercise1/task2/messages.txt`