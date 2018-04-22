<template>
	<div>
			<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>日常安防</el-breadcrumb-item>
</el-breadcrumb>-->


        <!--表格-->
       <!-- <section>
    <el-row>
      <el-col :span="24">

        <!--表格
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}"
         
          >
        
          <el-table-column
            prop="date"
            label="日期"
            width="150"
            sortable>
          </el-table-column>
          <el-table-column
            prop="network"
            label="网点"
            width="130">
          </el-table-column>
          <el-table-column
            prop="business_before"
            label="营业前"
            width="130">
          </el-table-column>
            <el-table-column
            prop="business_middle"
            label="营业中"
            width="130">
          </el-table-column>
            <el-table-column
            prop="business_after"
            label="营业终"
            width="130">
          </el-table-column>
            <el-table-column
            prop="patrol"
            label="巡查"
            width="130">
          </el-table-column>
            <el-table-column
            prop="completion"
            label="完成度"
            width="130"
            sortable>
          </el-table-column>
           <el-table-column
      
      label="设备状态"
      width="130">
      <template slot-scope="scope" class='protectdetail'>
    <router-link to="/routinedetail"> <el-button type="text" size="small" >网点详情</el-button></router-link>
   
      </template>
    </el-table-column>
   
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="1"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </section>-->
<section>
	<!--表单-->

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			
			
			<el-form :inline="true" :model="filters">
				 <el-form-item label="按银行">
            <el-select v-model="filters.bank" placeholder="请选择">
              <el-option
                v-for="(item,index) in banks"
                :label="item.label"
                :value="item.value"
                :key="index"
                >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按区域">
            <el-select v-model="filters.place" placeholder="请选择">
              <el-option
                v-for="(item,index) in places"
                :label="item.label"
                :value="item.value"
                :key="index"
                >
              </el-option>
            </el-select>
          </el-form-item>
                    <el-form-item label="日期范围">
            <el-date-picker
              v-model="filters.date"
              align="right"
              type="year"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
				
				<el-form-item>
					<el-input v-model="filters.name" placeholder="网点名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="beginTime" label="日期" min-width="200" sortable>
			</el-table-column>
			<el-table-column prop="netPoint" label="网点" width="260" sortable>
			</el-table-column>
			<el-table-column prop="businessbefore" label="营业前" width="200" sortable>
			</el-table-column>
			<el-table-column prop="businessmiddle" label="营业中" width="200" sortable>
			</el-table-column>
			<el-table-column prop="businessafter" label="营业终" width="200" sortable>
			</el-table-column>
			<el-table-column prop="patrol" label="巡查" min-width="150" sortable>
			</el-table-column>
				<el-table-column prop="success" label="完成度" min-width="150" sortable>
			</el-table-column>
			<el-table-column  label="设备状态" min-width="150" >
				<template  scope='scope'>
					<el-button  type='primary' size='small'><router-link to="/routine/routinedetail">网点详情</router-link></el-button>
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
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
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
	</section>


	</div>
</template>


<script>
   /*  
	
	const ERR_OK = "000";
	export default{
	 
		data(){
			return{
				
  formInline: {//表单 按银行 按区域 按日期范围
          user: {
            name: '',
            date: '',
            address: [],
            place: '',
            bank:''
          }
        },
        /* tableData: [{
         	date:'2018-4-1',//日期
         	network:'中国移动',//网点
         	business_before:'营业前',//营业前
         	business_middle:'营业中',//营业中
         	business_after:'营业后',//营业后
         	patrol:'巡查中',
         	completion:'80%'
         },{
         	date:'2018-2-1',//日期
         	network:'中国移动',//网点
         	business_before:'营业前',//营业前
         	business_middle:'营业中',//营业中
         	business_after:'营业后',//营业后
         	patrol:'巡查中',
         	completion:'40%'
         }],
        banks: [{label:'工商银行',value:'工商银行'},{label:'人民银行',value:'人民银行'}],//按银行
        places: [{label:'南京分行',value:'南京分行'},{label:'上海分行',value:'上海分行'}],//按区域
        /*dialogFormVisible: false,
        editLoading: false,
        form: {
          name: '',
          address: '',
          date: '',
        },
        currentPage: 4,
        table_index: 999,
			};//这是return结尾
		},
		created(){
			this.$http.get('/api/getTable').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.tableData = response.datas;
        }
      });
			this.$http.get('/api/getOptions').then((response) => {
        response = response.data;
        if (response.code === ERR_OK) {
          this.options = response.datas;
          this.places = response.places;
        }
      });
		},//created结束
		methods:{
			 handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }

		},
	}*/
		import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	//import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import { getStationList, getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	export default{
		data(){
			return{
			 banks: [{label:'工商银行',value:'工商银行'},{label:'人民银行',value:'人民银行'}],//按银行
        places: [{label:'南京分行',value:'南京分行'},{label:'上海分行',value:'上海分行'}],//按区域	
        filters: {
					name: '',
					bank:'',
					place:'',
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
					addr: ''
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
				}
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