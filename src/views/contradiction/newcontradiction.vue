<template>
	<!--<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="矛盾类型">
			<el-select v-model="form.region" placeholder="请选择矛盾类型">
				<el-option v-for="(item,index) in types"
					:label="item.label"
					:value="item.value"
					:key='index'></el-option>
			
			</el-select>
		</el-form-item>
		<el-form-item label="当事姓名">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="当事电话">
			<el-input v-model="form.telephone"></el-input>
		</el-form-item>
		
		<el-form-item label="矛盾">
			<el-input type="textarea" v-model="form.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('form')">保存</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>-->
		<section>
	


		


		<!--新增界面-->
	
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				   <el-form-item label="矛盾类型" prop="contradictiontype">
			<el-select v-model="addForm.contradictiontype" placeholder="请选择银行">
				<el-option label="类型一" value="shanghai"></el-option>
				<el-option label="类型二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
				
				
				
				<el-form-item label="当事人姓名" prop="personname">
					<el-input v-model="addForm.personname" auto-complete="off"></el-input>
				</el-form-item>
			<el-form-item label="当事人电话" prop="personphone">
					<el-input v-model="addForm.personphone" auto-complete="off"></el-input>
			</el-form-item> 
	
				<el-form-item label="矛盾信息" prop='message'>
					<el-input type="textarea" v-model="addForm.message"></el-input>
				</el-form-item>
			
			</el-form>
			<div slot="footer" class="dialog-footer dialog_footer">
				<!--<el-button @click.native="addFormVisible = false">重置</el-button>-->
				
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
			</div>
		
	</section>
</template>

<script>
		import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	export default {
		data() {
			return {
				
				listLoading: false,
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					personname: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
					
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: '',
					contradictiontype:'',//矛盾类型
					personname:'',//当事人姓名
					personphone:'',//当事人电话
					message:'',//矛盾信息
				},
				
				
			}
		},
		methods: {
		
		
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			  resetForm(formName) {
        this.$refs[formName].resetFields();
     },
			
			selsChange: function (sels) {
				this.sels = sels;
			},
		
		}
	}

</script>
<style scoped>
	.dialog_footer{position: relative;margin-left: 200px;}
</style>