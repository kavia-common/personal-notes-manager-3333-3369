import { defineEventHandler, readBody, getQuery } from 'h3'

// Mock in-memory notes store (dev only)
let notes: any[] = [
  {
    id: '1',
    title: 'Welcome to Notes!',
    content: 'This is your first note. Edit or create a new one!',
    updated_at: new Date().toISOString()
  }
]

// PUBLIC_INTERFACE
export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    return notes
  }
  if (event.method === 'POST') {
    const data = await readBody(event)
    const newNote = {
      ...data,
      id: (Math.random() * 1e9).toFixed(),
      updated_at: new Date().toISOString()
    }
    notes.unshift(newNote)
    return newNote
  }
  if (event.method === 'PUT') {
    // /api/notes/:id
    const query = getQuery(event)
    const id = event.context.params?.id || query.id
    const data = await readBody(event)
    notes = notes.map(n =>
      n.id === id ? { ...n, ...data, updated_at: new Date().toISOString() } : n
    )
    return notes.find(n => n.id === id)
  }
  if (event.method === 'DELETE') {
    // /api/notes/:id
    const query = getQuery(event)
    const id = event.context.params?.id || query.id
    notes = notes.filter(n => n.id !== id)
    return { success: true }
  }
  return { error: 'Method not supported' }
})
