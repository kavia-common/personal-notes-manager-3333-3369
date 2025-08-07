<template>
  <div class="editor-root">
    <form @submit.prevent="handleSubmit">
      <input
        v-model="localNote.title"
        placeholder="Title"
        class="edit-title"
        maxlength="80"
      />
      <textarea
        v-model="localNote.content"
        placeholder="Write your note here..."
        class="edit-content"
        maxlength="2048"
        rows="10"
      />
      <div class="editor-actions">
        <button class="primary-accent" type="submit">
          {{ localNote.id ? "Save Changes" : "Create" }}
        </button>
        <button
          v-if="localNote.id"
          class="delete-btn"
          type="button"
          @click="handleDelete"
        >Delete</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from "vue"
const props = defineProps<{
  note: any
}>()
const emit = defineEmits(['save', 'delete'])

const localNote = reactive({
  id: props.note?.id || null,
  title: props.note?.title || "",
  content: props.note?.content || "",
})

watch(() => props.note, (note) => {
  localNote.id = note?.id || null
  localNote.title = note?.title || ""
  localNote.content = note?.content || ""
})

function handleSubmit() {
  if (!localNote.title && !localNote.content) return
  emit('save', { ...localNote })
}
function handleDelete() {
  if (localNote.id) emit('delete', localNote.id)
}
</script>

<style scoped>
.editor-root {
  margin-top: 2rem;
  max-width: 600px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.edit-title {
  font-size: 1.21rem;
  width: 100%;
  padding: 0.69rem 0.7rem;
  border: 1.5px solid #42b98362;
  border-radius: 5px;
  margin-bottom: 0.2rem;
  background: #f8fefa;
  color: #333;
  font-family: inherit;
  font-weight: 600;
}
.edit-content {
  resize: vertical;
  min-height: 108px;
  padding: 0.82rem 0.69rem;
  font-size: 1.01rem;
  border-radius: 5px;
  border: 1.5px solid #e5e5e5;
  background: #fafbfa;
  font-family: inherit;
  color: #333;
}
.editor-actions {
  display: flex;
  gap: 1.1rem;
  margin-top: 0.9rem;
}
.primary-accent {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.5rem 1.17rem;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.11rem;
  transition: background 0.14s;
}
.primary-accent:hover {
  background: #349f6c;
}
.delete-btn {
  background: #fff;
  color: #b00020;
  border: 1.3px solid #fccfcf;
  border-radius: 6px;
  padding: 0.53rem 1.05rem;
  font-weight: 500;
  cursor: pointer;
  margin-left: 0.8rem;
  transition: background 0.14s;
}
.delete-btn:hover {
  background: #fdedf0;
}
</style>
