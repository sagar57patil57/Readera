<template>
  <div>
    <br>
    <div class="continer-fluid" style="background-color:slategray">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="jumbotron">
            <h3 style="font-weight:bold">{{ getFullPart.title }}</h3>
            <hr>
            <div>
              <p>{{ getFullPart.body }}</p>
            </div>
          </div>
          <hr>
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      sid: this.$route.params.fullsid,
      pid: this.$route.params.fullpid
    }
  },
  created() {
    this.$store.dispatch('getFullPart', { sid: this.sid, pid: this.pid })
  },
  computed: {
    ...mapGetters(['getFullPart', 'isCurrentUser']),
  },
  methods: {
  }
}
</script>

<style>

</style>