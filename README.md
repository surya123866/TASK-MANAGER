# Task Management Application

## Introduction

This application is a task management tool similar to Trello, allowing users to create, update, and manage tasks within different columns. Users can move tasks between columns using drag-and-drop functionality. Additionally, the application supports user sign-up and login, including Google login.

## Front-End Requirements

### User Interface

- The UI is built based on the provided mock designs.
- Drag-and-drop functionality is implemented using a suitable library.
- Routing is implemented throughout the application.
- Authentication is required on every page.

## Back-End Requirements

### Framework

- The backend is built using Node.js with Express.

### API Development

- A RESTful API is created to handle CRUD (Create, Read, Update, Delete) operations for tasks.
- Routes are implemented for creating, updating, and deleting tasks, as well as for retrieving all tasks.
- Routes are implemented for user registration, login, and Google login authentication.

### Data Storage

- Either an SQL (e.g., PostgreSQL, MySQL) or NoSQL (e.g., MongoDB) database is used to store task data and user information.
- Necessary data models are set up to represent tasks and users.

### Validation

- Server-side validation ensures that task data is valid before saving it to the database. Tasks must have a title and belong to a valid column.
- Validation is implemented for user registration and login data.

### Error Handling

- Errors are properly handled, including sending appropriate error messages and status codes in response.

## User Registration and Authentication

### 1. User Registration

- **Implemented user registration.**
- Users should provide the following details for registration:
  - `firstName`: User's first name.
  - `lastName`: User's last name.
  - `email`: User's email.
  - `password`: User's password.

### 2. User Login and Authentication

- **Implemented user login and authentication using JWT.**
- Users should provide the following details for login:
  - `email`: User's email.
  - `password`: User's password.

### 3. User Login and Authentication using Google

- **Implemented user Register and authentication Google.**
- Users should click on Register with Google button:  


### 4. User Login and Authentication using Google

- **Implemented user login and authentication Google.**
- Users should click on Login with Google button:  

### Additional Features

- User profiles with avatars.
- Task due dates and reminders.
- Task sorting and searching capabilities.

## Getting Started

## Backend

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (or another database of your choice)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/surya123866/TASK-MANAGER.git
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```plaintext
   PORT=3000
   BASE_URL=http://yourdomain:3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=task_manager
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

4. Start the application:
   ```bash
   npm start
   ```

### Running Tests

- To run the unit tests:
  ```bash
  npm test
  ```

---

## Frontend

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/surya123866/TASK-MANAGER.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```plaintext
   VITE_API_URL=http://localhost:3000
   VITE_GOOGLE_CLIENT_ID=
   ```

4. Start the application:
   ```bash
   npm start
   ```

### Running Tests

- To run the unit tests:
  ```bash
  npm test
  ```

---

## Functionality

1. Register a new account or log in with existing credentials.
2. Drag-and-drop functionality to manage tasks across different columns.
3. Adding, editing, and deleting tasks.
4. Google login for authentication.

---

## Contributing

Feel free to open issues or submit pull requests for improvements and new features.
