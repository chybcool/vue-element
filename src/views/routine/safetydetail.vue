<template>
	<div >
			<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{path:'/safety'}">日常安防</el-breadcrumb-item>
    <el-breadcrumb-item >网点详情</el-breadcrumb-item>
</el-breadcrumb>-->
<div class='safetytab'>
	<p>中国银行南通分行人民路支行 日常安防详情</p>
	<el-date-picker
      v-model="value1"
      size="small"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
	<span>(点击弹出日历下拉，可选择)</span>
</div>
<!--tab 切换-->

 <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick"  v-for="(item,index) in tableData" :key="index">
    <el-tab-pane label="营业前" name="first" ><textarea>{{item.date}}</textarea></el-tab-pane>
    <el-tab-pane label="营业中" name="second"><p>{{item.network}}</p></el-tab-pane>
    <el-tab-pane label="营业终" name="third"><p>{{item.business_before}}</p></el-tab-pane>
    <el-tab-pane label="巡查" name="fourth">
    	<p>{{item.business_middle}}</p>
    </el-tab-pane>
    <el-tab-pane label="来访" name="five">
    	<p>{{item.business_after}}</p>
    </el-tab-pane>
    <el-tab-pane label="后场" name="six">
    	{{item.patrol}}
    </el-tab-pane>
 </el-tabs>-->
<el-tabs type="border-card" :data="users" :model="users"  v-loading="listLoading" :ref="users">
  <el-tab-pane >
    <span slot="label" ><i class="el-icon-date"></i> 营业前常规</span>
     <p >{{users[0].routinebefore}}</p>
  </el-tab-pane>
  <el-tab-pane label="营业中常规"><p>{{users[0].routinemiddle}}</p></el-tab-pane>
  <el-tab-pane label="巡查"><p>{{users[0].patrol}}</p></el-tab-pane>
  <el-tab-pane label="来访" ><p>{{users[0].visit}}</p></el-tab-pane>
  <el-tab-pane label="后场" ><p>{{users[0].bankcount}}</p></el-tab-pane>
  <el-tab-pane label="营业终常规" ><p>{{users[0].routineafter}}</p></el-tab-pane>
</el-tabs>
	</div>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	//import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import { getStationList, getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	
	export default{
		data(){
			return{
					//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
					filters: {
        	        state:'',
					name: '',
					bank:'',
					place:'',
					date:'',
					netpoint:''
				},
				props:['message'],
				users: [],
				listLoading: false,
				 editLoading:false,//tab点击模态窗修改默认值
			   tableData: [{
         	date:'2018-4-1',//日期
         	network:'中国移动',//网点
         	business_before:'营业前',//营业前
         	business_middle:'营业中',//营业中
         	business_after:'营业后',//营业后
         	patrol:'巡查中',
         	completion:'80%'
         }],
				 value1: '',//日期下拉
				 activeName2: 'first',//tab切换默认值第一个
				 	editFormRules: {
					
					submitTime: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					text: [
						{ required: true, message: '请输入内容', trigger: 'blur' }
					],
					
				},
			}//return结束
		},//data函数结束
		
		methods:{
			handleClick(tab, event) {
        console.log(tab, event);
     },
     //获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				console.log('hello1');
				this.listLoading = true;
				//NProgress.start();
				
				/**
				getStationList(para).then((res) => {
					this.total = res.total;
					this.users = res.data;
					this.listLoading = false;
					//NProgress.done();
				});
				**/
				getUserListPage(para).then((res) => {
					console.log('1111');
					console.log(JSON.stringify(res[1].data.stations));
					//console.log(res[1]);
					this.total = res[1].data.total;
					this.users = res[1].data.stations; /*[
			{
				name:'江苏银行南通分行',
				area1: '崇川区',
				manager:'张三',
				security_officer:'李四',
				telephone: '12345678',
			}
		];*/
					this.listLoading = false;
					//NProgress.done();
				});
			},
		},//methods结束
		mounted() {
			this.getUsers();
		}
	};

</script>

<style scoped>
	.safetytab {margin: 50px 50px;}
	.safetytab  p{color: #008B8B; font-size: 16px;margin-top: 30px;margin-bottom: 20px;}
	.el-breadcrumb {clear: both;position: relative;width: 100%;height: 38px;background-color: #DDDDDD;padding-left: 20px;}
	 .el-breadcrumb__item{line-height: 38px;}
	  .el-tabs{margin: 0 50px;}
</style>