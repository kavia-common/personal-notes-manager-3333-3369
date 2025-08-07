<template>
  <div class="root-app">
    <Sidebar :notes="notes"
             :selectedId="selectedId"
             @create="handleCreate"
             @select="handleSelect" />

    <main class="main-area">
      <NuxtPage
        :notes="notes"
        :selectedId="selectedId"
        :loading="loading"
        @refresh="fetchNotes"
        @select="handleSelect"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import Sidebar from "~/components/Sidebar.vue"

const notes = ref([])
const loading = ref(true)
const selectedId = ref<string | null>(null)

const fetchNotes = async () => {
  loading.value = true
  try {
    // Placeholder: Replace with actual API call
    const data = await $fetch("/api/notes")
    notes.value = data
    // Select first note if available
    if (notes.value.length > 0 && !selectedId.value) {
      selectedId.value = notes.value[0].id
    }
  } catch (e) {
    notes.value = []
  }
  loading.value = false
}

const handleCreate = () => {
  selectedId.value = null
}

const handleSelect = (id: string) => {
  selectedId.value = id
}

onMounted(fetchNotes)
watch(notes, (val) => {
  // If notes become empty, clear selection to "new"
  if (val.length === 0) selectedId.value = null
})
</script>

<style scoped>
.root-app {
  display: flex;
  height: 100vh;
  min-height: 0;
  background: #fafbfc;
  color: #222;
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
}
.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2rem 1rem 2rem;
  min-width: 0;
  overflow-y: auto;
  background: #fff;
  box-shadow: -1px 0 0 0 #eee;
}
</style>
