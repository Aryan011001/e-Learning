# eLearning Website

Welcome to the eLearning Website repository. This project is a comprehensive eLearning platform built with the MERN stack, featuring JWT for authentication, OTP for signing in, and Razorpay for payments. The website is fully responsive and includes both user and admin functionalities.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Admin Features](#admin-features)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- *User Authentication:* JWT-based authentication with OTP for signing in.
- *Course Management:* Users can browse, enroll in, and pay for courses.
- *Lecture Management:* Each course contains multiple lectures.
- *Admin Dashboard:* Admins can add, remove, and manage courses and lectures.
- *Responsive Design:* The website is fully responsive and works on various devices.
- *Payment Integration:* Secure payment processing using Razorpay.

## Tech Stack

- *Frontend:*
  - React
  - Redux
  - Bootstrap / Material-UI / Tailwind CSS (choose one based on your implementation)

- *Backend:*
  - Node.js
  - Express

- *Database:*
  - MongoDB

- *Authentication:*
  - JSON Web Tokens (JWT)
  - OTP (One Time Password)

- *Payment Gateway:*
  - Razorpay

## Installation

1. *Clone the repository:*
    sh
    git clone https://github.com/your-username/elearning-website.git
    cd elearning-website
    

2. *Install dependencies:*
    - For the backend:
      sh
      cd backend
      npm install
      

    - For the frontend:
      sh
      cd ../frontend
      npm install
      

3. *Set up environment variables:*
   Create a .env file in the backend directory and add the following variables:
    env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    OTP_SECRET=your_otp_secret
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    

4. *Start the development servers:*
    - Backend:
      sh
      cd backend
      npm start
      

    - Frontend:
      sh
      cd ../frontend
      npm start
      

## Usage

Once the servers are running, you can access the website at http://localhost:3000.

## API Endpoints

### Authentication

- *POST /api/auth/signup:* Register a new user.
- *POST /api/auth/login:* Login user and receive JWT.
- *POST /api/auth/otp:* Generate OTP for signing in.

### Courses

- *GET /api/courses:* Get all courses.
- *POST /api/courses:* Create a new course (Admin only).
- *DELETE /api/courses/:id:* Delete a course (Admin only).

### Lectures

- *GET /api/courses/:courseId/lectures:* Get all lectures in a course.
- *POST /api/courses/:courseId/lectures:* Add a new lecture to a course (Admin only).
- *DELETE /api/courses/:courseId/lectures/:lectureId:* Delete a lecture from a course (Admin only).

### Payments

- *POST /api/payments/create-order:* Create a new Razorpay order.
- *POST /api/payments/verify:* Verify Razorpay payment.

## Admin Features

- *Course Management:* Admins can add, edit, and remove courses.
- *Lecture Management:* Admins can add, edit, and remove lectures within courses.
- *User Management:* Admins can manage users.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or issues, please contact [your-email@example.com](mailto:your-email@example.com).

---

Thank you for visiting our repository! Happy learning!