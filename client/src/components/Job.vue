<template>
  <div class="card" style="width: 15rem;">
    <img class="card-img-top" :src="info.img" alt="Card image cap" height="40">
    <div class="card-body">
      <h5>{{info["Position"]}}</h5>
      <h6>{{info["Name"]}}</h6>
      <h6>{{info["Location"]}}</h6>
    </div>
    <div class="card-footer">
      <button type="button" class="btn btn-primary"  v-on:click="apply">Apply</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Job',
  props: ['job'],
  data () {
    return {
      info: this.job
    }
  },
  methods:{
    apply: function(){

    }
  }
}
</script>
<style scoped>
img{
  padding: 5px;
}
</style>
