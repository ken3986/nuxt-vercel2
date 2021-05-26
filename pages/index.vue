<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        nuxt-vercel2
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.testAPI()
  },

  methods: {
    async testAPI () {
      // const res = await this.$axios.$get('/api/test')
      const res = await axios.get('/api/test')
      console.log(res)

      // const xhr = new XMLHttpRequest()
      // xhr.open('GET', '/api/test.js')
      // console.log(xhr)
      // xhr.onreadystatechange = function(){
      //   if(xhr.readyState == 4 && xhr.status == 200){
      //     alert(xhr.responseText);
      //   }
      // };
      // xhr.send(null);

    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
