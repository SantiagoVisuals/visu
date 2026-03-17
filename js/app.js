// ═══════════════════════════════════════════════════════════
//  app.js — Punto de entrada de VISU
//  Crea la app, gestiona estado, consume API de Unsplash
// ═══════════════════════════════════════════════════════════

import { getPhotos, searchPhotos, getPhoto, trackDownload, isConfigured } from './api.js'
import { categories } from './data.js'
import { AppHeader }  from './components/AppHeader.js'
import { PhotoCard }  from './components/PhotoCard.js'
import { PhotoModal } from './components/PhotoModal.js'

const { createApp, ref, computed, onMounted } = Vue

const app = createApp({
  setup() {
    // ─── ESTADO ──────────────────────────────────────────
    const photos          = ref([])
    const searchQuery     = ref('')
    const activeCategory  = ref('')
    const currentPage     = ref(1)
    const totalResults    = ref(0)
    const hasMore         = ref(true)
    const loading         = ref(false)
    const loadingMore     = ref(false)
    const error           = ref('')
    const selectedPhoto   = ref(null)
    const modalOpen       = ref(false)
    const apiReady        = ref(isConfigured())
    const categoriesList  = ref(categories)

    // ─── COMPUTED ────────────────────────────────────────
    const sectionTitle = computed(() => {
      if (searchQuery.value) return `Resultados para "${searchQuery.value}"`
      if (activeCategory.value) {
        const cat = categoriesList.value.find(c => c.value === activeCategory.value)
        return cat ? cat.label : 'Fotos'
      }
      return 'Fotos populares'
    })

    // ─── MÉTODOS: API ────────────────────────────────────
    async function fetchPopular() {
      loading.value = true
      error.value = ''
      try {
        const data = await getPhotos(1, 20)
        photos.value = data
        currentPage.value = 1
        hasMore.value = data.length >= 20
        totalResults.value = data.length
      } catch (e) {
        error.value = e.message
        console.error('Error cargando fotos:', e)
      } finally {
        loading.value = false
      }
    }

    async function handleSearch(query) {
      if (!query.trim()) return goHome()
      searchQuery.value = query.trim()
      activeCategory.value = ''
      loading.value = true
      error.value = ''
      currentPage.value = 1
      try {
        const data = await searchPhotos(query.trim(), 1, 20)
        photos.value = data.results
        totalResults.value = data.total
        hasMore.value = data.total_pages > 1
      } catch (e) {
        error.value = e.message
        console.error('Error en búsqueda:', e)
      } finally {
        loading.value = false
      }
    }

    function selectCategory(catValue) {
      if (activeCategory.value === catValue) {
        activeCategory.value = ''
        goHome()
        return
      }
      activeCategory.value = catValue
      handleSearch(catValue)
    }

    async function loadMore() {
      if (loadingMore.value || !hasMore.value) return
      loadingMore.value = true
      currentPage.value++
      try {
        let newPhotos
        if (searchQuery.value) {
          const data = await searchPhotos(searchQuery.value, currentPage.value, 20)
          newPhotos = data.results
          hasMore.value = currentPage.value < data.total_pages
        } else {
          newPhotos = await getPhotos(currentPage.value, 20)
          hasMore.value = newPhotos.length >= 20
        }
        photos.value = [...photos.value, ...newPhotos]
        totalResults.value = photos.value.length
      } catch (e) {
        console.error('Error cargando más fotos:', e)
        currentPage.value--
      } finally {
        loadingMore.value = false
      }
    }

    // ─── MÉTODOS: MODAL ──────────────────────────────────
    async function openModal(photo) {
      selectedPhoto.value = photo
      modalOpen.value = true
      document.body.style.overflow = 'hidden'
      // Cargar detalles completos (incluye views, downloads, tags)
      try {
        const fullData = await getPhoto(photo.id)
        selectedPhoto.value = fullData
      } catch (e) {
        console.warn('No se pudieron cargar detalles:', e)
      }
    }

    function closeModal() {
      modalOpen.value = false
      document.body.style.overflow = ''
    }

    async function handleDownload(photo) {
      if (photo.links && photo.links.download_location) {
        await trackDownload(photo.links.download_location)
      }
    }

    // ─── MÉTODOS: NAVEGACIÓN ─────────────────────────────
    function goHome() {
      searchQuery.value = ''
      activeCategory.value = ''
      fetchPopular()
    }

    function heroSearch(query) {
      if (query.trim()) handleSearch(query)
    }

    // ─── LIFECYCLE ───────────────────────────────────────
    onMounted(() => {
      if (apiReady.value) {
        fetchPopular()
      }
    })

    // Cerrar modal con Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOpen.value) closeModal()
    })

    return {
      photos, searchQuery, activeCategory, currentPage,
      totalResults, hasMore, loading, loadingMore,
      error, selectedPhoto, modalOpen, apiReady,
      categoriesList, sectionTitle,
      handleSearch, selectCategory, loadMore,
      openModal, closeModal, handleDownload,
      goHome, heroSearch,
    }
  }
})

// ─── REGISTRO DE COMPONENTES ───────────────────────────────
app.component('app-header', AppHeader)
app.component('photo-card', PhotoCard)
app.component('photo-modal', PhotoModal)

// ─── MONTAR APP ────────────────────────────────────────────
app.mount('#app')
