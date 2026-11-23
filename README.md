# Kling AI for Google Antigravity

Create images and videos from Antigravity chat with your Kling AI Global account. The plugin includes a connection to Kling's remote MCP server and three Skills for image generation, video generation, and managing subjects and tasks.

## Quick start

To have Antigravity install and connect the plugin, paste this prompt into its chat.

```text
Help me install the Kling AI plugin for Google Antigravity. Run:

agy plugin install https://github.com/klingai-dev/antigravity-plugin

Confirm that the plugin is enabled and that its `kling-ai` MCP server uses https://kling.ai/mcp/plugin. Then guide me through signing in to my Kling AI Global account in the browser.

After I authorize access, verify the connection with a read-only check of my available models and credit balance. Once the check succeeds, let me know I’m ready to create with Kling AI.
```

### 1. Install the plugin

If you have the Antigravity CLI (`agy`), run this in your terminal.

```bash
agy plugin install https://github.com/klingai-dev/antigravity-plugin
```

To review a local checkout, run `agy plugin install .` from the repository root, then run `agy plugin list` to check that Kling AI is enabled.

For a manual install, download or clone the repository and place the plugin folder in one of these locations. The plugin's `plugin.json` should be at the top level of that folder.

- **One workspace** — `.agents/plugins/kling-ai/` under your workspace root.
- **All workspaces** — `~/.gemini/config/plugins/kling-ai/`.

Reload Antigravity after a manual install. See [Antigravity's plugin installation guide](https://antigravity.google/docs/plugins/).

If you already use the [Claude Code plugin](https://github.com/klingai-tech/claude-plugin#antigravity-cli), `agy plugin import claude` can import the plugins from that profile. Choose one Kling AI installation and authorize it in Antigravity.

### 2. Sign in to Kling AI

- **Antigravity app** — Open **Customizations → Installed → MCP Servers**, find the Kling AI server, and click **Authenticate** if prompted.
- **Antigravity CLI** — Start an interactive session with `agy`, follow the browser sign-in prompt when the server connects, and use `/mcp` to check its status.

Sign in to your Kling AI Global account in the browser and approve access. If Antigravity asks for an authorization code, enter it in its authorization dialog. [Kling AI Global](https://kling.ai/)

The plugin already configures `https://kling.ai/mcp/plugin` in [`mcp_config.json`](mcp_config.json). OAuth handles sign-in without an API key. If you already connected Kling manually, keep just one Kling connection active. [Kling MCP & CLI guide](https://kling.ai/app/mcp/guide) · [Antigravity MCP authentication](https://antigravity.google/docs/mcp/#authenticate-a-server)

### 3. Verify the connection and create something

Start a chat in Antigravity and try this read-only check.

> Use Kling AI to show my available models and credit balance. Don't generate anything.

Once Antigravity returns your models and balance, try a generation prompt.

> Prepare a five-second video of waves breaking against a rocky coast at sunrise with Kling 4.0. Show me the settings and wait for my approval before generating.

Generation uses your Kling credits. Review the model, duration, resolution, and any credit estimate before approving. Kling returns a generation ID that you can use to check progress later. When the task succeeds, open the result in Antigravity or follow the media link it returns.

If Kling is missing, check that the plugin is enabled under **Customizations → Installed** or run `agy plugin list` in your terminal. If Kling is listed but disconnected, reopen its authentication flow and confirm you signed in with your Global account.

## Skills

- [Kling AI](skills/kling-ai/SKILL.md): routing, subjects, motion library, uploads, credits, tasks, and account switching.
- [Image generation](skills/kling-ai-generate-image/SKILL.md): prompt writing, image creation and reference editing, including Kling Image 4.0 Series Mode when available.
- [Video generation](skills/kling-ai-generate-video/SKILL.md): prompts and storyboards, Kling 4.0 and Kling 4.0 Flash model selection, HDR, multimodal references, and motion control.

## More prompts

- **Image** — “Prepare a Kling Image 4.0 product photo of a ceramic mug on a wooden table in soft morning light. Show me the settings before generating.”
- **Reference video** — “With Kling AI, use my attached photo as the opening frame for a five-second video. Keep the subject in frame as the camera moves closer and ask me to approve before generating.”
- **HDR video** — “Prepare a five-second, 1080p HDR video with Kling 4.0. Neon signs reflect off a rain-soaked street as the camera slowly moves forward. Show me the settings before generating.”
- **Reusable subjects** — “List my Kling Elements and show me the details of the one I select.”
- **Task status** — “Check Kling generation ID `<generation-id>` and show me the result when it is ready.”

The available models, reference media, and settings depend on your account and the selected model. If you choose to prioritize speed or credit savings, ask for Kling 4.0 Flash when it is available for your task.

## Data handling

Prompts, generation settings, reference media, and selected Element IDs are sent to Kling. Local files are uploaded only when needed through Kling's upload flow. Generation and subject storage run on the remote service. Content can contain personal information. Kling's [Privacy Policy](https://kling.ai/docs/privacy-policy) describes processing and retention based on service, business, and legal needs; it does not promise deletion of all data within 30 days. See also [Terms of Service](https://kling.ai/docs/user-policy). Support: support@kling.ai.

## Validation and reviewer testing

```bash
npm test
agy plugin validate --strict .
```

`npm test` checks the Antigravity manifest and starter prompts, version agreement, bundled PNG logo, `serverUrl` connection, three Skill identities, packaged links, and absence of Claude-only commands. `agy plugin validate --strict .` checks that the Antigravity CLI recognizes the manifest, Skills, and MCP configuration.

In Antigravity, install the plugin, authenticate, inspect the three Skills and Kling tools, and run read-only model, credit, and Element queries. Then request a five-second Kling 4.0 video, inspect the confirmation, approve with sufficient credits, and verify terminal task success and playable output. If the live model offers HDR, verify that the confirmation includes HDR and a compatible resolution. Repeat the task-status query to check that it only retrieves the original task.

## Source and format

The Skills track [Kling AI for Claude Code at `ed12ef8`](https://github.com/klingai-tech/claude-plugin/tree/ed12ef8524580c07d53aabde8eb8fd11dccf65ff/skills). Version 1.4.0 uses the [Antigravity plugin format](https://antigravity.google/docs/build-plugins/) and [native MCP configuration](https://antigravity.google/docs/mcp/). MIT license.
