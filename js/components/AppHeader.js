// ═══════════════════════════════════════════════════════════
//  AppHeader.js — Header fijo con logo, buscador y stats
// ═══════════════════════════════════════════════════════════

export const AppHeader = {
  name: 'AppHeader',
  props: {
    totalPhotos: { type: Number, default: 0 },
    searchQuery: { type: String, default: '' }
  },
  emits: ['search', 'home'],
  data() {
    return {
      localQuery: this.searchQuery
    }
  },
  watch: {
    searchQuery(val) {
      this.localQuery = val
    }
  },
  methods: {
    handleSearch() {
      const q = this.localQuery.trim()
      if (q) this.$emit('search', q)
    },
    handleKeydown(e) {
      if (e.key === 'Enter') this.handleSearch()
    }
  },
  template: `
    <header class="app-header">
      <div class="header-logo" @click="$emit('home')">
        VIS<span>U</span>
      </div>

      <div class="header-search">
        <span class="header-search-icon">⌕</span>
        <input
          type="text"
          v-model="localQuery"
          placeholder="Buscar fotografías…"
          @keydown="handleKeydown"
        />
      </div>

      <div class="header-stats">
        <span class="header-stat">
          <strong>{{ totalPhotos }}</strong> fotos
        </span>
      </div>
    </header>
  `
}
