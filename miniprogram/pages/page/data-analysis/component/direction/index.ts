// pages/page/data-analysis/component/direction/index.ts

import {initWeightDirectionCharts} from '../../../../Services/echarts-data'

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
    ec: {
      onInit: initWeightDirectionCharts
    }



  },
  
	ready() {
   
  },
	/**
	 * 组件的方法列表
	 */
	methods: {

	}
})



