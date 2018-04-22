<template>
	<div>
		<div class="datalist">
			<ul>
				<li><img src="../../../static/img/data.png"><p>日常工作</p><p>完成度:80%</p></li>
				<li><img src="../../../static/img/data.png"><p>完成检查次数</p><p>10次</p></li>
				<li><img src="../../../static/img/data.png"><p>安全检查达标率</p><p>70%</p></li>
				<li><img src="../../../static/img/data.png"><p>风险指数</p><p>高风险</p></li>
			</ul>
		</div>
		
		
		<!--tab start-->
<el-tabs type="border-card">
  <el-tab-pane>
    <span slot="label"><i class="el-icon-date"></i>基本信息</span>
    
<el-row>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  	<ul class="baseinfo_list" :data="users"  v-loading="listLoading" :model="users">
  		<li ><span class="key">网点名称</span><span class="value" >{{users[0].name}}</span></li>
  		<li><span class="key">网点地址</span><span class="value">{{users[0].address}}</span></li>
  		<li><span class="key">网点负责人</span><span class="value" >{{users[0].pointPerson}}</span></li>
  		<li><span class="key">安防负责人</span><span class="value" >{{users[0].checkPerson}}</span></li>
  		<li><span class="key">安全防范合格证号</span class="value" ><span>{{users[0].safeNo}}</span></li>
  		<li><span class="key">合格证取得时间</span><span class="value" >{{users[0].getTime}}</span></li>
  		<li><span class="key">联系电话：</span><span class="value" >{{users[0].telephone}}</span></li>
  		<li><span class="key">搬迁权限情况</span><span class="value" >{{users[0].power}}</span></li>
  	</ul>
  	  <!--编辑图标-->
   <el-row class="block-col-2">
  <el-col :span="12">
    
    <el-dropdown trigger="click" class='editlist'>
      <span class="el-dropdown-link">
        <img src="../../../static/img/bianji.png">
      </span>
      <el-dropdown-menu slot="dropdown">
      	<template scope="scope">
        <el-dropdown-item @click="handleEdit(scope.$index, scope.row)">编辑</el-dropdown-item>
        <el-dropdown-item>点击显示</el-dropdown-item>
        <el-dropdown-item>表单</el-dropdown-item>
        <el-dropdown-item>日期更改</el-dropdown-item>
        <el-dropdown-item>按钮属性</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </el-dropdown>
   
  </el-col>
</el-row>
	
  	</div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple-light">
    	<baidu-map class="bm-view" center='北京'>
 			<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
  		</baidu-map>
  	</div>
  
  </el-col>
</el-row>
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
				<el-form-item label="状态" prop='state'>
					<el-radio-group v-model="editForm.state">
						<el-radio class="radio" :label="1">已完成</el-radio>
						<el-radio class="radio" :label="0">未审核</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
  </el-tab-pane>
  <el-tab-pane label="消息中心">
  	<el-row>
  <el-col :span="12">
  	
  	<div class="grid-content bg-purple baseinfo_edit">
  			<ul class='baseinfo_list2' :data='users'>
    			<li><img src="../../../static/img/name.png"><span class='key1'>姓名:</span><span  class='value1'>{{users[0].name}}</span></li>
    			<li><img src="../../../static/img/phone.png"><span class='key1'>电话:</span><span  class='value1'>{{users[0].telephone}}</span></li>
    			<li><img src="../../../static/img/zhiwei.png"><span class='key1'>职位:</span><span  class='value1'>{{users[0].job}}</span></li>
    			<li><img src="../../../static/img/youxiang1.png"><span class='key1'>电邮:</span><span class='value1'>{{users[0].email}}</span></li>
    		</ul>
    		<!--<div @click="handleEdit(scope.$index, scope.row)"><img src="../../../static/img/bianji.png" ></div>-->
    		
    <el-button  class="el_button" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
  	</div>
  
					
				
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple-light">
     <div class='user_right'>
  		<p>新增工作人员(编辑工作人员)</p>
    	
	<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" >
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="telephone">
					<el-input  v-model="addForm.telephone"></el-input>
				</el-form-item>
				<el-form-item label="职业" prop="job">
			<el-input v-model="addForm.job"></el-input>
		</el-form-item>
				<el-form-item label="邮箱" prop='email'>
			<el-input  v-model="addForm.email" auto-complete="off"></el-input>
		</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer dialog_footer">
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
				<el-button @click="resetForm('addForm')">重置</el-button>
			</div>
</div>


  	</div>
  </el-col>
  </el-row>
  </el-tab-pane>
  <el-tab-pane label="技防信息">
  	<el-row>
  <el-col :span="12">
  	<div class="grid-content bg-purple">
  		<div class='protect' v-show='protectShow'>
  		<el-radio-group v-model="radio3">
      <el-radio-button label="全部" disabled></el-radio-button>
      <el-radio-button label="CK报警"></el-radio-button>
      <el-radio-button label="视频监控"></el-radio-button>
      <el-radio-button label="安防设施"></el-radio-button>
        <el-radio-button label="消防设施"></el-radio-button>
          <el-radio-button label="消防器材"></el-radio-button>
            <el-radio-button label="门禁系统"></el-radio-button>
    </el-radio-group>
    <!--table start-->
    <!--列表-->
		
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="bank" label="银行" width="200" sortable>
			</el-table-column>
			<el-table-column prop="netPoint" label="网点负责人" width="150" sortable>
			</el-table-column>
			<el-table-column prop="telephone" label="手机 " width="150" sortable>
			</el-table-column>
			<el-table-column prop="success" label="完成度" width="150" sortable>
			</el-table-column>
			<el-table-column  label="设备状态" min-width="100" >
				<template  scope='scope'>
					<el-button  type='primary' size='small' v-on:click='showToggle'>网点详情</el-button>
				</template>
			</el-table-column>
		</el-table>
    <!--table end-->
    </div>
  	</div>
  </el-col>
  <el-col :span="12">
  	<div class="grid-content bg-purple-light">
  	<div class='user_right' v-show='protectShow'>
  		<p>新增工作人员(编辑工作人员)</p>
    		<!--<el-form :model="users" status-icon  ref="users" label-width="100px" class="demo-ruleForm">

   <el-form-item label="设备姓名" prop="device">
    <el-input v-model="users.device"></el-input>
  </el-form-item>
   <el-form-item label="设备类型" prop="type">
    <el-input v-model="users.type"></el-input>
  </el-form-item>
   <el-form-item label="设备型号" prop="mode">
    <el-input v-model="users.mode"></el-input>
  </el-form-item>
  <el-form-item label="设备设备编号" prop="no">
    <el-input v-model="users.no"></el-input>
  </el-form-item>
  <el-form-item label="启用日期" prop="date">
    <el-input v-model="users.date"></el-input>
  </el-form-item>
  <el-form-item label="使用寿命" prop="life">
    <el-input v-model="users.life"></el-input>
  </el-form-item>
  </el-form-item class='el_form_item'>
    <el-button type="primary" @click="submitForm('users')" class='el_button'>保存</el-button>
    <el-button @click="resetForm('users')" class='el_buton'>重置</el-button>
  </el-form-item>
</el-form>-->
	<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="设备" prop="devicename">
					<el-input v-model="addForm.devicename" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="设备类型" prop="devicetype">
					<el-input  v-model="addForm.devicetype"></el-input>
				</el-form-item>
				<el-form-item label="设备型号" prop="devicemodel">
			<el-input v-model="addForm.devicemodel"></el-input>
		</el-form-item>
				<el-form-item label="资产编号" prop='assetNo'>
			<el-input  v-model="addForm.assetNo" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="启用日期" prop='beginTime'>
			<el-input  v-model="addForm.beginTime" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="使用寿命" prop='useLife'>
			<el-input  v-model="addForm.useLife" auto-complete="off"></el-input>
		</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer dialog_footer">
				<!--<el-button @click.native="addFormVisible = false">取消</el-button>-->
			
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
					<el-button @click="resetForm('addForm')">重置</el-button>
			</div>

  	</div>
  </div>
  </el-col>
</el-row>

<!--遮罩层-->
    	<div class='protect_child' v-show='isShow'>
    		<button v-on:click='back'>返回</button>
    		
    		<!--分页-->
    			<ul class='protect_sec'>
    				<li v-for='table in tableData' ><span>类型:</span><span>{{table.type}}</span></li>
    				<li v-for='table in tableData' ><span>资产编号:</span><span>{{table.assetNumber}}</span></li>
    				<li v-for='table in tableData' ><span>启用日期:</span><span>{{table.date}}</span></li>
    				<li v-for='table in tableData' ><span>型号:</span><span>{{table.modelNumber}}</span></li>
    				<li v-for='table in tableData' ><span>使用寿命:</span><span>{{table.useAge}}</span></li>
    				<li v-for='table in tableData' ><span>状态:</span><span>{{table.status}}</span></li>
    			</ul>
         <p></p>
<!--列表-->
		
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="beginTime" label="启用日期" width="270" sortable>
			</el-table-column>
			<el-table-column prop="describe" label="描述 " width="600" sortable>
			</el-table-column>
			<el-table-column prop="servicePerson" label="维修人员 " width="300" sortable>
			</el-table-column>
			
			<el-table-column prop="state" label="状态" width="200" sortable>
			</el-table-column>
			
		</el-table>

		

    	</div>
  </el-tab-pane>
</el-tabs>
		<!--tab end-->
	</div>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	//import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	import { getStationList, getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
	name:'baseinfo_list';
	export default{
		
		data(){
		  var Name = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名字不能为空'));
        }
        
      };
      
      var Place = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('职位不能为空'));
        }
        
      };
      var Phone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话不能为空'));
        }
        
      };
      var Device = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空'));
        }
        
      };
      var Type = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('类型不能为空'));
        }
        
      };
      var Model = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('型号不能为空'));
        }
        
      };
      var No = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('编号不能为空'));
        }
        
      };
      var Date = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('日期不能为空'));
        }
        
      };
      var Life = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('寿命不能为空'));
        }
        
      };
			return{
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
					//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
              editFormVisible: false,//编辑界面是否显示
					addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
					
					],
					email: [
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
					
					],
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: '',
					telephone:'',//电话
					job:'',//职位
					email:'',//邮箱
					devicename:'',//设备名称
					devicetype:'',//设备类型
					devicemodel:'',//设备型号
					assetNo:'',//资产编号
					beginTime:'',//启用日期
					useLife:'',//使用寿命
				},
				pointdetail:[
				{}
				],
				filters: {
					name: ''
				},
					protectShow:true,//第三tab元素默认显示
				isShow:false,//遮罩默认隐藏
				listLoading: false,
				users: [],//tab3表格
				radio3: 'CK报警',//这是第三tab页的头部默认单选
				ruleForm2: {//这是第二tab页的网点员工  新增数据
         name:'某某人',
         place:'技术岗',
         phone:'1515051590',
          email:'163@qq.com',
          device:'',
        },
        rules2: {
          name:[
            {validator:Name,trigger:'blur'}
          ],
          place:[
            {validator:Place,trigger:'blur'}
          ],
          phone:[
          {validator:Phone,trigger:'blur'}
          ],
       
            
        },
        	 tableData: [{//这是第三tab页的列表数据  这一部分数据也在关联到详情页的数据 
      	 	user:'名称',
      	 	type:'机器人',
      	 	assetNumber:'128888887',
          date: '2018-10-11',
          modelNumber: '387272',
          useAge:'80年',
          status:'良好',
         describe:'该机器良好状态',
         maintain:'陈某某'
        }],
        ruleForm2: {//这是第二tab页的网点员工  新增数据
         name:'某某人',
         place:'技术岗',
         phone:'1515051590',
          email:'163@qq.com',
          device:'',
          type:'',
          model:'',
          noe:'',
          date:'',
          life:''
        },
			}//return
		},//data
		methods:{
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
      resetForm(formName) {//重置
        this.$refs[formName].resetFields();
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
					this.users = res[1].data.stations;
					
					/*[
					
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
	showToggle:function(){//点击详情 遮罩显示隐藏
   	this.isShow=true;
   	this.protectShow=false;
   },
    back:function(){//在点击返回时 要同时让大元素显示  遮罩隐藏就行
   	this.protectShow=true;
   this.isShow=false;
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
					  resetForm(formName) {
        this.$refs[formName].resetFields();
     },
			selsChange: function (sels) {
				this.sels = sels;
			},
		},//methods
		mounted() {
			this.getUsers();
		}
	}
</script>

<style scoped>
	 .datalist{ height: 110px; min-width:1100px;margin:20px 20px;}
     .datalist ul{width: 100%;height: 110px;margin-top: 0px;}
      .datalist ul li{width:21%;height: 110px; float:left;margin-right: 40px; list-style: none;background-color: #DEDEDE;border-radius: 10px;}
      .datalist ul li img{float:left;line-height:100px;width: 100px;height: 110px;}
       .datalist ul li p:nth-child(2){font-size: 24px;font-weight: 500;color:red;margin-top: 10%;text-align: center;}
       .datalist ul li p:nth-child(3){font-size: 19px;font-weight: 300;text-align: center;margin-top: 4%;color: #008B8B;}
    .bm-view {width: 100%;height: 500px;top:0;}
    .baseinfo_list {
    	list-style: none;
    }
    .baseinfo_list li {
    	padding: 10px 0;
    	font-size: 16px;
    }
    .baseinfo_list li .key {
    	display: inline-block;
    	min-width: 170px;
    	color: #888888;
    }
    .editlist{position: relative;top: -350px;left: 400px;}
    .editlist img{
    	width: 40px;
    	height: 40px;
    }
     .baseinfo_list2 {
     	position: relative;
     	margin-top: 60px;
    	list-style: none;
    		border: 1px solid #DDDDDD;
    		height: 120px;
    		width: 90%;
    }
   
    .baseinfo_list2 li {
    	float: left;
    	
    	font-size: 16px;
    	height: 45px;
    	width: 45%;
    	
    	margin-top: 8px;
    }
  
    .baseinfo_list2  img{
    	position: absolute;
    	top: 10px;
    	width: 35px;
    	height: 35px;
    	
    }
 
    .baseinfo_list2 li .key1 {
    	display: inline-block;
    	
    	color: #888888;
    	margin: 0px 10px;
    	
    }
 .user_right p{font-size: 18px;padding-bottom: 20px;border-bottom: 2px solid #eeeeee;text-align:center;width:100%;}
 .user_right .el_button{margin-left: 200px;}
 .protect_child{position:relative;z-index:100;width: 1500px;height: 700px;background-color: white}
 .protect{position: relative;z-index: 99;}
 /*模态窗*/
	.el-table::before{height: 0;}
	.protect_sec {width: 680px;height: 100px;}
	.protect_sec  li{width:200px;float: left; margin-bottom: 10px; list-style: none;}
	.protect_sec  li span:nth-child(1){color: #008B8B;font-size: 16px;margin-right:5px;}
	.protect_sec  li span:nth-child(2){font-size: 16px;}
	.dialog_footer{position: relative;margin-left: 340px;}
	.baseinfo_edit img{ position:relative;width: 35px;height: 35px;}
	.el_button{position: absolute;top: 60px;left: 435px;}
</style>