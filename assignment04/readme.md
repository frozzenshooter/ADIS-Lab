### Assignment 04

used node js version: v14.16.1

start development server with nodemon: npm start

before starting use npm install to download and install the dependencies

#### Notes for the service worker

We got some issues workinh with the service worker:
+ We tried to use a self signed certificate, but  we weren't able to use it becasue chrome always said it is a non valid certificate (even with starting with sepcial flags or installing the certificate on the machine as root certificate)
+ We "solved" it by using http only because chrome recognizes localhost and allows to use non secure service workers
+ The worker doesn't work in a consistent way (you have to refresh the page by clicking on the roary logo in the top left) after the service worker was installed adn then it will work)

#### Caching strategy

Network or cache: we want the user to see always the most recent roaries, but if there is no network we want to have a fallback - the user should be able to see at least some roaries