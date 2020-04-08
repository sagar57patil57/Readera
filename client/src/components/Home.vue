<template>
  <div>
    <div class="continer-fluid" style="background-color:slategray">
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <br>
          <h4 style="color:white">New Stories</h4>
          <div class="row">

            <div class="col-sm-3" v-for="(x, index) in getStories">
              <!-- Card -->
              <br>
              <div class="card promoting-card">

                <!-- Card content -->
                <div class="card-body d-flex flex-row">

                  <!-- Content -->
                  <div>

                    <!-- Title -->

                    <h4 class="card-title font-weight-bold mb-2">{{ x.name }}
                    
                    </h4>
                    <a href="#" class="badge badge-light">{{ x.category }}</a>

                    <!-- Subtitle -->

                  </div>

                </div>

                <!-- Card image -->
                <div class="view overlay">
                  <img class="card-img-top rounded-0" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full page/2.jpg" alt="Card image cap">
                  <a href="#!">
                    <div class="mask rgba-white-slight"></div>
                  </a>
                </div>

                <!-- Card content -->
                <div class="card-body">
                  <p>{{ x.summary | reduceLength }}</p>
                  <router-link v-bind:to="'/story/' + x._id"><a class="btn btn-dark btn-sm">Read</a></router-link>
                </div>

              </div>
              <!-- Card -->
            </div>
          </div>

        </div>
        <div class="col-md-1"></div>
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
    //this.stories = this.$store.state.stories
    //console.log("NO", this.$store.state.stories)
  },
  computed: {
  ...mapGetters(['getStories']),
  },
  filters: {
    changeFormat(data) {
      data = data.slice(0,10)
      return data
    },

    reduceLength(data) {
      return data.slice(0,10) + '...'
    }
  }
}
</script>

<style scoped>

  .collapse-content .fa.fa-heart:hover {
  color: #f44336 !important;
}
.collapse-content .fa.fa-share-alt:hover {
  color: #0d47a1 !important;
}

</style>