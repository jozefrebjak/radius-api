const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        "swagger": "2.0",
        "info": {
            "description": "NodeJS API Server",
            "version": "1.0.0",
            "title": "API Server for FreeRadius 3 with DaloRadius",
            "termsOfService": "http://swagger.io/terms/",
            "contact": {
                "email": "jozefrebjak@icloud.com"
            },
            "license": {
                "name": "Apache 2.0",
                "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
            }
        },
        "host": "radius-api:3000",
        "tags": [
            {
                "name": "USERS",
                "description": "Informations about USER Route"
            },
            {
                "name": "NAS",
                "description": "Informations about NAS Route"
            },
        ],
        "schemes": [
            "http"
        ],
        "definitions": {
            "User": {
                "type": "object",
                "properties": {
                    "username": {
                        "type": "string"
                    },
                    "value": {
                        "type": "string"
                    },
                    "firstname": {
                        "type": "string"
                    },
                    "lastname": {
                        "type": "string"
                    },
                    "groupname": {
                        "type": "string"
                    }
                },
                "xml": {
                    "name": "User"
                },
            },
            "User-Edit": {
                "type": "object",
                "properties": {
                    "value": {
                        "type": "string"
                    },
                    "firstname": {
                        "type": "string"
                    },
                    "lastname": {
                        "type": "string"
                    },
                    "groupname": {
                        "type": "string"
                    }
                },
                "xml": {
                    "name": "User-Edit"
                },
            },
            "Nas": {
                "type": "object",
                "properties": {
                    "nasname": {
                        "type": "string"
                    },
                    "shortname": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string"
                    },
                    "secret": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    }
                },
                "xml": {
                    "name": "Nas"
                },
            },
        }
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./src/routes/*.js'],
}

const specs = swaggerJsdoc(options)

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}