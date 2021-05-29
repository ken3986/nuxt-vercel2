<template>
  <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <!-- <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <NuxtLink
        to="List"
      >List</NuxtLink>
    </nav> -->
    <div>
      ListPage
      <form @submit.prevent="addNote">
        <input type="text" v-model="noteForm.title">
        <button type="submit">追加</button>
      </form>
      <ul>
        <li v-for="note in notes" :key="note.id">
          {{ note.title }}
          <button @click="deleteNote(note)">削除</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      noteForm: {
        title: ''
      }
    }
  },

  computed: {
    notes () {
      return this.$store.getters['notes/getNotes']
    }
  },

  mounted () {
    this.getData()
  },

  methods: {
    async getData () {
      this.$store.dispatch('notes/getNotes')
      // this.notes = this.$store.getters['notes/getNotes']
    },

    addNote () {
    // this.$store.dispatch('notes/postNote', {title: 'storeに追加テスト'})
      this.$store.dispatch('notes/addNote',
        {
          title: this.noteForm.title
        }
      )
    },

    deleteNote (note) {
      console.log('postdelete')
      this.$store.dispatch('notes/deleteNote', note)
      // const index = this.notes.indexOf(note)
      // this.notes.splice(index, 1)
    },
  }
}
</script>

<style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 90px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  }
</style>
