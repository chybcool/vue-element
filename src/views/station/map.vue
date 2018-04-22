<template>
	<div class='mapheader'>
  
   

  
   	<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
   	 	<div class='el_breadcrumb_item'>
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>网点概览</el-breadcrumb-item>
 </div>
</el-breadcrumb>-->
 
  <!-- <el-radio-group v-model="radio3">
      <el-radio-button label="网点概览"></el-radio-button>
     <router-link to='/station_list'> <el-radio-button label="网点列表"></el-radio-button></router-link>
      <el-radio-button label="新增网点"></el-radio-button>
   </el-radio-group>-->
 <baidu-map class="bm-view" center='北京'>
 	<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  </baidu-map>
 
 </div>
 
</template>

<script>
	export default{
		 data() {
      return {
       radio3:'网点概览'
      };
    }
	}
</script>
<style scoped>
	.mapheader{width: 100%;height: auto;}
	.mapheader p{float:left;margin-left:-30px;font-size: 25px;margin-top: -20px;}
	.el-radio-group{float: right;}
	.el-breadcrumb {clear: both;position: relative;width: 100%;height: 38px;background-color: #DDDDDD;}
	 .el_breadcrumb_item{line-height: 38px;padding-left: 20px;}
	.bm-view {
		margin: 50px 50px 10px 0px;
  width: 100p%;
  height: 600px;
  padding: 0px 50px;
}
	
	
</style>