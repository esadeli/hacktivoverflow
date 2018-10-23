<template>
    <div>
        <h1>Topic Detail</h1>
        <div>
            <div style="width: 52rem;" class="card">
                <div class="card-body">
                    <button type="button" class="btn btn-primary">{{ detailobj.title }}</button>
                    <br>
                    <hr>
                    <div class="row">
                      <div class="col-md-4">
                        <a class="linkedin" v-on:click.prevent="openLinkedin">
                        <i class="fa fa-linkedin"></i></a>
                      </div>
                      <div class="col-md-4">
                        <a class="twitter" v-on:click.prevent="openTwitter">
                        <i class="fa fa-twitter"></i></a>
                      </div>
                      <div class="col-md-4">
                        <a class="googleplus" v-on:click.prevent="openGplus">
                        <i class="fa fa-google-plus"></i></a>
                      </div>
                    </div>
                    <div v-if="token !== null && token !== '' && detailobj.author._id === userbasicinfo.userid">
                        <router-link :to="{name: 'Edittopic', params: {id: detailobj._id }}">
                          <button type="button" class="btn btn-warning">
                          Edit</button>
                        </router-link>
                        <button type="button" class="btn btn-danger"
                          v-on:click="deletetopic()">
                          Delete</button>
                    </div>
                    <br>
                    <hr>
                    <br>
                    <p class="card-text">Author: {{ detailobj.author.name }}</p>
                    <hr>
                    <br>
                    <p><b>Description:</b></p>
                    <br>
                    <br>
                    {{ detailobj.description }}
                    <hr>
                    <p class="card-text"><b>Answers: </b></p>
                    <hr>
                    <div v-if="detailobj.listanswers.length !== 0">
                      <div class="row"
                        v-for="(answer,index) in detailobj.listanswers" :key="index">
                          <div class="col-md-2">
                            <span class="badge badge-secondary">{{ answer.answerusername }} </span>
                          </div>
                          <div class="col-md-7">
                            <p>{{ answer.content }}</p>
                          </div>
                          <div class="col-md-1">
                             <div v-if= "answer.answeruserid == userbasicinfo.userid && token !== '' && token !== null">
                              <span type="button" class="btn btn-danger" v-on:click= "deleteanswer(answer._id)">Delete</span>
                            </div>
                          </div>
                          <br>
                          <br>
                          <hr>
                      </div>
                    </div>
                    <div v-else>
                      <p>No answer available</p>
                    </div>
                    <hr>
                    <div v-if= "token !== '' && token !== null ">
                      <h4>Add answer</h4>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Answer</label>
                                <textarea class="form-control" rows="5" id="answer" placeholder="Add feedback" v-model= "newanswer"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" v-on:click= "addanswer()">Add Answer</button>
                        </form>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Detailtopic',
  props: ['id'],
  data () {
    return {
      newanswer: ''
    }
  },
  created () {
    this.$store.dispatch('getdetailobj', this.id)
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    userbasicinfo () {
      return this.$store.state.userbasicinfo
    },
    detailobj () {
      return this.$store.state.detailobj
    }
  },
  watch: {
    id (val) {
      this.$store.dispatch('getdetailobj', val)
    }
  }
}
</script>

<style>

</style>
