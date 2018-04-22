<template>
	<el-form ref="users" :data="users" label-width="80px"  style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="网点名称">
			<el-input v-model="users.name"></el-input>
		</el-form-item>
		<el-form-item label="所属银行">
			<el-select v-model="users.bank" placeholder="请选择矛盾类型">
				<el-option label="银行一" value="shanghai"></el-option>
				<el-option label="银行二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="所属区域">
			<el-select v-model="users.area" placeholder="请选择矛盾类型">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="地址">
			<el-input v-model="users.address"></el-input>
		</el-form-item>
		<el-form-item label="网点负责人">
			<el-input v-model="users.pointPerson"></el-input>
		</el-form-item>
		
		<el-form-item label="安防负责人">
			<el-input type="textarea" v-model="users.checkPerson"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('users')" >新增</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
		import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	//import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import { getStationList, getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	export default {
		data() {
			return {
			users: [],
			}
		},
		methods: {
				 submitForm(formName) {//提交
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
			onSubmit() {
				console.log('submit!');
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
		},
			mounted() {
			this.getUsers();
		}
	}

</script>
<style scoped>
	
</style>