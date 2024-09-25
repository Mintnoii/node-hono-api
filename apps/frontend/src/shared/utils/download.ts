export const downloadBlob = (res: any, fileName: string) => {
  const aLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
  const blob = new Blob([res], { type: res.type })
  const blobUrl = window.URL.createObjectURL(blob)
  aLink.setAttribute('href', blobUrl)
  aLink.setAttribute('download', fileName)
  aLink.click()
  window.URL.revokeObjectURL(blobUrl)
}

export const download = async (args: { url: string; filename: string }): Promise<boolean> => {
  try {
    const response = await fetch(args.url)
    if (!response.ok) {
      throw new Error(`下载失败： ${response.status}`)
    }
    const blob = await response.blob()
    downloadBlob(blob, args.filename)
    return true
  } catch (error) {
    console.error('下载失败：', error)
    return false
  }
}

export const convertFileToBlob = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const blob = new Blob([reader.result], { type: file.type })
        resolve(blob)
      } else {
        reject(new Error('Failed to convert file to Blob.'))
      }
    }
    reader.onerror = () => {
      reject(new Error('Failed to read file.'))
    }
    reader.readAsArrayBuffer(file)
  })
}
