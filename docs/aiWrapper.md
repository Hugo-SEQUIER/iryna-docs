---
sidebar_position: 2
title: "AI Wrapper"
hidden: false
lastUpdatedAt: "2025-02-09"
---

# AI Wrapper

The AI Wrapper in the Iryna Framework is responsible for integrating and managing interactions with AI models. It facilitates seamless communication between the intelligent agents and AI providers, ensuring efficient processing of natural language inputs and generation of responses.

## Configuration

AI integration is configured within the `defaultCharacter.json` file under the `modelIntegration` section. This configuration allows you to specify the AI provider, model details, and relevant parameters.

### Example Configuration

```json
{
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
    }
}
```

**Key Sections:**

- **provider:** Specifies the AI service provider (e.g., OpenAI).
- **model:** Defines the AI model to be used (e.g., `gpt-4o`).
- **embeddingModel:** Specifies the model used for embeddings.

- **parameters:** Contains settings that influence the AI model's behavior, such as temperature and token limits.
- **systemPrompt:** Sets the initial context or instructions for the AI model.


## AiWrapper Class Overview

The AiWrapper class is a pivotal component of the Iryna Framework's AI integration capabilities. Designed as an abstract class, it provides a standardized interface for interacting with various AI providers, such as OpenAI, Claude, and others. By leveraging this abstraction, developers can seamlessly switch between different AI services or incorporate additional providers with minimal effort.

**Key Features:**

- **Abstract Design:** Serves as a blueprint for specific AI provider implementations, ensuring consistency across different integrations.
- **Configurable Parameters:** Allows customization of AI model parameters like temperature, maximum tokens, and penalties to fine-tune the behavior of AI responses.
- **Initialization Management:** Ensures that the AI client is initialized only once, optimizing performance and resource utilization.
- **Function Registration:** Facilitates the integration of additional functionalities or tools that the AI can leverage during interactions. (such as Function calling)

### Extending AiWrapper for Multiple Providers

To integrate a new AI provider, such as Claude, developers can create a subclass that extends `AiWrapper` and implements the abstract methods. This approach ensures that each provider adheres to the framework's standards while allowing for provider-specific configurations and functionalities.

```typescript
import { AiWrapper } from "./AiWrapper";

export class ClaudeWrapper extends AiWrapper {
    protected async initializeClient(): Promise<boolean> {
        // Implementation specific to Claude
    }

    public async generateText(prompt: string, agent: Agent): Promise<AgentResponse> {
        // Implementation specific to Claude
    }

    public async getEmbeddings(texts: string[]): Promise<number[][]> {
        // Implementation specific to Claude
    }

    public async registerFunctions(functions: Object[]): Promise<boolean> {
        // Implementation specific to Claude
    }
}
```
By following this pattern, the AiWrapper class ensures that adding support for new AI providers is straightforward and maintains consistency across different integrations.

### Benefits of Using AiWrapper

- **Flexibility:** Easily switch between different AI providers without overhauling the existing infrastructure.
- **Scalability:** Add support for additional AI services as needed, accommodating the evolving needs of intelligent agents.
- **Maintainability:** Centralizes AI integration logic, simplifying maintenance and updates.
- **Consistency:** Ensures that all AI interactions adhere to a unified interface, promoting reliable and predictable behavior.

By abstracting the complexities of various AI providers into a single, cohesive interface, the AiWrapper class empowers developers to build intelligent agents that are both versatile and resilient.

## Current Implementations

The Iryna Framework currently supports multiple AI providers through the OpenAI client implementation. This includes IONET, Ollama, and Hyperbolic API URL integrations, which can be configured to use alternative AI models. However, it's important to note that function calling capabilities are currently only supported through the official OpenAI API. Additionally, the framework relies on OpenAI's embedding models for all embedding operations, regardless of the chosen provider for text generation. Therefore, users must provide an OpenAI API key for embedding functionality.

For use cases focused solely on text generation (such as social agents or simple conversational bots), users have the flexibility to utilize any of the supported providers. This allows for cost-effective implementations while maintaining the core functionality needed for basic agent interactions.


