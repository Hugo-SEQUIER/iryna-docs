---
sidebar_position: 3
title: "Plugins"
hidden: false
lastUpdatedAt: "2025-02-09"
---

# Creating Plugins

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

Your agent now supports the new translation functionality.
