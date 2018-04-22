<template>
	<div>
		
	<!--tab表格-->
	<el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-date"></i> 审批中</span>
    	<!--列表-->
    	
    
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" align="left">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="submitTime" label="提交时间" width="250" sortable>
			</el-table-column>
			<el-table-column prop="text" label="内容" width="450" sortable>
			</el-table-column>
			<el-table-column prop="proposer" label="申请者" width="260" sortable>
			</el-table-column>
				<el-table-column prop="state" label="状态" min-width="200" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				
				</template>
			</el-table-column>
		</el-table>
		
		
  </el-tab-pane>
  <el-tab-pane label="审批通过">
  	<!--列表-->
  	
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" align="left">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="submitTime" label="提交时间" width="250" sortable>
			</el-table-column>
			<el-table-column prop="text" label="内容" width="450" sortable>
			</el-table-column>
			<el-table-column prop="proposer" label="申请者" width="260" sortable>
			</el-table-column>
				<el-table-column prop="state" label="状态" min-width="200" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				
				</template>
			</el-table-column>
		</el-table>
		
  </el-tab-pane>
  <el-tab-pane label="整改">
  	<!--列表-->
  	
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" align="left">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="submitTime" label="提交时间" width="250" sortable>
			</el-table-column>
			<el-table-column prop="text" label="内容" width="450" sortable>
			</el-table-column>
			<el-table-column prop="proposer" label="申请者" width="260" sortable>
			</el-table-column>
				<el-table-column prop="state" label="状态" min-width="200" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				
				</template>
			</el-table-column>
		</el-table>
		
  </el-tab-pane>
  <el-tab-pane label="全部">
  	<!--列表-->
  	
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" align="left">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="submitTime" label="提交时间" width="250" sortable>
			</el-table-column>
			<el-table-column prop="text" label="内容" width="450" sortable>
			</el-table-column>
			<el-table-column prop="proposer" label="申请者" width="260" sortable>
			</el-table-column>
				<el-table-column prop="state" label="状态" min-width="200" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				
				</template>
			</el-table-column>
		</el-table>
		
  </el-tab-pane>
</el-tabs>
  	<!--第二个tab标签里点击编辑弹出的模态框-->
  	
    	<!--<el-dialog title="修改个人信息" :visible="dialogFormVisible" size="tiny" v-loading="listLoading">
      <el-form ref="users" label-width="80px"  :data="users"  :model="users">
        <el-form-item label="提交时间">
          <el-input v-model="users.submitTime"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="users.text"></el-input>
        </el-form-item>
       <el-form-item label="处理意见">
          <el-input v-model="users.state" ></el-input>
        </el-form-item> 
       
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
  </el-dialog>-->
  			<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="提交时间" prop="submitTime">
					<el-input v-model="editForm.submitTime" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="内容" prop="text">
					<el-input v-model="editForm.text" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="申请者" prop="proposer">
					<el-input v-model="editForm.proposer" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="editForm.state">
						<el-radio class="radio" :label="1">成功</el-radio>
						<el-radio class="radio" :label="0">失败</el-radio>
					</el-radio-group>
				</el-form-item>
				
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
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
				filters: {
        	        state:'',
					name: '',
					bank:'',
					place:'',
					date:'',
					netpoint:'',
					
				},
					form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					applyPerson:'',//审批人
					desc: ''//内容
				},
				users: [],
					//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
					editFormRules: {
					
					submitTime: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					text: [
						{ required: true, message: '请输入内容', trigger: 'blur' }
					],
					申请者: [
						{ required: true, message: '请输入申请者', trigger: 'blur' }
					],
				},
				editFormVisible: false,//编辑界面是否显示
				listLoading: false,
				 dialogFormVisible:false,//第二个tab表格点击模态窗不能少
				 editLoading:false//tab点击模态窗修改默认值
			}//return
		},//data
			methods: {
					handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
					//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
				 opendialog(){//tab标签里的点击打开模态框
  	  this.dialogFormVisible=true
  },
   handleSave () {//第二个tab标签里的点击编辑打开模态框里的修改
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.editLoading = true;
          this.$message({
            message: "操作成功！",
            type: 'success'
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        }).catch(() => {
        });
      },
			onSubmit() {
				console.log('submit!');
			},
			selsChange: function (sels) {
				this.sels = sels;
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