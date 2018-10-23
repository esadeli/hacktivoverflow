<template>
    <div>
     <h1>Add Topic</h1>
     <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input type="text" class="form-control"
             v-model ="topictitle"
             aria-describedby="emailHelp" placeholder="Enter Title">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <textarea v-model="topicdescription" type="text"
             class="form-control" aria-describedby="emailHelp"
             placeholder="Enter Description">
             </textarea>
        </div>
    </form>
    <button v-on:click="addarticle()" class="btn btn-primary">Submit</button>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Addtopic',
  data () {
    return {
      topictitle: '',
      topicdescription: ''
    }
  },
  methods: {
    addarticle () {
      let self = this
      axios({
        method: 'POST',
        url: 'http://localhost:3010/topics',
        headers: {
          token: this.token
        },
        data: {
          title: self.topictitle,
          description: self.topicdescription
        }
      })
        .then(topic => {
          console.log('topic created-----', topic.data)
          this.$store.dispatch('listoftopics')
          this.$router.push({ name: 'home' })
        })
        .catch(error => {
          console.log('ERROR Create topic ', error)
        })
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  }
}
</script>

<style>

</style>
