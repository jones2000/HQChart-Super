/*
   Copyright (c) 2018 jones
 
    http://www.apache.org/licenses/LICENSE-2.0

   开源项目 https://github.com/jones2000/HQChart
 
   jones_2000@163.com

   行情数据对接,使用腾讯数据做为案例的测试数据源
   教程中所有的实例中使用的数据都来自互联网,或测试数据。仅用于学习HQChart图形使用. 教程禁止用于商业产品
*/

import $, { hasData } from 'jquery'
import HQChart from 'hqchart'
import { ary } from 'lodash';

//源码调试用
//import Chart from '../../jscommon/umychart.vue/umychart.vue.js'
//var HQChart={ Chart:Chart };

function HQData()  { }

HQData.Explain="东财财富网接口";


HQData.SetMinuteChartCoordinate=function()
{
    HQChart.Chart.MARKET_SUFFIX_NAME.IsShowAvPrice=(upperSymbol)=>{ return HQData.IsShowAvPrice(upperSymbol); }
    HQChart.Chart.MARKET_SUFFIX_NAME.IsEnableRight=(period, symbol)=> { return HQData.IsEnableRight(period, symbol); }

    //美股分时图坐标
    HQChart.Chart.JSChart.GetMinuteTimeStringData().CreateUSAData=()=>{ return HQData.CreateUSAData(HQChart.Chart.JSChart.GetMinuteTimeStringData()); }  //替换交易时间段
    HQChart.Chart.JSChart.GetMinuteCoordinateData().GetUSAData=(upperSymbol,width)=> { return HQData.GetUSAData(upperSymbol,width); }    	//替换X轴刻度信息

    //A股分时图坐标
    HQChart.Chart.JSChart.GetMinuteTimeStringData().CreateSHSZData=()=>{ return HQData.CreateSHSZData(HQChart.Chart.JSChart.GetMinuteTimeStringData()); }  //替换交易时间段
    HQChart.Chart.JSChart.GetMinuteCoordinateData().GetSHSZData=(upperSymbol,width)=> { return HQData.GetSHSZData(upperSymbol,width); }    	//替换X轴刻度信息

    //港股分时图坐标
    HQChart.Chart.JSChart.GetMinuteTimeStringData().CreateHKData=()=>{ return HQData.CreateHKData(HQChart.Chart.JSChart.GetMinuteTimeStringData()); }   //替换交易时间段
    HQChart.Chart.JSChart.GetMinuteCoordinateData().GetHKData=(upperSymbol,width)=> { return HQData.GetHKData(upperSymbol,width); }    	//替换X轴刻度信息
}


HQData.NetworkFilter=function(data, callback)
{
    console.log(`[HQData::NetworkFilter] ${HQData.Explain}`, data);

    switch(data.Name) 
    {
        case 'MinuteChartContainer::RequestMinuteData': //分时图数据对接
            HQData.RequestMinuteData(data, callback);
            break;
        case "MinuteChartContainer::RequestHistoryMinuteData":
            HQData.RequestMinuteDaysData(data, callback);
            break;

        case 'KLineChartContainer::RequestHistoryData':                 //日线全量数据下载
            HQData.RequestHistoryData(data,callback);
            break;
        case 'KLineChartContainer::RequestRealtimeData':                //日线实时数据更新
            HQData.RequestRealtimeData(data,callback);
            break;
        case 'KLineChartContainer::RequestFlowCapitalData':             //流通股本
            HQData.RequestFlowCapitalData(data,callback);
            break;

        case 'KLineChartContainer::ReqeustHistoryMinuteData':           //分钟全量数据下载
            HQData.RequestHistoryMinuteData(data, callback);
            break;
        case 'KLineChartContainer::RequestMinuteRealtimeData':          //分钟增量数据更新
            HQData.RequestMinuteRealtimeData(data,callback);
            break;
    }
}

HQData.RequestMinuteData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol[0]; //请求的股票代码
    var dayCount=data.Request.Data.daycount;
    console.log(`[HQData::RequestMinuteData] Symbol=${symbol}`);
    var obj=HQData.GetMinuteApiUrl(symbol,1);

    $.ajax(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvMinuteData(recvData, callback, { Data:data, Obj:obj });                 
        }
    });

}

HQData.RecvMinuteData=function(jsonData, callback, option)
{
    var recvData=JSON.parse(jsonData);
    var data=recvData.data;
    var minuteData=data[option.Obj.FullSymbol];
    var stockInfo=minuteData.qt[option.Obj.FullSymbol];

    var stock={symbol:option.Obj.Symbol, minute:[] };
    stock.name=stockInfo[1];
    stock.yclose=parseFloat(stockInfo[4]);
    stock.date=parseInt(minuteData.data.date);
    
    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var isStockA=HQData.IsSHSZ(symbolUpper);

    var perVol=0;
    var totalAmount=0;
    for(var i=0;i<minuteData.data.data.length; ++i)
    {
        var strItem=minuteData.data.data[i];
        var aryData=strItem.split(' ');
       
        var time=parseInt(aryData[0]);
        var price=parseFloat(aryData[1]);
        var vol=parseFloat(aryData[2]);

        var stockItem=
        { 
            time:time,
            open:price,
            high:price,
            low:price,
            price:price, 
            vol:vol-perVol,
            amount:null,
            avprice:null,
        }

        totalAmount+=(stockItem.vol*stockItem.price);
        stockItem.avprice=totalAmount/vol;  //均价 总金额/总量
        perVol=vol;

        if (isStockA) stockItem.vol*=100;

        stock.minute.push(stockItem);
    }

    var hqchartData={stock:[stock], code:0 };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteDaysData] hqchartData ", hqchartData)
		callback(hqchartData);
    }
}

HQData.RequestMinuteDaysData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol; //请求的股票代码
    var dayCount=data.Request.Data.daycount;
    var symbolUpper=symbol.toUpperCase();
    console.log(`[HQData::RequestMinuteDaysData] Symbol=${symbol}`);
    var obj=HQData.GetMinuteApiUrl(symbol,dayCount);

    $.ajax(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSHFE(symbolUpper) || HQChart.Chart.MARKET_SUFFIX_NAME.IsDCE(symbolUpper) || 
                HQChart.Chart.MARKET_SUFFIX_NAME.IsCZCE(symbolUpper) || HQChart.Chart.MARKET_SUFFIX_NAME.IsCFFEX(symbolUpper))
                HQData.RecvMinuteDaysDataV2(recvData, callback, { Data:data, Obj:obj });      
            else 
                HQData.RecvMinuteDaysData(recvData, callback, { Data:data, Obj:obj });                 
        }
    });
}

HQData.RecvMinuteDaysData=function(jsonData, callback, option)
{
    var recvData=JSON.parse(jsonData);
    var data=recvData.data;
    var minuteData=data[option.Obj.FullSymbol];
    var stockInfo=minuteData.qt[option.Obj.FullSymbol];

    var aryDayData=[];
    var itemDay=null;
    var yClose=parseFloat(stockInfo[4]);
    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var isStockA=HQData.IsSHSZ(symbolUpper);

    for(var i=0;i<minuteData.data.length;++i)
    {
        var dayMinute=minuteData.data[i];
        var date=parseInt(dayMinute.date);
        var itemDay={ minute:[], date:date, yclose: parseFloat(dayMinute.prec) };
        var totalAmount=0, perVol=0;

        for(var j in dayMinute.data)
        {
            var item=dayMinute.data[j];
            var aryData=item.split(" ");

            var price=parseFloat(aryData[1]);
            var vol=parseFloat(aryData[2]);

            var stockItem=[parseInt(aryData[0]), price,price,price,price,vol-perVol,null];

            totalAmount+=(stockItem[5]*price);
            stockItem[7]=totalAmount/vol;  //均价 总金额/总量
            perVol=vol;

            if (isStockA) stockItem[5]*=100;

            itemDay.minute.push(stockItem);
        }

        aryDayData.push(itemDay);
    }
    
    var hqchartData={ symbol:option.Obj.Symbol, name:stockInfo[1], data:aryDayData, code:0 };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteDaysData] hqchartData ", hqchartData)
		callback(hqchartData);
    }
}

HQData.GetInternalSymbol=function(symbol)   //HQChart内置代码转成东方财富代码
{
    var aryData=symbol.split(".");

    var symbolUpper=symbol.toUpperCase()
    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSZ(symbolUpper))
    {
        return { MinuteApi:'minute', DaysMinuteApi:"day", Symbol:'sz'+aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSH(symbolUpper))
    {
        return { MinuteApi:'minute', DaysMinuteApi:"day", Symbol:'sh'+aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsUSA(symbolUpper))
    {
        var value='us.'+aryData[0];
        var arySymbol=aryData[0].split('_');
        if (arySymbol.length>=2) var value=`us${arySymbol[0]}.${arySymbol[1]}`;
        
        return { MinuteApi:'UsMinute', DaysMinuteApi:"dayus", Symbol:value };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsHK(symbolUpper))
    {
        return { MinuteApi:'hkMinute', DaysMinuteApi:"day", Symbol:'hk'+aryData[0] };
    }
}

HQData.VerifyKLineConfig=function(symbol, right, period) //检测复权是否正确
{
    var option={ Right:null, Period:null };
    var market=HQChart.Chart.MARKET_SUFFIX_NAME;
    var symbolUpper=symbol.toUpperCase();
    if (market.IsSHSZIndex(symbolUpper))
    {
        if (right!=0) option.Right=0;
    }
    else if (market.IsUSA(symbolUpper) || market.IsHK(symbolUpper))
    {
        if (period>=4 && period<=8) option.Period=0;

        var aryData=symbol.split(".");
        if (aryData[0]=="HSI" || aryData[0]=="DJI" || aryData[0]=="INX" || aryData[0]=="IXIC")
        {
            if (right!=0) option.Right=0;
        }
        else
        {
            if (right!=0 && right!=1) option.Right=0;
        }
    }

    if (option.Right==null && option.Period==null) return null;
    return option;
}


HQData.GetMinuteApiUrl=function(symbol, dayCount)
{
    var internalSymbol=HQData.GetInternalSymbol(symbol);
    var fullSymbol=internalSymbol.Symbol;
    if (dayCount==1)
    {
        var url=`/web_ifzq_gtimg_cn/appstock/app/${internalSymbol.MinuteApi}/query?code=${fullSymbol}`;
    }
    else
    {
        var url=`/web_ifzq_gtimg_cn/appstock/app/${internalSymbol.DaysMinuteApi}/query?code=${fullSymbol}`;
    }

    return { Url:url, Symbol:symbol, InternalSymbol:internalSymbol, FullSymbol:fullSymbol, DayCount:dayCount };
}

HQData.IsSHSZ=function(symbol)  //是否是A股
{
    return HQChart.Chart.MARKET_SUFFIX_NAME.IsSHSZ(symbol);
}

HQData.IsUSA=function(symbol)
{
    return HQChart.Chart.MARKET_SUFFIX_NAME.IsUSA(symbol);
}

HQData.IsHK=function(symbol)
{
    return HQChart.Chart.MARKET_SUFFIX_NAME.IsHK(symbol);
}

HQData.IsChinaFutures=function(symbol)  //国内期货
{
    return HQChart.Chart.MARKET_SUFFIX_NAME.IsChinaFutures(symbol);
}

HQData.IsShowAvPrice=function(upperSymbol)   //是否显示均价
{
    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsLME(upperSymbol)) return false;
    if (upperSymbol=="UDI.ET") return false;

    return true;
}

HQData.IsShowVolChart=function(upperSymbol) //是否显示第2个成交量图
{
    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsForeignExchange(upperSymbol)) return false;
    if (upperSymbol=="UDI.ET") return false;

    return true;
}

////////////////////////////////////////////////////////////////////////////
// 美股走势图X轴坐标
//
////////////////////////////////////////////////////////////////////////////
HQData.CreateUSAData=function(minuteStringData)
{
    const TIME_SPLIT =
    [
        { Start: 930, End: 1600 }
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}

HQData.GetUSAData=function(upperSymbol,width)
{
    const SHZE_MINUTE_X_COORDINATE =
    {
        Full:   //完整模式
        [
            [0, 0, "rgb(200,200,200)", "9:30"],
            [30, 1, "RGB(200,200,200)", "10:00"],
            [60, 0, "RGB(200,200,200)", "10:30"],
            [90, 1, "RGB(200,200,200)", "11:00"],
            [120, 0, "RGB(200,200,200)", "11:30"],
            [150, 1, "RGB(200,200,200)", "12:00"],
            [180, 0, "RGB(200,200,200)", "12:30"],
            [210, 1, "RGB(200,200,200)", "13:00"],
            [240, 0, "RGB(200,200,200)", "13:30"], 
            [270, 1, "RGB(200,200,200)", "14:00"], 
            [300, 0, "RGB(200,200,200)", "14:30"], 
            [330, 1, "RGB(200,200,200)", "15:00"], 
            [360, 0, "RGB(200,200,200)", "15:30"], 
            [390, 1, "RGB(200,200,200)", "16:00"], 
        ],
        Simple: //简洁模式
        [
            [0, 0, "rgb(200,200,200)", "21:30"],
            [90, 1, "RGB(200,200,200)", "23:00"],
            [150, 1, "RGB(200,200,200)", "00:00"],
            [270, 1, "RGB(200,200,200)", "02:00"], 
            [390, 1, "RGB(200,200,200)", "04:00"], 
        ],
        Min:   //最小模式     
        [
            [0, 0, "rgb(200,200,200)", "21:30"],
            [210, 1, "RGB(200,200,200)", "01:00"],
            [390, 1, "RGB(200,200,200)", "04:00"], 
        ],

        Count: 391,         //!! 一共的分钟数据个数，不要填错了
        MiddleCount: 195,   // Count/2 就可以。

        GetData: function (width) 
        {
            if (width < 200) return this.Min;
            else if (width < 400) return this.Simple;

            return this.Full;
        }
    };

    return SHZE_MINUTE_X_COORDINATE;
}


////////////////////////////////////////////////////////////////////////////
// A股走势图X轴坐标
//
///////////////////////////////////////////////////////////////////////////
HQData.CreateSHSZData=function(minuteStringData)
{
    const TIME_SPLIT =
    [
        { Start: 930, End: 1130 },
        { Start: 1300, End: 1500 }
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}


HQData.GetSHSZData=function(upperSymbol,width)
{
    const SHZE_MINUTE_X_COORDINATE =
    {
        Full:   //完整模式
        [
            [0, 0, "rgb(200,200,200)", "09:30"],
            [31, 0, "RGB(200,200,200)", "10:00"],
            [61, 0, "RGB(200,200,200)", "10:30"],
            [91, 0, "RGB(200,200,200)", "11:00"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [150, 0, "RGB(200,200,200)", "13:30"],
            [180, 0, "RGB(200,200,200)", "14:00"],
            [210, 0, "RGB(200,200,200)", "14:30"],
            [240, 1, "RGB(200,200,200)", "15:00"], // 15:00
        ],
        Simple: //简洁模式
        [
            [0, 0, "rgb(200,200,200)", "09:30"],
            [61, 0, "RGB(200,200,200)", "10:30"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [180, 0, "RGB(200,200,200)", "14:00"],
            [240, 1, "RGB(200,200,200)", "15:00"]
        ],
        Min:   //最小模式     
        [
            [0, 0, "rgb(200,200,200)", "09:30"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [240, 1, "RGB(200,200,200)", "15:00"]
        ],

        Count: 242,         //!! 一共的分钟数据个数，不要填错了
        MiddleCount: 121,   // Count/2 就可以。

        GetData: function (width) 
        {
            if (width < 200) return this.Min;
            else if (width < 400) return this.Simple;

            return this.Full;
        }
    };

    return SHZE_MINUTE_X_COORDINATE;
}

///////////////////////////////////////////////////////////////////////////////////////
// 港股走势图X轴坐标
//
///////////////////////////////////////////////////////////////////////////////////////
HQData.CreateHKData=function(minuteStringData)
{
    const TIME_SPLIT =
    [
        { Start: 930, End: 1200 },
        { Start: 1300, End: 1600 }
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}

HQData.GetHKData=function(upperSymbol,width)
{
    const HK_MINUTE_X_COORDINATE =
    {
        Full:   //完整模式
        [
            [0, 1, "RGB(200,200,200)", "09:30"],
            [30, 0, "RGB(200,200,200)", "10:00"],
            [60, 1, "RGB(200,200,200)", "10:30"],
            [90, 0, "RGB(200,200,200)", "11:00"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [151, 0, "RGB(200,200,200)", "13:00"],
            [181, 1, "RGB(200,200,200)", "13:30"],
            [211, 0, "RGB(200,200,200)", "14:00"],
            [241, 1, "RGB(200,200,200)", "14:30"],
            [271, 0, "RGB(200,200,200)", "15:00"],
            [301, 1, "RGB(200,200,200)", "15:30"],
            [331, 1, "RGB(200,200,200)", "16:00"]
        ],
        Simple: //简洁模式
        [
            [0, 1, "RGB(200,200,200)", "09:30"],
            [60, 1, "RGB(200,200,200)", "10:30"],
            [120, 1, "RGB(200,200,200)", "11:30"],
            [211, 0, "RGB(200,200,200)", "14:00"],
            [271, 0, "RGB(200,200,200)", "15:00"],
            [331, 1, "RGB(200,200,200)", "16:00"]
        ],
        Min:   //最小模式     
        [
            [0, 1, "RGB(200,200,200)", "09:30"],
            [151, 0, "RGB(200,200,200)", "13:00"],
            [331, 1, "RGB(200,200,200)", "16:00"]
        ],

        Count: 332,
        MiddleCount: 150,

        GetData: function (width) 
        {
            if (width < 200) return this.Min;
            else if (width < 450) return this.Simple;

            return this.Full;
        }
    };
    return HK_MINUTE_X_COORDINATE;
}


///////////////////////////////////////////////////////////////////////////////////
//K线数据对接
//
/////////////////////////////////////////////////////////////////////////////////
HQData.GetKLineApiUrl=function(symbol, period, right, option)
{
    //https://proxy.finance.qq.com/ifzqgtimg/appstock/app/newfqkline/get?_var=kline_weekqfq&param=sh000001,week,,,320,qfq&r=0.09632182280143753
    //https://web.ifzq.gtimg.cn/appstock/app/kline/kline?_var=kline_week&param=usMSFT.OQ,week,,,320,&r=0.7123346118268281

    var symbolUpper=symbol.toUpperCase();
    var internalSymbol=HQData.GetInternalSymbol(symbol);
    var internalPeriod=HQData.GetInternalPeriod(period);
    var count=320;
    if (option && option.Update==true) count=1;
    var internalRight='';

    if (internalSymbol.Symbol=="hkHSI") right=0;
    if (right==0)
    {
        if (HQChart.Chart.MARKET_SUFFIX_NAME.IsUSA(symbolUpper))
        {
            var url=`web_ifzq_gtimg_cn/appstock/app/kline/kline?&param=${internalSymbol.Symbol},${internalPeriod},,,${count}`;
        }
        else
        {
            var url=`proxy_finance_qq_com/ifzqgtimg/appstock/app/newkline/newkline?&param=${internalSymbol.Symbol},${internalPeriod},,,${count}`;
        }
        
    }
    else
    {
        var internalRight=HQData.GetInternalRight(right);
        if (HQChart.Chart.MARKET_SUFFIX_NAME.IsHK(symbolUpper))
        {
            var url=`web_ifzq_gtimg_cn/appstock/app/hkfqkline/get?param=${internalSymbol.Symbol},${internalPeriod},,,${count},${internalRight}`;
        }
        else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsUSA(symbolUpper))
        {
            var url=`web_ifzq_gtimg_cn/appstock/app/usfqkline/get?param=${internalSymbol.Symbol},${internalPeriod},,,${count},${internalRight}`;
        }
        else
        {
            var url=`proxy_finance_qq_com/ifzqgtimg/appstock/app/newfqkline/get?param=${internalSymbol.Symbol},${internalPeriod},,,${count},${internalRight}`;
        }
    }
            

    return { Url:url, Symbol:symbol, InternalSymbol:internalSymbol, Period:period, Right:right, PeriodName:internalPeriod, RightName:internalRight };
}

HQData.GetMinuteKLineApiUrl=function(symbol, period, right, option)
{
    //https://ifzq.gtimg.cn/appstock/app/kline/mkline?param=sh000001,m5,,320&_var=m5_today&r=0.44156599027143195

    var internalSymbol=HQData.GetInternalSymbol(symbol);
    var internalPeriod=HQData.GetInternalPeriod(period);
    var count=320;

    if (option && option.Update==true)
    {
        count=2;
        var url=`ifzq_gtimg_cn/appstock/app/kline/mkline?param=${internalSymbol.Symbol},${internalPeriod},,${count}`;
    }
    else
    {
        var url=`ifzq_gtimg_cn/appstock/app/kline/mkline?param=${internalSymbol.Symbol},${internalPeriod},,${count}`;
    }

    return { Url:url, Symbol:symbol, InternalSymbol:internalSymbol, Period:period, Right:right, PeriodName:internalPeriod };
}

HQData.GetInternalPeriod=function(periodID)
{
    var MAP_PERIOD=new Map(
        [
            [0, 'day'],   //day
            [1, 'week'],   //week
            [2, 'month'],   //month

            [5, 'm5'],    //5min
            [6, 'm15'],   //15min
            [7, 'm30'],   //30min
            [8, 'm60'],   //60min
        ]
    );

    return MAP_PERIOD.get(periodID);
}

HQData.GetInternalRight=function(right)
{
    if (right==0) return '';
    if (right==2) return "hfq";
    return 'qfq';
}

HQData.IsEnableRight=function(period, symbol)   //是否支持复权
{
    if (period>=5 && period<=8) return false;   //分钟不支持复权
    var symbolUpper=symbol.toUpperCase();
    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSHSZStockA(symbolUpper)) return true;

    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsHK(symbolUpper))
    {
        var indexList=new Set
        (
            ["HSI.HK"]
        );

        if (indexList.has(symbolUpper)) return false; //指数不支持复权

        return true;
    }

    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsUSA(symbolUpper))
    {
        var indexList=new Set
        (
            ["DJI.USA", "IXIC.USA", "INX.USA"]
        );

        if (indexList.has(symbolUpper)) return false; //指数不支持复权

        return true;
    }

    return false;
}

HQData.RequestFlowCapitalData=function(data,callback)
{
    data.PreventDefault=true;
    var hqChartData={code:0, stock:[]}; //如果没有数据就填空
	
	if (data.Self.IsDestroy==false)
	{
		callback(hqChartData);
	}
}

HQData.RequestHistoryData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol; //请求的股票代码
    var period=data.Self.Period;    //周期
    var right=data.Self.Right;      //复权

    console.log(`[HQData::RequestHistoryData] Symbol=${symbol}`);
    var obj=HQData.GetKLineApiUrl(symbol,period, right, null);

    $.ajax(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvHistoryData(recvData, callback, { Data:data, Obj:obj });                 
        }
    });

}

HQData.RecvHistoryData=function(jsonData, callback, option)
{
    var recvData=JSON.parse(jsonData);
    var data=recvData.data;
    var klinedata=data[option.Obj.InternalSymbol.Symbol];
    var stockInfo=klinedata.qt[option.Obj.InternalSymbol.Symbol];
    var hqChartData={code:0, data:[]};
    hqChartData.symbol=option.Obj.Symbol;
    hqChartData.name=stockInfo[1];
    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var isStockA=HQData.IsSHSZ(symbolUpper);

    var yClose=parseFloat(klinedata.prec);
    var aryData=klinedata[`${option.Obj.RightName}${option.Obj.PeriodName}`];
    if (!aryData) aryData=klinedata[option.Obj.PeriodName];
    for(var i=0;i<aryData.length; ++i)
    {
        var item=aryData[i];
        var aryDate = item[0].split('-')
        var date=parseInt(aryDate[0])*10000+parseInt(aryDate[1])*100+parseInt(aryDate[2]);
        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5]);
       
        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5]);
        var amount=parseFloat(item[6]);

        if (isStockA) vol*=100;

        var newItem=[ date, yClose, open, high, low, close, vol, amount];
        hqChartData.data.push(newItem);

        yClose=close;
    }


    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvHistoryData] hqchartData ", hqChartData)
		callback(hqChartData);
    }
}

HQData.RequestRealtimeData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol[0];     //请求的股票代码
    var period=data.Self.Period;    //周期
    var right=data.Self.Right;      //复权
    var dateRange=data.Self.ChartPaint[0].Data.GetDateRange();

    var option={ Update:true };
    if (dateRange && dateRange.End && dateRange.End.Date>0) option.End=dateRange.End.Date;

    console.log(`[HQData::RequestRealtimeData] Symbol=${symbol}`);
    var obj=HQData.GetKLineApiUrl(symbol,period, right, option);

    $.ajax(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvRealtimeData(recvData, callback, { Data:data, Obj:obj });                 
        }
    });
}

HQData.RecvRealtimeData=function(jsonData, callback, option)
{
    var recvData=JSON.parse(jsonData);
    var data=recvData.data;
    var klinedata=data[option.Obj.InternalSymbol.Symbol];
    var stockInfo=klinedata.qt[option.Obj.InternalSymbol.Symbol];

    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var isStockA=HQData.IsSHSZ(symbolUpper);

    var stock={symbol:option.Obj.Symbol, name:stockInfo[1] };
    var yClose=parseFloat(klinedata.prec);
    var aryData=klinedata[`${option.Obj.RightName}${option.Obj.PeriodName}`];
    if (!aryData) aryData=klinedata[option.Obj.PeriodName];
    
    for(var i=0;i<aryData.length; ++i)
    {
        var item=aryData[i];
        var aryDate = item[0].split('-')
        var date=parseInt(aryDate[0])*10000+parseInt(aryDate[1])*100+parseInt(aryDate[2]);

        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5]);
        var amount=parseFloat(item[6]);

        if (isStockA) vol*=100;

        stock.yclose=yClose;
        stock.open=open;
        stock.high=high;
        stock.low=low;
        stock.price=close;
        stock.vol=vol;
        stock.amount=amount;
        stock.date=date;

        yClose=close;
    }

    var hqchartData={code:0, stock:[stock] };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvRealtimeData] hqchartData ", hqchartData)
		callback(hqchartData);
    }
}

HQData.RequestHistoryMinuteData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol; //请求的股票代码
    var period=data.Self.Period;    //周期
    var right=data.Self.Right;      //复权

    console.log(`[HQData::RequestHistoryMinuteData] Symbol=${symbol}`);
    var obj=HQData.GetMinuteKLineApiUrl(symbol,period, right, null);

    $.ajax(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvHistoryMinuteData(recvData, callback, { Data:data, Obj:obj });                 
        }
    });

}

HQData.RecvHistoryMinuteData=function(jsonData, callback, option)
{
    var recvData=JSON.parse(jsonData);
    var data=recvData.data;
    var klinedata=data[option.Obj.InternalSymbol.Symbol];
    var stockInfo=klinedata.qt[option.Obj.InternalSymbol.Symbol];

    var hqChartData={code:0, data:[]};
    hqChartData.symbol=option.Obj.Symbol;
    hqChartData.name=stockInfo[1];

    var aryData=klinedata[option.Obj.PeriodName];
    var yClose=parseFloat(klinedata.prec);
    for(var i=0;i<aryData.length; ++i)
    {
        var item=aryData[i];
        var value=parseInt(item[0]);
        var date=parseInt(value/10000);
        var time=value%10000;
       
        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5]);
        var amount=null;

        var newItem=[ date, yClose, open, high, low, close, vol, amount, time];
        hqChartData.data.push(newItem);

        yClose=close;
    }


    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvHistoryMinuteData] hqchartData ", hqChartData)
		callback(hqChartData);
    }
}

HQData.RequestMinuteRealtimeData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol[0];     //请求的股票代码
    var period=data.Self.Period;    //周期
    var right=data.Self.Right;      //复权
    var dateRange=data.Self.ChartPaint[0].Data.GetDateRange();

    var option={ Update:true };
    console.log(`[HQData::RequestMinuteRealtimeData] Symbol=${symbol}`);
    var obj=HQData.GetMinuteKLineApiUrl(symbol,period, right, option);

    $.ajax(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvMinuteRealtimeData(recvData, callback, { Data:data, Obj:obj });                 
        }
    });
}

HQData.RecvMinuteRealtimeData=function(jsonData, callback, option)
{
    var recvData=JSON.parse(jsonData);
    var data=recvData.data;
    var klinedata=data[option.Obj.InternalSymbol.Symbol];
    var stockInfo=klinedata.qt[option.Obj.InternalSymbol.Symbol];

    var hqChartData={code:0, data:[], ver:2.0, symbol:option.Obj.Symbol, name:stockInfo[1]}; //更新数据使用2.0版本格式
    var aryData=klinedata[option.Obj.PeriodName];
    var yClose=parseFloat(klinedata.prec);
    for(var i=0;i<aryData.length; ++i)
    {
        var item=aryData[i];
        
        var value=parseInt(item[0]);
        var date=parseInt(value/10000);
        var time=value%10000;
       
        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5]);
        var amount=null;

        var newItem=[ date, yClose, open, high, low, close, vol, amount, time];
        hqChartData.data.push(newItem);

        yClose=close;
    }

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteRealtimeData] hqchartData ", hqChartData)
		callback(hqChartData);
    }
}

export default
{
	HQData:HQData
}
