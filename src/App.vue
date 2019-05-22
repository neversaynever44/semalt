<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>

  export default {
    data () {
      return {
        
      }
    },
    created() {
    	console.log(process.env.NODE_ENV)
    }
  }
</script>
