# Kling AI for Google Antigravity

Create images and videos through the remote Kling AI MCP. Recommended: V4 for video generation; use V4 Flash when speed or credit savings are the priority. Supports text-to-image, reference-image editing, text-to-video, omni reference with image/video/audio inputs, reusable subjects (Elements), keyframes, motion control, uploads, credits, and task status. Each combination follows the selected model's live capabilities.

## Install

```bash
agy plugin install https://github.com/klingai-tech/antigravity-plugin
```

Alternatively, copy this repository into `.agents/plugins/kling-ai/` in your workspace or `~/.gemini/config/plugins/kling-ai/` globally. Restart Antigravity or reload its customizations as needed. Do not add a second Kling server if the plugin connection is already present.

## Connect

`mcp_config.json` registers one remote server using `serverUrl`: `https://kling.ai/mcp/plugin`. Open Settings > Customizations, authenticate the Kling server, and complete the host-managed OAuth flow with a Kling AI Global account. In the CLI, use `/mcp` to inspect connection status. No API key or bundled credentials are required. Never paste tokens into chat. Regional accounts and credits are separate.

## Skills

- [Kling AI](skills/kling-ai/SKILL.md): routing, subjects, motion library, uploads, credits, tasks, and account switching.
- [Image generation](skills/kling-ai-generate-image/SKILL.md): new images, reference editing, and image prompts.
- [Video generation](skills/kling-ai-generate-video/SKILL.md): V4 recommendations, multimodal references, motion, and shot planning.

## Try it

- Show my available Kling models and credits without generating anything.
- List my Elements and show the details of a subject I choose.
- Use V4 to create a five-second cinematic ocean shot. Show final settings before generating.
- Combine my image, video, and audio references using a compatible V4 model.
- Check the status of this generation ID without creating a new task.

Generation consumes Kling credits. Review the model, prompt, duration, resolution, reference roles, and applicable billing before approving. Each approved intent is submitted once. The Skill discovers model IDs and parameter limits live; it never guesses them. If the host renders a provider App, that App owns refresh. Otherwise the agent queries task status and returns a primary media link. App rendering support must be verified in the target host.

## Data handling

Prompts, generation settings, reference media, and selected Element IDs are sent to Kling. Local files are uploaded only when needed through Kling's upload flow. Generation and subject storage run on the remote service. Content can contain personal information. Kling's [Privacy Policy](https://kling.ai/docs/privacy-policy) describes processing and retention based on service, business, and legal needs; it does not promise deletion of all data within 30 days. See also [Terms of Service](https://kling.ai/docs/user-policy). Support: support@kling.ai.

## Validation and reviewer testing

```bash
npm test
```

Local checks validate the Antigravity manifest, `serverUrl` connection, three Skill identities, packaged links, and absence of Claude-only commands. Negative tests cover incompatible manifest/config fields and broken references. This does not prove host installation, OAuth, or generation works.

In Antigravity, install the plugin, authenticate, inspect the three Skills and Kling tools, and run read-only model/credit and Element queries. Then request a five-second V4 video, inspect the confirmation, approve with sufficient credits, and verify terminal task success and playable output. Repeat the task-status query to confirm it does not generate again. Actual Antigravity OAuth and paid generation have not yet been verified for this package.

## Source and format

Adapted from [Kling AI for Claude Code](https://github.com/klingai-tech/claude-plugin), source commit `e950640`, using the [Antigravity plugin format](https://antigravity.google/docs/plugins/) and [MCP configuration](https://antigravity.google/docs/mcp/). This independent package starts at version 1.0.0 in `package.json`; the host manifest contains only fields documented by Antigravity. MIT license.
