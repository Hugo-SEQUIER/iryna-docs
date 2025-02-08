---
sidebar_position: 1
title: "Quick Start"
hidden: false
lastUpdatedAt: "2024-10-23"
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

## Configuration

### `defaultCharacter.json`

The `defaultCharacter.json` file defines the initial configuration for your agent. This JSON file includes details such as the agent's name, description, model integration settings, message examples, knowledge base, goals, and workflows. Here's a breakdown of its structure:

```json
{
  "name": "WeatherBot",
  "description": "Provides accurate weather information with DailyWeatherUpdate workflow and interacts with financial markets on Hyperliquid.",
  "modelIntegration": {
    "provider": {
      "type": "openai"
    },
    "model": "gpt-4o",
    "embeddingModel": "text-embedding-3-small",
    "parameters": {
      "temperature": 0.7,
      "maxTokens": 500,
      "topP": 0.9,
      "frequencyPenalty": 0,
      "presencePenalty": 0
    },
    "systemPrompt": "You are a helpful assistant that provides weather information and can interact with financial markets."
  },
  "messageExample": [
    { "role": "user", "content": "What's the weather like in New York today?" },
    { "role": "assistant", "content": "The current temperature in New York is 15°C with clear skies." }
  ],
  "knowledge": [
    "A datachain is a blockchain designed for one task: storing data...",
    "...additional knowledge entries..."
  ],
  "goals": [
    {
      "objective": "Provide accurate and timely weather information with DailyWeatherUpdate workflow and manage token purchases on Hyperliquid with BuyHyperliquidToken workflow.",
      "successCriteria": [
        "Response time under 1 second.",
        "Accuracy rate above 95%."
      ],
      "constraints": [
        "Do not provide weather forecasts beyond 7 days.",
        "Avoid using jargon; responses should be easily understandable."
      ]
    }
  ],
  "workflows": [
    {
      "name": "DailyWeatherUpdate",
      "description": "Fetches and updates the daily weather information.",
      "actions": [
        {
          "name": "FetchWeatherData",
          "description": "Fetches the weather data for the given location.",
          "parameters": {
            "location": {
              "type": "string",
              "description": "The location to fetch the weather data for."
            }
          }
        },
        {
          "name": "UpdateKnowledgeBase",
          "description": "Updates the knowledge base with the new weather data.",
          "parameters": {
            "knowledge": {
              "type": "string",
              "description": "The knowledge to update the knowledge base with."
            }
          }
        }
      ]
    },
    {
      "name": "BuyHyperliquidToken",
      "description": "Buys 1 token on Hyperliquid.",
      "actions": [
        {
          "name": "BuyTokenOnHyperliquid",
          "description": "Buys the specified token on Hyperliquid.",
          "parameters": {
            "token": {
              "type": "string",
              "description": "The token to buy."
            },
            "quantity": {
              "type": "number",
              "description": "The quantity of the token to buy."
            }
          }
        }
      ]
    }
  ]
}
```

**Key Sections:**

- **name & description:** Basic details about the agent.
- **modelIntegration:** Configuration for integrating with AI models (e.g., OpenAI).
- **messageExample:** Sample interactions to guide the agent's responses.
- **knowledge:** A list of knowledge entries that the agent can reference.
- **goals:** Objectives the agent aims to achieve, including success criteria and constraints.
- **workflows:** Defined workflows consisting of a series of actions the agent can perform.

## Running the Agent

1. **Set Up Environment Variables**

   Create a `.env` file in the root directory and define the necessary API keys and configurations:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   HYPERLIQUID_API_KEY=your_hyperliquid_api_key
   WEATHER_API_KEY=your_weather_api_key
   EMAIL_API_KEY=your_email_api_key
   EVM_WALLET_PRIVATE_KEY=your_wallet_private_key
   PORT=3000
   ```

2. **Start the Server**

   ```bash
   npm run build
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
## Creating Plugins

Plugins extend the functionality of the Iryna Framework by introducing new actions and services. Here's how to create and integrate a custom plugin.

### Plugin Structure

Each plugin resides in the `src/plugins` directory and typically contains:

- **Service Class:** Handles the core logic (e.g., fetching data from an external API).
- **Action Class:** Implements specific actions that the agent can perform using the service.
- **Additional Files:** Any dependencies or utilities required by the plugin.

### Steps to Create a Plugin

1. **Create Plugin Directory**

   For example, to create a `Translate` plugin:

   ```bash
   mkdir -p src/plugins/Translate
   touch src/plugins/Translate/TranslateService.ts
   touch src/plugins/Translate/TranslateAction.ts
   ```

2. **Implement the Service**

   `TranslateService.ts`

   ```typescript
   // src/plugins/Translate/TranslateService.ts
   export class TranslateService {
       private apiKey: string;

       constructor(apiKey: string) {
           this.apiKey = apiKey;
       }

       async translate(text: string, targetLanguage: string): Promise<string> {
           // Implement translation logic using an external API like Google Translate
           // For demonstration, return a mock translation
           return `Translated (${targetLanguage}): ${text}`;
       }
   }
   ```

3. **Implement the Action**

   `TranslateAction.ts`

   ```typescript
   // src/plugins/Translate/TranslateAction.ts
   import { IAction, ActionContext, ActionResult } from "../../types";
   import DependencyContainer from "../../dependencies/DependencyContainer";
   import { TranslateService } from "./TranslateService";

   export class TranslateAction implements IAction {
       name = "TranslateText";
       subname = ["TranslateText"];
       description = "Translates text to a specified language.";

       private translateService: TranslateService;

       constructor(container: DependencyContainer) {
           this.translateService = container.get<TranslateService>("TranslateService");
       }

       async validate(context: ActionContext): Promise<boolean> {
           const { text, targetLanguage } = context.input;
           return !!text && !!targetLanguage;
       }

       async execute(context: ActionContext): Promise<ActionResult> {
           try {
               const { text, targetLanguage } = context.input;
               const translatedText = await this.translateService.translate(text, targetLanguage);
               return { success: true, output: translatedText };
           } catch (error: any) {
               return { success: false, error: error.message };
           }
       }
   }
   ```

4. **Register the Service in Dependency Container**

   Update `DependencyContainer.ts` to include the `TranslateService`:

   ```typescript
   // src/dependencies/DependencyContainer.ts
   import { TranslateService } from "../plugins/Translate/TranslateService";

   class DependencyContainer {
       // ... existing code ...

       initialize() {
           // ... existing services ...

           const translateService = new TranslateService(process.env.TRANSLATE_API_KEY || "");
           this.register("TranslateService", translateService);

           // Add other services as needed
       }

       // ... existing code ...
   }
   ```

5. **Load the Action**

   The `ActionLoader` automatically loads actions from the `plugins` directory. Ensure your plugin files export the action classes correctly.

6. **Update `defaultCharacter.json`**

   Add the new workflow and action to your agent's configuration:

   ```json
   {
     // ... existing configuration ...
     "workflows": [
       // ... existing workflows ...
       {
         "name": "TranslateWorkflow",
         "description": "Translates user-provided text to a specified language.",
         "actions": [
           {
             "name": "TranslateText",
             "description": "Translates the given text to the target language.",
             "parameters": {
               "text": {
                 "type": "string",
                 "description": "The text to translate."
               },
               "targetLanguage": {
                 "type": "string",
                 "description": "The language to translate the text into."
               }
             }
           }
         ]
       }
     ]
   }
   ```

7. **Rebuild and Restart the Agent**

   ```bash
   npm run build
   npm run start
   ```

   Your agent now supports the new translation functionality.

## Workflows and Actions

### Workflows

Workflows are sequences of actions that the agent can perform to achieve specific goals. Each workflow consists of multiple actions executed in order.

**Example Workflow Structure:**

```json
{
  "name": "DailyWeatherUpdate",
  "description": "Fetches and updates the daily weather information.",
  "actions": [
    {
      "name": "FetchWeatherData",
      "description": "Fetches the weather data for the given location.",
      "parameters": {
        "location": {
          "type": "string",
          "description": "The location to fetch the weather data for."
        }
      }
    },
    {
      "name": "UpdateKnowledgeBase",
      "description": "Updates the knowledge base with the new weather data.",
      "parameters": {
        "knowledge": {
          "type": "string",
          "description": "The knowledge to update the knowledge base with."
        }
      }
    }
  ]
}
```

**Key Points:**

- **name:** Identifier for the workflow.
- **description:** Brief explanation of what the workflow does.
- **actions:** Ordered list of actions that make up the workflow.

### Actions

Actions are the building blocks of workflows. Each action represents a specific task that the agent can perform, such as fetching data, updating the knowledge base, sending emails, etc.

**Action Structure:**

```json
{
  "name": "FetchWeatherData",
  "description": "Fetches the weather data for the given location.",
  "parameters": {
    "location": {
      "type": "string",
      "description": "The location to fetch the weather data for."
    }
  }
}
```

**Key Components:**

- **name:** Unique identifier for the action.
- **description:** Description of what the action does.
- **parameters:** Inputs required for the action to execute.

**Creating Actions:**

1. **Define the Action in `defaultCharacter.json`:**

   Specify the action's name, description, and required parameters within a workflow.

2. **Implement the Action Class:**

   Create a class that implements the `IAction` interface, handling validation and execution logic.

3. **Register the Action:**

   Ensure the action is properly loaded by the `ActionLoader` through correct export and placement in the plugins directory.

## Example Plugin

Let's walk through creating a simple `Echo` plugin that echoes back user input.

### Step 1: Create Plugin Directory

```bash
mkdir -p src/plugins/Echo
touch src/plugins/Echo/EchoService.ts
touch src/plugins/Echo/EchoAction.ts
```

### Step 2: Implement the Service

`EchoService.ts`

```typescript
// src/plugins/Echo/EchoService.ts
export class EchoService {
    async echo(text: string): Promise<string> {
        return `Echo: ${text}`;
    }
}
```

### Step 3: Implement the Action

`EchoAction.ts`

```typescript
// src/plugins/Echo/EchoAction.ts
import { IAction, ActionContext, ActionResult } from "../../types";
import DependencyContainer from "../../dependencies/DependencyContainer";
import { EchoService } from "./EchoService";

export class EchoAction implements IAction {
    name = "EchoText";
    subname = ["EchoText"];
    description = "Echoes back the provided text.";

    private echoService: EchoService;

    constructor(container: DependencyContainer) {
        this.echoService = container.get<EchoService>("EchoService");
    }

    async validate(context: ActionContext): Promise<boolean> {
        const { text } = context.input;
        return !!text;
    }

    async execute(context: ActionContext): Promise<ActionResult> {
        try {
            const { text } = context.input;
            const echoedText = await this.echoService.echo(text);
            return { success: true, output: echoedText };
        } catch (error: any) {
            return { success: false, error: error.message };
        }
    }
}
```

### Step 4: Register the Service

Update `DependencyContainer.ts`:

```typescript
// src/dependencies/DependencyContainer.ts
import { EchoService } from "../plugins/Echo/EchoService";

class DependencyContainer {
    // ... existing code ...

    initialize() {
        // ... existing services ...

        const echoService = new EchoService();
        this.register("EchoService", echoService);

        // Add other services as needed
    }

    // ... existing code ...
}
```

### Step 5: Define the Workflow and Action

Update `defaultCharacter.json`:

```json
{
  // ... existing configuration ...
  "workflows": [
    // ... existing workflows ...
    {
      "name": "EchoWorkflow",
      "description": "Echoes user-provided text.",
      "actions": [
        {
          "name": "EchoText",
          "description": "Echoes back the provided text.",
          "parameters": {
            "text": {
              "type": "string",
              "description": "The text to echo back."
            }
          }
        }
      ]
    }
  ]
}
```

### Step 6: Rebuild and Restart

```bash
npm run build
npm run start
```

Your agent now supports the `EchoWorkflow`, allowing it to echo back user input.

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
