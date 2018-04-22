<template>
	<div>

<section>
	<!--表单-->

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			
			
			<el-form :inline="true" :model="filters">
					<el-form-item label="按状态">
			<el-select v-model="filters.state" placeholder="请选择状态">
				<el-option label="状态一" value="shanghai"></el-option>
				<el-option label="状态二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
	     <el-form-item label="日期范围">
				<el-date-picker placeholder="选择日期" 
					v-model="filters.date" 
					style="width: 100%;" 
					type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                     end-placeholder="结束日期">
				</el-date-picker>
		</el-form-item>
			<el-form-item label="按银行">
			<el-select v-model="filters.bank" placeholder="请选择银行">
				<el-option label="银行一" value="shanghai"></el-option>
				<el-option label="银行二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
		
				<el-form-item label="按区域">
			<el-select v-model="filters.region" placeholder="请选择区域">
				<el-option label="区域一" value="shanghai"></el-option>
				<el-option label="区域二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
					<el-form-item label="按类型">
			<el-select v-model="filters.type" placeholder="请选择类型">
				<el-option label="类型一" value="shanghai"></el-option>
				<el-option label="类型二" value="beijing"></el-option>
			</el-select>
		</el-form-item>
                   <!-- <el-form-item label="日期范围">
            <el-date-picker
              v-model="filters.date"
              align="right"
              type="year"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>-->
				
				<!--<el-form-item>
					<el-input v-model="filters.name" placeholder="网点名称"></el-input>
				</el-form-item>-->
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
	
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" align="left">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="beginTime" label="开始日期" width="220" sortable>
			</el-table-column>
			<el-table-column prop="eventType" label="事件类型" width="220"  sortable>
			</el-table-column>
			<el-table-column prop="submitPerson" label="提交人" width="280" sortable>
			</el-table-column>
			<el-table-column prop="netPoint" label="网点" width="290" sortable>
			</el-table-column>
			
			<el-table-column  prop='processed' label="状态" min-width="150" sortable>
				
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
				
				</template>
			</el-table-column>
		</el-table>
		

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<!--<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>-->

<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="日期" prop="beginTime">
					<el-input type="textarea" v-model="editForm.beginTime":disabled="true"></el-input>
					
				</el-form-item>
				<el-form-item label="事件类型" prop="eventType">
					<el-input v-model="editForm.eventType" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="提交人" prop="submitPerson">
					<el-input v-model="editForm.submitPerson" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
			<el-form-item label="网点" prop="netPoint">
					<el-input type="textarea" v-model="editForm.contradictionHand" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="处理状态" prop="processed">
					<el-input v-model="editForm.processed" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<!--<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>-->
			</div>
		</el-dialog>


		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--模态窗-->
		 <!--弹框-->
    <el-dialog title="矛盾描述" :visible="dialogFormVisible" size="tiny" :data="users">
     <div>
     	<p>有关于描述描述详细说明式苛人顶替要顶替苛霜棋栽植腊梅奔村阿斯蒂芬黄柳霜阿斯蒂芬苛栽植茜基本面</p>
     	<p>当事人:<span prop="pointPerson"></span></p> <p>当事人:<span prop="checkPoint"></span></p>
     	<p>矛盾处理</p>
     	<p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
     	<template>
  <el-radio v-model="radio" label="1">已处理</el-radio>
  <el-radio v-model="radio" label="2">未处理</el-radio>
</template>
          <el-button type="primary" @click="handleSave" :loading="editLoading">确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
     </div>
          
      
      
    </el-dialog>
	</section>


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
			 //banks: [{label:'工商银行',value:'工商银行'},{label:'人民银行',value:'人民银行'}],//按银行
       // places: [{label:'南京分行',value:'南京分行'},{label:'上海分行',value:'上海分行'}],//按区域	
        filters: {
        	       state:'',//状态
        	       bank:'',//银行
        	        region:'',//按区域
        	        type:'',//类型
					name: '',
					date:''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: '',
					beginTime:'',//
					eventType:'',//
					submitPerson:'',//
					netPoint:'',
					processed:''//
				},

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
					addr: ''
				},
				dialogFormVisible:false,
			}//return结束
		},//data结束
			methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name,//获取用户名
					state:this.filters.state,//获取状态
					bank:this.filters.bank,//获取银行
					type:this.filters.type//获取类型
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
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//点击表格显示模态窗
			handleModal: function (index, row) {
				this.dialogFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
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
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},//methods结束
		mounted() {
			this.getUsers();
		}
	}
	
	
</script>

<style scoped>
	
	
	.demo-form-inline{margin-top: 30px;margin-left: 30px;}
	

</style>