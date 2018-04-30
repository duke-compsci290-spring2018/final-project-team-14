<template>
  <div class="card" style="width: 15rem;">
    <img class="card-img-top" :src="info.company_logo" alt="Company Logo" height="50" width="50">
    <div class="card-body">
      <h5>{{info["title"]}}</h5>
      <h6>{{info["company"]}}</h6>
      <p>{{info["location"]}}</p>
    </div>
    <div class="card-footer">
      <a role ="button" class="btn btn-primary" :href="info.url" target="_blank">Apply</a>
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
  created(){
    console.log(this.job);
  },
  methods:{
  }
}
</script>
<style scoped>
img{
  padding: 5px;
}
</style>
