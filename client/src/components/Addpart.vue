<template>
  <div>
    <br>
    <div class="continer-fluid" style="background-color:slategray">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <h3>Add a part</h3>
          <br>
          <form>
            <div class="card" style="padding:20px;padding-top:10px;">
              <div class="md-form form-group mt-3">
                <input type="text" name="title" class="form-control" id="formGroupExampleInputMD" placeholder="title of your story" v-model="title">
              </div>

            <div class="form-group shadow-textarea">
              <label for="exampleFormControlTextarea6">CONTENT</label>
              <textarea class="form-control z-depth-1" name="body" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..." v-model="body"></textarea>
            </div>
            <button type="button" class="btn btn-elegant" @click="addPart">Add</button>
          </div>
          </form>
          </div>
          
        </div>
        <div class="col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return{
      title: '',
      body: '',
      sid: this.$route.params.thesid
    }
  },

  methods: {
    addPart() {
      let part = {
        title: this.title,
        body: this.body
      }
      this.$store.dispatch('addPart', { part: part, sid: this.sid })
    }
  }
}
</script>

<style>

</style>