<template>
  <div>
    <br>
    <div class="continer-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <h3 style="color:white">Create your story</h3>
          <br>
            <div class="card" style="padding:16px;">
              <form>
              <div class="md-form form-group mt-3">
                <input type="text" name="storyname" class="form-control" id="formGroupExampleInputMD" placeholder="title of your story"
                v-model="story.storyname">
              </div>

              <div class="md-form form-group mt-3">
                <input type="number" name="readingtime" class="form-control" id="formGroupExampleInputMD" placeholder="readingtime"
                v-model="story.readingtime">
              </div>

              <!--start select-->
              <div class="md-form form-group mt-3">
                <select class="browser-default custom-select" name="category" v-model="story.category">
                  <option value="Choose category" disabled selected>Choose category</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Horror">Horror</option>
                  <option value="Short">Short</option>
                  <option value="Suspense">Suspense</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Science">Science</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <!--end select-->

            <div class="form-group shadow-textarea">
              <label for="exampleFormControlTextarea6">SUMMARY</label>
              <textarea class="form-control z-depth-1" name="summary" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."
              v-model="story.summary"></textarea>
            </div>
            <button type="button" @click="createStory" class="btn btn-elegant" style="width:100%">Add</button>
            </form>
          </div>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      story: {
        storyname: '',
        category: '',
        readingtime: 0,
        summary: ''
      }
    }
  },

  methods: {
    createStory() {
      let story = {
        name: this.story.storyname,
        category: this.story.category,
        readingTime: this.story.readingtime,
        user_id: this.$store.state.user._id,
        summary: this.story.summary
      }

      this.$store.dispatch('addStory', story)


      console.log("STORY", story)
    }
  }
}
</script>

<style>

</style>