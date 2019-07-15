# Inked Demo - Booking Software
##### Work in Progress


Check latest [Changes](https://github.com/edgarrt/booking_software/blob/master/CHANGELOG.md).

Accessing inkedDemo
---------------
To view the app, access the correct url depending on desired endpoint
- Demo Site 1: http://demo.inkdby.com  
- Demo Site 1: http://test.inkdby.com  
- Demo Site 1: http://showcase.inkdby.com  
- Login Site: http://login.inkdby.com
- Signup Page: http://login.inkdby.com/signup  
- App Dashboard: http://app.inkdby.com  
- Company Page: http://inkdby.com ( Template)





Prerequisites for local development and serving
-------------

- [Node.js 8.0+](http://nodejs.org)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
 - <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp;**Windows:** [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs) OR [Visual Studio Code](https://code.visualstudio.com) + [Windows Subsystem for Linux - Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
 - <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp;**Ubuntu** / <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png" height="17">&nbsp;**Linux Mint:** `sudo apt-get install build-essential`



Getting Started
---------------

To run demo, you'll have to edit your system host's file.
This can be reversed afterwards by removing edits.

#### On Linux or OSX
Add the following subdomains to `/etc/hosts`:
```
127.0.0.1       inkdby.com
127.0.0.1       app.inkdby.com
127.0.0.1       login.inkdby.com
127.0.0.1       demo.inkdby.com
127.0.0.1       test.inkdby.com
127.0.0.1       showcase.inkdby.com
```

You may not have write permissions on your hosts file, in which case you can
grant them:
```
$ sudo chmod a+rw /etc/hosts
```

#### Windows 10

Search for Notepad and click `Run As Administrator `
Once in Note, click `File` -> `Open`-> `C:\Windows\System32\drivers\etc\hosts`
Add the following subdomains to `/etc/hosts`:
```
127.0.0.1       inkdby.com
127.0.0.1       app.inkdby.com
127.0.0.1       login.inkdby.com
127.0.0.1       demo.inkdby.com
127.0.0.1       test.inkdby.com
127.0.0.1       showcase.inkdby.com
```

#### Running Demo
The easiest way to get started is to clone the repository:

```bash
# Get the latest code
git clone https://edgarr_t@bitbucket.org/edgarr_t/booking_software.git booking-software

# Change directory
cd booking-software

# Install NPM dependencies
npm install

# Then simply start your app
node app.js
```

##### If you prefer using Docker to run demo
You will need docker and docker-compose installed to build the application.

- [Docker installation](https://docs.docker.com/engine/installation/)

After installing docker, start the application with the following commands :

```
# To build the project for the first time or when you add dependencies
docker-compose build app

# To start the application (or to restart after making changes to the source code)
docker-compose up app

```

Project Structure
-----------------

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| **config**/passport.js             | Passport Local and OAuth strategies, plus login middleware.  |
| **controllers**/**clients**/demo.js| Controller for http://demo.inkdby.com routes                       |
| **controllers**/**clients**/showcase.js| Controller for http://showcase.inkdby.com routes                       |
| **controllers**/**clients**/test.js| Controller for http://test.inkdby.com routes                       |
| **controllers**/company.js             | Controller for http://inkdby.com routes.               |
| **controllers**/dashboard.js         | Controller for http://app.inkdby.com                                  |
| **controllers**/routing.js            | Controller for subdomain routing                            |
| **controllers**/user.js            | Controller for http://login.inkdby.com routes                      |
| **models**/Inquiry.js                 | Mongoose schema and for Inquiries.                          |
| **models**/User.js                 | Mongoose schema and model for User.                          |
| **public**/                        | Static assets (fonts, css, js, img).                         |
| **public**/**js**/application.js   | Specify client-side JavaScript dependencies.                 |
| **public**/**js**/main.js          | client-side JavaScript here, will populate soon                      |
| **public**/**css**/main.scss       | Main app stylesheet.                                 |
| **public/css/themes**/default.scss | Bootstrap overrides to make it look prettier.           |
| **routes**/**clients**/demo.routes.js| Defines all http://demo.inkdby.com routes                       |
| **routes**/**clients**/showcase.routes.js| Defines all http://showcase.inkdby.com routes                       |
| **routes**/**clients**/test.routes.js| Defines all http://test.inkdby.com routes                       |
| **routes**/company.routes.js| Defines all http://inkdby.com routes                       |
| **routes**/dashboard.routes.js| Defines all http://app.inkdby.com routes                       |
| **routes**/login.routes.js| Defines all http://login.inkdby.com routes                       |
| **views/account**/                 | Views *login, password reset, signup*.      |
| **views/partials**/flash.pug       | Error, info and success flash notifications.                 |
| **views/partials**/footer.pug      | Footer partial template.                                     |
| **views**/account_layout.pug       | Account template.                                               |
| **views**/home.pug                 | Error page with User                                           |
| **views**/home.pug                 | Error page with No User                                          |
| .dockerignore                      | Folder and files ignored by docker usage.                    |
| .env                               | API keys, tokens, passwords and database URI. **Request File**           |
| .eslintrc                          | Rules for eslint linter.                                     |
| .gitignore                         | Folder and files ignored by git.                             |
| app.yaml                             | Google Cloud Deployment File **Request File**                                   |
| app.js                             | The main application file.                                   |
| booking-software-XXXXXX.json                             | Google Cloud Authentication json file **Request File**                                    |
| docker-compose.yml                 | Docker compose configuration file.                           |
| Dockerfile                         | Docker configuration file.                                   |
| package.json                       | NPM dependencies.                                            |
| package-lock.json                  | Contains exact versions of NPM dependencies in package.json. |
