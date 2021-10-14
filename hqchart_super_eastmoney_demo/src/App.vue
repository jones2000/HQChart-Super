<template>
    <div id="app" ref='app' style="height:100%; width:100%">
        <div ref='buttongroup' style="padding:5px">
            <div>
                <span>美股：</span>
                <button  class='btn-style' @click="ChangeSymbol('NTES.usa')">网易</button>
                <button  class='btn-style' @click="ChangeSymbol('MSFT.usa')">微软</button>
                <button  class='btn-style' @click="ChangeSymbol('AMZN.usa')">亚马逊</button>
                <button  class='btn-style' @click="ChangeSymbol('RENN.usa')">人人网</button>
                <button  class='btn-style' @click="ChangeSymbol('DIDI.usa')">滴滴</button>
                <button  class='btn-style' @click="ChangeSymbol('BABA.usa')">阿里巴巴</button>
                <button  class='btn-style' @click="ChangeSymbol('ZH.usa')">知乎</button>
                <button  class='btn-style' @click="ChangeSymbol('DJIA.usa')">道琼斯</button>
                <button  class='btn-style' @click="ChangeSymbol('SPX.usa')">标普500</button>
                <button  class='btn-style' @click="ChangeSymbol('NDX.usa')">纳斯达克</button>
            </div>
            <div>
                <span>A股：</span>
                <button  class='btn-style' @click="ChangeSymbol('600000.sh')">浦发银行</button>
                <button  class='btn-style' @click="ChangeSymbol('300059.sz')">东方财富</button>
                <button  class='btn-style' @click="ChangeSymbol('000001.sh')">上证指数</button>
                <button  class='btn-style' @click="ChangeSymbol('399001.sz')">深证成指</button>
            </div>
            <div>
                <span>港股：</span>
                <button  class='btn-style' @click="ChangeSymbol('01211.hk')">比亚迪股份</button>
                <button  class='btn-style' @click="ChangeSymbol('03968.hk')">招商银行</button>
                <button  class='btn-style' @click="ChangeSymbol('00005.hk')">汇丰控股</button>
                <button  class='btn-style' @click="ChangeSymbol('HSI.hk')">恒生指数</button>
            </div>
            <div>
                <span>外汇：</span>
                <button  class='btn-style' @click="ChangeSymbol('USDCAD.FOREX')">美元兑加元</button>
                <button  class='btn-style' @click="ChangeSymbol('USDHKD.FOREX')">美元兑港币</button>
                <button  class='btn-style' @click="ChangeSymbol('USDEUR.FOREX')">美元兑欧元</button>
                <button  class='btn-style' @click="ChangeSymbol('USDHKD.FOREX')">美元兑港币</button>
                <button  class='btn-style' @click="ChangeSymbol('EURGBP.FOREX')">欧元兑英镑</button>
            </div>
            <div>
                <span>上期所：</span>
                <button  class='btn-style' @click="ChangeSymbol('CUM.SHFE')">沪铜主力</button>
                <button  class='btn-style' @click="ChangeSymbol('SNM.SHFE')">沪锡主力</button>
                <button  class='btn-style' @click="ChangeSymbol('AUM.SHFE')">沪金主力</button>
                <button  class='btn-style' @click="ChangeSymbol('NIM.SHFE')">沪镍主力</button>
                <button  class='btn-style' @click="ChangeSymbol('RUM.SHFE')">橡胶主力</button>
                <button  class='btn-style' @click="ChangeSymbol('RBM.SHFE')">螺纹钢主力</button>
                <button  class='btn-style' @click="ChangeSymbol('AGM.SHFE')">沪银主力</button>
                <button  class='btn-style' @click="ChangeSymbol('WRM.SHFE')">线材主力</button>
                <button  class='btn-style' @click="ChangeSymbol('PBM.SHFE')">沪铅主力</button>
                <button  class='btn-style' @click="ChangeSymbol('ZNM.SHFE')">沪锌主力</button>
                <button  class='btn-style' @click="ChangeSymbol('BUM.SHFE')">石油沥青主力</button>
                <button  class='btn-style' @click="ChangeSymbol('ALM.SHFE')">沪铝主力</button>
                <button  class='btn-style' @click="ChangeSymbol('FUM.SHFE')">燃油主力</button>
                <button  class='btn-style' @click="ChangeSymbol('HCM.SHFE')">热轧卷板主力</button>
                <button  class='btn-style' @click="ChangeSymbol('SPM.SHFE')">纸浆主力</button>
                <button  class='btn-style' @click="ChangeSymbol('SSM.SHFE')">不锈钢主力</button>
            </div>
            <div>
                <span>上期能源：</span>
                <button  class='btn-style' @click="ChangeSymbol('SCM.SHFE')">原油主力</button>
                <button  class='btn-style' @click="ChangeSymbol('NRM.SHFE')">20号胶主力</button>
                <button  class='btn-style' @click="ChangeSymbol('LUM.SHFE')">低硫燃油主力</button>
                <button  class='btn-style' @click="ChangeSymbol('BCM.SHFE')">国际铜主力</button>
            </div>
            <div>
                <span>大连商品交易所</span>
                <button  class='btn-style' @click="ChangeSymbol('CM.DCE')">玉米主力</button>
                <button  class='btn-style' @click="ChangeSymbol('AM.DCE')">豆一主力</button>
                <button  class='btn-style' @click="ChangeSymbol('BM.DCE')">豆二主力</button>
                <button  class='btn-style' @click="ChangeSymbol('MM.DCE')">豆粕主力</button>
                <button  class='btn-style' @click="ChangeSymbol('MM.DCE')">豆粕主力</button>
                <button  class='btn-style' @click="ChangeSymbol('YM.DCE')">豆油主力</button>
                <button  class='btn-style' @click="ChangeSymbol('PM.DCE')">棕榈油主力</button>
                <button  class='btn-style' @click="ChangeSymbol('LM.DCE')">聚乙烯主力</button>
                <button  class='btn-style' @click="ChangeSymbol('VM.DCE')">聚氯乙烯主力</button>

                <button  class='btn-style' @click="ChangeSymbol('JM.DCE')">焦炭主力</button>
                <button  class='btn-style' @click="ChangeSymbol('JMM.DCE')">焦煤主力</button>
                <button  class='btn-style' @click="ChangeSymbol('FBM.DCE')">纤维板主力</button>
                <button  class='btn-style' @click="ChangeSymbol('BBM.DCE')">胶合板主力</button>
                <button  class='btn-style' @click="ChangeSymbol('IM.DCE')">铁矿石主力</button>
                <button  class='btn-style' @click="ChangeSymbol('JDM.DCE')">鸡蛋主力</button>

                <button  class='btn-style' @click="ChangeSymbol('PPM.DCE')">聚丙烯主力</button>
                <button  class='btn-style' @click="ChangeSymbol('CSM.DCE')">玉米淀粉主力</button>
                <button  class='btn-style' @click="ChangeSymbol('EGM.DCE')">乙二醇主力</button>
                <button  class='btn-style' @click="ChangeSymbol('RRM.DCE')">粳米主力</button>
            </div>
            
            <div>
                <span>天数：</span>
                <button  class='btn-style' @click="ChangeDayCount(1)">1日</button>
                <button  class='btn-style' @click="ChangeDayCount(2)">2日</button>
                <button  class='btn-style' @click="ChangeDayCount(3)">3日</button>
                <button  class='btn-style' @click="ChangeDayCount(4)">4日</button>
                <button  class='btn-style' @click="ChangeDayCount(5)">5日</button>
            </div>
        </div>

        <div class='hqchart' id='kline' ref='kline'></div>
     </div>

</template>

<script>

import $ from 'jquery'
import HQChart from 'hqchart'
import 'hqchart/src/jscommon/umychart.resource/css/tools.css'
import 'hqchart/src/jscommon/umychart.resource/font/iconfont.css'
import  EastMoney  from "./eastmoney/HQData.js"

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
                
        Symbol:'AAPL.usa',         
        IsAutoUpdate:false,          //是自动更新数据
        AutoUpdateFrequency:20000,
        DayCount:3,                 //1 最新交易日数据 >1 多日走势图
        IsShowRightMenu:false,      //是否显示右键菜单
        //CorssCursorTouchEnd:true,

        CorssCursorInfo:{  Left:2, Right:2 },
    
        MinuteLine:
        {
            IsDrawAreaPrice:true,      //是否画价格面积图
            IsShowAveragePrice:true,   //不显示均线
        },
    
        Border: //边框
        {
            Left:2,    //左边间距
            Right:2,     //右边间距
            Top:25,
            Bottom:25
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

export default 
{
    name:'HQChartDemo',
    //外部传入的参数
    props: 
    [
        'DefaultCode',     //默认股票
    ],

    data()
    {
        let data=
        { 
            Symbol:'AAPL.usa',      //HQChart内部编码美股加后缀.usa
            Chart:null,             //图形控件
        }

        return data;
    },

    created:function()
    {
        //处理默认传入的参数
        if (this.DefaultCode) 
        {
            this.Symbol=this.DefaultCode; //默认股票
        }
    },

    mounted:function()
    {
        console.log(`[HQChartDemo::mounted]`);
        window.onresize = ()=>{ this.OnSize() }

        //一直交易 调试用
        //HQChart.Chart.MARKET_SUFFIX_NAME.GetMarketStatus = function (symbol)  { return 2;  }

        this.OnSize();              //子组件的mounted在父组件的mounted之前执行了  
        this.SetChartStyle();
        this.CreateMinuteChart();  
    },

    methods:
    {
        //////////////////////////////////////////////////////////////////////////////
        ChangeIndex(windowIndex,name) //切换指标  windowIndex=窗口索引, name=指标名字
        {
            this.Chart.ChangeIndex(windowIndex,name);
        },

        ChangeSymbol(code)   //切换股票
        {
            this.Symbol=code;
            this.Chart.ChangeSymbol(this.Symbol);
        },

        ChangeDayCount(dayCount)
        {
            this.Chart.ChangeDayCount(dayCount);
        },

        ///////////////////////////////////////////////////////////////////////////////////
        //内部接口
        OnSize()
        { 
            var app=this.$refs.app;
            var height= app.offsetHeight;
            var width = app.offsetWidth;
            console.log(`[HQChartDemo::OnSize] width=${width} height=${height}`); 

            var groupbutton=this.$refs.buttongroup;
            var buttonsWidth=groupbutton.offsetHeight;

            //获取屏幕大小 动态设置K线的div大小
            var kline=this.$refs.kline;
            kline.style.width=width+'px';;
            kline.style.height=(height-buttonsWidth)+'px';

            if (this.Chart) this.Chart.OnSize();
        },

        SetChartStyle()
        {
            EastMoney.HQData.SetMinuteChartCoordinate();
            var blackStyle=HQChart.Chart.HQChartStyle.GetStyleConfig(HQChart.Chart.STYLE_TYPE_ID.BLACK_ID); //读取黑色风格配置
            HQChart.Chart.JSChart.SetStyle(blackStyle);
        },

        ClearChart()    
        {
            if (!this.Chart) return;

            this.Chart.ChartDestory();    //停止定时器
            this.Chart=null;  //清空实例

            var divKLine=this.$refs.kline;
            while (divKLine.hasChildNodes()) 
            {
                divKLine.removeChild(divKLine.lastChild);
            }　
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

        NetworkFilter(data, callback)   //第3方数据替换接口
        {
            console.log('[HQChartDemo::NetworkFilter] data', data);

            switch(data.Name) 
            {
                //分时图数据对接
                case 'MinuteChartContainer::RequestMinuteData':
                    EastMoney.HQData.NetworkFilter(data, callback);
                    break;
                case "MinuteChartContainer::RequestHistoryMinuteData":
                    EastMoney.HQData.NetworkFilter(data, callback);
                    break;
            }
        },

    }
}


</script>

<style lang="less">
.hqchart
{
    position: relative;
    background-color: rgb(0,0,0);
}

.btn-style
{
    padding: 3px 8px;
    border: 1px solid #ececec;
    border-radius: 5px;
    background-color: #f5f5f5;
    cursor: pointer;
}
</style>
