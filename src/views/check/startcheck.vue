<template>
	<div>
	
<p class='startcheck'>发起安全检查</p>
	<span class='project'>检查项目</span>
	
 <!-- <el-checkbox-button :indeterminate="isIndeterminate"  @change="handleCheckAllChange" v-model="checkAll">全选</el-checkbox-button>-->
  <el-checkbox-group  class="el_checkbox_group" v-model="checkedCities" @change="handleCheckedCitiesChange" >
    <el-checkbox class='el_checkbox_button'  v-for="city in cities" :label="city" :key="city" border>{{city}}</el-checkbox>
  </el-checkbox-group>

<div class="block">

    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="至"
      start-placeholder="开始"
      end-placeholder="结束"
      size="larger"
     >
    </el-date-picker>
  </div>
  <template>
  	<div class='person'>
  <el-select
  	
    v-model="value10"
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <!--el-select里本来有一个multiple 这个东西本来是能够在输入框里也多显示标签，但加了它，在外面v-model绑定数据会成了数组-->
     <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <div class='select'>
 <span>检查负责人</span>
 <ul class='personul' v-model="value10" ref="value10" >
 	<li>{{value10}}</li>
 	<li>{{value10}}</li>
 	</ul>
 </div>
 </div>
</template>
<div class="el_button">
 <el-button type="primary" @click="submitForm('value10')">提交</el-button>
    <el-button @click="resetForm('value10')">重置</el-button>
    </div>


	</div>
</template>

<script>
	 const cityOptions = ['中国工商银行南京分行', '中国工商银行北京分行', '中国工商银行上海分行', '中国工商银行深圳分行'];
	export default{
		
		data(){
			return{
			checkAll: false,
        checkedCities: [],
        cities: cityOptions,
        isIndeterminate: true,
        options5: [{
          value: 'HTM4',
          label: 'HTM4'//label是下拉里的数值
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value6:[],
        value10: [],
         dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        }
			}//return结束
			
		},//data结束
		  methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
       addDomain() {//添加
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      },
      removeDomain(item) {//重置
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
    }
	}
</script>

<style scoped>
	.startcheck{width: 100%;padding-bottom: 20px;border-bottom: 2px solid darkgray;}
.inspect{height: 40px;width: 100%;margin: 20px 50px;border-bottom: 2px solid #EEEEEE;}
.inspect img{width: 15px;height: 15px;margin-top: 12px;}
	.inspect span {line-height: 40px; margin-right: 20px;font-size: 16px;}
	.el_checkbox_button{margin: 3px 80px;}
.el-checkbox-button{position: relative;left: 100px;}
	.project{font-size: 16px;margin: 50px 50px 0px 50px;color: #888888;}
	.el-checkbox-group{clear:both;width: 290px;}
   .el-select{margin: 0 0 0px 50px;}
	.el-range-editor.el-input__inner{width: 380px;margin:20px 0px 20px 10px; }
	.select{width: 260px;height: 30px; margin:10px 0px 20px 50px;}
	.select span:nth-child(1){font-size: 16px;line-height: 30px;margin-right: 20px;}
	.personul{font-size: 16px;background-color: #DEDEDE;border-radius: 3px;padding: 5px 2px;}
     .personul li{list-style: none;}
	.el_button{margin: 10px 0px 0px 80px;}
	.demo-dynamic .el-button{float: right;}
  
.block{position: relative;top: 50px;left: 50px;}
.el_checkbox_group{border: 1px solid #DDDDDD;position: relative;top: 30px;left: 50px;}
.el_checkbox_button{margin: 3px 10px;padding-right:100px;}
.el-date-picker{width: 290px;}
.person{position: relative;left: 580px;top: -100px;}
.person span{font-size: 15px;color: #DEDEDE;}
</style>