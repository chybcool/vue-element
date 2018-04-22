import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'//原来./views/Main.vue'
import Table from './views/nav1/Table.vue'//原来的/views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'//原来 的form单页面/views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

//网点管理下路由
import StationList from './views/nav1/StationList.vue'
import Map from './views/nav1/map.vue'
import NewPoint from './views/nav1/newpoint.vue'
import ListDetail from './views/nav1/ListDetail.vue'


//日常安防
import Routine from './views/nav2/safety.vue'
import RoutineDetail from './views/nav2/safetydetail.vue'
//矛盾纠纷
import Contradiction from './views/nav3/contradiction.vue'
import NewContradiction from './views/nav3/newcontradiction.vue'
import ContradictionCount from './views/nav3/contradictioncount.vue'
//突发事件
import EventManager from './views/nav4/eventmanager.vue'//事件管理
import EventCount from './views/nav4/eventcount.vue'//事件统计

//安全检查
import CheckList from './views/nav5/checklist.vue'
import StartCheck from './views/nav5/startcheck.vue'
//行政许可
import ApplyStart from './views/nav6/applystart.vue'
import ApplyReview from './views/nav6/applyreview.vue'
import ApplyResult from './views/nav6/applyresult.vue'


const routes = [
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
];

export default routes;
