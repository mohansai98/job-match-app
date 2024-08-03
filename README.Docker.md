# Docker Setup for Frontend and Backend

This project uses Docker to containerize both the frontend and backend services. Follow these instructions to get the project up and running using Docker.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd <your-project-directory>
   ```

2. Build and start the containers:
   ```
   docker compose up --build
   ```

   This command will build the Docker images for both frontend and backend, and start the containers.

3. Access the applications:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000

## Development Workflow

- Any changes to the frontend or backend code will require rebuilding the respective Docker images. You can do this by running `docker compose up --build` again.
- To stop the containers, use `Ctrl+C` in the terminal where docker-compose is running, or run `docker compose down` in another terminal.

## Troubleshooting

- If you encounter any issues with dependencies not being recognized, try removing the existing containers and volumes:
  ```
  docker compose down -v
  ```
  Then rebuild and start the containers:
  ```
  docker compose up --build
  ```

## Additional Commands

- To view running containers:
  ```
  docker ps
  ```
- To view logs for a specific service:
  ```
  docker compose logs <service-name>
  ```
  Replace `<service-name>` with either `frontend` or `backend`.

## Notes

- The backend service must be running for the frontend to function correctly, as it depends on the API provided by the backend.
- Any environment-specific configurations should be set in the `docker-compose.yaml` file or in a `.env` file (not tracked by git) in the project root.