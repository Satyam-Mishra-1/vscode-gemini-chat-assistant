"use strict";
// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';
// import path from "path";
// import fs from "fs";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// // This method is called when the extension is activated
// // The extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {
// 	console.log('Congratulations, your extension "geminiwebchat" is now active!');
// 	// The command has been defined in the package.json file
// 	// The commandId parameter must match the command field in package.json
// 	let geminiwebchat = vscode.commands.registerCommand('webchatforgemini.open', () => {
// 		const panel = vscode.window.createWebviewPanel(
// 			"webviewInteract",
// 			"Web Chat for Gemini",
// 			vscode.ViewColumn.One,
// 			{
// 			  enableScripts: true,
// 			  retainContextWhenHidden: true,
// 			  localResourceRoots: [vscode.Uri.file(context.extensionPath)],
// 			}
// 		  );
// 		// Load HTML content from file
// 		const htmlPath = path.join(context.extensionPath, "src/index.html");
// 		const htmlContent = vscode.Uri.file(htmlPath).with({
// 		  scheme: "vscode-resource",
// 		});
// 		panel.webview.html = fs.readFileSync(htmlContent.fsPath, "utf8");
// 	});
// 	context.subscriptions.push(geminiwebchat);
// }
// // This method is called when the extension is deactivated. It's a No-Op at this point
// export function deactivate() {}
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// This method is called when the extension is activated
// The extension is activated the very first time the command is executed
function activate(context) {
    console.log('Congratulations, your extension "geminiwebchat" is now active!');
    // The command has been defined in the package.json file
    // The commandId parameter must match the command field in package.json
    let geminiwebchat = vscode.commands.registerCommand('webchatforgemini.open', () => {
        const panel = vscode.window.createWebviewPanel("webviewInteract", "Web Chat for Gemini", vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.file(context.extensionPath)],
        });
        // Load HTML content from file
        const htmlPath = path.join(context.extensionPath, "src/index.html");
        const htmlContent = vscode.Uri.file(htmlPath).with({
            scheme: "vscode-resource",
        });
        panel.webview.html = fs.readFileSync(htmlContent.fsPath, "utf8");
        // Send workspace files to webview after panel is created
        panel.webview.postMessage({
            type: 'workspaceFiles',
            files: getWorkspaceFiles()
        });
    });
    context.subscriptions.push(geminiwebchat);
}
exports.activate = activate;
// This method is called when the extension is deactivated. It's a No-Op at this point
function deactivate() { }
exports.deactivate = deactivate;
// Helper function to get all files in the workspace
function getWorkspaceFiles() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders)
        return [];
    const root = workspaceFolders[0].uri.fsPath;
    const files = [];
    function walk(dir) {
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                walk(filePath);
            }
            else {
                files.push({
                    name: file,
                    path: filePath.replace(root, ''),
                    type: file.match(/\.(jpg|jpeg|png|gif|bmp|svg)$/i) ? 'image' : 'file'
                });
            }
        });
    }
    walk(root);
    return files;
}
//# sourceMappingURL=extension.js.map