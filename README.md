## [Job Match Analyzer](https://www.job-match-analyzer.live/) Application

# Job Match App

Job Match App is a web application designed to connect job seekers with potential employers by analyzing resumes and job descriptions to find the best matches.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)

## Features
- **Resume Analysis**: Upload your resume and receive feedback on how well it matches with available job descriptions.
- **Job Recommendations**: Get a list of job postings that align with your skills and experience.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Python with Flask
- **Containerization**: Docker

## Getting Started
To get a local copy up and running, follow these steps:

1. Clone the Repository: ```git clone https://github.com/mohansai98/job-match-app.git```

2. Navigate to the Project Directory: ```cd job-match-app```

3. Set Up the Environment:
- Ensure you have Docker installed on your system.
- Create a `.env` file in the project root with necessary environment variables (e.g., database credentials, secret keys).

4. Build and Run the Application: ```docker-compose up --build```
 This command will build the Docker images and start the frontend and backend services.

5. Access the Application:
Open your browser and navigate to `http://localhost:3000` to use the Job Match App.

## Available Scripts
In the project directory, you can run:

- `docker-compose up`: Starts the application using Docker Compose.
- `docker-compose down`: Stops and removes the Docker containers.
- `docker-compose build`: Builds the Docker images for the application.
