---
sidebar_position: 4
title: "Character"
hidden: false
lastUpdatedAt: "2025-02-17"
---

# Character

**Note:** The `defaultCharacter.json` file is inspired by the one from ElizaOS. We chose this because it's easy to use and a lot of people are now familiar with it.

The `defaultCharacter.json` file defines the initial configuration for your agent. This JSON file includes details such as the agent's name, description, model integration settings, message examples, knowledge base, goals, and workflows.

## Core Configuration

### Basic Information
```json
{
    "name": "Default Character",
    "description": "Provides accurate weather information with DailyWeatherUpdate workflow and interacts with financial markets on Hyperliquid.",
    "rootTx": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "id": "123",
    "authority": "0x0000000000000000000000000000000000000000"
}
```
- **name**: The display name of your agent
- **description**: A brief summary of your agent's capabilities and purpose
- **rootTx**: The transaction hash where the configuration file is stored on Irys
- **id**: A unique identifier for your agent
- **authority**: The public key used to store the configuration file on Irys

### Model Integration
```json
{
    "modelIntegration": {
        "provider": {
            "type": "openai"
        },
        "model": "gpt-4",
        "embeddingModel": "text-embedding-3-small",
        "parameters": {
            "temperature": 0.7,
            "maxTokens": 500,
            "topP": 0.9,
            "frequencyPenalty": 0,
            "presencePenalty": 0
        },
        "systemPrompt": "You are a helpful assistant that provides weather information and can interact with financial markets."
    }
}
```
- **provider**: Specifies the AI service provider (e.g., OpenAI)
- **model**: The specific language model to use
- **embeddingModel**: The model used for text embeddings in RAG operations
- **parameters**: Fine-tuning parameters for the model:
  - `temperature`: Controls randomness (0.0-1.0)
  - `maxTokens`: Maximum response length
  - `topP`: Nucleus sampling parameter
  - `frequencyPenalty`: Reduces repetition
  - `presencePenalty`: Encourages topic diversity
- **systemPrompt**: The base prompt that defines the agent's behavior

### Message Examples
```json
{
    "messageExample": [
        { "role": "user", "content": "What's the weather like in New York today?" },
        { "role": "assistant", "content": "The current temperature in New York is 15°C with clear skies." }
    ]
}
```
Message examples help train the agent by providing sample interactions. Each example includes:
- **role**: Either "user" or "assistant"
- **content**: The actual message content
- Multiple examples can be provided to demonstrate different interaction patterns

### Knowledge Base
```json
{
    "knowledge": [
        "A datachain is a blockchain designed...",
        "...additional knowledge entries..." 
    ]
}
```
The knowledge array contains information that the agent can reference using RAG (Retrieval-Augmented Generation):
- Each entry should be a discrete piece of information
- Can include facts, procedures, or context-specific data
- Used to enhance the agent's responses with accurate, specific information

### Goals
```json
{
    "goals": [
        {
            "objective": "Provide accurate and timely weather information with DailyWeatherUpdate workflow and manage token purchases on Hyperliquid with BuyHyperliquidToken workflow."
        }
    ]
}
```
Goals define the agent's primary objectives:
- Each goal should be specific and actionable
- Can reference specific workflows
- Helps guide the agent's decision-making process

### Workflows
```json
{
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
                }
            ]
        }
    ]
}
```
Workflows define the specific actions your agent can perform:
- **name**: Unique identifier for the workflow
- **description**: Explains the workflow's purpose
- **actions**: Array of specific steps the workflow can execute
  - Each action has a name, description, and parameters
  - Parameters define the inputs needed for the action
  - Parameters include type (string, number, etc.) and description

## Best Practices
1. Keep descriptions clear and specific
2. Define comprehensive message examples
3. Regularly update the knowledge base
4. Create focused, single-purpose workflows
5. Use meaningful names for workflows and actions
6. Include detailed parameter descriptions
7. Maintain consistent formatting throughout the configuration
