<template>
	<section>
	


		


		<!--新增界面-->
	
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				
				
				
				
				<el-form-item label="网点名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
			   <el-form-item label="所属银行" prop='bank'>
			<el-select v-model="addForm.bank" placeholder="请选择银行">
				<el-option label="银行一" value="shanghai"></el-option>
				<el-option label="银行二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="所属区域" prop='area'>
			<el-select v-model="addForm.area" placeholder="请选择矛盾类型">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
				<el-form-item label="地址" prop="addr">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
				<el-form-item label="网点负责人" prop="pointPerson">
			<el-input v-model="addForm.pointPerson"></el-input>
		</el-form-item>
				<el-form-item label="安防负责人" prop="checkPerson">
			<el-input v-model="addForm.checkPerson"></el-input>
		</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer dialog_footer">
				<!--<el-button @click.native="addFormVisible = false">取消</el-button>-->
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
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
			

			
		
			
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					
					
					
					addr: '',//地址
					bank:'',//银行
					area:'',//区域
					pointPerson:'',//网点负责人
					checkPerson:''//安防负责人
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					addr: [
						{ required: true, message: '请输入地址', trigger: 'blur' }
					],
					
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

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
		
		},
		
	}

</script>

<style scoped>
.dialog-footer{position: relative;margin-left: 300px;}
</style>