// index.js
// 获取应用实例

import { JSCommon } from "../../jscommon/umychart.wechat.3.0.js";
import { JSCommonHQStyle } from "../../jscommon/umychart.style.wechat.js";
import { JSCommonCoordinateData } from '../../jscommon/umychart.coordinatedata.wechat.js'
import { EastMoney } from "./HQData.js"

const app = getApp()

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
    ];

    return data;
}



Page(
{
    data: {
        show: false,
        duration: 300,
        position: 'right',
        round: false,
        overlay: true,
        customStyle: '',
        overlayStyle: '',
        subPageIndex: 0,
        isShowMinuteChart: false,
        minuteDayCountAry: DefaultData.GetMinuteDayMenu(),
        indexMinute: 0,
        kPeriodAry: DefaultData.GetKLineDayPeriodMenu(),
        indexKPeriod: 0,
        kMPeriodAry: DefaultData.GetKLineMinutePeriodMenu(),
        kMPeriod: {},
        indexPeroid: -1,
        rightAry: DefaultData.GetKLineRightMenu(),
        indexRight: 0,
        minuteIndexAry:DefaultData.GetMinuteIndexMenu(),
        minuteIndexNumber: -1,
        KlineIndexAry:DefaultData.GetKLineIndexMenu(),
        KlineIndexNumber: -1,
        Width: 0,
        Height: 0,
        isShowRight: true
    },

    MinuteChart: null,
    KLineChart:null,
    Symbol:'AAPL_105.usa',      //HQChart内部编码美股加后缀.usa AAPL.usa

    MinuteOption:DefaultData.GetMinuteOption(),
    KLineOption:DefaultData.GetKLineOption(),

    onLoad() 
    {
        const rect = wx.getSystemInfoSync();
        this.setData(
        {
            Height: rect.windowHeight - 40 - 10 - 35 * 3 - 2,
            Width: rect.windowWidth,
        });
    },

    onReady() 
    {
        this.InitalHQChart();
    },

    InitalHQChart()
    {
        console.log('[App::InitalHQChart]');

        EastMoney.HQData.SetMinuteChartCoordinate();

        //设置黑色风格
        //var style = JSCommonHQStyle.GetStyleConfig(JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);
        //JSCommon.JSChart.SetStyle(style);

        //this.CreateMinuteChart();
        this.CreateKLineChart();
    },

    CreateMinuteChart()
    {
        console.log('[App::CreateMinuteChart]');

        var self = this
        wx.createSelectorQuery()
            .select('#hqchart_minute')
            .fields({
                node: true,
                size: true,
            })
            .exec(function(res)
            {
                self.data.CanvasNode= res[0];
                var element = new JSCommon.JSCanvasElement();
                element.ID = 'hqchart_minute';
                element.CanvasNode =self.data.CanvasNode;
                element.Height = self.data.Height ;   //高度宽度需要手动绑定!! 微信没有元素类
                element.Width = self.data.Width ;
        
                self.MinuteChart = JSCommon.JSChart.Init(element); //把画布绑定到行情模块中
                self.MinuteOption.Symbol=self.Symbol;
                //self.MinuteOption.DayCount=dayCount;
                self.MinuteOption.NetworkFilter = (data, callback) => { self.NetworkFilter(data, callback); };  //网络请求回调函数
                self.MinuteChart.SetOption(self.MinuteOption);
            });
    },

    CreateKLineChart()
    {
        console.log('[App::CreateKLineChart] ');

        var self = this
        wx.createSelectorQuery()
            .select('#hqchart_kline')
            .fields({
                node: true,
                size: true,
            })
            .exec(function(res)
            {
                self.data.CanvasNode= res[0];
                var element = new JSCommon.JSCanvasElement();
                element.ID = 'hqchart_kline';
                element.CanvasNode =self.data.CanvasNode;
                element.Height = self.data.Height ;   //高度宽度需要手动绑定!! 微信没有元素类
                element.Width = self.data.Width ;
        
                //创建历史K线类
                self.KLineChart = JSCommon.JSChart.Init(element); //把画布绑定到行情模块中
                self.KLineOption.Symbol=self.Symbol;
                //self.KLineOption.KLine.Period=period;
                self.KLineOption.NetworkFilter = (data, callback) => { self.NetworkFilter(data, callback); };  //网络请求回调函数
                self.KLineChart.SetOption(self.KLineOption);
            })
    },

    ClearKLineChart()
    {
        if (this.KLineChart)
        {
            console.log('[App::ClearKLineChart] ');
            this.KLineChart.ChartDestory();
            this.KLineChart=null;
        }
    },

    ClearMinuteChart()
    {
        if (this.MinuteChart)
        {
            console.log('[App::ClearMinuteChart] ');
            this.MinuteChart.ChartDestory();
            this.MinuteChart=null;
        }
    },

    NetworkFilter(data, callback)   //第3方数据替换接口
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
        }   

    },

   MinuteTouchStart (event)
    {
        if (this.MinuteChart) this.MinuteChart.OnTouchStart(event);
    },

    MinuteTouchMove (event)
    {
        if (this.MinuteChart) this.MinuteChart.OnTouchMove(event);
    },

    MinuteTouchEnd (event)
    {
        if (this.MinuteChart) this.MinuteChart.OnTouchEnd(event);
    },

    KLineTouchStart (event)
    {
        if (this.KLineChart) this.KLineChart.OnTouchStart(event);
    },

    KLineTouchMove (event)
    {
        if (this.KLineChart) this.KLineChart.OnTouchMove(event);
    },

    KLineTouchEnd (event)
    {
        if (this.KLineChart) this.KLineChart.OnTouchEnd(event);
    },


    ChangeSymbol (e) 
    {
        // const item = e.currentTarget.dataset.item
        // console.log('选中股票', item);
        console.log('选中股票', e.detail);
        this.Symbol=e.detail.Code;
        if (this.KLineChart) this.KLineChart.ChangeSymbol(this.Symbol);
        if (this.MinuteChart) this.MinuteChart.ChangeSymbol(this.Symbol);

        var isShowRight=EastMoney.HQData.IsEnableRight(null, this.Symbol);  //是否显示复权
        this.setData({
            isShowRight
        })
        this.exit()
    },

    ChangeMinuteIndex (e) //走势图指标
    {   
        const index = e.currentTarget.dataset.index;
        var indexID=e.currentTarget.dataset.id;
        var windowIndex=parseInt(e.currentTarget.dataset.windowindex);

        if (this.MinuteChart) this.MinuteChart.ChangeIndex(windowIndex, indexID);
    },

    ChangeKlineIndex (e)    //k线图指标
    { 
        const index = e.currentTarget.dataset.index
        var indexID=e.currentTarget.dataset.id;
        var windowIndex=parseInt(e.currentTarget.dataset.windowindex);

        if (this.KLineChart) this.KLineChart.ChangeIndex(windowIndex, indexID)
    },

    ChangeMinuteDayCount (e)    //分时图切换天数
    {
        if (!this.MinuteChart) return;

        const index = e.currentTarget.dataset.index;
        var dayCount=parseInt(e.currentTarget.dataset.id);
        this.setData({ indexMinute: index });
        this.MinuteChart.ChangeDayCount(dayCount);
    },

    bindPeriodChange (e) { //切分钟周期
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
        indexPeroid: e.detail.value,
        indexKPeriod: -1,
        kMPeriod: this.data.kMPeriodAry[e.detail.value]
        });

        var period= this.data.kMPeriod.ID;
        this.KLineChart.ChangePeriod(period);
    },

    bindRightChange (e) { //复权
        this.setData({
            indexRight: e.detail.value
        })
        this.KLineChart.ChangeRight(this.data.indexRight);
    },

    ChangeChartType (e) 
    {
        const type = e.currentTarget.dataset.type
        switch(type)
        {
        case 'minutetype': 
            this.setData({ isShowMinuteChart: true });
            this.ClearKLineChart();
            this.CreateMinuteChart();
            break;
        case 'klinetype': 
            this.setData({isShowMinuteChart: false});
            this.ClearMinuteChart();
            this.CreateKLineChart();
            break;
        }
    },

    ChangekPeriod (e){ //切换日、周、月周期
        const index = e.currentTarget.dataset.index;
        var period=parseInt(e.currentTarget.dataset.id);
        this.setData({
        indexKPeriod: index,
        indexPeroid: -1
        });

        this.KLineChart.ChangePeriod(period);
    },

    popup(e) {
        const position = e.currentTarget.dataset.position
        let customStyle = ''
        let duration = this.data.duration
        switch(position) {
        case 'top':
        case 'bottom': 
            customStyle = 'height: 30%;'
            break
        case 'right':
            break
        }
        this.setData({
        position,
        show: true,
        customStyle,
        duration
        })
    },
    

    exit() {
        this.setData({show: false})
        // wx.navigateBack()
    },

    onBeforeEnter(res) {
        // console.log(res)
    },
    onEnter(res) {
        // console.log(res)
    },
    onAfterEnter(res) {
        // console.log(res)
    },
    onBeforeLeave(res) {
        // console.log(res)
    },
    onLeave(res) {
        // console.log(res)
    },
    onAfterLeave(res) {
        // console.log(res)
    },

    onClickOverlay(res) {
        // console.log(res)
    }
})
