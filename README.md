# Jozef Rebjak's Radius API Server

> API Server for FreeRadius3 with DaloRadius

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Last commit](https://img.shields.io/github/last-commit/jozefrebjak/radius-api)
[![Issues](https://img.shields.io/github/issues/jozefrebjak/radius-api)](https://github.com/jozefrebjak/radius-api/issues)
[![Forks](https://img.shields.io/github/forks/jozefrebjak/radius-api)](https://github.com/jozefrebjak/radius-api/network)
[![GitHub stars](https://img.shields.io/github/stars/jozefrebjak/radius-api)](https://github.com/jozefrebjak/radius-api/stargazers)
[![License](https://img.shields.io/github/license/jozefrebjak/radius-api)](https://github.com/jozefrebjak/radius-api/blob/master/LICENCE)

## Built With

- [nodejs](https://github.com/nodejs)
- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [mysql](https://www.npmjs.com/package/mysql)
- [fs](https://www.npmjs.com/package/fs)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)

## Features

### GET

- Users
    - /user-all/
    - /user-id/{id}
    - /user-username/{username}
    - /user-group/{groupname}
- Nas
    - /nas-all
    - /nas-id
    - /nas-name/{shortname}
    - /nas-ip/{nasname}

### POST

- Users
    - /user-create/
- Nas
    - /nas-create/

### UPDATE

- Users
    - /user-update/{username}

### DELETE

- Users
    - /user-delete-id/{id}
    - /user-delete-username/{username}
- Nas
    - /nas-delete-id/{id}
    - /nas-delete-name/{shortname}
    - /nas-delete-ip/{nasname}

### Documentation with testing of API endpoints

- Swagger Documentation
    - /api-docs

## Known problems

- Missing Authorization
- Only HTTP Scheme for now

# Getting Started with this repo

This guide will take you through setting up your Radius API Server

### Step 1: Starter installation

##### With `git clone`:

```sh

git clone https://github.com/jozefrebjak/radius-api.git /opt/radius-api

cd /opt/radius-api

npm install
```

### Step 2: Edit env

After instalation of dependencies you need to specife `.env` parameters

```sh
# Create .env file in root folder
touch .env

# Insert this parameters and edit them with your parameters
DB_HOST=YOUR_DATABASE_HOSTNAME_OR_IP
DB_USER=YOUR_USER 
DB_PASS=YOUR_USER_PASS
DB_DATABASE=YOUR_DATABASE_NAME
DB_PORT=YOUR_DATABASE_PORT
```

### Step 3: Install SQL Procedures to your radius database

Go to the `/opt/radius-api/extra/database`

There is two procedures needed for production. They are need for POST and UPDATE of USER and NAS.

1. procedure-userAddOrEdit.sql
2. procedure-nasAdd.sql

Log to your database and run the sql statements from that files.

### Step 4: Run Radius API Server as a service

Once installed or cloned locally and all packages are installed you can setup service.

```sh
# Copy example service file to your systemd
cp /opt/radius-api/extra/radius-api.service /etc/systemd/system/radius-api.service

systemctl daemon-reload

systemctl enable radius-api

systemctl start radius-api

service api status
```

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**