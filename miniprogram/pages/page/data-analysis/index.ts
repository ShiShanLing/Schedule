// pages/page/data-analysis/index.ts
import {addTodayWeightData} from '../../Services/weight-data'


Component({
	/**
	 * 组件的属性列表
	 */
	properties: {

	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {

  },
  lifetimes:{
    ready(){
      addTodayWeightData();
    }
  }
  
})
