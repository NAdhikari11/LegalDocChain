# Forensics and Blockchain Project

This project demonstrates a use case for storing forensic files on the blockchain. It consists of three main components:

1. **Contract**: Contains the Solidity smart contract code.
2. **Frontend**: A React application for uploading files and submitting data.
3. **Backend**: An Express.js server for handling file uploads and data submissions.

## Prerequisites

Before you can run this project, you'll need to have the following installed on your machine:

- Node.js (v14.x or later)
- NPM (comes bundled with Node.js)
- Pinata account (for file uploading)

## Setup

1. Clone the repository:
2. Navigate to the project directory:
3. Install dependencies for the frontend and backend:

```
cd frontend
npm install
cd ../backend
npm install
```

4. Create a `.env.local` file in the `frontend` directory with the following variables:
   VITE_PINATA_JWT=
   VITE_GATEWAY_URL=

Read pinata docs to know how to get these: https://docs.pinata.cloud/quickstart/next-js

## Running the Project

1. Start the backend server:

```
cd backend
npm run dev
```

The backend server should now be running on `http://localhost:3000`.

2. In a new terminal window/tab, start the frontend development server:

```
cd frontend
npm run dev
```

3. Open your web browser and navigate to link given by VITE in console (in most cases it is: `http://localhost:5173`) to access the application.

## Usage

1. In the frontend application, fill in the required fields (document ID, case ID, document type, name, address, role).
2. Select a file to upload.
3. Click the "Submit" button to upload the file to Pinata and send the data to the backend.
4. Check the console logs in the backend terminal for the received data.

## Notes

- Make sure to replace the placeholders in the `.env` files with your actual Pinata JWT token and contract address.
- The backend server uses Nodemon for automatic restarts during development.
- The frontend is built with Vite, a fast build tool for modern web applications.

Feel free to modify and extend the project as per your requirements.
