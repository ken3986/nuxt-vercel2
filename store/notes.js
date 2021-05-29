import axios from 'axios'

export const state = () => ({
  notes: []
})

export const getters = {
  getNotes (state) {
    return state.notes
  }
}

export const mutations = {
  fetch (state, data) {
    state.notes = data
  },

  add (state, data) {
    state.notes.push(data)
  },

  remove (state, { note }) {
    // state.notes.splice(state.notes.indexOf(note), 1)
  }
}

const fetchGetNotes = async () => {
  const result = await axios.get('/api/note')
  const notes = result.data.notes
  return notes
}

export const actions = {
  async getNotes (context) {
    const notes = await fetchGetNotes()
    context.commit('fetch', notes)
  },

  async addNote (context, note) {
    const result = await axios.post('/api/note/add',
      {
        note: note
      }
    )

    if (result.status == 201) {
      const notes = await fetchGetNotes()
      context.commit('fetch', notes)
    }
  },

  async deleteNote (context, note) {
    console.log(note)
    const result = await axios.delete('/api/note/delete' + `/${note.id}`)
    context.commit('fetch', notes)
  }
}
