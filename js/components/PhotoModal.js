// ═══════════════════════════════════════════════════════════
//  PhotoModal.js — Modal con detalle completo de la foto
//  Muestra imagen grande, datos del fotógrafo, stats y descarga
// ═══════════════════════════════════════════════════════════

export const PhotoModal = {
  name: 'PhotoModal',
  props: {
    photo: { type: Object, default: null },
    open:  { type: Boolean, default: false }
  },
  emits: ['close', 'download'],
  methods: {
    formatNumber(num) {
      if (!num) return '0'
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
      return num.toString()
    },
    formatDate(dateStr) {
      if (!dateStr) return ''
      const d = new Date(dateStr)
      return d.toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    }
  },
  template: `
    <div
      class="modal-overlay"
      :class="{ open: open && photo }"
      @click.self="$emit('close')"
    >
      <div class="modal-content" v-if="photo">
        <!-- Imagen principal -->
        <div class="modal-img-wrap">
          <img
            :src="photo.urls.regular"
            :alt="photo.alt_description || 'Fotografía'"
          />
          <button class="modal-close" @click="$emit('close')">✕</button>
        </div>

        <!-- Información -->
        <div class="modal-body">
          <!-- Fotógrafo -->
          <div class="modal-user">
            <img
              class="modal-avatar"
              :src="photo.user.profile_image.medium"
              :alt="photo.user.name"
            />
            <div>
              <div class="modal-user-name">{{ photo.user.name }}</div>
              <div class="modal-user-handle">@{{ photo.user.username }}</div>
            </div>
          </div>

          <!-- Descripción -->
          <p class="modal-desc" v-if="photo.description || photo.alt_description">
            {{ photo.description || photo.alt_description }}
          </p>

          <!-- Estadísticas -->
          <div class="modal-stats">
            <div class="modal-stat">
              <span class="modal-stat-val">{{ formatNumber(photo.likes) }}</span>
              <span class="modal-stat-label">Likes</span>
            </div>
            <div class="modal-stat">
              <span class="modal-stat-val">{{ photo.width }} × {{ photo.height }}</span>
              <span class="modal-stat-label">Resolución</span>
            </div>
            <div class="modal-stat" v-if="photo.views">
              <span class="modal-stat-val">{{ formatNumber(photo.views) }}</span>
              <span class="modal-stat-label">Vistas</span>
            </div>
            <div class="modal-stat" v-if="photo.downloads">
              <span class="modal-stat-val">{{ formatNumber(photo.downloads) }}</span>
              <span class="modal-stat-label">Descargas</span>
            </div>
          </div>

          <!-- Tags -->
          <div class="modal-tags" v-if="photo.tags && photo.tags.length > 0">
            <span
              class="modal-tag"
              v-for="tag in photo.tags.slice(0, 8)"
              :key="tag.title"
            >
              {{ tag.title }}
            </span>
          </div>

          <!-- Acciones -->
          <div class="modal-actions">
            <a
              class="modal-btn modal-btn-primary"
              :href="photo.links.download + '?force=true'"
              target="_blank"
              rel="noopener"
              @click="$emit('download', photo)"
            >
              ↓ Descargar
            </a>
            <a
              class="modal-btn modal-btn-secondary"
              :href="photo.links.html"
              target="_blank"
              rel="noopener"
            >
              Ver en Unsplash
            </a>
          </div>
        </div>
      </div>
    </div>
  `
}
