/*
   Copyright (c) 2018 jones
 
    http://www.apache.org/licenses/LICENSE-2.0

   开源项目 https://github.com/jones2000/HQChart
 
   jones_2000@163.com

   行情数据对接,使用东方财富网页数据做为案例的测试数据源
   教程中所有的实例中使用的数据都来自互联网,或测试数据。仅用于学习HQChart图形使用. 教程禁止用于商业产品
*/

// #ifdef H5
import HQChart from '@/uni_modules/jones-hqchart2/js_sdk/umychart.uniapp.h5.js'

var MARKET_SUFFIX_NAME=HQChart.MARKET_SUFFIX_NAME;
var JSChart=HQChart.JSChart;
// #endif


// #ifndef H5
import { JSCommon } from "@/uni_modules/jones-hqchart2/js_sdk/umychart.wechat.3.0.js";
import { JSCommonCoordinateData_MARKET_SUFFIX_NAME as MARKET_SUFFIX_NAME } from '@/uni_modules/jones-hqchart2/js_sdk/umychart.coordinatedata.wechat.js'
import { JSCommonHQStyle} from '@/uni_modules/jones-hqchart2/js_sdk/umychart.style.wechat.js'

var JSChart=JSCommon.JSChart;
// #endif

function HQData()  { }

HQData.Explain="东财财富网接口";

HQData.ChangeStyle=function()
{
	// #ifdef H5
	var blackStyle=HQChart.HQChartStyle.GetStyleConfig(HQChart.STYLE_TYPE_ID.BLACK_ID);
	HQChart.JSChart.SetStyle(blackStyle);
	// #endif
	
	// #ifndef H5
	var blackStyle=JSCommonHQStyle.GetStyleConfig(JSCommonHQStyle.STYLE_TYPE_ID.BLACK_ID);
	JSCommon.JSChart.SetStyle(blackStyle);
	// #endif
}

HQData.SetMinuteChartCoordinate=function()
{
    MARKET_SUFFIX_NAME.IsShowAvPrice=(upperSymbol)=>{ return HQData.IsShowAvPrice(upperSymbol); }
    MARKET_SUFFIX_NAME.IsEnableRight=(period, symbol)=> { return HQData.IsEnableRight(period, symbol); }

    //美股分时图坐标
    JSChart.GetMinuteTimeStringData().CreateUSAData=()=>{ return HQData.CreateUSAData(JSChart.GetMinuteTimeStringData()); }  //替换交易时间段
    JSChart.GetMinuteCoordinateData().GetUSAData=(upperSymbol,width)=> { return HQData.GetUSAData(upperSymbol,width); }    	//替换X轴刻度信息

    //A股分时图坐标
    JSChart.GetMinuteTimeStringData().CreateSHSZData=()=>{ return HQData.CreateSHSZData(JSChart.GetMinuteTimeStringData()); }  //替换交易时间段
    JSChart.GetMinuteCoordinateData().GetSHSZData=(upperSymbol,width)=> { return HQData.GetSHSZData(upperSymbol,width); }    	//替换X轴刻度信息

    //港股分时图坐标
    JSChart.GetMinuteTimeStringData().CreateHKData=()=>{ return HQData.CreateHKData(JSChart.GetMinuteTimeStringData()); }   //替换交易时间段
    JSChart.GetMinuteCoordinateData().GetHKData=(upperSymbol,width)=> { return HQData.GetHKData(upperSymbol,width); }    	//替换X轴刻度信息

    //外汇分时图坐标
    JSChart.GetMinuteTimeStringData().CreateForeignExchangeData=()=>{ return HQData.CreateForeignExchangeData(JSChart.GetMinuteTimeStringData()); }  //替换交易时间段
    JSChart.GetMinuteCoordinateData().GetForeignExchangeData=(upperSymbol,width)=> { return HQData.GetForeignExchangeData(upperSymbol,width); }    	//替换X轴刻度信息

    //期货
    var chinaFutrues=JSChart.GetChinaFuturesTimeData();
    chinaFutrues.AddNewFutures({ Suffix:'.SHF', Symbol:"WR", Time:9, Decimal:2, Name:'线材' }); //obj= { Suffix:后缀, Symbol:品种代码, Time:交易时间段, Decimal:小数位数, Name:名字 }
    chinaFutrues.AddNewFutures({ Suffix:'.DCE', Symbol:"BB", Time:9, Decimal:2, Name:'胶合板' });
    chinaFutrues.AddNewFutures({ Suffix:'.DCE', Symbol:"JD", Time:9, Decimal:2, Name:'鸡蛋' });
    chinaFutrues.AddNewFutures({ Suffix:'.DCE', Symbol:"LH", Time:9, Decimal:2, Name:'生猪' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"WH", Time:9, Decimal:0, Name:'强麦' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"PM", Time:9, Decimal:0, Name:'普麦' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"RI", Time:9, Decimal:0, Name:'早籼稻' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"RS", Time:9, Decimal:0, Name:'菜籽' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"JR", Time:9, Decimal:0, Name:'粳稻' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"LR", Time:9, Decimal:0, Name:'晚籼稻' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"LR", Time:9, Decimal:0, Name:'晚籼稻' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"SM", Time:9, Decimal:0, Name:'锰硅' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"SF", Time:9, Decimal:0, Name:'硅铁' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"AP", Time:9, Decimal:0, Name:'苹果' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"CJ", Time:9, Decimal:0, Name:'红枣' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"UR", Time:9, Decimal:0, Name:'尿素' });
    chinaFutrues.AddNewFutures({ Suffix:'.CZC', Symbol:"PK", Time:9, Decimal:0, Name:'花生' });

    //芝加哥期货交易所
    var futrues=JSChart.GetInternalTimeData("CBOTTimeData");
    futrues.AddNewFutures({Symbol:"ZW", Time:3, Decimal:2, Name:'小麦' });
    futrues.AddNewFutures({Symbol:"XW", Time:4, Decimal:2, Name:'迷你小麦' });
    futrues.AddNewFutures({Symbol:"ZC", Time:3, Decimal:2, Name:'玉米' });
    futrues.AddNewFutures({Symbol:"XC", Time:4, Decimal:2, Name:'迷你玉米' });
    futrues.AddNewFutures({Symbol:"ZS", Time:3, Decimal:2, Name:'大豆' });
    futrues.AddNewFutures({Symbol:"XK", Time:4, Decimal:2, Name:'迷你大豆' });
    futrues.AddNewFutures({Symbol:"ZL", Time:3, Decimal:2, Name:'豆油' });
    futrues.AddNewFutures({Symbol:"ZM", Time:3, Decimal:2, Name:'豆粕' });
    futrues.AddNewFutures({Symbol:"ZO", Time:3, Decimal:2, Name:'燕麦' });
    futrues.AddNewFutures({Symbol:"ZR", Time:3, Decimal:2, Name:'稻谷' });
    futrues.AddNewFutures({Symbol:"ZL", Time:3, Decimal:2, Name:'豆油' });
    futrues.AddNewFutures({Symbol:"NQ", Time:5, Decimal:2, Name:'小型纳指' });
    futrues.AddNewFutures({Symbol:"ES", Time:5, Decimal:2, Name:'小型标普' });
    futrues.AddNewFutures({Symbol:"YM", Time:5, Decimal:0, Name:'小型道指' });

    //美国洲际交易所
    var futrues=JSChart.GetInternalTimeData("IPETimeData");
    var lIndex=futrues.TIME_SPLIT.length;
    futrues.TIME_SPLIT[lIndex]=HQData.GetCustomTradeTimeData("IPE_G");
    futrues.TIME_SPLIT2[lIndex]=HQData.GetCustomTradeTimeData("IPE_G_2");
    futrues.AddNewFutures({Symbol:"G", Time:lIndex, Decimal:0, Name:'低硫柴油' });

    //自定义类型
    JSChart.GetMinuteTimeStringData().GetET=(upperSymbol)=>{ return HQData.GetETTimeData(upperSymbol,JSChart.GetMinuteTimeStringData()); }              //当天所有的交易时间点
    JSChart.GetMinuteCoordinateData().GetETData=(upperSymbol)=> { return HQData.GetETData(upperSymbol); }   //X轴刻度设置
    MARKET_SUFFIX_NAME.GetETDecimal = (symbol)=> { return HQData.GetETDecimal(symbol); } // 不同品种，使用不同小数位数
    MARKET_SUFFIX_NAME.IsETShowAvPrice=(symbol)=> {return false; }   //提示信息是否显示均线数值
    MARKET_SUFFIX_NAME.GetETMarketStatus=(symbol)=> { return 2; }   //获取市场状态 0=闭市 1=盘前 2=盘中 3=盘后
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

HQData.StringToDateTime=function(strTime)
{
    //2021-08-16 10:00 => { Date:20210816， Time:1000 }
    var aryData=strTime.split(' ');
    var aryValue=aryData[0].split('-');
    var date=parseInt(aryValue[0])*10000+parseInt(aryValue[1])*100+parseInt(aryValue[2]);

    aryValue=aryData[1].split(':');
    var time=parseInt(aryValue[0])*100+parseInt(aryValue[1]);

    return { Date:date, Time:time };
}

HQData.InvokeCallback=function(hqChartData, callback )
{
	// #ifdef H5
	callback(hqChartData);
	// #endif
	
	// #ifndef H5
	callback({data:hqChartData});
	// #endif
}

HQData.RequestMinuteData=function(data, callback)
{
    data.PreventDefault=true;
    var symbol=data.Request.Data.symbol[0]; //请求的股票代码
    var dayCount=data.Request.Data.daycount;
    console.log(`[HQData::RequestMinuteData] Symbol=${symbol}`);
    var obj=HQData.GetMinuteApiUrl(symbol,1);

    wx.request(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {

            HQData.RecvMinuteData(recvData.data, callback, { Data:data, Obj:obj });                 
        }
    });

}

HQData.RecvMinuteData=function(recvData, callback, option)
{
    var data=recvData.data;

    var stock={symbol:option.Obj.Symbol, minute:[] };
    stock.name=data.name;
    stock.yclose=data.preClose;

    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var isStockA=MARKET_SUFFIX_NAME.IsSHSZ(symbolUpper);
    var isChinaFutrues=MARKET_SUFFIX_NAME.IsChinaFutures(symbolUpper);
    var isLME=MARKET_SUFFIX_NAME.IsLME(symbolUpper);  //伦敦金属交易所
    if (isChinaFutrues) stock.yclearing=data.preSettlement; //期货昨结算价

    for(var i=0;i<data.trends.length; ++i)
    {
        var strItem=data.trends[i];
        var item=strItem.split(',');
        var today = HQData.StringToDateTime(item[0]);  
        var date=today.Date;
        var time=today.Time;
        var stockItem=
        { 
            date:date,
            time:time,
            open:parseFloat(item[1]),
            high:parseFloat(item[2]),
            low:parseFloat(item[3]),
            price:parseFloat(item[4]), 
            vol:parseFloat(item[5]),
            amount:parseFloat(item[6]),
            avprice:parseFloat(item[7]),
        }

        if (isStockA) stockItem.vol*=100;
        if (isLME) stockItem.avprice=null;

        stock.date=date;
        stock.minute.push(stockItem);
    }

    var hqchartData={stock:[stock], code:0 };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteDaysData] hqchartData ", hqchartData);
		HQData.InvokeCallback(hqchartData, callback);
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

    wx.request(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            if (MARKET_SUFFIX_NAME.IsSHFE(symbolUpper) || MARKET_SUFFIX_NAME.IsDCE(symbolUpper) || 
                MARKET_SUFFIX_NAME.IsCZCE(symbolUpper) || MARKET_SUFFIX_NAME.IsCFFEX(symbolUpper))
                HQData.RecvMinuteDaysDataV2(recvData.data, callback, { Data:data, Obj:obj });      
            else 
                HQData.RecvMinuteDaysData(recvData.data, callback, { Data:data, Obj:obj });                 
        }
    });
}

HQData.RecvMinuteDaysData=function(recvData, callback, option)
{
    var data=recvData.data;
    var aryDayData=[];
    var itemDay=null;
    var yClose=data.preClose;
    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var isStockA=MARKET_SUFFIX_NAME.IsSHSZ(symbolUpper);

    var xDatetime=JSChart.GetMinuteTimeStringData().GetTimeData(symbol);
    var firstTime=xDatetime[0]; //第1个数据的时间
    var minuteCount=xDatetime.length;
    var i=0;
    for(i=0;i<data.trends.length;++i)
    {
        var strItem=data.trends[i];
        var item=strItem.split(',');
        var today = HQData.StringToDateTime(item[0]);  
        var date=today.Date;
        var time=today.Time;
        if (time==firstTime) break;
    }
    
    for(var j=0;i<data.trends.length; ++i, ++j)
    {
        var strItem=data.trends[i];
        var item=strItem.split(',');
        var today = HQData.StringToDateTime(item[0]);  
        var date=today.Date;
        var time=today.Time;

        if (j%minuteCount==0)
        {
            if (itemDay && itemDay.minute.length>0) aryDayData.push(itemDay);
            itemDay={ minute:[], date:date, yclose: yClose };
        }

        var price=parseFloat(item[4]);
        var stockItem=
        { 
            date:date,
            time:time,
            open:price,
            high:price,
            low:price,
            price:price, 
            amount:parseFloat(item[6]),
            vol:parseFloat(item[5]),
            avprice:parseFloat(item[7]),
        }

        if (isStockA) stockItem.vol*=100;

        itemDay.minute.push([stockItem.time, stockItem.open, stockItem.high, stockItem.low, stockItem.price, stockItem.vol, stockItem.amount, stockItem.avprice, stockItem.date]);
    }

    if (itemDay && itemDay.minute.length>0) aryDayData.push(itemDay);

    aryDayData=aryDayData.reverse();

    var hqchartData={ symbol:option.Obj.Symbol, name:data.name, data:aryDayData, code:0 };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteDaysData] hqchartData ", hqchartData);
		HQData.InvokeCallback(hqchartData, callback);
    }
}

//期货模式
HQData.RecvMinuteDaysDataV2=function(recvData, callback, option)
{
    var data=recvData.data;
    var aryDayData=[];
    var yClose=data.preClose;
    var symbol=option.Obj.Symbol;
    var symbolUpper=symbol.toUpperCase();
    var yClearing=data.preSettlement; //期货昨结算价

    var xDatetime=JSChart.GetMinuteTimeStringData().GetTimeData(symbol);
    var endTime=xDatetime[xDatetime.length-1]; //最后个数据的时间
    var minuteCount=xDatetime.length;
    
    var itemDay={ minute:[], date:null, yclose: yClose, yclearing:yClearing };
    for(var i=0;i<data.trends.length; ++i)
    {
        var strItem=data.trends[i];
        var item=strItem.split(',');
        var today = new Date(Date.parse(item[0]));  
        var date=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
        var time=today.getHours()*100+today.getMinutes();

        var price=parseFloat(item[4]);
        var stockItem=
        { 
            date:date,
            time:time,
            open:price,
            high:price,
            low:price,
            price:price, 
            amount:parseFloat(item[6]),
            vol:parseFloat(item[5]),
            avprice:parseFloat(item[7]),
        }

        itemDay.date=date;
        itemDay.minute.push([stockItem.time, stockItem.open, stockItem.high, stockItem.low, stockItem.price, stockItem.vol, stockItem.amount, stockItem.avprice, stockItem.date]);

        if (time==endTime)
        {
            if (itemDay && itemDay.minute.length>0) aryDayData.push(itemDay);
            itemDay={ minute:[], date:null, yclose: yClose, yclearing:yClearing };
        }
    }

    if (itemDay && itemDay.minute.length>0) aryDayData.push(itemDay);

    var preClose=null, preAvprice=null, preDate=null;
    for(var i=0;i<aryDayData.length-1;++i)
    {
        var itemDay=aryDayData[i];
        var newMinuteData=HQData.CorrectMinuteData(itemDay.minute, xDatetime);
        if (newMinuteData)
        {
            for(var j=0;j<newMinuteData.length;++j)
            {
                var item=newMinuteData[j];
                if (item.length==1)
                {
                    item[1]= item[2]= item[3]=item[4]=preClose;
                    item[5]=item[6]=0;
                    item[7]=preAvprice;
                    item[8]=preDate;
                }
                else
                {
                    preClose=item[4];
                    preAvprice=item[7];
                    preDate=item[8];
                }
            }
            itemDay.minute=newMinuteData;
        } 
        else
        {
            var item=itemDay.minute[itemDay.minute.length-1];
            preClose=item[4];
            preAvprice=item[7];
            preDate=item[8];
        }
    }

    aryDayData=aryDayData.reverse();

    var hqchartData={ symbol:option.Obj.Symbol, name:data.name, data:aryDayData, code:0 };

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteDaysDataV2] hqchartData ", hqchartData);
		HQData.InvokeCallback(hqchartData, callback);
    }
}

HQData.CorrectMinuteData=function(minuteData, xDatetime)
{
    if (minuteData.length==xDatetime.length) return null;

    var mapData=new Map();
    for(var i=0;i<xDatetime.length; ++i)
    {
        var item=xDatetime[i];
        mapData.set(item, { Index:i, Time:item, Data:null });
    }

    for(var i=0;i<minuteData.length;++i)
    {
        var item=minuteData[i];
        var time=item[0];

        var findItem=mapData.get(time);
        findItem.Data=item;
    }

    var newMinuteData=[];
    for(var item of mapData)
    {
        var value=item[1];

        if (value.Data) newMinuteData[value.Index]=value.Data;
        else newMinuteData[value.Index]=[value.Time];
    }

    return newMinuteData;
}


HQData.GetInternalSymbol=function(symbol)   //HQChart内置代码转成东方财富代码
{
    var aryData=symbol.split(".");
    var symbolUpper=symbol.toUpperCase();
    var arySymbol=aryData[0].split('_');
    var market=parseInt(arySymbol[1]);
    var internalSymbol=arySymbol[0] ;

    if (internalSymbol.indexOf("-")>0)
    {
        var aryValue=internalSymbol.split('-');
        internalSymbol=aryValue[1];
    }
    
    return { Market:market, Symbol:internalSymbol };
    /*

    if (HQChart.Chart.MARKET_SUFFIX_NAME.IsUSA(symbolUpper))    //美股
    {
        var market= 105;
        var set106Market=new Set(
            ["RENN", "DIDI","BABA","ZH"]
        );
    
        var set100Market=new Set
        (
            ["DJIA", "SPX", "NDX"]
        )
    
        if (set106Market.has(aryData[0])) market=106;
        else if (set100Market.has(aryData[0])) market=100;
    
        return { Market:market, Symbol:aryData[0].toUpperCase() };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSZ(symbolUpper))
    {
        return { Market:0, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSH(symbolUpper))
    {
        return { Market:1, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsHK(symbolUpper))    //港股
    {
        var market=116;

        var set100Market=new Set
        (
            ["HSI"]
        );
        if (set100Market.has(aryData[0])) market=100;

        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsForeignExchange(symbolUpper))   //外汇
    {
        var market=119;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsSHFE(symbolUpper))
    {
        var market=113;

        //上期能源
        if (symbolUpper.indexOf("SC")==0 || symbolUpper.indexOf("NR")==0 || 
            symbolUpper.indexOf("LU")==0 ||symbolUpper.indexOf("BC")==0) 
            market=142;

        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsDCE(symbolUpper))
    {
        var market=114;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsCZCE(symbolUpper))
    {
        var market=115;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsCFFEX(symbolUpper))
    {
        var market=8;
        var arySymbol=aryData[0].split('_');
        return { Market:market, Symbol:arySymbol[1] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsCBOT(symbolUpper))
    {
        var market=103;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsNYMEX(symbolUpper))
    {
        var market=102;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsCOMEX(symbolUpper))
    {
        var market=101;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsNYBOT(symbolUpper))
    {
        var market=108;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsLME(symbolUpper))
    {
        var market=109;
        var arySymbol=aryData[0].split('_');
        return { Market:market, Symbol:arySymbol[1] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsTOCOM(symbolUpper))
    {
        var market=111;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsIPE(symbolUpper))
    {
        var market=112;
        return { Market:market, Symbol:aryData[0] };
    }
    else if (HQChart.Chart.MARKET_SUFFIX_NAME.IsET(symbolUpper))
    {
        var market=100;
        var set100Market=new Set
        (
            ["UDI"]
        );
        if (set100Market.has(aryData[0])) market=100;

        return { Market:market, Symbol:aryData[0] };
    }
    */
}

HQData.GetMinuteApiUrl=function(symbol, dayCount)
{
    var internalSymbol=HQData.GetInternalSymbol(symbol);
    //var url=`http://push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&secid=${internalSymbol.Market}.${internalSymbol.Symbol}&ndays=1&iscr=0&iscca=0`
    var url=`https://push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&secid=${internalSymbol.Market}.${internalSymbol.Symbol}&ndays=${dayCount}&iscr=0&iscca=0`

    return { Url:url, Symbol:symbol, InternalSymbol:internalSymbol, DayCount:dayCount };
}

HQData.IsShowAvPrice=function(upperSymbol)   //是否显示均价
{
    if (MARKET_SUFFIX_NAME.IsLME(upperSymbol)) return false;
    if (upperSymbol=="UDI_100.ET") return false;

    return true;
}

HQData.IsShowVolChart=function(upperSymbol) //是否显示第2个成交量图
{
    if (MARKET_SUFFIX_NAME.IsForeignExchange(upperSymbol)) return false;
    if (upperSymbol=="UDI_100.ET") return false;

    return true;
}


///////////////////////////////////////////////////////////////////////////////////////////
//  
//  美国洲际交易所 重柴油
//
HQData.GetCustomTradeTimeData=function(key)
{
    if (key=="IPE_G")   //美国洲际交易所 重柴油 数据从7：50开始,是盘前数据吗????
    {
        //7:50-6:00
        var data=
        {
            Name:'7:50-6:00',
            Data:
            [
                { Start: 750, End: 2359 },
                { Start: 0, End: 600 },
            ],
            Coordinate:
            {
                Full://完整模式
                [
                    { Value: 800, Text: '8:00' },
                    { Value: 1000, Text: '10:00' },
                    { Value: 1200, Text: '12:00' },
                    { Value: 1400, Text: '14:00' },
                    { Value: 1600, Text: '16:00' },
                    { Value: 1800, Text: '18:00' },
                    { Value: 2000, Text: '20:00' },
                    { Value: 2200, Text: '22:00' },
                    { Value: 0, Text: '0:00' },
                    { Value: 200, Text: '2:00' },
                    { Value: 400, Text: '4:00' },
                    { Value: 600, Text: '6:00' },
                ],
                Simple: //简洁模式
                [
                    { Value: 800, Text: '8:00' },
                    { Value: 1200, Text: '12:00' },
                    { Value: 1600, Text: '16:00' },
                    { Value: 2000, Text: '20:00' },
                    { Value: 0, Text: '0:00' },
                    { Value: 400, Text: '4:00' },
                    { Value: 600, Text: '6:00' },
                ],
                Min:   //最小模式  
                [
                    { Value: 800, Text: '8:00' },
                    { Value: 2000, Text: '20:00' },
                    { Value: 600, Text: '6:00' }
                ]
            }
        };

        return data;
    }
    else if (key=="IPE_G_2")
    {
        var data=//ID=0 08:50-07:00
        {
            Name:'08:50-07:00',
            Data:
            [
                { Start: 850, End: 2359 },
                { Start: 0, End: 700 },
            ],
            Coordinate:
            {
                Full://完整模式
                [
                    { Value: 900, Text: '9:00' },
                    { Value: 1100, Text: '11:00' },
                    { Value: 1300, Text: '13:00' },
                    { Value: 1500, Text: '15:00' },
                    { Value: 1700, Text: '17:00' },
                    { Value: 1900, Text: '19:00' },
                    { Value: 2100, Text: '21:00' },
                    { Value: 2300, Text: '23:00' },
                    { Value: 1, Text: '1:00' },
                    { Value: 300, Text: '3:00' },
                    { Value: 500, Text: '5:00' },
                    { Value: 700, Text: '7:00' }
                ],
                Simple: //简洁模式
                [
                    { Value: 900, Text: '9:00' },
                    { Value: 1300, Text: '13:00' },
                    { Value: 1700, Text: '17:00' },
                    { Value: 2100, Text: '21:00' },
                    { Value: 1, Text: '1:00' },
                    { Value: 500, Text: '5:00' },
                    { Value: 700, Text: '7:00' }
                ],
                Min:   //最小模式  
                [
                    { Value: 900, Text: '9:00' },
                    { Value: 2100, Text: '21:00' },
                    { Value: 700, Text: '7:00' }
                ]
            }
        };

        return data;
    }
}



////////////////////////////////////////////////////////////////////////////
// 美股走势图X轴坐标
//
////////////////////////////////////////////////////////////////////////////
HQData.CreateUSAData=function(minuteStringData)
{
    const TIME_SPLIT =
    [
        { Start: 2130, End: 2359 },
        { Start: 0, End: 400 }
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}

HQData.GetUSAData=function(upperSymbol,width)
{
    const SHZE_MINUTE_X_COORDINATE =
    {
        Full:   //完整模式
        [
            [0, 0, "rgb(200,200,200)", "21:30"],
            [90, 1, "RGB(200,200,200)", "23:00"],
            [150, 1, "RGB(200,200,200)", "00:00"],
            [210, 1, "RGB(200,200,200)", "01:00"],
            [270, 1, "RGB(200,200,200)", "02:00"], 
            [330, 1, "RGB(200,200,200)", "03:00"], 
            [390, 1, "RGB(200,200,200)", "04:00"], 
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
        { Start: 1301, End: 1500 }
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

        Count: 241,         //!! 一共的分钟数据个数，不要填错了
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
        { Start: 1301, End: 1600 }
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

        Count: 331,
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

////////////////////////////////////////////////////////////////////////////////////////
//  外汇走势图X轴坐标
//
////////////////////////////////////////////////////////////////////////////////////////
HQData.CreateForeignExchangeData=function(minuteStringData)
{
    //外汇 5:00 - 4:59
    const TIME_SPLIT=           
    [
        { Start:500, End:2359 },
        { Start:0,  End:459 },
    ];

    return minuteStringData.CreateTimeData(TIME_SPLIT);
}

HQData.GetForeignExchangeData=function(upperSymbol,width)
{
    const FOREX_MINUTE_X_COORDINATE=
    {
        Full:   //完整模式
        [
            [0, 1, "RGB(200,200,200)", "05:00"],
            [120, 1, "RGB(200,200,200)", "07:00"],
            [240, 1, "RGB(200,200,200)", "09:00"],
            [360, 1, "RGB(200,200,200)", "11:00"],
            [480, 0, "RGB(200,200,200)", "13:00"],
            [600, 1, "RGB(200,200,200)", "15:00"],
            [720, 1, "RGB(200,200,200)", "17:00"],
            [840, 1, "RGB(200,200,200)", "19:00"],
            [960, 1, "RGB(200,200,200)", "21:00"],
            [1080, 1, "RGB(200,200,200)", "23:00"],
            [1200, 1, "RGB(200,200,200)", "01:00"],
            [1320, 1, "RGB(200,200,200)", "03:00"],
            [1439, 1, "RGB(200,200,200)", "04:59"],
        ],
        Simple: //简洁模式
        [
            [0, 1, "RGB(200,200,200)", "06:00"],
            [240, 1, "RGB(200,200,200)", "10:00"],
            [480, 0, "RGB(200,200,200)", "14:00"],
            [720, 1, "RGB(200,200,200)", "18:00"],
            [960, 1, "RGB(200,200,200)", "22:00"],
            [1200, 1, "RGB(200,200,200)", "02:00"],
        ],
        Min:   //最小模式     
        [
            [0, 1, "RGB(200,200,200)", "06:00"],
            [480, 0, "RGB(200,200,200)", "14:00"],
            [960, 1, "RGB(200,200,200)", "22:00"],
        ],

        Count: 1440,
        MiddleCount: 600,

        GetData: function (width) 
        {
            if (width < 200) return this.Min;
            else if (width < 450) return this.Simple;

            return this.Full;
        }
    } 

    return FOREX_MINUTE_X_COORDINATE;
}


////////////////////////////////////////////////////////////////////////
//  美元指数
//
///////////////////////////////////////////////////////////////////////
HQData.GetETTimeData=function(upperSymbol,minuteStringData)
{
    if (upperSymbol=="UDI_100.ET")
    {
        //美元指数 6:00 - 5:59
        const TIME_SPLIT=           
        [
            { Start:600, End:2359 },
            { Start:0,  End:559 },
        ];

        return minuteStringData.CreateTimeData(TIME_SPLIT);
    }
}

HQData.GetETData=function(upperSymbol)
{
    if (upperSymbol=="UDI_100.ET")
    {
        const data=
        {
            Full:   //完整模式
            [
                [0, 1, "RGB(200,200,200)", "06:00"],
                [120, 1, "RGB(200,200,200)", "08:00"],
                [240, 1, "RGB(200,200,200)", "10:00"],
                [360, 1, "RGB(200,200,200)", "12:00"],
                [480, 0, "RGB(200,200,200)", "14:00"],
                [600, 1, "RGB(200,200,200)", "16:00"],
                [720, 1, "RGB(200,200,200)", "18:00"],
                [840, 1, "RGB(200,200,200)", "20:00"],
                [960, 1, "RGB(200,200,200)", "22:00"],
                [1080, 1, "RGB(200,200,200)", "0:00"],
                [1200, 1, "RGB(200,200,200)", "02:00"],
                [1320, 1, "RGB(200,200,200)", "04:00"],
                [1439, 1, "RGB(200,200,200)", "05:59"],
            ],
            Simple: //简洁模式
            [
                [0, 1, "RGB(200,200,200)", "06:00"],
                [240, 1, "RGB(200,200,200)", "10:00"],
                [480, 0, "RGB(200,200,200)", "14:00"],
                [720, 1, "RGB(200,200,200)", "18:00"],
                [960, 1, "RGB(200,200,200)", "22:00"],
                [1200, 1, "RGB(200,200,200)", "02:00"],
                [1439, 1, "RGB(200,200,200)", "05:59"],
            ],
            Min:   //最小模式     
            [
                [0, 1, "RGB(200,200,200)", "06:00"],
                [720, 1, "RGB(200,200,200)", "18:00"],
                [1439, 1, "RGB(200,200,200)", "05:59"],
            ],
    
            Count: 1440,
            MiddleCount: 600,
    
            GetData: function (width) 
            {
                if (width < 200) return this.Min;
                else if (width < 450) return this.Simple;
    
                return this.Full;
            }
        } 
    
        return data;
    }
}

HQData.GetETDecimal=function(symbol)
{
    var upperSymbol=symbol.toUpperCase();
    if (upperSymbol=="UDI.ET") return 2;

    return 2;
}



///////////////////////////////////////////////////////////////////////////////////
//K线数据对接
//
/////////////////////////////////////////////////////////////////////////////////
HQData.GetKLineApiUrl=function(symbol, period, right, option)
{
    //https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b&rtntype=6&secid=0.300059&klt=101&fqt=0

    var internalSymbol=HQData.GetInternalSymbol(symbol);
    var internalPeriod=HQData.GetInternalPeriod(period);
    var internalRight=HQData.GetInternalRight(right);
    if (option && option.Update==true)
    {
        var beginDate=option.End;
        var url=`https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=${beginDate}&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b&rtntype=6&secid=${internalSymbol.Market}.${internalSymbol.Symbol}&klt=${internalPeriod}&fqt=${internalRight}`;
    }
    else
    {
        var url=`https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b&rtntype=6&secid=${internalSymbol.Market}.${internalSymbol.Symbol}&klt=${internalPeriod}&fqt=${internalRight}`;
    }

    return { Url:url, Symbol:symbol, InternalSymbol:internalSymbol, Period:period, Right:right };
}

HQData.GetMinuteKLineApiUrl=function(symbol, period, right, option)
{
    //https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b&rtntype=6&secid=0.300059&klt=101&fqt=0

    var internalSymbol=HQData.GetInternalSymbol(symbol);
    var internalPeriod=HQData.GetInternalPeriod(period);
    var internalRight=HQData.GetInternalRight(right);

    if (option && option.Update==true)
    {
        var beginDate=option.End;
        var url=`https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=${beginDate}&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b&rtntype=6&secid=${internalSymbol.Market}.${internalSymbol.Symbol}&klt=${internalPeriod}&fqt=${internalRight}`;
    }
    else
    {
        var url=`https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=0&end=20500101&ut=fa5fd1943c7b386f172d6893dbfba10b&rtntype=6&secid=${internalSymbol.Market}.${internalSymbol.Symbol}&klt=${internalPeriod}&fqt=${internalRight}`;
    }

    return { Url:url, Symbol:symbol, InternalSymbol:internalSymbol, Period:period, Right:right };
}

HQData.GetInternalPeriod=function(periodID)
{
    var MAP_PERIOD=new Map(
        [
            [0, 101],   //day
            [1, 102],   //week
            [2, 103],   //month

            [4, 1],    //1min
            [5, 5],    //5min
            [6, 15],   //15min
            [7, 30],   //30min
            [8, 60],   //60min
        ]
    );

    return MAP_PERIOD.get(periodID);
}

HQData.GetInternalRight=function(right)
{
    if (right==0) return 0;
    else if (right==1) return 1;
    else return 2;
}

HQData.IsEnableRight=function(period, symbol)   //是否支持复权
{
    var symbolUpper=symbol.toUpperCase();
    if (MARKET_SUFFIX_NAME.IsSHSZStockA(symbolUpper)) return true;

    var aryData=symbol.split(".");
    var symbolUpper=symbol.toUpperCase();
    var arySymbol=aryData[0].split('_');
    var market=parseInt(arySymbol[1]);

    if (MARKET_SUFFIX_NAME.IsHK(symbolUpper))
    {
        if (market==100) return false; //指数不支持复权
        return true;
    }

    if (MARKET_SUFFIX_NAME.IsUSA(symbolUpper))
    {
        if (market==100) return false; //指数不支持复权
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

    wx.request(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvHistoryData(recvData.data, callback, { Data:data, Obj:obj });                 
        }
    });

}

HQData.RecvHistoryData=function(recvData, callback, option)
{
    var data=recvData.data;

    var hqChartData={code:0, data:[]};
    hqChartData.symbol=option.Obj.Symbol;
    hqChartData.name=data.name;

    var yClose=data.preKPrice;;
    for(var i=0;i<data.klines.length; ++i)
    {
        var strItem=data.klines[i];
        var item=strItem.split(',');
        var today = new Date(Date.parse(item[0]));  
        var date=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
       
        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5])*100;
        var amount=parseFloat(item[6]);

        var newItem=[ date, yClose, open, high, low, close, vol, amount];
        hqChartData.data.push(newItem);

        yClose=close;
    }


    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvHistoryData] hqchartData ", hqChartData);
		
		HQData.InvokeCallback(hqChartData, callback);
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

    wx.request(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvRealtimeData(recvData.data, callback, { Data:data, Obj:obj });                 
        }
    });
}

HQData.RecvRealtimeData=function(recvData, callback, option)
{
    var data=recvData.data;
    var stock={symbol:option.Obj.Symbol, name:data.name };
    
    var yClose=data.preKPrice;
    for(var i=0;i<data.klines.length; ++i)
    {
        var strItem=data.klines[i];
        var item=strItem.split(',');
        var today = new Date(Date.parse(item[0]));  
        var date=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
       
        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5])*100;
        var amount=parseFloat(item[6]);

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
        console.log("[HQData.RecvRealtimeData] hqchartData ", hqchartData);
		HQData.InvokeCallback(hqchartData, callback);
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

    wx.request(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvHistoryMinuteData(recvData.data, callback, { Data:data, Obj:obj });                 
        }
    });

}

HQData.RecvHistoryMinuteData=function(recvData, callback, option)
{
    var data=recvData.data;

    var hqChartData={code:0, data:[]};
    hqChartData.symbol=option.Obj.Symbol;
    hqChartData.name=data.name;

    var yClose=data.preKPrice;;
    for(var i=0;i<data.klines.length; ++i)
    {
        var strItem=data.klines[i];
        var item=strItem.split(',');
        var today = HQData.StringToDateTime(item[0]);  
        var date=today.Date;
        var time=today.Time;
       
        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5])*100;
        var amount=parseFloat(item[6]);

        var newItem=[ date, yClose, open, high, low, close, vol, amount, time];
        hqChartData.data.push(newItem);

        yClose=close;
    }


    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvHistoryMinuteData] hqchartData ", hqChartData);
		HQData.InvokeCallback(hqChartData, callback);
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
    if (dateRange && dateRange.End && dateRange.End.Date>0) option.End=dateRange.End.Date;

    console.log(`[HQData::RequestMinuteRealtimeData] Symbol=${symbol}`);
    var obj=HQData.GetMinuteKLineApiUrl(symbol,period, right, option);

    wx.request(
    {
        url: obj.Url,
        type: "GET",
        success:function(recvData) 
        {
            HQData.RecvMinuteRealtimeData(recvData.data, callback, { Data:data, Obj:obj });                 
        }
    });
}

HQData.RecvMinuteRealtimeData=function(recvData, callback, option)
{
    var data=recvData.data;
    var hqChartData={code:0, data:[], ver:2.0, symbol:option.Obj.Symbol, name:data.name}; //更新数据使用2.0版本格式

    var yClose=data.preKPrice;
    for(var i=0;i<data.klines.length; ++i)
    {
        var strItem=data.klines[i];
        var item=strItem.split(',');
        var today = HQData.StringToDateTime(item[0]);  
        var date=today.Date;
        var time=today.Time;
       
        var open=parseFloat(item[1]);
        var close=parseFloat(item[2]);
        var high=parseFloat(item[3]);
        var low=parseFloat(item[4]);
        var vol=parseFloat(item[5])*100;
        var amount=parseFloat(item[6]);

        var newItem=[ date, yClose, open, high, low, close, vol, amount, time];
        hqChartData.data.push(newItem);

        yClose=close;
    }

    if (option.Data.Self.IsDestroy==false)
	{
        console.log("[HQData.RecvMinuteRealtimeData] hqchartData ", hqChartData);
		HQData.InvokeCallback(hqChartData, callback);
    }
}

module.exports =
{
    EastMoney:
    {
        HQData:HQData
    }
}
