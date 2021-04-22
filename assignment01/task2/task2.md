# Task 2

### Configuration for CGI

Add following line in /etc/apache2/apache2.conf:

`ScriptAlias "/exercise1/task2/" "/usr/lib/cgi-bin/"`

This allows the execution of CGI scripts under the URL "/exercise1/task2/"

### Enable the dynamic creation of the index.html

Add a index.html file in the `/usr/lib/cgi-bin/` 

This file needs addtional permissions to be able to be executed: `sudo chmod a+x index.sh`

If you navigate to `127.0.0.1/exercise1/task2/` or `127.0.0.1/exercise1/task2/index.html` the script is executed and delivers the created html file.  


### Install java (openjdk)
`sudo apt install openjdk-14-jdk`