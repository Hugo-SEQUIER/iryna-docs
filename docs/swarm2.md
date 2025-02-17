---
sidebar_position: 6
title: "Swarm"
hidden: false
lastUpdatedAt: "2025-02-17"
---
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Swarm Network Integration

## Overview
The Swarm system enables decentralized communication between AI agents through a central orchestrator. This framework provides actions to interact with agents registered on the Swarm network.

## Architecture

<center>
<ThemedImage
    alt="Swarm Integration"
    sources={{
        light: useBaseUrl('/img/Swarm_Interaction.png'),
        dark: useBaseUrl('/img/Swarm_Interaction.png'),
    }}
    style={{width: 600}}
    />

</center>

1. **Swarm Orchestrator**: Central hub that:
   - Maintains agent registry
   - Routes messages between agents
   - Provides agent status information
   - Stores agent data

2. **Agents**: Autonomous entities that:
   - Register with the orchestrator
   - Store data through the network
   - Communicate with other agents
   - Maintain their own API endpoints

## Available Actions

### 1. SwarmMessage (`SwarmMessage.ts`)
**Purpose**: Send messages to other agents on the network

**Usage**:
```typescript
	const result = await executeAction("SwarmMessage", {
		agentIdToReach: "target-agent-id",
		message: "Your message here"
	});
```

**Parameters**:
- `agentIdToReach`: Target agent's unique identifier
- `message`: Content to send

**Validation**:
- Automatically checks if target agent is online and ready

### 2. SwarmGetData (`SwarmGetData.ts`)
**Purpose**: Retrieve data stored by an agent in the last hour

**Usage**:

### 2. SwarmGetData (`SwarmGetData.ts`)
**Purpose**: Retrieve data from an agent on the network

```typescript
const data = await executeAction("SwarmGetData", {
	agentAuthority: "target-agent-id"
});
```

**Parameters**:
- `agentAuthority`: Target agent's authority identifier

## Core Service Methods (`SwarmService.ts`)

| Method | Purpose |
|--------|---------|
| `getAgentStatus()` | Check if an agent is online and ready |
| `sendMessageToAgent()` | Route message through orchestrator |
| `getDataStoredByAgentLastHour()` | Retrieve temporal data |
| `getAgentsOnNetwork()` | List all registered agents |
| `storeAgentOnNetwork()` | Register new agent |

## How it works

<center>
<ThemedImage
    alt="Swarm Integration"
    sources={{
        light: useBaseUrl('/img/Swarm_Workflow.png'),
        dark: useBaseUrl('/img/Swarm_Workflow.png'),
    }}
    style={{width: 600}}
    />

</center>

## Implementation Details

1. **Dependencies**:

```typescript
constructor(container: DependencyContainer) {
this.swarmService = container.get<SwarmService>("SwarmService");
}
```
2. **Error Handling**:
- Automatic error logging through Iryna logger
- Unified error format in responses:

```typescript
return { success: false, error: error.message };
```

3. **Message Flow**:
- Validate target agent status
- Package message payload
- Route through orchestrator
- Return response to caller

## Requirements

Environment Configuration:

```env
SWARM_ORCHESTRATOR_URL=http://your-orchestrator:port
```

## Best Practices

1. Always check `success` boolean in responses
2. Wrap calls in try/catch blocks
3. Use built-in validation before operations
4. Monitor logs through `irynaLogger` integration

