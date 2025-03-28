---
sidebar_position: 5
title: "Actions"
hidden: false
lastUpdatedAt: "2025-02-17"
---

# Actions

Actions are the building blocks of workflows. Each action represents a specific task that the agent can perform, such as fetching data, updating the knowledge base, sending emails, etc.

**Action Structure:**

```json
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
```

**Key Components:**

- **name:** Unique identifier for the action.
- **description:** Description of what the action does.
- **parameters:** Inputs required for the action to execute.

**Creating Actions:**

1. **Define the Action in `actions/actions.json`:**

   All actions must be defined in the `actions/actions.json` file using the following structure:

   ```json
   {
     "name": "SwarmGetData",
     "description": "Gets data from an agent on the swarm network.",
     "parameters": {
       "agentAuthority": {
         "type": "string",
         "description": "The authority of the agent to get data from. The public key used to store agent data on Irys"
       }
     }
   }
   ```

2. **Define the Action in `defaultCharacter.json`:**

   Specify the action's name, description, and required parameters within a workflow.

3. **Implement the Action Class:**

   Create a class that implements the `IAction` interface, handling validation and execution logic.

4. **Register the Action:**

   Ensure the action is properly loaded by the `ActionLoader` through correct export and placement in the plugins directory.

## Workflows

Workflows are sequences of actions that the agent can perform to achieve specific goals. An agent can have a list of different workflows, each aligned with a specific goal to be executed. Each workflow consists of multiple actions executed in order. Once the workflow is executed, each action inside will be executed one by one.

Actions can also be executed independently from a workflow, allowing for flexibility in task management.
