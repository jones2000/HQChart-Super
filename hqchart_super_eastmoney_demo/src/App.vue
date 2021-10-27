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
                            <div class="btn" :class="{active: KLinePeriodIndex == index}" v-for="(item,index) in KLinePeriodMenu" :key="item.ID" @click="OnClickKLinePeriodMenu(index,item)">{{item.Name}}</div>
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
    //品种代码规则 ${东方财富品种代码}_${东方财富市场}.${HQChart内部市场后缀}
    var data=
    [
        {
            Title: '美股',
            Icon: '',
            Sub: 
            [
                {
                    Name: '网易',
                    Code: 'NTES_105.usa'
                },
                {
                    Name: '微软',
                    Code: 'MSFT_105.usa'
                },
                {
                    Name: '亚马逊',
                    Code: 'AMZN_105.usa'
                },
                {
                    Name: '人人网',
                    Code: 'RENN_106.usa'
                },
                {
                    Name: '滴滴',
                    Code: 'DIDI_106.usa'
                },
                {
                    Name: '阿里巴巴',
                    Code: 'BABA_106.usa'
                },
                {
                    Name: '知乎',
                    Code: 'ZH_106.usa'
                },
                {
                    Name: '道琼斯',
                    Code: 'DJIA_100.usa'
                },
                {
                    Name: '标普500',
                    Code: 'SPX_100.usa'
                },
                {
                    Name: '纳斯达克',
                    Code: 'NDX_100.usa'
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
                    Code: '600000_1.sh'
                },
                {
                    Name: '东方财富',
                    Code: '300059_0.sz'
                },
                {
                    Name: '上证指数',
                    Code: '000001_1.sh'
                },
                {
                    Name: '深证成指',
                    Code: '399001_0.sz'
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
                    Code: '510800_1.sh'
                },
                {
                    Name: '上证180ETF',
                    Code: '510180_1.sh'
                },
                {
                    Name: '恒生ETF',
                    Code: '159920_0.sz'
                },
                {
                    Name: '创业板50ETF',
                    Code: '159949_0.sz'
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
                    Code: '01211_116.hk'
                },
                {
                    Name: '招商银行',
                    Code: '03968_116.hk'
                },
                {
                    Name: '汇丰控股',
                    Code: '00005_116.hk'
                },
                {
                    Name: '恒生指数',
                    Code: 'HSI_100.hk'
                }
            ]
        },
        {
            Title: '外汇',
            Icon: '',
            Sub: 
            [
                {
                    Name: '美元兑加元',
                    Code: 'USDCAD_119.FOREX'
                },
                {
                    Name: '美元兑港币',
                    Code: 'USDHKD_119.FOREX'
                },
                {
                    Name: '美元兑欧元',
                    Code: 'USDEUR_119.FOREX'
                },
                {
                    Name: '欧元兑英镑',
                    Code: 'EURGBP_119.FOREX'
                },
                {
                    Name: '美元指数',
                    Code: 'UDI_100.ET'
                }
            ]
        },
        {
            Title: '上海期货交易所',
            Icon: '',
            Sub: 
            [
                {
                Name: '沪铜主力',
                Code: 'CUM_113.SHFE'
                },
                {
                Name: '沪锡主力',
                Code: 'SNM_113.SHFE'
                },
                {
                Name: '沪金主力',
                Code: 'AUM_113.SHFE'
                },
                {
                Name: '沪镍主力',
                Code: 'NIM_113.SHFE'
                },
                {
                Name: '橡胶主力',
                Code: 'RUM_113.SHFE'
                },
                {
                Name: '螺纹钢主力',
                Code: 'RBM_113.SHFE'
                },
                {
                Name: '沪银主力',
                Code: 'AGM_113.SHFE'
                },
                {
                Name: '线材主力',
                Code: 'WRM_113.SHFE'
                },
                {
                Name: '沪铅主力',
                Code: 'PBM_113.SHFE'
                },
                {
                Name: '沪锌主力',
                Code: 'ZNM_113.SHFE'
                },
                {
                Name: '石油沥青主力',
                Code: 'BUM_113.SHFE'
                },
                {
                Name: '沪铝主力',
                Code: 'ALM_113.SHFE'
                },
                {
                Name: '燃油主力',
                Code: 'FUM_113.SHFE'
                },
                {
                Name: '热轧卷板主力',
                Code: 'HCM_113.SHFE'
                },
                {
                Name: '纸浆主力',
                Code: 'SPM_113.SHFE'
                },
                {
                Name: '不锈钢主力',
                Code: 'SSM_113.SHFE'
                }
            ]
        },
        {
            Title: '上海国际能源交易中心',
            Icon: '',
            Sub: 
            [
                {
                    Name: '原油主力',
                    Code: 'SCM_142.SHFE'
                },
                {
                    Name: '20号胶主力',
                    Code: 'NRM_142.SHFE'
                },
                {
                    Name: '低硫燃油主力',
                    Code: 'LUM_142.SHFE'
                },
                {
                    Name: '国际铜主力',
                    Code: 'BCM_142.SHFE'
                }
            ]
        },
        {
            Title: '大连商品交易所',
            Icon: '',
            Sub: 
            [
                {
                Name: '玉米主力',
                Code: 'CM_114.DCE'
                },
                {
                Name: '豆一主力',
                Code: 'AM_114.DCE'
                },
                {
                Name: '豆二主力',
                Code: 'BM_114.DCE'
                },
                {
                Name: '豆粕主力',
                Code: 'MM_114.DCE'
                },
                {
                Name: '豆油主力',
                Code: 'YM_114.DCE'
                },
                {
                Name: '棕榈油主力',
                Code: 'PM_114.DCE'
                },
                {
                Name: '聚乙烯主力',
                Code: 'LM_114.DCE'
                },
                {
                Name: '聚氯乙烯主力',
                Code: 'VM_114.DCE'
                },

                {
                Name: '焦炭主力',
                Code: 'JM_114.DCE'
                },
                {
                Name: '焦煤主力',
                Code: 'JMM_114.DCE'
                },
                {
                Name: '纤维板主力',
                Code: 'FBM_114.DCE'
                },
                {
                Name: '胶合板主力',
                Code: 'BBM_114.DCE'
                },
                {
                Name: '铁矿石主力',
                Code: 'IM_114.DCE'
                },
                {
                Name: '鸡蛋主力',
                Code: 'JDM_114.DCE'
                },

                {
                Name: '聚丙烯主力',
                Code: 'PPM_114.DCE'
                },
                {
                Name: '玉米淀粉主力',
                Code: 'CSM_114.DCE'
                },
                {
                Name: '乙二醇主力',
                Code: 'EGM_114.DCE'
                },
                {
                Name: '粳米主力',
                Code: 'RRM_114.DCE'
                },
                {
                Name: '苯乙烯主力',
                Code: 'EBM_114.DCE'
                },
                {
                Name: 'LPG主力',
                Code: 'PGM_114.DCE'
                },
                {
                Name: '生猪主力',
                Code: 'LHM_114.DCE'
                }
            ]
        },
        {
            Title: '郑州商品交易所',
            Icon: '',
            Sub: 
            [
                {
                    Name: '强麦主力',
                    Code: 'WHM_115.CZC'
                },
                {
                    Name: '普麦主力',
                    Code: 'PMM_115.CZC'
                },
                {
                    Name: '一号棉花主力',
                    Code: 'CFM_115.CZC'
                },
                {
                    Name: '白糖主力',
                    Code: 'SRM_115.CZC'
                },
                {
                    Name: 'PTA主力',
                    Code: 'TAM_115.CZC'
                },
                {
                    Name: '菜油主力',
                    Code: 'OIM_115.CZC'
                },
                {
                    Name: '早籼稻主力',
                    Code: 'RIM_115.CZC'
                },
                {
                    Name: '甲醇主力',
                    Code: 'MAM_115.CZC'
                },
                {
                    Name: '玻璃主力',
                    Code: 'FGM_115.CZC'
                },
                {
                    Name: '菜籽主力',
                    Code: 'RSM_115.CZC'
                },
                {
                    Name: '菜粕主力',
                    Code: 'RMM_115.CZC'
                },
                {
                    Name: '粳稻主力',
                    Code: 'JRM_115.CZC'
                },
                {
                    Name: '晚籼稻主力',
                    Code: 'LRM_115.CZC'
                },
                {
                    Name: '硅铁主力',
                    Code: 'SFM_115.CZC'
                },
                {
                    Name: '锰硅主力',
                    Code: 'SMM_115.CZC'
                },
                {
                    Name: '动力煤主力',
                    Code: 'ZCM_115.CZC'
                },
                {
                    Name: '棉纱主力',
                    Code: 'CYM_115.CZC'
                },
                {
                    Name: '苹果主力',
                    Code: 'APM_115.CZC'
                },
                {
                    Name: '红枣主力',
                    Code: 'CJM_115.CZC'
                },
                {
                    Name: '尿素主力',
                    Code: 'URM_115.CZC'
                },
                {
                    Name: '纯碱主力',
                    Code: 'SAM_115.CZC'
                },
                {
                    Name: '短纤主力',
                    Code: 'PFM_115.CZC'
                },
                {
                    Name: '花生主力',
                    Code: 'PKM_115.CZC'
                },
            ]
        },
        {
            Title:"中国金融期货交易所",
            Icon: '',
            Sub:
            [
                {
                    Name: '二债主力',
                    Code: 'TS-130130_8.CFE'
                },
                {
                    Name: '五债主力',
                    Code: 'TF-050130_8.CFE'
                },
                {
                    Name: '十债主力',
                    Code: 'T-110130_8.CFE'
                },
                {
                    Name: '上证主力',
                    Code: 'IH-070130_8.CFE'
                },
                {
                    Name: '中证主力',
                    Code: 'IC-060130_8.CFE'
                },
                {
                    Name: '沪深主力',
                    Code: 'IF-040130_8.CFE'
                }
            ]
        },
        {
            Title:"芝加哥商业交易所",
            Icon: '',
            Sub:
            [
                {
                    Name: '小麦当月连续',
                    Code: 'ZW00Y_103.CBOT'
                },
                {
                    Name: '迷你小麦当月连续',
                    Code: 'XW00Y_103.CBOT'
                },
                {
                    Name: '玉米当月连续',
                    Code: 'ZC00Y_103.CBOT'
                },
                {
                    Name: '迷你玉米当月连续',
                    Code: 'XC00Y_103.CBOT'
                },
                {
                    Name: '大豆当月连续',
                    Code: 'ZS00Y_103.CBOT'
                },
                {
                    Name: '迷你大豆当月连续',
                    Code: 'XK00Y_103.CBOT'
                },
                {
                    Name: '豆油当月连续',
                    Code: 'ZL00Y_103.CBOT'
                },
                {
                    Name: '豆粕当月连续',
                    Code: 'ZM00Y_103.CBOT'
                },
                {
                    Name: '燕麦当月连续',
                    Code: 'ZO00Y_103.CBOT'
                },
                {
                    Name: '稻谷当月连续',
                    Code: 'ZR00Y_103.CBOT'
                },

                {
                    Name: '小型纳指当月连续',
                    Code: 'NQ00Y_103.CBOT'
                },
                {
                    Name: '小型标普当月连续',
                    Code: 'ES00Y_103.CBOT'
                },
                {
                    Name: '小型道指当月连续',
                    Code: 'YM00Y_103.CBOT'
                },
                
                {
                    Name: '2年美国债当月连续',
                    Code: 'TU00Y_103.CBOT'
                },
                {
                    Name: '5年美国债当月连续',
                    Code: 'FV00Y_103.CBOT'
                },
                {
                    Name: '10年美国债当月连续',
                    Code: 'TY00Y_103.CBOT'
                },
                {
                    Name: '30年美国债当月连续',
                    Code: 'US00Y_103.CBOT'
                },
                {
                    Name: '超国债当月连续',
                    Code: 'UL00Y_103.CBOT'
                },
            ]
        },
        {
            Title:"纽约商品交易所",
            Icon: '',
            Sub:
            [
                {
                    Name: 'NYMEX原油',
                    Code: 'CL00Y_102.NYMEX'
                },
                {
                    Name: 'NYMEX铂金',
                    Code: 'PL00Y_102.NYMEX'
                },
                {
                    Name: '迷你原油',
                    Code: 'QM00Y_102.NYMEX'
                },
                {
                    Name: 'NYMEX燃油',
                    Code: 'HO00Y_102.NYMEX'
                },
                {
                    Name: 'NYMEX汽油',
                    Code: 'RB00Y_102.NYMEX'
                },
                 {
                    Name: 'NYMEX钯金',
                    Code: 'PA00Y_102.NYMEX'
                },
                {
                    Name: '热轧钢卷',
                    Code: 'HR00Y_102.NYMEX'
                },
                {
                    Name: '天然气',
                    Code: 'NG00Y_102.NYMEX'
                },
            ]
        },
        {
            Title:"纽约商业期货交易所",
            Icon: '',
            Sub:
            [
                {
                    Name: 'COMEX白银',
                    Code: 'SI00Y_101.COMEX'
                },
                {
                    Name: '迷你白银',
                    Code: 'QI00Y_101.COMEX'
                },
                {
                    Name: '微型黄金',
                    Code: 'MGC00Y_101.COMEX'
                },
                {
                    Name: '迷你黄金',
                    Code: 'QO00Y_101.COMEX'
                },
                {
                    Name: 'COMEX黄金',
                    Code: 'GC00Y_101.COMEX'
                },
                {
                    Name: 'COMEX铜',
                    Code: 'HG00Y_101.COMEX'
                }
            ]
        },
        {
            Title:"纽约期货交易所",
            Icon: '',
            Sub:
            [
                 {
                    Name: '棉花当月连续',
                    Code: 'CT00Y_108.NYBOT'
                },
            ]
        },
        {
            Title:"伦敦金属交易所",
            Icon: '',
            Sub:
            [
                {
                    Name: '综合镍03',
                    Code: 'NI-LNKT_109.LME'
                },
                {
                    Name: '综合铜03',
                    Code: 'CA-LCPT_109.LME'
                },
                {
                    Name: '综合铝03',
                    Code: 'AH-LALT_109.LME'
                },
                {
                    Name: '综合锡03',
                    Code: 'SN-LTNT_109.LME'
                },
                {
                    Name: '综合锌03',
                    Code: 'ZS-LZNT_109.LME'
                },
                {
                    Name: '综合铅03',
                    Code: 'PB-LLDT_109.LME'
                },
            ]
        },
        {
            Title:"东京商品交易所",
            Icon: '',
            Sub:
            [
                {
                    Name: '日铂金当月连续',
                    Code: 'JPL00Y_111.TOCOM'
                },
                {
                    Name: '日白银当月连续',
                    Code: 'JAG00Y_111.TOCOM'
                },
                {
                    Name: '日原油当月连续',
                    Code: 'JCO00Y_111.TOCOM'
                },
                {
                    Name: '日煤油当月连续',
                    Code: 'JKE00Y_111.TOCOM'
                },
                {
                    Name: '日橡胶当月连续',
                    Code: 'JRU00Y_111.TOCOM'
                },
                {
                    Name: '日黄金当月连续',
                    Code: 'JAU00Y_111.TOCOM'
                },
                {
                    Name: '日汽油当月连续',
                    Code: 'JGL00Y_111.TOCOM'
                },
            ]
        },
         {
            Title:"美国洲际交易所",
            Icon: '',
            Sub:
            [
                {
                    Name: '布伦特原油当月连续',
                    Code: 'B00Y_112.IPE'
                },
                {
                    Name: '重柴油当月连续',
                    Code: 'G00Y_112.IPE'
                },
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
        AutoUpdateFrequency:15000,
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
            { 
                SplitCount:5, IsShowLeftText:false,
                Custom:
                [
                    { 
                        Type:0,
                        Position:'right',
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
        {Name:'2日', ID:2},
        {Name:'3日', ID:3},
        {Name:'4日', ID:4},
        {Name:'5日', ID:5},
    ];

    return data;
}

DefaultData.GetKLinePeriodMenu=function()
{
    var data=
    [
        {Name:"日线", ID: 0 },
        {Name:"周线", ID: 1 },
        {Name:"月线", ID: 2 },

        //{Name:"1分钟", ID: 4 },
        {Name:"5分钟", ID: 5 },
        {Name:"15分钟", ID: 6 },
        {Name:"30分钟", ID: 7 },
        {Name:"60分钟", ID: 8 },
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

            Symbol:'AAPL_105.usa',      //HQChart内部编码美股加后缀.usa AAPL.usa
            Chart:null,             //图形控件  分时图
            KLineChart:null,        //图形控件  K线图
            NavMenuAry: DefaultData.GetTestSymbolMenu(),

            VolChartHeight:10,
            chartType: 'kline'
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
            EastMoney.HQData.SetMinuteChartCoordinate();
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
            var isShowVolChart=EastMoney.HQData.IsShowVolChart(symbolUpper);
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

            var period=this.KLineChart.JSChartContainer.Period;
            var isShowRightMenu=EastMoney.HQData.IsEnableRight(period, symbol); //是否显示复权菜单
            this.IsShowRightMenu=isShowRightMenu;

            this.Symbol=symbol;
            this.Chart.ChangeSymbol(this.Symbol);
            this.KLineChart.ChangeSymbol(this.Symbol);
        },

        OnClickMinuteDayMenu(index, item)   //分时图天数
        {
            this.MinuteDayIndex=index;
            this.Chart.ChangeDayCount(item.ID);
        },

        OnClickKLinePeriodMenu(index,item)  //K线周期
        {
            this.KLinePeriodIndex=index;
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