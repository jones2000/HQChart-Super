<template>
	<view class="pageWrap" id="pageWrap">
		<view class="changeType" id="changeType" @click="popup" data-position="right">
		  <uni-icons type="gear" size="15"></uni-icons>
		  <text space="emsp"> 切换品种</text>
		</view>
		<view class="borderHor" id="borderHor"></view>
		<view class="btnGroup" id="typeBtnGroup">
		  <view class="btn" :class="{active:isShowMinuteChart}" @click="ChangeChartType('minutetype')">走势图</view>
		  <view class="btn" :class="{active:!isShowMinuteChart}" @click="ChangeChartType('klinetype')">K线图</view>
		</view>
		
		<view class="klineWrap">
			
			<view class="btnGroup" id="dayCountBtnGroup" v-show="isShowMinuteChart">
			  <view class="btn" :class="{active:indexMinute === index}" v-for="(item,index) in minuteDayCountAry" :key='item.ID' @click="ChangeMinuteDayCount(item.ID,index)">{{item.Name}}</view>
			</view>
			
		  <view class="periodRightWrap" id="periodRightWrap" v-show="!isShowMinuteChart">
		    <view class="btnGroup periodWrap">
		      <view class="btn" :class="{active:indexKPeriod === idx}" @click="ChangekPeriod(period.ID)" v-for="(period,idx) in kPeriodAry" :key='period.Name'>{{period.Name}}</view>
		      <view class="btn" :class="{active:indexPeroid !== -1}">
		        <picker @change="bindPeriodChange" :value="indexPeroid" :range-key='"Name"' :range="kMPeriodAry">
		          <view class="picker">
		            {{indexPeroid == -1 ? '分钟' : kMPeriod.Name}}
		          </view>
		        </picker>
		      </view>
		    </view>  
		    <view class="btnGroup rightWrap" v-show="isShowRight">
		      <view class="btn active">
		        <picker @change="bindRightChange" :value="indexRight" :range-key='"Name"' :range="rightAry">
		          <view class="picker">
		            {{rightAry[indexRight].Name}}
		          </view>
		        </picker>
		      </view>
		    </view>  
		  </view>
			
			<view style='background-color:#101010;'>
				<HQChartControl ref="HQChartCtrl" DefaultChart="{Type:'KLine'}" :DefaultSymbol="Symbol"> </HQChartControl>
			</view>
			
			<view class="btnGroup" id="minuteIndexBtnGroup" v-show="isShowMinuteChart">
			  <view class="btn" :class="{active:minuteIndexNumber === index}" v-for="(item,index) in minuteIndexAry" :key='index' @click="ChangeMinuteIndex(index, item)">{{item.Name}}</view>
			</view>
			
		  <view class="btnGroup" id="klineIndexBtnGroup" v-show="!isShowMinuteChart">
		    <view class="btn" :class="{active:KlineIndexNumber === kIndex}" v-for="(item,kIndex) in KlineIndexAry" :key='kIndex' @click="ChangeKlineIndex(kIndex,item)">{{item.Name}}</view>
		  </view>
			
		</view>
		
		<u-popup v-model="show" mode="right" width="100%">
			<stock-select @ChangeSymbol='ChangeSymbol' @closepopup='show=false'></stock-select>
		</u-popup>
		
		
	</view>
	
	<!-- <div>
		<div style='background-color:#101010;'>
			<HQChartControl ref="HQChartCtrl" DefaultChart="{Type:'KLine'}" :DefaultSymbol="Symbol"> </HQChartControl>
		</div>
	
		
		<div class="button-sp-area">
			<button class="mini-btn" type="default" size="mini" @click="ChangeMinutePeriod(1)">分时</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeMinutePeriod(5)">5D</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLinePeriod(0)">D</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLinePeriod(1)">W</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLinePeriod(5)">5M</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeKLinePeriod(6)">15M</button>
		</div>
		
		<div class="button-sp-area">
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('DJIA_100.usa')">道琼斯</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('600000_1.sh')">浦发银行</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('01211_116.hk')">比亚迪股份</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('HSI_100.hk')">恒生指数</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('USDCAD_119.FOREX')">美元兑加元</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('UDI_100.ET')">美元指数</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('CUM_113.SHFE')">沪铜主力</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('SCM_142.SHFE')">原油主力</button>
			<button class="mini-btn" type="default" size="mini" @click="ChangeSymbol('ZW00Y_103.CBOT')">小麦当月连续</button>
		</div>
		
	
	</div> -->
			
</template>

<script>
	

import H5_HQChart from '@/uni_modules/jones-hqchart2/js_sdk/umychart.uniapp.h5.js'


import HQChartControl from '@/uni_modules/jones-hqchart2/js_sdk/HQChartControl.vue'
import { EastMoney } from "./HQData.js"
import StockSelect from './components/stockSelect.vue'

function DefaultData() { }

DefaultData.GetMinuteOption=function()
{
    var option=
    {
        Type:'分钟走势图',   //创建图形类型
        //Type:'分钟走势图横屏',

        Windows: //窗口指标
        [
            {Index:"MACD"}
        ], 
                
        Symbol:'AAPL.usa',         
        IsAutoUpdate:true,          //是自动更新数据
        AutoUpdateFrequency:20000,
        DayCount:1,                 //1 最新交易日数据 >1 多日走势图
        IsShowRightMenu:false,      //是否显示右键菜单
        CorssCursorTouchEnd: true,       //手离开屏幕 隐藏十字光标
        IsFullDraw:true,                //不是使用缓存每次都重绘

        CorssCursorInfo:{  Left:2, Right:2 },
    
        MinuteLine:
        {
            IsDrawAreaPrice:true,      //是否画价格面积图
            IsShowAveragePrice:true,   //不显示均线
        },
    
        Border: //边框
        {
            Left:1,    //左边间距
            Right:1,     //右边间距
            Top:25,
            Bottom:25,
            AutoRight:{ Blank:10, MinWidth:40 },
            AutoLeft:{ Blank:10, MinWidth:40 },
        },
                
        Frame:  //子框架设置
        [
            { SplitCount:5 },
            { SplitCount:3 },
            { SplitCount:3 },
        ],

        ExtendChart:    //扩展图形
        [
            {Name:'MinuteTooltip' }  //手机端tooltip
        ]
    };

    return option;
}

DefaultData.GetMinuteDayMenu=function()
{
    var data=
    [
        {Name:'1日', ID:1},
        {Name:'2日', ID:2},
        {Name:'3日', ID:3},
        {Name:'4日', ID:4},
        {Name:'5日', ID:5},
    ];

    return data;
}

DefaultData.GetKLineOption=function()
{
    var option=
    {
        Type:'历史K线图',   //创建图形类型

        Windows: //窗口指标
        [
            {Index:"MA",    },
            {Index:"VOL",    },
            {Index:"MACD",   }
        ], 
                
        Symbol:'000001.sh',         
        IsAutoUpdate:true,          //是自动更新数据
        AutoUpdateFrequency:15000,
        IsApiPeriod:true,
        IsShowRightMenu:false,      //是否显示右键菜单
        IsFullDraw:true,                //不是使用缓存每次都重绘
        CorssCursorTouchEnd:true,
        IsClickShowCorssCursor:true,

        KLine:
        {
            DragMode:1,                 //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
            Right:0,                    //复权 0 不复权 1 前复权 2 后复权
            Period:0,                   //周期 0 日线 1 周线 2 月线 3 年线 
            MaxReqeustDataCount:1000,   //数据个数
            PageSize:30,               //一屏显示多少数据
            KLineDoubleClick:false,              //双击分钟走势图
            IsShowTooltip:false,                 //是否显示K线提示信息
            DrawType:0,    
            RightSpaceCount:2,       
        },

        CorssCursorInfo:{  Left:0, Right:1 },
    
        KLineTitle: //标题设置
        {
            IsShowName:true,       //不显示股票名称
            IsShowSettingInfo:true //不显示周期/复权
        },
    
        Border: //边框
        {
            Left:2,    //左边间距
            Right:20,     //右边间距
            Top:25,
            Bottom:25,
            AutoRight:{ Blank:10, MinWidth:40 },
        },
                
        Frame:  //子框架设置
        [
            { SplitCount:5, IsShowLeftText:false },
            { SplitCount:3, IsShowLeftText:false },
            { SplitCount:3, IsShowLeftText:false },
        ],

        ExtendChart:    //扩展图形
        [
            { Name:'KLineTooltip' },  //手机端tooltip
        ]
    };

    return option;
}

DefaultData.GetKLineDayPeriodMenu=function()
{
    var data=
    [
        {Name:"日线", ID: 0 },
        {Name:"周线", ID: 1 },
        {Name:"月线", ID: 2 },
    ];
    return data;
}

DefaultData.GetKLineRightMenu=function()
{
    var data=
    [
        {Name:"不复权", ID: 0 },
        {Name:"前复权", ID: 1 },
        {Name:"后复权", ID: 2 },
    ];

    return data;
}

DefaultData.GetKLineMinutePeriodMenu=function()
{
    var data=
    [
        {Name:"5分钟", ID: 5 },
        {Name:"15分钟", ID: 6 },
        {Name:"30分钟", ID: 7 },
        {Name:"60分钟", ID: 8 },
    ];
    return data;
}

DefaultData.GetMinuteIndexMenu=function()
{
    var data=
    [
        {Name:'MACD',   ID:"MACD",  WindowIndex:2 },
        {Name:'KDJ',    ID:"KDJ",   WindowIndex:2},
        {Name:'DMI',    ID:"DMI",   WindowIndex:2},
        {Name:'ROC',    ID:"ROC",   WindowIndex:2},
    ];

    return data;
}

DefaultData.GetKLineIndexMenu=function()
{
    var data=
    [
        {Name:'MA',     ID:"MA",    WindowIndex:0 },
        {Name:'BOLL',   ID:"BOLL",  WindowIndex:0 },
        {Name:'MACD',   ID:"MACD",  WindowIndex:1 },
        {Name:'KDJ',    ID:"KDJ",   WindowIndex:1},
        {Name:'DMI',    ID:"DMI",   WindowIndex:1},
        {Name:'ROC',    ID:"ROC",   WindowIndex:1},
		{Name:"测试",   ID:"index_test" }
    ];

    return data;
}
	
export default 
{
	components: { 
		HQChartControl,
		StockSelect
	},
	
	data()
	{
		let data=
		{
			Symbol:'AAPL_105.usa',
			ChartWidth:350,
			ChartHeight:500,
			// KlineChartHeight:500,
			
			show: false,
			duration: 300,
			position: 'right',
			round: false,
			overlay: true,
			customStyle: '',
			overlayStyle: '',
			subPageIndex: 0,
			isShowMinuteChart: true,
			minuteDayCountAry: DefaultData.GetMinuteDayMenu(),
			indexMinute: -1,
			kPeriodAry: DefaultData.GetKLineDayPeriodMenu(),
			indexKPeriod: -1,
			kMPeriodAry: DefaultData.GetKLineMinutePeriodMenu(),
			kMPeriod: {},
			indexPeroid: -1,
			rightAry: DefaultData.GetKLineRightMenu(),
			indexRight: 1,
			minuteIndexAry:DefaultData.GetMinuteIndexMenu(),
			minuteIndexNumber: -1,
			KlineIndexAry:DefaultData.GetKLineIndexMenu(),
			KlineIndexNumber: -1,
			Width: 0,
			Height: 0,
			isShowRight: true,
			
			hqchartObj: ''
		};
		
		return data;
	},
	
	onReady()
	{
		EastMoney.HQData.ChangeStyle();	//黑色风格
		EastMoney.HQData.SetMinuteChartCoordinate();
		this.CalculateChartSize( { OnFinished:(res)=>
			{
				this.$nextTick(()=>
				{
					this.CreateHQChart(); 
				});
			}
		});
		
	},
	
	onShow()
	{
		let hqchartCtrl=this.$refs.HQChartCtrl;
		if (hqchartCtrl && hqchartCtrl.GetJSChart()==null)
		{
			this.CalculateChartSize( { OnFinished:(res)=>
				{
					this.$nextTick(()=>
					{
						this.CreateHQChart(); 
					});
				}
			});
		}
	},
	
	onHide()
	{
		this.ClearHQChart();
	},
	
	onUnload()
	{
		this.ClearHQChart();
	},
	
	methods:
	{
		CalculateChartSize(obj)
		{
			const res = uni.getSystemInfoSync();				
			var width=res.windowWidth;
			var height=res.windowHeight;
			console.log(`[APP::onShow] Width=${width}  Height=${height}`);
					
			const query = uni.createSelectorQuery().in(this);
			const p1 = new Promise(resolve => {
				query.select('#changeType').boundingClientRect(data => {
					// console.log(data)
					resolve(data)
				}).exec()
			})
			const p2 = new Promise(resolve => {
				query.select('#borderHor').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
			const p3 = new Promise(resolve => {
				query.select('#typeBtnGroup').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
			const p4 = new Promise(resolve => {
				query.select('#dayCountBtnGroup').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
			const p5 = new Promise(resolve => {
				query.select('#minuteIndexBtnGroup').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
			
			const p4k = new Promise(resolve => {
				query.select('#periodRightWrap').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
			const p5k = new Promise(resolve => {
				query.select('#klineIndexBtnGroup').boundingClientRect(data => {
					resolve(data)
				}).exec()
			})
					
			Promise.all([p1,p2,p3,p4,p5,p4k,p5k])
			.then(([res1,res2,res3,res4,res5,res4K,res5K]) => 
			{
				var tagHeight=[];
				tagHeight["p1"]=res1.height;
				tagHeight["p2"]=res2.height;
				tagHeight["p3"]=res3.height;
				tagHeight["p4"]=res4.height;
				tagHeight["p5"]=res5.height;
				tagHeight["p4K"]=res4K.height;
				tagHeight["p5K"]=res5K.height;
				
				if(this.isShowMinuteChart)
				{
					this.ChartWidth = width;
					this.ChartHeight = height - tagHeight["p1"] - tagHeight["p2"] - tagHeight["p3"] - tagHeight["p4"] - tagHeight["p5"];
				}
				else
				{
					this.ChartWidth = width;
					this.ChartHeight = height - tagHeight["p1"] - tagHeight["p2"] - tagHeight["p3"] - tagHeight["p4K"] - tagHeight["p5K"];
				}
				
				console.log(`[APP::onShow] ChartWidth=${this.ChartWidth}  ChartHeight=${this.ChartHeight}`);
				
				if (obj.OnFinished) obj.OnFinished();
			});
		},
		
		OnSize()
		{
			
		},
		
		popup() 
		{
			this.show = true
		},
		
		ChangeChartType(type) 
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			switch(type)
			{
			case 'minutetype': 
				this.isShowMinuteChart = true
				if (hqchartCtrl.IsMinuteChart()) return;
				
				break;
			case 'klinetype': 
				this.isShowMinuteChart = false
				if (hqchartCtrl.IsKLineChart()) return;
				
				break;
			}
			
			this.$nextTick(()=>
			{
				this.ClearHQChart();
				this.CalculateChartSize( { OnFinished:(res)=>
					{
						this.$nextTick(()=>
						{
							this.CreateHQChart(); 
						});
					}
				});
			});
		},
		
		ChangeMinuteDayCount(id, index) 
		{ //切分时图天数
			var dayCount=parseInt(id);
			this.ChangeMinutePeriod(dayCount)
		},
		
		
		ChangekPeriod(id) 
		{
			this.ChangeKLinePeriod(parseInt(id))
		},
		
		
		bindPeriodChange(e) 
		{
			// console.log('分钟周期：', e)
			this.indexPeroid = e.detail.value;
			this.indexKPeriod = -1;
			this.kMPeriod=this.kMPeriodAry[e.detail.value];
			var period = this.kMPeriodAry[e.detail.value].ID;
			this.ChangeKLinePeriod(period)
		},
		
		bindRightChange(e) {
			this.indexRight = e.detail.value
			const right = this.rightAry[this.indexRight].ID
			this.ChangeKLineRight(right)
		},
		
		
		ChangeKlineIndex(index, item) 
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			if (item.ID=="index_test") 
			{
				this.ExecuteNonUIIndex();	//计算指标
				return;
			}
			
			if (hqchartCtrl) hqchartCtrl.ChangeKLineIndex(item.WindowIndex, item.ID);
		},
		
		ChangeMinuteIndex(index, item) 
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			if (hqchartCtrl)
			{
				var jsChart=hqchartCtrl.GetJSChart();
				if (jsChart) jsChart.ChangeIndex(item.WindowIndex, item.ID);
			}
		},
		
		CreateHQChart()
		{
			var chartHeight=this.ChartHeight;
			// console.log('图高度：',chartHeight)
			let hqchartCtrl=this.$refs.HQChartCtrl;
			if (this.isShowMinuteChart) 
			{
				hqchartCtrl.ChartType="Minute";
				hqchartCtrl.Minute.Option=DefaultData.GetMinuteOption();
			}
			else 
			{
				hqchartCtrl.ChartType="KLine";
				hqchartCtrl.KLine.Option=DefaultData.GetKLineOption();
			}
			
			hqchartCtrl.NetworkFilter=this.NetworkFilter;
			hqchartCtrl.SetSize(this.ChartWidth,chartHeight);
			hqchartCtrl.OnSize();
			hqchartCtrl.CreateHQChart();
		},
		
		ClearHQChart()
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			if (hqchartCtrl) hqchartCtrl.ClearChart();
		},
		
		ChangeMinutePeriod(days)
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			
			hqchartCtrl.ChangeMinutePeriod(days);
		},
		
		ChangeKLinePeriod(period)
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			
			hqchartCtrl.ChangeKLinePeriod(period);
		},
		
		ChangeKLineRight(right)
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			
			hqchartCtrl.ChangeRight(right);
		},
		
		ChangeSymbol(symbol)
		{
			let hqchartCtrl=this.$refs.HQChartCtrl;
			console.log('code:', symbol);
			
			this.isShowRight=EastMoney.HQData.IsEnableRight(null, symbol);
			hqchartCtrl.ChangeSymbol(symbol);
		},
		
		NetworkFilter(data, callback)
		{
			console.log('[App::NetworkFilter] data', data);
			
			switch(data.Name) 
			{
				//分时图数据对接
				case 'MinuteChartContainer::RequestMinuteData':
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				case "MinuteChartContainer::RequestHistoryMinuteData":
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
	
				case 'KLineChartContainer::RequestHistoryData':                 //日线全量数据下载
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				 case 'KLineChartContainer::RequestRealtimeData':                //日线实时数据更新
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				case 'KLineChartContainer::RequestFlowCapitalData':             //流通股本
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				case 'KLineChartContainer::ReqeustHistoryMinuteData':           //分钟全量数据下载
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				case 'KLineChartContainer::RequestMinuteRealtimeData':          //分钟增量数据更新
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
					
				case "JSSymbolData::GetSymbolData":		//无图形指标计算
					EastMoney.HQData.NetworkFilter(data, callback);
					break;
				
			}   
		},
		
		
		
		/////////////////////////////////////////////////////////////////////
		// 独立指标计算,只算数据, H5才有。
		//
		//
		////////////////////////////////////////////////////////////////////
		
		ExecuteNonUIIndex()
		{
			var obj=
			{
				Name:'测试', ID:'11111', 
				Args:[ { Name:'M1', Value:5}, { Name:'M2', Value:10 }, { Name:'M3', Value:20} ],
				Script: //脚本
					'MA1:MA(CLOSE,M1);\n'+
					'MA2:MA(CLOSE,M2);\n'+
					'MA3:MA(CLOSE,M3);',
				ErrorCallback:this.ExecuteNonIndexError,
				FinishCallback:this.ExecuteNonIndexFinish,
				NetworkFilter:this.NetworkFilter
			};
			
			var indexConsole=new H5_HQChart.ScriptIndexConsole(obj);

			var stockObj=
			{
				HQDataType:0,	//K线图
				Stock: {Symbol:'600000_1.sh'},
				Request: { MaxDataCount: 500, MaxMinuteDayCount:5 },
				Period:5 , Right:1,
			};

			indexConsole.ExecuteScript(stockObj);
		},
		
		ExecuteNonIndexError(error)
		{
			console.log('[ExecuteNonIndexError] Error: ',error)
		},
		
		ExecuteNonIndexFinish(data, jsExectute)
		{
			console.log('[ExecuteNonIndexFinish] data, jsExectute ',data, jsExectute)
		},
		
	}
}
</script>

<style>
	.pageWrap{
		font: 28rpx 'Microsoft Yahei';
		color: #333;
		margin: 0;
		padding: 0;
		height: 100%;
	}
	.changeType{
	  height: 80rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border-top: 1rpx solid #ededed;
	  border-bottom: 1rpx solid #ededed;
	  box-sizing: border-box;
	}
	
	.borderHor{
	  height: 20rpx;
	  background-color: #f2f2f2;
	}
	
	.btnGroup{
	  border-top: 1rpx solid #ededed;
	  border-bottom: 1rpx solid #ededed;
	  height: 70rpx;
	  display: flex;
	  box-sizing: border-box;
	}
	
	.btnGroup .btn {
	  flex: 1;
	  box-sizing: border-box;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  border-right: 1rpx solid #ededed;
	}
	
	.btnGroup .btn:last-child{
	  border-right: none;
	}
	
	.btnGroup .btn.active {
	  color: rgb(79, 79, 241);
	}
	
	.periodRightWrap{
	  display: flex;
	  justify-content: space-between;
	  border-top: 1rpx solid #ededed;
	  border-bottom: 1rpx solid #ededed;
	}
	
	.periodWrap{
	  width: 500rpx;
	  border-right: 1rpx solid #ededed;
	}
	
	.rightWrap{
	  width: 200rpx;
	  border-left: 1rpx solid #ededed;
	}
	
	.btn.active .picker {
	  color: rgb(79, 79, 241);
	}
</style>
