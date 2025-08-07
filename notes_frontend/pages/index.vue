<template>
  <div>
    <section v-if="loading" class="empty-state">
      <span class="loader" />
      Loading notes...
    </section>
    <section v-else>
      <NoteList
        :notes="notes"
        :selectedId="selectedId"
        @select="selectNote"
        @delete="deleteNote"
      />
      <div v-if="selectedNote">
        <NoteEditor
          :note="selectedNote"
          @save="saveNote"
          @delete="deleteNote"
        />
      </div>
      <div v-else>
        <NoteEditor
          :note="null"
          @save="saveNote"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue"
import { useNotes } from "~/composables/useNotes"
import NoteList from "~/components/NoteList.vue"
import NoteEditor from "~/components/NoteEditor.vue"

const props = defineProps({
  notes: Array,
  selectedId: String,
  loading: Boolean,
})

const { notes, loading, fetchNotes, createNote, updateNote, deleteNote } = useNotes()

// Find the selected note if any
const selectedNote = computed(() => {
  if (!props.selectedId) return null
  return props.notes.find((n: any) => n.id === props.selectedId)
})

const selectNote = (id: string) => {
  // Let the app handle navigation to note
  emit('select', id)
}

const emit = defineEmits<{
  (e: "refresh"): void
  (e: "select", id: string): void
}>()

// Saving: If id, update, else create.
async function saveNote(note: any) {
  if (note.id) {
    await updateNote(note.id, note)
  } else {
    await createNote(note)
  }
  await fetchNotes()
  emit("refresh")
}
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0 0 0;
  font-size: 1.2rem;
  color: #888;
}
.loader {
  width: 1.1em;
  height: 1.1em;
  margin-bottom: 0.8em;
  border-radius: 50%;
  border: 2.5px solid #42b98333;
  border-top-color: #42b983;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>
