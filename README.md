# 可灵 AI 国内版 Antigravity 插件（Kling AI CN）

PRT branch `prt-cn` uses `https://kling-ai.prt.kuaishou.com/mcp`. Load this branch for PRT review; public marketplace installation instructions refer to the production release. Creative requests first discover the complete tool declarations and remote workflow catalog, including text-only plans. Search misses, truncated results and incomplete declarations pause routing instead of enabling local fallback.


在 Google Antigravity 中用自然语言生成或编辑图片、生成视频、复用主体，并查询任务进度和灵感值。本插件连接 `klingai.com` 的国内版账号，内置远程 MCP 配置和三个 Skill。

若你的账号在 `kling.ai`，请选择本仓库的 [国际版 `main` 分支](https://github.com/klingai-dev/antigravity-plugin/tree/main)。两区的账号、灵感值和任务各自独立。

[可灵 MCP & CLI 官方使用指南（国内版）](https://klingai.com/app/mcp/guide)

## 快速开始

把下面的提示词粘贴到 Antigravity 对话中，让它安装并连接插件。

```text
帮我安装 Google Antigravity 的可灵 AI 国内版插件。运行：

git clone --branch cn --single-branch https://github.com/klingai-dev/antigravity-plugin.git antigravity-plugin-cn
cd antigravity-plugin-cn
agy plugin install .

确认 kling-ai-cn 插件已启用，其中 kling-ai MCP 服务使用 https://kling-ai.prt.kuaishou.com/mcp。引导我在浏览器中登录可灵国内版账号并授权。

授权完成后，只读查询可用模型和灵感值余额，不要生成内容。连接检查成功后告诉我可以开始创作。
```

### 1. 安装插件

安装 Antigravity CLI（`agy`）后，在终端运行：

```bash
git clone --branch cn --single-branch https://github.com/klingai-dev/antigravity-plugin.git antigravity-plugin-cn
cd antigravity-plugin-cn
agy plugin install .
agy plugin list
```

本地已有仓库时，先切换到 `cn` 分支，再在仓库根目录运行 `agy plugin install .`。通过 `agy plugin list` 确认 **Kling AI CN** 已启用。

手动安装时，下载或克隆本仓库的 `cn` 分支，将插件目录放入以下任一位置。`plugin.json` 应位于该目录顶层。

- **单个工作区**：工作区下的 `.agents/plugins/kling-ai-cn/`。
- **所有工作区**：`~/.gemini/config/plugins/kling-ai-cn/`。

手动安装后重启或重新加载 Antigravity。参见 [Antigravity 插件安装指南](https://antigravity.google/docs/plugins/)。

若已安装 [国内版 Claude 插件](https://github.com/klingai-tech/claude-plugin-cn)，也可以通过 `agy plugin import claude` 导入。请只保留一种可灵接入方式，并在 Antigravity 中完成国内版账号授权。

### 2. 登录可灵国内版账号

- **Antigravity 应用**：打开 **Customizations → Installed → MCP Servers**，找到可灵服务，按提示点击 **Authenticate**。
- **Antigravity CLI**：运行 `agy` 开始交互会话，在服务连接时按浏览器提示登录，用 `/mcp` 检查连接状态。

在浏览器中登录 [可灵国内版](https://klingai.com/app) 并授权。如 Antigravity 要求授权码，请在它的授权对话框中输入。

插件已在 [`mcp_config.json`](mcp_config.json) 中配置 `https://kling-ai.prt.kuaishou.com/mcp`，通过 OAuth 登录，无需 API key。如之前手动配置过可灵，请只保留一个有效连接。参见 [Antigravity MCP 授权说明](https://antigravity.google/docs/mcp/#authenticate-a-server)。

从国际版迁移时，请先通过原连接查询尚未完成的任务，再断开原 OAuth 会话、安装国内版插件并重新授权。不要假设国际版的任务和灵感值会转移到国内版。

### 3. 检查连接并开始创作

在 Antigravity 中先发送只读查询：

> 帮我查看当前可灵国内版账号的可用模型和灵感值余额，不要生成内容。

查询成功后，可以尝试：

> 用可灵 4.0 准备一段 5 秒视频：日出时，海浪拍打岩石海岸。先展示模型和参数，等我确认后再生成。

生成会消耗国内版账号的灵感值。提交前请核对模型、时长、分辨率及服务返回的费用估算。可灵返回任务 ID 后，可在同一会话中查询进度；成功后在 Antigravity 中查看结果，或打开服务返回的媒体链接。

若灵感值不足，请在同一个国内版账号中充值，再回到原会话请求“继续刚才的生成”。插件会先检查已有任务及当前余额，避免重复提交。

若找不到插件，请检查 **Customizations → Installed** 或运行 `agy plugin list`。若服务已列出但未连接，请重新授权并确认使用的是国内版账号。

## 内置 Skills

- [可灵 AI](skills/kling-ai/SKILL.md)：请求路由、主体库、动作库、上传、灵感值、任务和账号切换。
- [图片生成](skills/kling-ai-generate-image/SKILL.md)：提示词、文生图、参考图编辑，以及账号支持时的可灵图片 4.0 连续组图。
- [视频生成](skills/kling-ai-generate-video/SKILL.md)：提示词与分镜、可灵 4.0 / Flash 模型选择、HDR、多模态参考和动作控制。

## 更多提示词

- **图片**：“用可灵图片 4.0 准备一张木桌上的陶瓷杯产品图，采用柔和的晨光。生成前先展示设置。”
- **图生视频**：“用我附上的图片作为首帧，准备一段 5 秒视频。镜头缓慢推近，主体始终留在画面中。生成前等我确认。”
- **HDR 视频**：“用可灵 4.0 准备一段 5 秒、1080p 的 HDR 视频：雨后街道映着霓虹灯，镜头沿路面缓慢前移。先展示设置。”
- **主体复用**：“列出我的可灵主体，等我选择后再查看详情。”
- **任务查询**：“查询可灵任务 `<generation-id>`，完成后给我结果。”

可用模型、参考素材类型和参数以当前账号的实时服务返回为准。需要优先考虑速度或灵感值消耗时，可要求使用当前任务支持的可灵 4.0 Flash。

## 国内版服务政策与数据流

提示词、生成参数、参考素材及选用的主体 ID 会发送给可灵。需要本地参考文件时，插件按服务返回的上传流程上传文件；生成与主体存储由远程服务执行。账号和任务查询也会访问可灵服务。不要记录上传票据或带签名的素材链接。

请参阅国内版的 [隐私政策](https://klingai.com/docs/privacy-policy) 及 [用户服务协议与支持联系方式](https://klingai.com/docs/user-policy)，了解账号、内容存储、删除和付费服务条款。插件不处理支付或代购灵感值，也不承诺固定的数据保留期限。

## 验证与人工验收

```bash
npm test
agy plugin validate --strict .
```

`npm test` 检查 Antigravity 元数据与推荐提示词、版本一致性、PNG 图标、国内版 `serverUrl`、三个 Skill 的标识、包内链接，以及是否混入 Claude 专用指令。`agy plugin validate --strict .` 检查 Antigravity CLI 是否识别插件清单、Skills 和 MCP 配置。

人工验收时，在 Antigravity 安装并授权国内版账号，检查三个 Skill 和可灵工具，执行模型、灵感值、主体的只读查询。随后准备一段 5 秒的可灵 4.0 视频，核对设置，在余额充足并明确批准后提交，确认任务成功且视频可播放。若实时模型支持 HDR，核对确认信息中的 HDR 和兼容分辨率。再次查询同一任务，确认只获取原任务状态。

## 来源与格式

本分支基于国际版 `main`，参考 [可灵国内版 Claude 插件](https://github.com/klingai-tech/claude-plugin-cn) 调整服务区域与说明，保留 Antigravity 的原生配置和工作流。版本为 1.4.0，采用 [Antigravity 插件格式](https://antigravity.google/docs/build-plugins/) 和 [原生 MCP 配置](https://antigravity.google/docs/mcp/)，以 MIT 协议开源。
