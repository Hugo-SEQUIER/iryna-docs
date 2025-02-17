---
sidebar_position: 7
title: "Orchestrator"
hidden: false
lastUpdatedAt: "2025-02-17"
---

# Orchestrator

## Overview
The Orchestrator is a decentralized agent management system that handles AI agent registration, communication, and data storage using Irys (formerly Arweave) for permanent storage and Supabase for metadata management.

## Key Features
1. **Agent Registration** - Store agent configurations permanently on Irys
2. **Agent Communication** - Send messages to registered agents through REST API
3. **Data Provenance** - Track agent-generated data with timestamped transactions
4. **Decentralized Storage** - Leverage Irys network for immutable data storage
5. **Status Monitoring** - Check agent availability and operational status

## System Architecture

### Core Components
1. **API Server** (Fastify)
   - REST endpoints for agent management
   - Handles message routing between agents
   - Manages agent status checks

2. **Irys Integration**
   - Stores agent configurations as mutable transactions
   - Retrieves historical agent data
   - Manages data provenance through transaction chaining

3. **Supabase Bridge**
   - Maintains root transaction IDs
   - Links agent IDs to their storage locations
   - Provides quick lookup for agent metadata

## Key Workflows

### 1. Agent Registration

- Stores agent configuration with:
  - Unique agent ID
  - API endpoint
  - Operational state
  - Character parameters
- Creates chained transactions for updates

### 2. Message Handling

- Endpoint: `/api/agent/sendMessageToAgent`
- Flow:
  1. Verify agent existence
  2. Retrieve agent endpoint from Irys
  3. Forward message to agent's API
  4. Return response to caller

### 3. Data Retrieval

- Gets all data stored by an agent in the last hour
- Uses Irys timestamp filters for efficient querying
- Recursively fetches chained transaction data

## API Endpoints

| Endpoint                      | Method | Description                          |
|-------------------------------|--------|--------------------------------------|
| `/api/agent/status`           | GET    | System health check                  |
| `/api/agent/getAgentOnNetwork`| GET    | List all registered agents           |
| `/api/agent/storeAgentOnNetwork` | POST | Register new agent                 |
| `/api/agent/sendMessageToAgent` | POST | Forward message to agent          |
| `/api/agent/getDataStoredByAgentLastHour` | POST | Retrieve agent storage data |

## Data Flow
1. Client → Orchestrator API
2. Orchestrator → Irys (store/retrieve data)
3. Orchestrator → Agent API (message forwarding)
4. Orchestrator ↔ Supabase (metadata management)

// ... existing documentation ...

## Command Line Interface

### Agent Management

#### Store Agent on Network
1. Ensure you have:
   - Created a character file in `characters/` directory
   - Set `SWARM_ORCHESTRATOR_URL` in .env file
2. Run the store command:

```bash
npm run swarm-agent-store
```

3. Follow the prompts:
   - Select character from list
   - Enter agent API URL (defaults to API_URL from .env)

#### List Registered Agents
Get all agents currently registered on the network:

```bash
npm run swarm-agent-list
```
Example output:

```json
[
    {
        "agentId": "abc123",
        "apiUrl": "https://your-agent.com/api",
        "status": "online",
        "lastUpdated": "2024-02-15T12:34:56Z"
    }
]
```




