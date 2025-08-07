<template>
  <nav class="sidebar">
    <header>
      <div class="logo">Notes</div>
      <button class="action-accent" @click="$emit('create')">
        + New Note
      </button>
    </header>
    <ul class="note-list">
      <li v-for="item in notes"
          :key="item.id"
          :class="{ active: item.id === selectedId }"
          @click="$emit('select', item.id)">
        <div class="note-title">
          {{ item.title || 'Untitled' }}
        </div>
        <div class="note-meta" v-if="item.updated_at">
          <span>{{ new Date(item.updated_at).toLocaleDateString() }}</span>
        </div>
      </li>
    </ul>
    <div class="sidebar-footer">
      <small>Personal Notes</small>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  notes: Array<any>
  selectedId: string | null
}>()
defineEmits(['select', 'create'])
</script>

<style scoped>
.sidebar {
  width: 270px;
  background: #f7f9fa;
  border-right: 1px solid #ececec;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 160px;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 1.25rem 1rem 1.25rem;
}
.logo {
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: 700;
  color: #35495e;
}
.action-accent {
  background: #ffcd38;
  border: none;
  border-radius: 6px;
  color: #222;
  font-weight: 600;
  padding: 0.45rem 1.1rem;
  cursor: pointer;
  transition: box-shadow 0.18s;
  box-shadow: 0 1px 2px #eeeeee66;
}
.note-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 0.5rem;
  margin: 0;
  list-style: none;
}
.note-list li {
  padding: 0.8rem 1rem;
  cursor: pointer;
  border-radius: 7px;
  margin: 0.3rem 0;
  transition: background 0.18s;
  display: flex;
  flex-direction: column;
}
.note-list li.active {
  background: #42b98318;
  color: #42b983;
  font-weight: 600;
}
.note-list li:hover {
  background: #e7f7f0;
}
.note-title {
  font-size: 0.99rem;
}
.note-meta {
  font-size: 0.78rem;
  color: #888;
  margin-top: 0.1rem;
}
.sidebar-footer {
  padding: 1.5rem 1rem 0.7rem 1.1rem;
  color: #aaa;
  border-top: 1px solid #ededed;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}
</style>
