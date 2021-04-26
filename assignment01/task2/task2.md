# Task 2

### Configuration for CGI

sudo apt install apache2

`sudo a2enmod cgid`

### Install java (openjdk)
`sudo apt install openjdk-14-jdk`

Add index.sh and CGI.java to /usr/lib/cgi-bin/
 
Add following line in /etc/apache2/apache2.conf:
`ScriptAlias "/exercise1/task2" "/usr/lib/cgi-bin"`

The index.sh file also has to be able to be executed by "others":
sudo chmod 767 /usr/lib/cgi-bin/index.sh

This allows the execution of CGI scripts under the URL "/exercise1/task2/..." e.g. "/exercise1/task2/index.sh

If you navigate to `127.0.0.1/exercise1/task2/index.sh` the script is executed and delivers the created html file.  

After adding to /etc/apache2/apache2.conf:
DirectoryIndex index.sh index.html
the website should also be reachable under 127.0.0.1/exercise1/task2/  and under 127.0.0.1/exercise1/task2

Messages will be found under /var/www/messages.txt