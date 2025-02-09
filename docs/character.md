---
sidebar_position: 3
title: "Character"
hidden: false
lastUpdatedAt: "2025-02-05"
---

# Character

**Note:** The `defaultCharacter.json` file is inspired by the one from ElizaOS. We chose this because it's easy to use and a lot of people are now familiar with it.

The `defaultCharacter.json` file defines the initial configuration for your agent. This JSON file includes details such as the agent's name, description, model integration settings, message examples, knowledge base, goals, and workflows. Here's a breakdown of its structure:

```json
{
    "name": "Default Character",

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
        "A datachain is a blockchain designed...",
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


## Key Sections:

- **name & description:** Basic details about the agent.
- **modelIntegration:** Configuration for integrating with AI models (e.g., OpenAI).
- **messageExample:** Sample interactions to guide the agent's responses.
- **knowledge:** A list of knowledge entries that the agent can reference (RAG).
- **goals:** Objectives the agent aims to achieve, including success criteria and constraints.
- **workflows:** Defined workflows consisting of a series of actions the agent can perform.
