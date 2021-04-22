# Task 2

### Configuration for CGI

Add follwoing line in /etc/apache2/apache2.conf:

`ScriptAlias "/exercise1/task2/" "/usr/lib/cgi-bin/"`

This allows the execution of CGI scripts under the URL "/exercise1/task2/"

