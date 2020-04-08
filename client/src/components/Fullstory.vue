<template>
  <div>
    <div class="continer-fluid" style="background-color:slategray">
    <br>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          
          <div class="card">
          <div class="row" style="padding:30px;">
            
            <div class="col-sm-4">
              <img class="card-img-top rounded-0" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/full page/2.jpg" alt="Card image cap">

              <br><br>

              <router-link to="/">
                <a class="btn-floating btn-lg btn-light" style="margin-left:10px;"><i class="fas fa-download"></i></a>
              </router-link>
              <router-link to="/">
                <a class="btn-floating btn-lg btn-light" style="margin-left:20px;"><i class="fas fa-plus"></i></a>
              </router-link>
              <router-link to="/">
                <a class="btn-floating btn-lg btn-light" style="margin-left:20px;"><i class="fas fa-share-alt"></i></a>
              </router-link>
              <button class="btn btn-floating btn-md btn-light" @click.prevent="liked" style="margin-left:20px;"><i class="fas fa-thumbs-up"></i>{{ getFullStory.numberOfLikes }}</button>


              <br><br>

              <ul class="list-group">
                <li class="list-group-item" v-for="i in getFullStory.parts"><span style="margin-top:0px;">{{ i.title }}</span> 
                  <router-link v-bind:to="'/story/' + id + '/' + i._id">
                    <a class="btn btn-danger btn-sm" style="float:right">Read</a>
                  </router-link>
                </li>
              </ul>

              <!-- Add delete -->
              <router-link v-bind:to="'/story/' + id + '/part'">
                <a v-if="isCurrentUser" class="btn btn-dark btn-sm">Add a new part</a>
              </router-link>
                <button type="button" v-if="isCurrentUser" class="btn btn-dark btn-sm"   @click="deleteStory">Delete this story</button>
              <!-- Add delete end -->
            </div>

            <div class="col-sm-8">
              <a href="#" class="badge badge-dark float-right" style="margin-left:10px">{{ getFullStory.category }}</a>
              <h3 style="font-weight:bold">{{ getFullStory.name }}</h3>
              <hr>
              Reading time : <span style="font-weight:bold">{{ getFullStory.readingTime }} mins</span>
              <hr>
              Summary
              <br> <span style="font-weight:bold">{{ getFullStory.summary }}</span>
              <hr>
              <br>
              <h5>Reviews</h5>
              
              <div class="md-form">
                <input v-model="commentText" name="comment" type="text" id="form1" class="form-control" v-on:keyup.enter="onEnter($event)">
                <label for="form1">Add a Comment ...</label>
              </div>


              <div class="row">
                <div class="col-10">
                  
                  <div v-for="comm in getFullStory.comments">
                    <span style="font-weight:bold">
                     <i class="far fa-user-circle mr-2"></i>
                     {{ comm.userName }}
                    </span>
                    <p style="margin-left:20px;">{{ comm.comment }}</p>
                    <hr>
                  </div>
                  
                </div>
              </div>
            </div>


          </div>
          </div>

        </div>
        <div class="col-md-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  data() {
    return {
      id: this.$route.params.sid,
      commentText: ''
    }
  },
  created() {
    this.$store.dispatch('getFullStory', this.id)
  },
  computed: {
  ...mapGetters(['getFullStory', 'isCurrentUser']),
  },
  methods: {
    onEnter(event) {
      event.preventDefault()
      console.log(this.commentText)
      this.$store.dispatch('addComment', { id: this.id, commentText: this.commentText })
      this.commentText = ''
    },

    deleteStory() {
      this.$store.dispatch('deleteStory', { id: this.id })
    },

    liked() {
      this.$store.dispatch('like', { id: this.id })
    }
  }
}
</script>

<style scoped>

</style>