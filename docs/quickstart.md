---
sidebar_position: 1
title: "Quick Start"
hidden: false
lastUpdatedAt: "2025-02-09"
---


# Quick Start

Welcome to the Iryna Framework! This quick start guide will help you set up and run an intelligent agent using the framework. Follow these steps to get started:

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v23.3.0 or later)
- **npm** (v10.9.0 or later)
- **TypeScript** (globally installed for development)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Irys-xyz/iryna.git
   cd iryna
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Build the Project**

   ```bash
   npm run build
   ```

## Running the Agent

1. **Set Up Environment Variables**

   Create a `.env` file in the root directory and define the necessary API keys and configurations:

    ```env
        PORT=3000
        API_URL=http://localhost:3000

        EVM_WALLET_PRIVATE_KEY=
        EVM_WALLET_PUBLIC_KEY=

        OPENAI_API_KEY=
        IONET_API_KEY=
        HYPERBOLIC_API_KEY=
        OLLAMA_HOST=http://127.0.0.1:11434

        SWARM_ORCHESTRATOR_URL=http://127.0.0.1:3000 # As to be changed in the future
    ```

2. **Start the Server**

   ```bash
   npm run start
   ```

   The server will start on the port specified in the `.env` file (default is `3000`). You should see a message indicating that the server is running:

   ```
   Server is running on port 3000
   ```

3. **Verify the Server**

   You can perform a health check by navigating to `http://localhost:3000/health` in your browser or using `curl`:

   ```bash
   curl http://localhost:3000/health
   ```

   **Response:**

   ```json
   {
     "status": "ok"
   }
   ```

## Using the Client

The Iryna Framework includes a visual client interface that makes it easy to design and manage your agent workflows without writing code.

1. **Start the Client**

   ```bash
   npm run start-client
   ```

   This will launch the client interface in your default web browser.

2. **Purpose of the Client**

   The client provides a visual workflow builder that allows you to:
   - Design agent behaviors through a drag-and-drop interface
   - Configure AI models from multiple providers (OpenAI, Hyperbolic, Ionet, Ollama)
   - Create and connect action nodes to define what your agent can do
   - Save, load, and share your workflows
   - Export workflows for deployment

3. **Creating Your First Workflow**

   - Drag nodes from the sidebar onto the canvas
   - Connect nodes by dragging from one handle to another
   - Configure each node by clicking on it and adjusting parameters
   - Save your workflow using the save button in the header

For more detailed information about the client, see the [Client documentation](./client.md).

## API Overview

The agent exposes a RESTful API for interacting with it. Here's a summary of the available endpoints:

### Base URL

```
http://localhost:3000/api/agent
```

### Endpoints

1. **Send Message**

   **POST** `/send-message`

   **Description:** Sends a message to the agent and receives a response.

   **Request Body:**

   ```json
   {
     "message": "What's the weather like in New York today?"
   }
   ```

   **Response:**

   ```json
   {
     "response": "The current temperature in New York is 15°C with clear skies.",
     "requestId": "unique-request-id"
   }
   ```

2. **Check Agent Status**

   **GET** `/status`

   **Description:** Retrieves the current status of the agent.

   **Response:**

   ```json
   {
     "status": "ready",
     "agent": "agent-id"
   }
   ```

3. **Execute All Workflows**

   **POST** `/execute-workflows`

   **Description:** Executes all defined workflows in parallel.

   **Response:**

   ```json
   {
     "status": "Workflows executed successfully."
   }
   ```

### Example Usage with `curl`

- **Send a Message:**

  ```bash
  curl -X POST http://localhost:3000/api/agent/send-message \
    -H "Content-Type: application/json" \
    -d '{"message": "Tell me the weather in London."}'
  ```

- **Check Status:**

  ```bash
  curl http://localhost:3000/api/agent/status
  ```

- **Execute Workflows:**

  ```bash
  curl -X POST http://localhost:3000/api/agent/execute-workflows
  ```

- **Execute Workflow with Function Calling:**

  ```bash
  curl -X POST http://localhost:3000/api/agent/send-message \
    -H "Content-Type: application/json" \
    -d '{"message" : "Execute the workflow DailyWeather"}'
  ```

- **Execute Action with Function Calling:**

  ```bash
  curl -X POST http://localhost:3000/api/agent/send-message \
    -H "Content-Type: application/json" \
    -d '{"message" : "Buy token:HYPE quantity:1 on Hyperliquid"}'
  ```

## Troubleshooting

- **Agent Not Initializing:**
  - Ensure all required environment variables are set in the `.env` file.
  - Check for errors in the server logs.

- **Action Not Found:**
  - Verify that the action class is correctly exported and placed in the appropriate plugin directory.
  - Ensure the `ActionLoader` is correctly loading actions from the plugins.

- **API Issues:**
  - Confirm that the server is running and accessible on the specified port.
  - Check API endpoint paths and request formats.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add YourFeature"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**
