// Preload script — runs in a privileged context before the renderer loads.
// Use contextBridge.exposeInMainWorld() here if you ever need to expose
// Node/Electron APIs to the renderer safely.
//
// Example:
// import { contextBridge, ipcRenderer } from 'electron'
// contextBridge.exposeInMainWorld('electronAPI', {
//   sendMessage: (msg) => ipcRenderer.send('message', msg),
// })
