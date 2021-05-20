### Assignment 3

#### Install Python
 + Depending on your OS
 + There might be a problem with Python version 3.8 - use 3.9

#### Setup of Django

 + (Optional) Create a virtual environment for python and activate it
 + Install DJango with pip: `python -m pip install Django`

#### Start the development server

 + Inital migrate for the database: `python ./Roary/manage.py migrate`
 + Create a superuser (to be able to use the admin panel under `http://127.0.0.1:8000/admin/`): `python ./Roary/manage.py createsuperuser`
 + Execute the python script: `python ./Roary/manage.py runserver`

---

#### Steps for creating a new project

+ Create the project: `django-admin startproject Roary`
+ Navigate into the Roary project folder `cd Roary`
+ Create the application itself `python manage.py startapp roaryapp`
+ Add the content (create models, views and corresponding urls)
