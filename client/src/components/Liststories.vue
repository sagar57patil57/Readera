<template>
  <div>
    <div class="continer-fluid">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <h3>List</h3>
          <ul>
            <li v-for="(x, index) in getStories">Name - {{ x.summary }}</li>
          </ul>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  created() {
    this.$store.dispatch('getStories')
    //this.stories = this.$store.getters.getStories
    //console.log("NO", this.Thestories())
  },
  computed: {
  ...mapGetters(['getStories']),
  }
}
</script>

<style>

</style>