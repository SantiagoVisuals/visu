// ═══════════════════════════════════════════════════════════
//  PhotoCard.js — Tarjeta individual de foto en el grid
//  Muestra imagen, fotógrafo y likes al hacer hover
// ═══════════════════════════════════════════════════════════

export const PhotoCard = {
  name: 'PhotoCard',
  props: {
    photo: { type: Object, required: true }
  },
  emits: ['select'],
  methods: {
    formatNumber(num) {
      if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
      return num
    }
  },
  template: `
    <div class="photo-card" @click="$emit('select', photo)">
      <img
        :src="photo.urls.small"
        :alt="photo.alt_description || 'Fotografía'"
        loading="lazy"
        :style="{ aspectRatio: photo.width / photo.height }"
      />
      <div class="photo-card-overlay">
        <div class="photo-card-user">
          <img
            class="photo-card-avatar"
            :src="photo.user.profile_image.small"
            :alt="photo.user.name"
          />
          <span class="photo-card-name">{{ photo.user.name }}</span>
        </div>
        <div class="photo-card-meta">
          <span>♥ {{ formatNumber(photo.likes) }}</span>
          <span v-if="photo.width && photo.height">
            {{ photo.width }} × {{ photo.height }}
          </span>
        </div>
      </div>
    </div>
  `
}
