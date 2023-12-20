import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	console.log('Extension "Notes" now active');

	let disposable = vscode.commands.registerCommand('notes.makeDayFile', async () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1; // Months are 0-based in JavaScript
		const day = date.getDate();
		const dateString = `${year}/${month}/${day}.md`;

		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			vscode.window.showErrorMessage('No workspace folder found');
			return;
		}

		const workspaceRoot = workspaceFolders[0].uri.fsPath;
		const filePath = path.join(workspaceRoot, dateString);


		try {
			fs.mkdirSync(path.dirname(filePath), { recursive: true });
		} catch (err) {
			const error = err as NodeJS.ErrnoException;
			if (error.code !== 'EEXIST') {
				throw error;
			}
		}
		try {
			fs.writeFileSync(filePath, `# ${monthNames[month - 1]} ${day}, ${year}\n\n`, { flag: 'wx' });
		} catch (err) {
			const error = err as NodeJS.ErrnoException;
			if (error.code !== 'EEXIST') {
				throw error;
			}
		}

		const fileUri = vscode.Uri.file(filePath);
		const document = await vscode.workspace.openTextDocument(fileUri);
		const editor = await vscode.window.showTextDocument(document);

		const lastLine = document.lineAt(document.lineCount - 1);
		const range = new vscode.Range(lastLine.range.start, lastLine.range.end);
		editor.selection = new vscode.Selection(range.start, range.end);
		editor.revealRange(range);
	});

	context.subscriptions.push(disposable);


	let deleteFileDisposable = vscode.commands.registerCommand('notes.deleteActiveFile', async () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) {
			vscode.window.showErrorMessage('No active file found');
			return;
		}

		const filePath = activeEditor.document.uri;
		try {
			await vscode.workspace.fs.delete(filePath);
			vscode.window.showInformationMessage('File deleted successfully');
		} catch (error) {
			vscode.window.showErrorMessage('Failed to delete file');
		}
	});

	context.subscriptions.push(deleteFileDisposable);
}

const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];