# Kling AI for Google Antigravity

Create images and videos from Antigravity chat with your Kling AI Global account. The plugin includes a connection to Kling's remote MCP server and three Skills for image generation, video generation, and managing subjects and tasks.

## Quick start

### 1. Install the plugin

If you have the Antigravity CLI (`agy`), run this in your terminal.

```bash
agy plugin install https://github.com/klingai-dev/antigravity-plugin
```

For a manual install, download or clone the repository and place the plugin folder in one of these locations. The plugin's `plugin.json` should be at the top level of that folder.

- **One workspace** — `.agents/plugins/kling-ai/` under your workspace root.
- **All workspaces** — `~/.gemini/config/plugins/kling-ai/`.

Reload Antigravity after a manual install. See [Antigravity's plugin installation guide](https://antigravity.google/docs/plugins/).

### 2. Sign in to Kling AI

- **Antigravity app** — Open **Customizations → Installed → MCP Servers**, find the Kling AI server, and click **Authenticate** if prompted.
- **Antigravity CLI** — Start an interactive session with `agy`, follow the browser sign-in prompt when the server connects, and use `/mcp` to check its status.

Sign in to your Kling AI Global account in the browser and approve access. If Antigravity asks for an authorization code, enter it in its authorization dialog. [Kling AI Global](https://kling.ai/)

The plugin already configures `https://kling.ai/mcp/plugin` in [`mcp_config.json`](mcp_config.json). OAuth handles sign-in without an API key. If you already connected Kling manually, keep just one Kling connection active. [Kling MCP & CLI guide](https://kling.ai/app/mcp/guide) · [Antigravity MCP authentication](https://antigravity.google/docs/mcp/#authenticate-a-server)

### 3. Verify the connection and create something

Start a chat in Antigravity and try this read-only check.

> Use Kling AI to show my available models and credit balance. Don't generate anything.

Once Antigravity returns your models and balance, try a generation prompt.

> Create a five-second video of waves breaking against a rocky coast at sunrise with Kling AI V4. Show me the settings and wait for my approval before generating.

Generation uses your Kling credits. Review the model, duration, resolution, and any credit estimate before approving. Kling returns a generation ID that you can use to check progress later. When the task succeeds, open the result in Antigravity or follow the media link it returns.

If Kling is missing, check that the plugin is enabled under **Customizations → Installed** or run `agy plugin list` in your terminal. If Kling is listed but disconnected, reopen its authentication flow and confirm you signed in with your Global account.

## Skills

- [Kling AI](skills/kling-ai/SKILL.md): routing, subjects, motion library, uploads, credits, tasks, and account switching.
- [Image generation](skills/kling-ai-generate-image/SKILL.md): new images, reference editing, and image prompts.
- [Video generation](skills/kling-ai-generate-video/SKILL.md): V4 recommendations, multimodal references, motion, and shot planning.

## More prompts

- **Image** — “Use Kling AI to create a product photo of a ceramic mug on a wooden table in soft morning light. Show me the settings before generating.”
- **Reference video** — “With Kling AI, use my attached photo as the opening frame for a five-second video. Keep the subject in frame as the camera moves closer and ask me to approve before generating.”
- **Reusable subjects** — “List my Kling Elements and show me the details of the one I select.”
- **Task status** — “Check Kling generation ID `<generation-id>` and show me the result when it is ready.”

The available models, reference media, and settings depend on your account and the selected model. If you choose to prioritize speed or credit savings, ask for V4 Flash when it is available for your task.

## Data handling

Prompts, generation settings, reference media, and selected Element IDs are sent to Kling. Local files are uploaded only when needed through Kling's upload flow. Generation and subject storage run on the remote service. Content can contain personal information. Kling's [Privacy Policy](https://kling.ai/docs/privacy-policy) describes processing and retention based on service, business, and legal needs; it does not promise deletion of all data within 30 days. See also [Terms of Service](https://kling.ai/docs/user-policy). Support: support@kling.ai.

## Validation and reviewer testing

```bash
npm test
```

Local checks validate the Antigravity QA metadata, manifest/package version agreement, bundled PNG logo, `serverUrl` connection, three Skill identities, packaged links, and absence of Claude-only commands. Positive and negative tests cover the complete metadata, missing or invalid logo assets, incompatible manifest/config fields, and broken references. This does not prove host installation, OAuth, or generation works.

In Antigravity, install the plugin, authenticate, inspect the three Skills and Kling tools, and run read-only model/credit and Element queries. Then request a five-second V4 video, inspect the confirmation, approve with sufficient credits, and verify terminal task success and playable output. Repeat the task-status query to confirm it does not generate again. Actual Antigravity OAuth and paid generation have not yet been verified for this package.

## Source and format

Adapted from [Kling AI for Claude Code](https://github.com/klingai-tech/claude-plugin), source commit `e950640`, using the [Antigravity plugin format](https://antigravity.google/docs/plugins/) and [MCP configuration](https://antigravity.google/docs/mcp/). This independent package starts at version 1.0.0 in both `package.json` and `plugin.json`. The host manifest includes the display name, version, logo, author, homepage, repository, license, and keywords requested by Antigravity QA. MIT license.
