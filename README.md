# Project3 - Backend

Link to the website : https://project3-theo-brea.netlify.app/ (Wait 30 sec for the database to update)

This repository contains the backend for the third Ironhack project developed by Theo Diamant and Brea. It is a RESTful API written in the Node.js server runtime which handles long term data storage and fetching between the React frontend and the MongoDB database. 

Additionally, it contains the code necessary to implement and run a websockets-based server for real-time communication between users. However, in the last version of this repository the server was extracted to it's own repo - located [here](https://github.com/FakeJoanna/Project3-Ironhack-Chat) - due to hosting necessities. All information regarding this function of the backend will be covered in this README.

## Features

- Stateless operations
- Graceful error handling
- Fitting of input data to predetermined database schema
- Fully implemented CRUD operations for various models
- Automatic handling of image uploads
- Real-time bi-directional communication between users with persistent message history

## Technical specifications

This project uses the following technologies, frameworks, and libraries:

- Express: A light and powerful backend web application framework for building RESTful APIs with Node.js
- Mongoose: An Object Relational Mapper that governs the connection between our API and MongoDB
- MongoDB: A noSQL documento-oriented database
- Cloudinary + Multer: A cloud based service for serving and uploading uploaded images, and its corresponding middleware
- bcrypt: A library that handles secure password hashing and salting for authentification purposes
- ExpressJWT + JSONWebToken: Middleware for implementing the JWT standard to handle persistent sessions
- Socket.io: Event driven library for web applications which powers a real-time chat

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
