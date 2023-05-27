# Project3 - Backend

This repository contains the backend for the third Ironhack project developed by Theo Diamant and Brea. It is a RESTful API written in the Node.js server runtime which handles long term data storage and fetching between the React frontend and the MongoDB database.

## Features

- Stateless operations
- Graceful error handling
- Fitting of input data to predetermined database schema
- Fully implemented CRUD operations for various models
- Automatic handling of file uploads to a dedicated server

## Technical specifications

This project uses the following technologies, frameworks, and libraries:

- Express: A light and powerful backend web application framework for building RESTful APIs with Node.js
- Mongoose: An Object Relational Mapper that governs the connection between our API and MongoDB
- MongoDB: A noSQL documento-oriented database
- Cloudinary + Multer: A cloud based service for serving and uploading uploaded images, and its corresponding middleware
- bcrypt: A library that handles secure password hashing and salting for authentification purposes
- ExpressJWT + JSONWebToken: Middleware for implementing the JWT standard to handle persistent sessions

## Configurations

Neccessary configurations for the proper functioning of this API include:
- Cloudinary account, with its corresponding API Key and secret
- JWT Token secret
- URI to your MongoDB database
- Origins allowed to make cross-origin requests

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).

## Credits

This project was fruit of the close collaboration of [Theo Diamant](https://github.com/TheoDiamant) and [Brea](https://github.com/FakeJoanna), with the bulk of the work on this backend falling on Theo Diamant's hands.