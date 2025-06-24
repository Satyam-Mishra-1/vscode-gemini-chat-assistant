
# 💬 Gemini AI Chat Assistant for VS Code

A modern Visual Studio Code extension that integrates a **React-based WebView chat interface** powered by **Gemini AI**. This assistant supports real-time chat, workspace context awareness, file/image attachments via `@filename` mentions, and code generation directly inside the editor.

---

## ✨ Key Features

- ✅ **React-based Chat UI**
  - Renders chat inside a VS Code WebView using React + Tailwind.
  - Supports markdown, syntax-highlighted code blocks, and chat history.

- 📎 **File & Image Attachments via `@filename`**
  - Detects `@filename` mentions in chat input.
  - Triggers workspace file-picker to attach text files or images.
  - Files are uploaded and sent as part of the message to the Gemini model.

- 🧠 **Workspace Context Awareness**
  - Automatically includes open file content or selected code as context in prompts.

- 🤖 **AI Code Generation**
  - Powered by **Google Gemini Pro / Flash APIs**.
  - Supports code generation, explanation, refactoring, and insertion directly into the editor.

---

## 🛠️ Tech Stack

| Layer        | Tech                             |
|--------------|----------------------------------|
| Language     | TypeScript                       |
| Frontend     | React + Tailwind (WebView Panel) |
| Backend      | Node.js (Extension Host)         |
| AI Model     | Google Gemini API (via REST)     |
| Tools        | VS Code Extension API, WebView API |

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Satyam-Mishra-1/vscode-gemini-chat-assistant.git
cd vscode-gemini-chat-assistant
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Your Gemini API Key

Create a `.env` file in the root:

```
GEMINI_API_KEY=your_google_gemini_api_key
```

Or hardcode in `extension.ts` for testing only.

### 4. Run the Extension

* Press `F5` in VS Code to launch the extension in a new Extension Development Host window.
* Open the command palette and run: `> Gemini: Open Chat`.

---

## ✏️ Chat Features

* Mention any workspace file using `@filename` (e.g., `@main.ts`).
* Attachments will show in the UI and their contents will be sent as prompt context.
* Responses from Gemini can:

  * Generate new code
  * Explain existing code
  * Refactor or complete partial code
  * Be inserted directly into the editor


---

## 🧪 Example Prompt

> Generate a function in TypeScript that sorts an array using quicksort.
> Also explain how the recursion works.
> Attach: `@quicksort.ts`
