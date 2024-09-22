# WanderMission - Travel Beyond Your Imagination

Welcome to WanderMission, an innovative space travel booking platform that allows users to explore the cosmos from the comfort of their devices. This project was developed as part of a Web Technologies assignment and showcases a full-stack application with cutting-edge features and robust architecture.

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Getting Started](#getting-started)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Security Measures](#security-measures)
9. [Development Process](#development-process)
10. [Challenges and Learnings](#challenges-and-learnings)
11. [Future Enhancements](#future-enhancements)

## Project Overview

WanderMission is a space tourism booking platform that allows users to explore and book interplanetary travel experiences. Our application provides a user-friendly interface for browsing space travel options, managing bookings, and interacting with other space enthusiasts through reviews and comments.

### Key Features:
- User authentication (sign up, login, password management)
- Browse and filter space travel packages
- Shopping cart functionality
- User reviews and ratings
- Responsive design with dark/light mode
- Secure payment processing (simulated)

## System Architecture

![System Architecture](https://i.pinimg.com/originals/95/b0/6a/95b06ab7c2e3d3090ce41eddd1c18491.png)

Our application follows a modern, scalable architecture:

- **Frontend**: React.js for a dynamic and responsive user interface
- **Backend**: Node.js with Express.js for a robust API server
- **Databases**: 
  - MongoDB for flexible, document-based storage (user data, travel packages, reviews)
  - Amazon RDS (SQL) for structured data (order management)
- **Authentication**: JWT-based with secure password hashing
- **State Management**: Redux for client-side state management
- **API Security**: CORS, rate limiting, and input validation

## Features

1. **Authentication**
   - Secure sign-up and login flows
   - Password hashing using bcrypt
   - JWT-based session management

2. **Frontend Components**
   - Responsive, mobile-compatible design
   - Dark mode toggle (persists across sessions)
   - Interactive product listings with filters and sorting
   - Dynamic user reviews and ratings
   - Shopping cart with real-time updates
   - Simulated payment flow

3. **Backend Services**
   - RESTful API with GET, POST, PUT, DELETE operations
   - Error handling with appropriate HTTP status codes
   - Data validation and sanitization

4. **Database Integration**
   - MongoDB for flexible data storage (user profiles, travel packages)
   - Amazon RDS for structured data (order details, payment information)

5. **Security Measures**
   - HTTPS encryption
   - Input validation and sanitization
   - Protection against common web vulnerabilities (XSS, CSRF)

## Technologies Used

### Frontend
- React.js 18.2.0
- Redux 4.2.0 with Redux Persist 6.0.0
- Material-UI 5.10.9
- Axios 1.1.3
- SASS 1.54.0

### Backend
- Node.js 8.19.2
- Express.js 4.18.2
- MongoDB with Mongoose 6.7.5
- Amazon RDS (MySQL)
- bcrypt 2.4.3 for password hashing
- express-session 1.17.3 for session management

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository
2. Install dependencies:
   ```
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables (refer to `.env.example`)
4. Start the server:
   ```
   cd server && node server.js
   ```
5. Start the client:
   ```
   cd client && npm start
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Documentation

For detailed API documentation, please refer to our [Postman Documentation](https://documenter.getpostman.com/view/7663716/2s8YzUwgpL).

## Database Schema

### MongoDB Collections
- Users
- Services (Travel Packages)
- Reviews
- Shopping Carts

### Amazon RDS Tables
- UserOrderDetails
- OrderPaymentDetails
- OrderItemDetails
- OrderTravelDateDetails

For detailed schema information, please refer to the [Database Schema](#) section in our documentation.

## Security Measures

- Passwords are hashed using bcrypt before storage
- JWT for secure authentication
- Server-side validation for user inputs
- HTTPS encryption for all communications
- Protection against XSS and CSRF attacks

## Development Process

Our team followed an agile development process, utilizing Git for version control:

- Feature branches for individual development
- Regular code reviews and pull requests
- Continuous integration with automated testing
- Weekly sprints with stand-ups and retrospectives

## Challenges and Learnings

Throughout the development of WanderMission, we encountered several challenges:

1. Integrating multiple databases (MongoDB and Amazon RDS) seamlessly
2. Implementing a secure and efficient authentication system
3. Optimizing performance for real-time updates in the shopping cart

These challenges provided valuable learning experiences in database design, security best practices, and frontend optimization techniques.

## Future Enhancements

We have several exciting features planned for future releases:

1. Integration with real space agencies for live booking data
2. Virtual reality previews of space destinations
3. Social features for connecting space enthusiasts
4. Advanced analytics for personalized travel recommendations

---

We hope you enjoy exploring WanderMission as much as we enjoyed building it! For any questions or feedback, please open an issue on our GitHub repository.
