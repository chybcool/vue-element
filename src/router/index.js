/**

import Vue from 'vue'
import Router from 'vue-router'
import RightView from '@/components/rightview.vue'
import RightView1 from '@/components/rightview1.vue'
import Map from '@/components/gailan/map.vue'
//import LieBiao from '@/components/liebiao/liebiao.vue'
import List from '@/components/liebiao/list.vue'
import ListDetail from '@/components/liebiao/listdetail.vue'
import Safety from '@/components/safety/safety.vue'
import SafetyDetail from '@/components/safety/safetydetail.vue'
import InspectList from '@/components/inspect/inspectlist.vue'
import InspectBegin from '@/components/inspect/inspectbegin.vue'
import ConManage from '@/components/contradict/conmanage.vue'
import NewCon from '@/components/contradict/newcon.vue'
import ConCount from '@/components/contradict/concount.vue'
import EventManage from '@/components/event/eventmanage.vue'
import EventCount from '@/components/event/eventcount.vue'


export default new Router({
  routes: [
    {path: '/',name:'rightview',component:RightView},
    {path:'/',name:'rightview1',component:RightView1},
    {path:'/gailan',name:'gailan',component:Map},
    {path:'/list',name:'list',component:List},
    {path:'/list/detail',name:'list.detail',component:ListDetail},
    {path:'/safety',name:'safety',component:Safety},
    {path:'/safety/safetydetail',name:'safety.detail',component:SafetyDetail},
    {path:'/inspect/inspectlist',name:'inspectlist',component:InspectList},
    {path:'/inspect/inspectbegin',name:'inspectbegin',component:InspectBegin},
    {path:'/contradict/conmanage',name:'conmanage',component:ConManage},//矛盾管理
    {path:'/contradict/newcon',name:'newcon',component:NewCon},//新建矛盾
    {path:'/contradict/concount',name:'concount',component:ConCount},//矛盾统计
    {path:'/event/eventmanage',name:'eventmanage',component:EventManage},
    {path:'/event/eventcount',name:'eventcount',component:EventCount},
    
  ]
})
**/

import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'//原来./views/Main.vue'
import Table from '../views/station/Table.vue'//原来的/views/nav1/Table.vue'  station
import Form from '../views/station/Form.vue'//原来 的form单页面/views/nav1/Form.vue'
import user from '../views/station/user.vue'
import Page4 from '../views/routine/Page4.vue'
import Page5 from '../views/routine/Page5.vue'
import Page6 from '../views/contradiction/Page6.vue'
import echarts from '../views/charts/echarts.vue'

//网点管理下路由
import StationList from '../views/station/StationList.vue'
import Map from '../views/station/map.vue'
import NewPoint from '../views/station/newpoint.vue'
import ListDetail from '../views/station/ListDetail.vue'


//日常安防
import Routine from '../views/routine/safety.vue'
import RoutineDetail from '../views/routine/safetydetail.vue'
//矛盾纠纷
import Contradiction from '../views/contradiction/contradiction.vue'
import NewContradiction from '../views/contradiction/newcontradiction.vue'
import ContradictionCount from '../views/contradiction/contradictioncount.vue'
//突发事件
import EventManager from '../views/event/eventmanager.vue'//事件管理
import EventCount from '../views/event/eventcount.vue'//事件统计

//安全检查
import CheckList from '../views/check/checklist.vue'//s
import StartCheck from '../views/check/startcheck.vue'
//行政许可
import ApplyStart from '../views/apply/applystart.vue'
import ApplyReview from '../views/apply/applyreview.vue'
import ApplyResult from '../views/apply/applyresult.vue'

Vue.use(Router)

export default new Router({
	routes : [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '网点管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/map', component: Map, name: '网点概览'},
            { path: '/station_list', component: StationList, name: '网点列表' },
            { path: '/newpoint', component: NewPoint, name: '新增网点' },
             { path: '/station_list/listdetail', component: ListDetail, name: '网点详情',hidden:true},
           
            { path: '/form', component: Form, name: 'Form' ,hidden:true},
            { path: '/user', component: user, name: '列表',hidden:true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '日常安防',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/routine', component: Routine, name: '日常安防'},
          
            { path: '/routine/routinedetail', component: RoutineDetail,name:'安防详情' ,hidden:true},
            
           
            
            { path: '/page5', component: Page5, name: '页面5',hidden:true }
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '矛盾纠纷',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/contradiction', component: Contradiction, name: '矛盾信息' },
            { path: '/newcontradiction', component: NewContradiction, name: '新建矛盾信息' },
            { path: '/contradictioncount', component: ContradictionCount, name: '矛盾统计' },
             { path: '/page6', component: Page6, name: 'page6' ,hidden:true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '突发事件',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/eventmanager', component: EventManager, name: '事件管理' },
            { path: '/eventcount', component: EventCount, name: '事件统计' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '安全检查',
        iconCls: 'fa fa-address-card',
        children: [
             { path: '/checklist', component: CheckList, name: '检查列表' },
            
            { path: '/startcheck', component: StartCheck, name: '发起检查' },
            { path: '/page6', component: Page6, name: 'page6',hidden:true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '行政许可',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/applystart', component: ApplyStart, name: '发起申请' },
            { path: '/applyreview', component: ApplyReview, name: '行政审批' },
             { path: '/applyresult', component: ApplyResult, name: '审批结果' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '信息发布',
        iconCls: 'fa fa-address-card',
        hidden:true,
        children: [
            { path: '/page6', component: Page6, name: '发布信息' },
            { path: '/page6', component: Page6, name: '信息管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        hidden:true,
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
]
})
