<template>
  <div>
    ListPage
    <!-- {{ res }} -->
    <ul>
      <!-- <li v-for="user in users" :key="user.name"></li> -->
    </ul>
    {{ users }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      res: null,
      users: [],
    }
  },

  created () {
    this.getData()
  },

  methods: {
    async getData () {
      const res = await axios.get('/api/test2')
      this.res = res
      this.users = res.data
    }
  }
}
</script>

<style scoped>

</style>
