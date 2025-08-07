import { ref } from "vue"

const API_URL = "/api/notes"  // TODO: Replace with backend endpoint as needed

// PUBLIC_INTERFACE
export function useNotes() {
  /** Fetch notes list from backend */
  const notes = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // PUBLIC_INTERFACE
  async function fetchNotes() {
    loading.value = true
    error.value = null
    try {
      // Placeholder for backend API call
      notes.value = await $fetch(API_URL)
    } catch (e: any) {
      notes.value = []
      error.value = e?.message || "Error fetching notes"
    }
    loading.value = false
  }

  // PUBLIC_INTERFACE
  async function createNote(note: any) {
    try {
      const out = await $fetch(API_URL, { method: "POST", body: note })
      await fetchNotes()
      return out
    } catch (e) {
      error.value = "Failed to create note"
      throw e
    }
  }

  // PUBLIC_INTERFACE
  async function updateNote(id: string, updates: any) {
    try {
      await $fetch(`${API_URL}/${id}`, { method: "PUT", body: updates })
      await fetchNotes()
    } catch (e) {
      error.value = "Failed to update note"
      throw e
    }
  }

  // PUBLIC_INTERFACE
  async function deleteNote(id: string) {
    try {
      await $fetch(`${API_URL}/${id}`, { method: "DELETE" })
      await fetchNotes()
    } catch (e) {
      error.value = "Failed to delete note"
      throw e
    }
  }

  return {
    notes, loading, error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  }
}
