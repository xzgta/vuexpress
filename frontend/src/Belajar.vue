<template>
  <div>
    <form @submit.prevent="add">
        <input type="hidden" v-model="form.id">
        <input type="text" v-model="form.name">
        <button type="submit" v-show="!updateSubmit">add</button>  
        <button type="button" v-show="updateSubmit" @click="update(form)">Update</button> 
    </form>
    <ul v-for="user in users" :key="user.id">
      <li>
      <span>{{user.name}}</span> &#160;
      <button @click="edit(user)">Edit</button> ||  <button @click="del(user)">Delete</button>
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
        form: {
          id: '',
          name: ''
        },
        users: '',
        updateSubmit: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load(){
        axios.get('http://127.0.0.1:3000/api/users/').then(res => {
        this.users = res.data.Users
      }).catch ((err) => {
        console.log(err);
        
      })
    },
      add(){
      axios.post('http://127.0.0.1:3000/api/users/', this.form).then(res => {
          this.load()
          this.form.name = ''
      })
    },
    edit(user){ 
        this.updateSubmit = true
        this.form.id = user.id 
        this.form.name = user.name 
    },
    update(form){ 
       return axios.put('http://127.0.0.1:3000/api/users/' + form.id , {name: this.form.name}).then(res => {
        this.load()
        this.form.id = ''
        this.form.name = ''
        this.updateSubmit = false
      }).catch((err) => {
        console.log(err);
        
      })
    },
    del(user){
      axios.delete('http://127.0.0.1:3000/api/users/' + user.id).then(res =>{
          this.load()
          let index = this.users.indexOf(form.name)
          this.users.splice(index,1)
      })
    }
  }
}
</script>