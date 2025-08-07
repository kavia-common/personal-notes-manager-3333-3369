<template>
  <div class="note-list-main">
    <ul>
      <li v-for="note in notes"
          :key="note.id"
          :class="{ selected: note.id === selectedId }"
          @click="$emit('select', note.id)">
        <div class="primary">
          <span>{{ note.title || 'Untitled' }}</span>
        </div>
        <div class="meta" v-if="note.updated_at">
          <small>{{ new Date(note.updated_at).toLocaleString() }}</small>
          <button class="delete-btn"
                  @click.stop="$emit('delete', note.id)">
            🗑
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  notes: Array<any>
  selectedId: string | null
}>()
defineEmits(['select', 'delete'])
</script>

<style scoped>
.note-list-main {
  margin-bottom: 2.5rem;
}
.note-list-main ul {
  list-style: none;
  margin: 0; padding: 0;
}
.note-list-main li {
  padding: 1rem 1.5rem 1rem 1rem;
  margin-bottom: 0.4rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  transition: background 0.2s;
  cursor: pointer;
  position: relative;
}
.note-list-main li.selected {
  background: #e9f7f0;
  border-color: #42b98370;
}
.primary {
  font-size: 1.05rem;
  font-weight: 500;
}
.meta {
  margin-top: 0.27rem;
  font-size: 0.78rem;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.delete-btn {
  color: #b00020;
  border: none;
  background: none;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 1.1em;
  padding: 0.1em 0.4em;
  border-radius: 4px;
  transition: background 0.16s;
}
.delete-btn:hover {
  background: #fdedf0;
}
</style>
