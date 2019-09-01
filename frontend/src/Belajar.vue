<template>
  <div>
    <ul v-for="user in users" :key="user.id">
      <li>
      <span>{{user.name}}</span> &#160;
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */ 
import axios from 'axios'
export default {
  data(){
    return{
        users: []
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('http://127.0.0.1:3000/api/users/').then(res => {
        this.users = res.data //respon dari rest api dimasukan ke users
      }).catch ((err) => {
        console.log(err);
      })
    }
   }
  }
</script>