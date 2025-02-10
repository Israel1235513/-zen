const fs = require('fs')
const path = require('path')
const ytdl = require('@distube/ytdl-core')
const yts = require('yt-search')
const ytdlcore = require('ytdl-core')

// Função para garantir que os diretórios de download existam
function ensureDownloadDirs(basePath) {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true })
  }
  return basePath
}

// Função para sanitizar o nome do arquivo
const sanitizeFilename = (filename) => {
  return filename.replace(/[<>:"/\\|?*]+/g, '').replace(/\s+/g, '_').toLowerCase()
}

async function downloadYouTube(query, type = 'video', downloadPath = 'C:/Users/User/Downloads') {
  try {
    console.log(`\n🔎 Buscando: ${query}...`)
    
    const resultados = await yts(query)
    
    if (resultados.videos.length === 0) {
      console.log("❌ Nenhum vídeo encontrado.")
      return
    }

    const url = resultados.videos[0].url
    console.log(`🎯 Vídeo encontrado: ${url}`)

    const downloadDir = ensureDownloadDirs(downloadPath)
    
    const options = {
      quality: type === 'audio' ? 'highestaudio' : 'highestvideo',
      filter: type === 'audio' ? 'audioonly' : 'videoandaudio'
    }

    const fileExtension = type === 'audio' ? 'mp3' : 'mp4'
    const sanitizedQuery = sanitizeFilename(resultados.videos[0].title) + `.${fileExtension}`
    const filePath = path.join(downloadDir, sanitizedQuery)

    let downloaded = 0
    const stream = ytdl(url, options)
    const fileStream = fs.createWriteStream(filePath)
    
    stream.on('progress', (_, downloadedBytes, totalBytes) => {
      downloaded = downloadedBytes
      const percent = ((downloaded / totalBytes) * 100).toFixed(2)
      process.stdout.write('\r' + `📥 Progresso: ${percent}% (${(downloaded / 1024 / 1024).toFixed(2)} MB)`)
    })
    
    return new Promise((resolve, reject) => {
      stream.pipe(fileStream)
      
      stream.on('end', () => {
        console.log(`\n✅ Download concluído: ${filePath} (${(downloaded / 1024 / 1024).toFixed(2)} MB)`)
        resolve(filePath)
      })
      
      stream.on('error', err => {
        console.error('❌ Erro no download:', err.message)
        reject(err)
      })
    })
  } catch (error) {
    console.error('❌ Erro geral:', error.message)
    throw error
  }
}

async function search(query) {
    try {

        const resultados = await yts(query)
    
        if (resultados.videos.length === 0) {
          console.log("❌ Nenhum vídeo encontrado.")
          return
        }
    
        const url = resultados.videos[0].url

        if (!ytdl.validateURL(url)) {
            throw new Error('URL inválida');
        }
        
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        const description = info.videoDetails.description;
        const channel = {
            name: info.videoDetails.author.name,
            url: info.videoDetails.author.channel_url,
            subscribers: info.videoDetails.author.subscriber_count
        };
        const views = info.videoDetails.viewCount;
        const likes = info.videoDetails.likes;
        const uploadDate = info.videoDetails.uploadDate;
        const duration = info.videoDetails.lengthSeconds;
        const thumbnail = info.videoDetails.thumbnails[0].url;
        const category = info.videoDetails.category;
        const tags = info.videoDetails.keywords;
        const isLive = info.videoDetails.isLiveContent;
        const videoId = info.videoDetails.videoId;
        
        
        return { title, description, channel, views, likes, uploadDate, duration, thumbnail, category, tags, isLive, videoId };
    } catch (error) {
        console.error('Erro ao obter informações do vídeo:', error.message);
        return null;
    }
}

const data = search('rick roll')

data.then((data) => {
    data.readme = "kk"
    console.log(data)
})

module.exports = { downloadYouTube, search }
