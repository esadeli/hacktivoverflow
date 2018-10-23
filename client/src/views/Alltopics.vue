<template>
    <div>
        <div v-for="(topic,index) in listoftopics" :key="index">
            <div style="width: 42rem;" class="card">
                <div class="card-body">
                    <button type="button" class="btn btn-primary">{{ topic.title }}</button>
                    <br>
                    <p class="card-text">Author: {{ topic.author.name}}</p>
                    <hr>
                    <p class="card-text">Comments: {{ topic.listanswers.length }}</p>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Alltopics',
  computed: {
    listoftopics () {
      return this.$store.state.listoftopics
    }
  }
}
</script>

<style>

</style>
