---
sidebar_position: 3
title: "CLI"
hidden: false
lastUpdatedAt: "2025-02-17"
---

# Character Generator CLI 

## Overview
The Character Generator CLI is a tool designed to simplify the process of creating and customizing AI Agent characters. It provides an interactive interface, through the terminal, to configure various aspects of an AI character, including its personality, behavior, knowledge base, and workflows.

## Features
- Create new AI characters from scratch
- Modify existing characters
- Configure AI model integrations (OpenAI, Hyperbolic, Ionet, Ollama)
- Define character workflows and actions
- Set up knowledge bases
- Customize message and post examples
- Define character goals
- Fine-tune model parameters

## Getting Started

### 1. Launch the CLI

    ```bash
    npm run character
    ```

### 2. Main Menu Options
- **Create new character**: Start fresh with a new character configuration
- **Modify existing character**: Edit an existing character's configuration

### 3. Character Creation Process

#### Basic Information
- **Name**: Choose a name for your character
- **Description**: Provide a description of your character's purpose
- **Type**: Select character types (DeFi Agent, Social Media Agent)

#### Model Integration
- Choose from supported providers:
  - OpenAI
  - Hyperbolic
  - Ionet
  - Ollama
- Select specific model from available options
- Configure model parameters:
  - Temperature (0-1)
  - Max Tokens (1-4096)
  - Top P (0-1)
  - Frequency Penalty (-2 to 2)
  - Presence Penalty (-2 to 2)

#### Knowledge Base
- Add knowledge items from a text file
- One knowledge item per line
- Comments can be added using '#'

#### Workflows
- Create custom workflows with specific actions
- Each workflow includes:
  - Name (must be a single word without spaces or special characters)
  - Description
  - Sequence of actions

#### Message Examples (for Social Media Agents)
- Add example conversations
- Include both user messages and assistant responses

#### Post Examples (for Social Media Agents)
- Add example social media posts
- Help define the character's posting style

#### Goals
- Define specific objectives for the character
- Multiple goals can be added

## File Location
Generated character configurations are saved in the `characters` directory with the filename format: `{character-name}.json`

## Modifying Existing Characters
When modifying an existing character, you can choose to edit:
- Workflows
- Message Examples
- Post Examples
- Knowledge Base
- Model Integration Settings
- Goals

## Best Practices
1. Use descriptive names for characters and workflows
2. Provide comprehensive knowledge bases
3. Include diverse message examples for social media agents
4. Create focused, specific goals
5. Test workflows with simple actions first

## Troubleshooting
- Ensure all required API keys are properly set in `.env`
- Verify file paths when importing knowledge bases
- Check network connectivity for API-dependent operations
- Ensure the `characters` directory exists



