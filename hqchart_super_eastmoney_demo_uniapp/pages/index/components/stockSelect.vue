<template>
	<view class="box">
	  <tab-list id="tabList" :tabList="tabList" @changetab="changetab" :currentIndex="currentTab"></tab-list>
	  <view class="stockList">
	    <scroll-view scroll-y="true" style="height: 100%;">
	      <view class="item" v-for="(item,index) in stockList" :key="item.Code" @click="ChangeSymbol(item)">
	        <view class="code">{{item.Code}}</view>
	        <view class="name">{{item.Name}}</view>
	      </view>
	    </scroll-view>
	  </view>
	</view>
</template>

<script>
	import TabList from './tabList.vue'
	function DefaultData () {}
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
				Title: '北交所',
				Icon: '',
				Sub: 
				[
					{
						Name: '凯添燃气',
						Code: '831010_0.bj'
					},
					{
						Name: '驱动力',
						Code: '838275_0.bj'
					},
					{
						Name: '齐鲁华信',
						Code: '830832_0.bj'
					},
					{
						Name: '苏轴股份',
						Code: '430418_0.bj'
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
	export default {
		components: {
			TabList
		},
		data () {
			return {
				tabList: ['tab1','tab2','tab3','tab4','tab5','tab11','tab12','tab13','tab14','tab15'],
				currentTab: 0,
				toView: 'noid', //锚点id
				scrollTop: 0, //设置竖向滚动条位置
				stockList: []
			}
		},
		created() {
			const data = DefaultData.GetTestSymbolMenu()
			this.tabList = data.map(item => item.Title),
			this.stockList = data[0].Sub
		},
		mounted() {
			
		},
		methods: {
			changetab(index){
				// console.log('tab index::', index)
				this.currentTab = index
				const data = DefaultData.GetTestSymbolMenu()
				this.stockList = data[this.currentTab].Sub
			},
			ChangeSymbol(item) {
				this.$emit('ChangeSymbol', item.Code)
				this.$emit('closepopup')
			}
		}
	}
</script>

<style>
	.box{
	  width: 100%;
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  background-color: #fff;
	}
	
	.stockList{
	  flex: 1;
	  overflow: hidden;
	}
	
	.item{
	  height: 100rpx;
	  border-bottom: 1px solid #edeff5;
	  display: flex;
	  align-items: center;
	  padding-left: 30rpx;
	}
	
	.code {
	  font-size: 32rpx;
		color: #868d9f;
	  padding-right: 32rpx;
	}
	
	.name{
	  font-size: 32rpx;
	}
</style>
