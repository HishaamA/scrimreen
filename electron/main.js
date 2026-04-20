import { app, BrowserWindow, protocol, net } from 'electron'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const types = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
    '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.ogg': 'audio/ogg',
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.woff': 'font/woff',
    '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  }
  return types[ext] || 'application/octet-stream'
}

// Dev mode only when ELECTRON_DEV env var is set (by electron:dev script)
const isDev = process.env.ELECTRON_DEV === '1'

// Register custom scheme BEFORE app is ready so it gets full privileges
// (allows fetch, XHR, and treats it as a secure origin)
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      stream: true,
      corsEnabled: true,
    },
  },
])

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'SIMER DETECTIVE AGENCY',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (isDev) {
    // Load Vite dev server in development (absolute paths served by Vite work fine)
    win.loadURL('http://localhost:5173')
  } else {
    // Load via custom scheme so absolute paths (/audio/, /images/) resolve correctly
    win.loadURL('app://./index.html')
  }

}

app.whenReady().then(() => {
  if (!isDev) {
    const distPath = path.join(__dirname, '..', 'dist')
    // asarUnpacked files live alongside app.asar → app.asar.unpacked/
    const unpackedDistPath = distPath.replace('app.asar', 'app.asar.unpacked')

    // Handle all app:// requests by mapping them to files inside dist/
    // For audio/images, prefer the unpacked copy (real file on disk, seekable)
    protocol.handle('app', async (request) => {
      const { pathname } = new URL(request.url)
      const relPath = pathname === '/' ? 'index.html' : decodeURIComponent(pathname)

      // Check unpacked path first (audio/images need to be real files for seeking)
      const unpackedFile = path.join(unpackedDistPath, relPath)
      const packedFile = path.join(distPath, relPath)

      const filePath = fs.existsSync(unpackedFile) ? unpackedFile : packedFile

      // For media files, handle Range requests manually to support seeking/streaming
      const rangeHeader = request.headers.get('Range')
      if (rangeHeader && fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath)
        const total = stat.size
        const parts = rangeHeader.replace(/bytes=/, '').split('-')
        const start = parseInt(parts[0], 10)
        const end = parts[1] ? parseInt(parts[1], 10) : total - 1
        const chunkSize = end - start + 1

        const stream = fs.createReadStream(filePath, { start, end })
        const chunks = []
        for await (const chunk of stream) {
          chunks.push(chunk)
        }
        const buffer = Buffer.concat(chunks)

        return new Response(buffer, {
          status: 206,
          headers: {
            'Content-Range': `bytes ${start}-${end}/${total}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': String(chunkSize),
            'Content-Type': getMimeType(filePath),
          },
        })
      }

      return net.fetch(`file:///${filePath.replace(/\\/g, '/')}`)
    })
  }

  createWindow()

  // Re-create window on macOS when dock icon is clicked and no windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
