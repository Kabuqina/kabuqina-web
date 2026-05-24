# Chat 语音输入开发方案

## 目标

在聊天输入栏增加麦克风按钮，点击录音，停止后自动转文字填入输入框。

## 现状

- 前端 `ChatInput.tsx` 仅有文本输入 + 附件 + 发送，无语音功能。
- 后端 `hermes_core/tools/transcription_tools.py` 已有完整 STT 引擎（faster-whisper / Groq / OpenAI / Mistral / xAI）。
- 前端已有 `fileToDeskAttachment()` 可将 Blob 转 base64，但 STT 没有暴露给前端的 HTTP/invoke API。
- 浏览器 `MediaRecorder` + `getUserMedia` 在 WebView2 中可直接工作，无需 Tauri 音频插件。
- 本地 faster-whisper 因体积原因 **未打包进 Windows bundle**，桌面端需依赖用户已配置的云端 STT provider（onboarding 已支持配置）。

## 方案（三层联动）

### 1. 前端（`web/src/chat/`）

#### 1.1 新增 `useVoiceRecorder` hook

- 封装 `navigator.mediaDevices.getUserMedia({ audio: true })` 与 `MediaRecorder`。
- 录制格式：默认 `audio/webm;codecs=opus`（Chrome/Edge/WebView2 原生支持，且后端 `transcription_tools.py` 支持 webm）。
- 状态机：`idle` → `recording` → `processing` → `idle`。
- 暴露：`start()`, `stop()`, `recording`, `durationMs`。

#### 1.2 新增 `VoiceButton` 组件

- 放在 `ChatInput.tsx` 左侧工具栏（Paperclip 旁边）。
- 未录音时：麦克风图标（`Mic` from lucide-react）。
- 录音中：红色脉冲动画 + 已录时长（如 `0:03`），再次点击停止。
- 转录中：显示 spinner /「识别中…」状态。

#### 1.3 `ChatInput.tsx` 改造

- 引入 `VoiceButton`。
- 录音停止后，调用 `cmdTranscribe(audioBase64)`。
- 成功后把转录文字追加到当前 `input`（末尾追加，保留已有文字）。
- 失败时：底部显示 toast / inline error（复用现有的 `sendErr` 样式或新增短暂提示）。

#### 1.4 新增翻译键

```json
chat.voiceRecord: "按住说话"
chat.voiceRecording: "录音中…"
chat.voiceProcessing: "识别中…"
chat.voiceErr: "语音识别失败，请重试。"
```

---

### 2. Rust 后端（`tauri/src/chat.rs`）

#### 2.1 新增 `cmd_transcribe` command

```rust
#[tauri::command]
pub async fn cmd_transcribe(
    app: AppHandle,
    audio: DeskChatAttachment,   // 复用已有的 base64 结构
) -> Result<String, String>
```

- 解码 base64，写入 `%TEMP%/hermesdesk_stt/{uuid}.webm`。
- 通过已有的 `hermes_base()` + `desk_auth_header()` + `hermes_bearer_resolved()`，向 Hermes 发送 `POST /api/desk/transcribe`（multipart/form-data 或 JSON）。
- 返回纯文本 transcript；错误时返回 `Err("...")`。

---

### 3. Python/Hermes 后端（`hermes_core/`）

#### 3.1 新增 HTTP endpoint `POST /api/desk/transcribe`

在 `hermes_cli/web_server.py` 的 desk API 路由中增加：

- 接收音频文件（multipart 或 JSON base64）。
- 保存到临时路径。
- 调用 `tools.transcription_tools.transcribe_audio(temp_path)`。
- 返回 JSON：`{ "transcript": "..." }`。
- **依赖前提**：用户需已在 onboarding/settings 中配置 STT provider（Groq/OpenAI 等），或本地 faster-whisper 可用。

---

## 关键设计决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 录音 API | 浏览器 `MediaRecorder` | WebView2 原生支持，零插件，无需新增 Tauri 依赖。 |
| 音频格式 | WebM/Opus | Chromium 默认输出，后端 transcription_tools 已支持。 |
| 转录链路 | 前端 → Rust → Hermes HTTP → Python STT | 与现有 `cmd_chat_send` 的代理模式保持一致，复用 auth/bearer。 |
| 交互模式 | 录音 → 停止 → 转文字填入输入框 → 用户手动发送 | 给用户编辑机会，避免误发；不改动现有消息发送流程。 |
| 失败处理 | 前端显示错误 toast，不清空输入框 | 保留用户已有输入，降低挫败感。 |

## 文件修改清单

1. **新增**
   - `web/src/chat/hooks/useVoiceRecorder.ts`
   - `web/src/chat/VoiceButton.tsx`
   - `web/src/locales/strings.ts` — 新增 4 个翻译键

2. **修改前端**
   - `web/src/chat/ChatInput.tsx` — 引入 VoiceButton，追加转录文本逻辑
   - `web/src/chat/chat-api.ts` — 新增 `cmdTranscribe()` 包装

3. **修改 Rust**
   - `tauri/src/chat.rs` — 新增 `cmd_transcribe` command
   - `tauri/src/lib.rs` — 注册新 command

4. **修改 Python/Hermes**
   - `hermes_core/hermes_cli/web_server.py` — 新增 `POST /api/desk/transcribe` 路由

## 风险与注意事项

- **STT provider 未配置**：若用户未配置任何 STT key，转录会失败。错误提示应引导用户去设置里配置（或 onboarding 中已引导）。
- **麦克风权限**：首次使用会触发浏览器麦克风权限弹窗，需在 UI 上预留权限被拒绝时的友好提示。
- **长时间录音**：建议设置上限（如 60 秒），超时自动停止，防止产生过大 base64 负载。
