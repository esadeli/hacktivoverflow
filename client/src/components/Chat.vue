<template>
   <div>
      <h1>Chat Session</h1>
      <div id="chatroom">
        <ul class="list-group" v-for="(chat,index) in allchats" :key="index">
          <li class="list-group-item">{{ chat.chat }}</li>
        </ul>
      </div>
      <br>
      <br>
      <hr>
      <input type="text" v-model="newchat" class="form-control" aria-describedby="emailHelp" placeholder="Enter chat here and press send">
      <br>
      <button type="button" class="btn btn-secondary" v-on:click="addchat()">Send</button>
   </div>
</template>

<script>
import db from '../../googlekey.js'
export default {
  name: 'Chat',
  data () {
    return {
      newchat: '',
      allchats: []
    }
  },
  methods: {
    addchat () {
      let self = this
      db.ref('/chat/').push({
        chat: self.newchat
      }, (error) => {
        if (!error) {
          self.newchat = ''

          // repopulate data
          db.ref('/chat').on('value', function (snapshot) {
            self.allchats = []
            snapshot.forEach(detailsnapshot => {
              self.allchats.push(detailsnapshot.val())
              console.log(detailsnapshot.val())
            })
          })
        } else {
          console.log('ERROR Add chat ', error)
        }
      })
    }
  },
  watch: {
    allchats (val) {}
  }
}
</script>

<style>
#chatroom {
  height:200px;
  overflow-y: scroll;
}
</style>
