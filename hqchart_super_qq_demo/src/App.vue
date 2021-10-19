<template>
    <div class="box">
        <div class="left">
            <el-menu
                default-active="AAPL.usa"
                class="el-menu-vertical-demo"
                background-color="#191919"
                text-color="#dee4eb"
                active-text-color="#ff6900"
                :unique-opened="true"
                @select='handleSelect'
                @open="handleOpen"
                @close="handleClose">
                <el-submenu v-for="item in NavMenuAry" :key="item.Title" :index="item.Title">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{item.Title}}</span>
                </template>
                    <el-menu-item v-for="subItem in item.Sub" :key='subItem.Code' :index="subItem.Code">{{subItem.Name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>

        <div class="right" ref="right">
            <div class="rightTab" ref="rightTab">
                <div class="btn showMinute" :class="{active:chartType == 'minute'}" @click="changeRightContent('minute')">分时图</div>
                <div class="btn showKline" :class="{active:chartType == 'kline'}" @click="changeRightContent('kline')">K线图</div>
            </div>
            <div class="rightContent" ref='rightContent'>
                <div class="contentBox" v-show='chartType == "minute"'>
                    <div class="periodWrap" ref='minute_periodWrap' >
                        <div class="btnGroup">
                            <div class="btn" :class="{active: MinuteDayIndex == index}" v-for="(item,index) in MinuteDayMenu" :key="item.ID" @click="OnClickMinuteDayMenu(index,item)">{{item.Name}}</div>
                        </div>
                    </div>
                    
                    <div class='hqchart' id='hqchart_minute' ref='kline'></div>

                    <div class="indexWrap" ref="minute_indexWrap">
                        <div class="btnGroup">
                            <div class="btn"  v-for="(indexName) in MinuteIndexMenu" :key="indexName.ID" @click="changeChartIndex(indexName.ID)">{{indexName.Name}}</div>
                        </div>
                    </div>

                    <div class="statementWrap" ref="minute_statementWrap">
                        郑重声明：本页面所有数据来自互联网或自动生成的测试数据,仅用于学习HQChart图形库使用,不构成任何投资价值信息。如使用者依据本网站提供的信息、资料及图表进行金融、证券等投资所造成的盈亏与本网站无关。
                    </div>
                </div>

                <div class="contentBox" v-show='chartType == "kline"'>
                    <div class="periodWrap kline_periodWrap" ref='kline_periodWrap'>
                        <div class="btnGroup">
                            <div class="btn" :class="{active: KLinePeriodIndex == index}" v-for="(item,index) in KLinePeriodMenu" :key="item.ID" @click="OnClickKLinePeriodMenu(index,item)" v-show="item.IsShow">{{item.Name}}</div>
                        </div>
                        <div class="btnGroup" v-show="IsShowRightMenu">
                            <div class="btn" :class="{active: KLineRightIndex == index}" v-for="(item,index) in KLineRightMenu" :key="item.ID" @click="OnClickKLineRightMenu(index,item)">{{item.Name}}</div>
                        </div>
                    </div>
                    
                    <div class='hqchart' id='hqchart_kline' ref='kline2'></div>

                    <div class="indexWrap" ref="kline_indexWrap">
                        <div class="btnGroup">
                            <div class="btn"  v-for="(item) in KLineIndexMenu" :key="item.ID" @click="ChangeKLineIndex(item)">{{item.Name}}</div>
                        </div>
                    </div>

                    <div class="statementWrap" ref="kline_statementWrap">
                        郑重声明：本页面所有数据来自互联网或自动生成的测试数据,仅用于学习HQChart图形库使用,不构成任何投资价值信息。如使用者依据本网站提供的信息、资料及图表进行金融、证券等投资所造成的盈亏与本网站无关。
                    </div>
                </div>
            </div>
            
        </div>

        <!-- <div class="right" ref="kline_right" >
            
        </div> -->

    </div>
</template>

<script>
import _ from 'lodash'
import HQChart from 'hqchart'
import 'hqchart/src/jscommon/umychart.resource/css/tools.css'
import 'hqchart/src/jscommon/umychart.resource/font/iconfont.css'
import  QQData  from "./qq/HQData.js"

//源码调试用
//import Chart from '../jscommon/umychart.vue/umychart.vue.js'
//import '../jscommon/umychart.resource/css/tools.css'
//import '../jscommon/umychart.resource/font/iconfont.css'
//var HQChart={ Chart:Chart };



function DefaultData() { }

DefaultData.GetMinuteOption=function()
{
    var option=
    {
        Type:'分钟走势图',   //创建图形类型
        //Type:'分钟走势图横屏',

        Windows: //窗口指标
        [
            {Index:"MACD", Modify:false, Change:false, Close:false }
        ], 
                
        Symbol:'600000.sh',         
        IsAutoUpdate:true,          //是自动更新数据
        AutoUpdateFrequency:20000,
        DayCount:1,                 //1 最新交易日数据 >1 多日走势图
        IsShowRightMenu:false,      //是否显示右键菜单
        //CorssCursorTouchEnd:true,

        CorssCursorInfo:{  Left:1, Right:1 },
    
        MinuteLine:
        {
            IsDrawAreaPrice:true,      //是否画价格面积图
            IsShowAveragePrice:true,   //不显示均线
        },
    
        Border: //边框
        {
            Left:40,    //左边间距
            Right:40,     //右边间距
            Top:25,
            Bottom:25,
            AutoRight:{ Blank:10, MinWidth:40 },
            AutoLeft:{ Blank:10, MinWidth:40 },
        },
                
        Frame:  //子框架设置
        [
            { SplitCount:5 },
            { SplitCount:3 },
        ],

        ExtendChart:    //扩展图形
        [
            //{Name:'MinuteTooltip' }  //手机端tooltip
        ]
    };

    return option;
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
    ];

    return data;
}


DefaultData.GetTestSymbolMenu=function()
{
    var data=
    [
        {
            Title: '美股',
            Icon: '',
            Sub: 
            [
                {
                    Name: '网易',
                    Code: 'NTES_OQ.usa'
                },
                {
                    Name: '微软',
                    Code: 'MSFT_OQ.usa'
                },
                {
                    Name: '亚马逊',
                    Code: 'AMZN_OQ.usa'
                },
                {
                    Name: '人人网',
                    Code: 'RENN_N.usa'
                },
                {
                    Name: '滴滴',
                    Code: 'DIDI_N.usa'
                },
                {
                    Name: '阿里巴巴',
                    Code: 'BABA_N.usa'
                },
                {
                    Name: '知乎',
                    Code: 'ZH_N.usa'
                },
                {
                    Name: '道琼斯',
                    Code: 'DJI.usa'
                },
                {
                    Name: '标普500',
                    Code: 'INX.usa'
                },
                {
                    Name: '纳斯达克',
                    Code: 'IXIC.usa'
                }
            ]
        },
        {
            Title: '沪深A股',
            Icon: '',
            Sub: 
            [
                {
                    Name: '浦发银行',
                    Code: '600000.sh'
                },
                {
                    Name: '东方财富',
                    Code: '300059.sz'
                },
                {
                    Name: '上证指数',
                    Code: '000001.sh'
                },
                {
                    Name: '深证成指',
                    Code: '399001.sz'
                }
            ]
        },
        {
            Title: 'ETF基金',
            Icon: '',
            Sub:
            [
                {
                    Name: '50ETF基金',
                    Code: '510800.sh'
                },
                {
                    Name: '上证180ETF',
                    Code: '510180.sh'
                },
                {
                    Name: '恒生ETF',
                    Code: '159920.sz'
                },
                {
                    Name: '创业板50ETF',
                    Code: '159949.sz'
                },
            ]
        },
        {
            Title: '港股',
            Icon: '',
            Sub: 
            [
                {
                    Name: '比亚迪股份',
                    Code: '01211.hk'
                },
                {
                    Name: '招商银行',
                    Code: '03968.hk'
                },
                {
                    Name: '汇丰控股',
                    Code: '00005.hk'
                },
                {
                    Name: '恒生指数',
                    Code: 'HSI.hk'
                }
            ]
        },
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
            {Index:"MA",    Modify:true, Modify:true, Change:true },
            {Index:"VOL",   Modify:true, Change:true, Close:false },
            {Index:"MACD",  Modify:true, Change:true, Close:false }
        ], 
                
        Symbol:'000001.sh',         
        IsAutoUpdate:true,          //是自动更新数据
        AutoUpdateFrequency:10000,
        IsApiPeriod:true,
        IsShowRightMenu:false,      //是否显示右键菜单
        //CorssCursorTouchEnd:true,

        KLine:
        {
            DragMode:1,                 //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
            Right:0,                    //复权 0 不复权 1 前复权 2 后复权
            Period:0,                   //周期 0 日线 1 周线 2 月线 3 年线 
            MaxReqeustDataCount:1000,   //数据个数
            PageSize:150,               //一屏显示多少数据
            KLineDoubleClick:false,              //双击分钟走势图
            IsShowTooltip:true,                 //是否显示K线提示信息
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
            { SplitCount:5, IsShowLeftText:false,  
                Custom:
                [
                    { 
                        Type:0, Position:'right'
                    }
                ]
            },
            { SplitCount:3, IsShowLeftText:false },
            { SplitCount:3, IsShowLeftText:false },
        ],

        ExtendChart:    //扩展图形
        [
            //{ Name:'KLineTooltip' },  //手机端tooltip
        ]
    };

    return option;
}

DefaultData.GetMinuteDayMenu=function()
{
    var data=
    [
        {Name:'1日', ID:1},
        {Name:'5日', ID:5},
    ];

    return data;
}

DefaultData.GetKLinePeriodMenu=function()
{
    var data=
    [
        {Name:"日线", ID: 0 ,IsShow:true},
        {Name:"周线", ID: 1 ,IsShow:true},
        {Name:"月线", ID: 2 ,IsShow:true},

        {Name:"5分钟", ID: 5,   IsShow:true },
        {Name:"15分钟", ID: 6,  IsShow:true },
        {Name:"30分钟", ID: 7,  IsShow:true },
        {Name:"60分钟", ID: 8,  IsShow:true },
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

export default 
{
    data () 
    {
        var data=
        {
            MinuteDayMenu: DefaultData.GetMinuteDayMenu(),
            MinuteDayIndex: 0,

            KLinePeriodMenu:DefaultData.GetKLinePeriodMenu(),
            KLinePeriodIndex:0,

            KLineRightMenu:DefaultData.GetKLineRightMenu(),
            KLineRightIndex:0,
            IsShowRightMenu:true,
            
            MinuteIndexMenu: DefaultData.GetMinuteIndexMenu(),
            KLineIndexMenu: DefaultData.GetKLineIndexMenu(),

            Symbol:'600000.sh',      //HQChart内部编码美股加后缀.usa AAPL.usa
            Chart:null,              //图形控件  分时图
            KLineChart:null,         //图形控件  K线图
            NavMenuAry: DefaultData.GetTestSymbolMenu(),

            VolChartHeight:10,
            chartType: 'minute'
        }

        return data;
    },

    mounted () 
    {
        this.OnSize()
        this.SetChartStyle();
        this.$nextTick(() => 
        {
            this.CreateMinuteChart(); 
            this.CreateKLineChart();
        })

        window.onresize = _.debounce(this.OnSize, 200)
    },

    methods: 
    {
        OnSize() 
        {   
            var width = this.$refs.right.clientWidth;
            var rightTab = this.$refs.rightTab
            var periodWrap = this.$refs.minute_periodWrap;
            var indexWrap = this.$refs.minute_indexWrap;
            var statementWrap = this.$refs.minute_statementWrap;
            var chartHeight = window.innerHeight - rightTab.offsetHeight - periodWrap.offsetHeight - indexWrap.offsetHeight - statementWrap.offsetHeight;

            var kline = this.$refs.kline;
            kline.style.width = width + 'px';
            kline.style.height = chartHeight + 'px';
            console.log(width, chartHeight);

            // var width = this.$refs.kline_right.clientWidth;
            var periodWrap = this.$refs.kline_periodWrap;
            var indexWrap = this.$refs.kline_indexWrap;
            var statementWrap = this.$refs.kline_statementWrap;
            var chartHeight = window.innerHeight - rightTab.offsetHeight - periodWrap.offsetHeight - indexWrap.offsetHeight - statementWrap.offsetHeight;
            var kline2=this.$refs.kline2;
            kline2.style.width = width + 'px';
            kline2.style.height = chartHeight + 'px';

            if(this.Chart) this.Chart.OnSize();
            if(this.KLineChart) this.KLineChart.OnSize();
        },

        changeRightContent (type) {
            this.chartType = type

            this.$nextTick(() => {
                this.OnSize()
            })
        },

        SetChartStyle()
        {
            QQData.HQData.SetMinuteChartCoordinate();
            var blackStyle=HQChart.Chart.HQChartStyle.GetStyleConfig(HQChart.Chart.STYLE_TYPE_ID.BLACK_ID); //读取黑色风格配置
            HQChart.Chart.JSChart.SetStyle(blackStyle);
        },

        CreateMinuteChart()
        {
            if (this.Chart) return;

            var option=DefaultData.GetMinuteOption();
            option.Symbol=this.Symbol;
            option.NetworkFilter = (data, callback) => { this.NetworkFilter(data, callback); };  //网络请求回调函数
            
            var chart=HQChart.Chart.JSChart.Init(this.$refs.kline);
            chart.SetOption(option);
            this.Chart=chart;
        },

        CreateKLineChart()
        {
            if (this.KLineChart) return;

            var option=DefaultData.GetKLineOption();
            option.Symbol=this.Symbol;
            option.NetworkFilter = (data, callback) => { this.NetworkFilter(data, callback); };  //网络请求回调函数

            var chart=HQChart.Chart.JSChart.Init(this.$refs.kline2);
            chart.SetOption(option);
            this.KLineChart=chart;
        },

        ChangeSymbol(symbol)    //切换股票
        {
            var symbolUpper=symbol.toUpperCase();
            var isShowVolChart=QQData.HQData.IsShowVolChart(symbolUpper);
            if (this.Chart)
            {
                var frame=this.Chart.JSChartContainer.Frame.SubFrame[1];
                if (isShowVolChart)
                {
                    if (frame.Height<=0) frame.Height=this.VolChartHeight; 
                }
                else
                {
                    if (frame.Height>0) this.VolChartHeight=frame.Height;
                    frame.Height=0;
                }
            }
            
            var klineOption=null;
            if (this.KLineChart)
            {
                var period=this.KLineChart.JSChartContainer.Period;
                var right=this.KLineChart.JSChartContainer.Right;
                var isShowRightMenu=QQData.HQData.IsEnableRight(period, symbol); //是否显示复权菜单
                this.IsShowRightMenu=isShowRightMenu;
                var fixRight=QQData.HQData.VerifyKLineConfig(symbol,right,period);
                if (fixRight) 
                {
                    klineOption={ KLine:{  } };
                    if (fixRight.Right>=0) klineOption.KLine.Right=fixRight.Right;
                    if (fixRight.Period>=0) klineOption.KLine.Period=fixRight.Period;
                }
            }

            //分钟周期菜单
            var isShowMinutePeriod=true;
            if (QQData.HQData.IsHK(symbolUpper) || QQData.HQData.IsUSA(symbolUpper)) isShowMinutePeriod=false;
            for(var i=0; i<this.KLinePeriodMenu.length;++i)
            {
                var item=this.KLinePeriodMenu[i];
                if (item.ID>=5 && item.ID<=8) item.IsShow=isShowMinutePeriod;
            }
            
            this.Symbol=symbol;
            if (this.Chart) this.Chart.ChangeSymbol(this.Symbol);
            if (this.KLineChart) this.KLineChart.ChangeSymbol(this.Symbol,klineOption);
        },

        OnClickMinuteDayMenu(index, item)   //分时图天数
        {
            this.MinuteDayIndex=index;
            this.Chart.ChangeDayCount(item.ID);
        },

        OnClickKLinePeriodMenu(index,item)  //K线周期
        {
            this.KLinePeriodIndex=index;
            var isShowRightMenu=QQData.HQData.IsEnableRight(item.ID, this.Symbol); //是否显示复权菜单
            this.IsShowRightMenu=isShowRightMenu;
            this.KLineChart.ChangePeriod(item.ID);
        },

        OnClickKLineRightMenu(index,item)   //K线复权
        {
            this.KLineRightIndex=index;
            this.KLineChart.ChangeRight(item.ID);
        },

        ChangeMinuteIndex(item) //切换分时图指标
        {
            if (this.Chart) this.Chart.ChangeIndex(item.WindowIndex,item.ID);
        },

        ChangeKLineIndex(item)  //切换K线图指标
        {
            if (this.KLineChart) this.KLineChart.ChangeIndex(item.WindowIndex,item.ID);
        },

        NetworkFilter(data, callback)   //第3方数据替换接口
        {
            console.log('[HQChartDemo::NetworkFilter] data', data);

            switch(data.Name) 
            {
                //分时图数据对接
                case 'MinuteChartContainer::RequestMinuteData':
                    QQData.HQData.NetworkFilter(data, callback);
                    break;
                case "MinuteChartContainer::RequestHistoryMinuteData":
                    QQData.HQData.NetworkFilter(data, callback);
                    break;

                case 'KLineChartContainer::RequestHistoryData':                 //日线全量数据下载
                    QQData.HQData.NetworkFilter(data, callback);
                    break;
                 case 'KLineChartContainer::RequestRealtimeData':                //日线实时数据更新
                    QQData.HQData.NetworkFilter(data, callback);
                    break;
                case 'KLineChartContainer::RequestFlowCapitalData':             //流通股本
                    QQData.HQData.NetworkFilter(data, callback);
                    break;
                case 'KLineChartContainer::ReqeustHistoryMinuteData':           //分钟全量数据下载
                    QQData.HQData.NetworkFilter(data, callback);
                    break;
                case 'KLineChartContainer::RequestMinuteRealtimeData':          //分钟增量数据更新
                    QQData.HQData.NetworkFilter(data, callback);
                    break;
            }   
        },

        handleSelect(key, keyPath) 
        {
            console.log(key, keyPath);
            this.ChangeSymbol(keyPath[1])
        },

        handleOpen(key, keyPath) 
        {
            console.log(key, keyPath);
        },

        handleClose(key, keyPath) 
        {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="less">
@animation-duration: 0.3s;
.box{
  width: 100%;
  height: 100%;
  // display: flex;
  position: relative;
  overflow: hidden;

  .left,
  .right{
    position: absolute;
    top: 0;
  }

  .left{
    width: 240px;
    height: 100%;
    box-sizing: border-box;
    left: 0;
    // padding-top: 17px;
    overflow-x: auto;
    
    .el-menu{
      min-height: 100%;
      border-right: solid 1px #000;
      
      .el-submenu__title:hover{
        background-color: #363636!important; 
      }

      .el-menu-item:hover {
        background-color: #363636!important;
      }
    }
    
  }

  .right{
    left: 240px;
    width: calc(100% - 240px);
    height: 100%;
    @rightTabHeight: 40px;
    display: flex;
    flex-direction: column;

    .rightTab{
        height: @rightTabHeight;
        width: 100%;
        background: #191919;
        border-bottom: 1px solid #000;  
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        // flex-direction: column;

        >.btn{
            cursor: pointer;
            width: 100%;
            text-align: center;
            color: #bcbfc4;

            &:first-child{
                padding-right: 60px;
                text-align: right;
            }

            &:last-child{
                padding-left: 60px;
                text-align: left;
            }

            &:hover,
            &.active
            {
            color: #ff6900;
            }

        }
    }

    .rightContent{
        height: calc(100% - @rightTabHeight);
        width: 100%;

        .kline_periodWrap{
            display: flex;
            justify-content: space-between;
            background: #191919;

            .btnGroup:first-child{
                width: 50%;
            }

            .btnGroup:last-child{
                width: 30%;
            }
        }
    }

    .btnGroup{
      border: 1px solid #242424;
      color: #bcbfc4;
      display: flex;
      background: #191919;

      .btn{
        height: 40px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #242424;
        cursor: pointer;

        &:last-child{
          border-right: none;
        }

        &:hover,
        &.active
        {
          color: #ff6900;
        }
      }
    }

    // .el-button-group{
    //   width: 100%;
    //   display: flex;

    //   .el-button{
    //     flex: 1;
    //   }
    // }

    #hqchart_minute
    {
      background-color: rgb(0,0,0);
      height: 300px;
      position: relative;
    }

    #hqchart_kline
    {
      background-color: rgb(0,0,0);
      height: 300px;
      position: relative;
    }

    .statementWrap{
        background: #191919;
        padding: 10px;
        font-size: 12px;
        color: #de432d;
        line-height: 20px;
        text-align: center;
    }
  }
}


</style>