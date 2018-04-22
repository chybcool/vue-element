<template>
	<div>
	<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				   <el-form-item label="审批者" prop="approval">
			<el-select v-model="addForm.approval" placeholder="请选择审批人">
				<el-option label="审批者一" value="shanghai"></el-option>
				<el-option label="审批者二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
				<el-form-item label="内容" prop='text'>
					<el-input type="textarea" v-model="addForm.text"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer dialog_footer">
				<!--<el-button @click.native="addFormVisible = false">取消</el-button>-->
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
			</div>

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
				listLoading: false,
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
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
					text:'',//内容
					approval:''//审批人
				}
				
			}//return
		},//data
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
				 
		
			
		},
		mounted() {
		
		}
	
	}
</script>

<style scoped>
	.dialog_footer{position: relative;margin-left: 200px;}
</style>