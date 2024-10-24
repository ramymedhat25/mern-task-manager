# MERN Task Manager

This is a full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

*   User authentication and authorization (using JWT)
*   Create, read, update, and delete tasks
*   Mark tasks as complete
*   Edit existing tasks
*   Filter and sort tasks (to be implemented)
*   User-friendly interface with React and Bootstrap

## Technologies Used

*   **Frontend:** React.js, Bootstrap
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Other:**  JWT (JSON Web Tokens), Axios

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed
*   MongoDB instance running (local or cloud-based)

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/ramymedhat25/mern-task-manager.git](https://github.com/ramymedhat25/mern-task-manager.git)
    ```
2.  Install backend dependencies:
    ```bash
    cd mern-task-manager
    npm install
    ```
3.  Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```
4.  Configure environment variables:
    *   Create a `.env` file in the `mern-task-manager` directory (backend).
    *   Add the following environment variables, replacing the placeholders with your actual values:

        ```
        PORT=8000  
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key 
        ```

### Running the application

1.  Start the backend server:
    ```bash
    npm run dev 
    ```
2.  Start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```
3.  Open your browser and go to `http://localhost:3000` (or the port where your frontend is running).


## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
