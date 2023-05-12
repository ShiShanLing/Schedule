import * as echarts from '../../tools/ec-canvas/echarts';
import {queryWeightData, WeightInfo} from '../Services/weight-data';
import {dateFormat, dateStrFormatTimestamp} from '../../tools/date-tools'

  //体重走向
  export function initWeightDirectionCharts(canvas:any, width:any, height:any, dpr:any) {

    let result = queryWeightData(null);

    let startIndex = 0;
    startIndex
    if (result.length > 7 ){
      startIndex = result.length-7;
    }

    let  timeList = [];
    let  weightList_W = [];
    let  weightList_B = [];

    //需要三个数组 日期 空腹体重 睡前体重
    for(let i = startIndex; i < result.length;i++){
        let WModel = result[i];
        timeList.push(WModel.dateStr);
        weightList_W.push(WModel.wakeUpWeight);
        weightList_B.push(WModel.beforeSleepWeight);
    }



    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);
    var option = {
      title: {
        text: '体重走向',
        left: 'left'
      },
      legend: {
        data: ['早晨空腹', '睡前'],
        top: 30,
        left: 'center',
        z: 100
      },
  
      grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeList,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: '早晨空腹',
        type: 'line',
        smooth: true,
        data: weightList_W
      }, {
        name: '睡前',
        type: 'line',
        smooth: true,
        data: weightList_B
      }]
    };
    chart.setOption(option);
    return chart;
  }
  const app = getApp();
  //微信运动
  export function  initWXExerciseDirectionCharts(canvas:any, width:any, height:any, dpr:any) {
    
    let stepList:{timestamp: number, step: number}[] = app.globalData.stepList;
    console.log("initWXExerciseDirectionCharts==", stepList);
    
    let beginIndex = 0;
    if (stepList.length > 7){
      beginIndex = stepList.length-7;
    }    
    //需要时间和步数两个数组
    let timeList = [];
    let stepNumList = [];
    
    for (let i = beginIndex;i < stepList.length;i++ ){
      let tempData  = stepList[i];
      let newDate = new Date(tempData.timestamp*1000);
      let MMDD = dateFormat(newDate, "MMDD");
      console.log(`newDate===${newDate} MMDD===${MMDD}`);
      timeList.push(MMDD);
      stepNumList.push(tempData.step);
    }

    


    console.log("timeList==", timeList);
    console.log("stepNumList==", stepNumList);
    



    //数据大概有60条.
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);
    var option = {
      title: {
        text: '微信运动(近7天)',
        left: 'left'
      },
      grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeList,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: '步数',
        type: 'line',
        smooth: true,
        data: stepNumList
      }]
    };
    chart.setOption(option);
    if (!app.globalData.stepIsLoadEnd){
      chart.showLoading({
        text:"数据获取中."
      })
    } 

    return chart;
  }
