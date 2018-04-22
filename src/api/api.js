import axios from 'axios';
import config from '../config'
import router from '../router'

let base = config.API_ROOT;

export const login = params => {
	console.log(`${base}/token`);
	//return axios.get(`http://www.baidu.com`)
	return axios.post(`${base}/token`, params)
};
export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

//export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };





export const getUserListPage = params => {
	let a = {
		total: 50,
		stations: [
			{ id:'1',
				name:'江苏银行南通分行',
				area: '崇川区',//区域
				manager:'张三',
				security_officer:'李四',
				telephone: '12345678',
				state:'已完成',
				beginTime:'2018-3-1',//开始时间
				endTime:'2020-2-20',//结束时间
				netPoint:'中国工商银行南京分行',//网点
				pointPerson:'网点负责人',//网点负责人
				checkPerson:'检查负责人',//检查负责人
				eventType:'事件类型',//事件类型
				submitPerson:'提交人',//提交人
				bank:'中国人民银行',//银行
				success:'完成80%',//完成度
				describe:'该 机器访问完全 正常，无需要再维修',//描述
				servicePerson:'维修人员',//维修人员
				submitTime:'2019-10-10',//提交时间
				text:'有关申请内容区域',//内容
				proposer:'申请者',//申请者
				objection:'处理意见',//处理意见
				applyPerson:'审批人',//审批人
				desc:'内容',//内容
				objection:'意见',//意见
				address:'地址',//地址
				safeNo:'合格证取得时间',//安全防范合格证号
				getTime:'合格证取得时间',//合格证取得时间
				power:'搬迁权限情况',//搬迁权限情况
				life:'使用寿命',//使用寿命
				mode:'设备型号',//
				email:'@163.com',//邮箱
				businessbefore:'营业前',//营业前
				businessmiddle:'营业中',//营业 中
				businessafter:'营业终',//营业终
				patrol:'巡查',//巡查
				success:'完成度',//完成度
				job:'职位',//职位
				routinebefore:'营业前常规',//营业前常规
				routinemiddle:'营业中常规',//营业中常规
				patrol:'巡查',//巡查
				visit:'来访',//来访
				bankcount:'后场',//后场
				routineafter:'营业终常规',//营业终常规
				contradictionDes:'矛盾描述',//矛盾描述
				litigantName:'当事人姓名',//当事人姓名
				litigantPhone:'当事人电话',//当事人电话
				contradictionHand:'矛盾处理',//矛盾处理
				processed:'已处理/未处理',//处理状态
				submitPerson:'提交人',//提交人
			}		
		]

		
	};

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([50, {
            data: a
          }]);
        }, 1000);
      });
};

// 显示提示框
export const showMsg = (that, close, msg, type) => {
  that.$message({
    showClose: close,
    message: msg,
    type: type
  })
}

// doLogin
export const doLogin = (that, data) => {
	
  login(data)
  .then(res => {
  	console.log(JSON.stringify(res));
  	console.log(res.data.status);
    if (res.data.status === 'success') {
      sessionStorage.setItem('token', res.data.token)
      //sessionStorage.setItem('account', res.data.data.username)
      //sessionStorage.setItem('uid', res.data.data._id)
      //store.dispatch('showLogin')
      showMsg(that, true, '登录成功', 'success')
      router.push({path: '/'})
    } else {
      showMsg(that, true, '登录失败，账号或密码错误', 'error')
    }
  })
  .catch(err => {
    console.log(err)
  })
}
