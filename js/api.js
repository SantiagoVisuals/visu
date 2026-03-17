// ═══════════════════════════════════════════════════════════
//  api.js — Módulo de conexión con la API de Unsplash
//  Documentación: https://unsplash.com/documentation
// ═══════════════════════════════════════════════════════════


const ACCESS_KEY = '_Ps4vii-Nf2gAnqm4Ks2xw--58ymlCP9zwlm5N5H-6o'

const BASE_URL = 'https://api.unsplash.com'

const headers = {
  'Authorization': `Client-ID ${ACCESS_KEY}`
}

/**
 * Obtiene fotos curadas/editoriales (página de inicio)
 * @param {number} page - Número de página
 * @param {number} perPage - Fotos por página
 * @returns {Promise<Array>} Lista de fotos
 */
export async function getPhotos(page = 1, perPage = 20) {
  const res = await fetch(
    `${BASE_URL}/photos?page=${page}&per_page=${perPage}&order_by=popular`,
    { headers }
  )
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
  return res.json()
}

/**
 * Busca fotos por palabra clave
 * @param {string} query - Término de búsqueda
 * @param {number} page - Número de página
 * @param {number} perPage - Fotos por página
 * @returns {Promise<Object>} { results, total, total_pages }
 */
export async function searchPhotos(query, page = 1, perPage = 20) {
  const res = await fetch(
    `${BASE_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
    { headers }
  )
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
  return res.json()
}

/**
 * Obtiene los detalles completos de una foto
 * @param {string} id - ID de la foto
 * @returns {Promise<Object>} Datos completos de la foto
 */
export async function getPhoto(id) {
  const res = await fetch(
    `${BASE_URL}/photos/${id}`,
    { headers }
  )
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
  return res.json()
}

/**
 * Registra una descarga (requerido por Unsplash)
 * @param {string} downloadUrl - URL de tracking de descarga
 */
export async function trackDownload(downloadUrl) {
  try {
    await fetch(downloadUrl, { headers })
  } catch (e) {
    console.warn('No se pudo registrar la descarga:', e)
  }
}

/**
 * Verifica si la API key está configurada
 * @returns {boolean}
 */
export function isConfigured() {
  return ACCESS_KEY !== 'TU_ACCESS_KEY_AQUI' && ACCESS_KEY.length > 10
}
