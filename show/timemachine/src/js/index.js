/**
 * 2014话费时光机
 * @author:bennyhe;
 * @date:2014-12-11;
*/
(function(){ 
	var ua = window.navigator.userAgent;
	if(/(iphone)|(ipad)|(ipod)/i.test(ua)){//兼容 IOS 双击 bug
		document.getElementsByTagName('body')[0].addEventListener('touchend', function(e) {
			//对于 input 元素，要躲开
			if(e.target && e.target.tagName === 'INPUT') return;
			if(e.target && e.target.tagName === 'BUTTON') return;
			
			var sourceMethod = e['preventDefault']
			e['preventDefault'] = function() {
				this['isDefaultPrevented'] =  function() {return true}
				return sourceMethod && sourceMethod.apply(e, arguments)
			}
			e['isDefaultPrevented'] = function() {return false}
			e.preventDefault();
		}, false);
}})();

	
if (window.Zepto) {
	(function ($) {
		/*****************开始******************/
		$.extend($.fn,{//扩展库方法
			showVisibility: function(){
				this.css('visibility','visible');
				return this;
			},
			hideVisibility: function(){
				this.css('visibility','hidden');
				return this;
			}
		});

		/*********滑动&loading*********/
		var oIndexPage = {};
		var oSubPage = {};
		function fnInit(){
			/*实例化默认slide插件*/
			oIndexPage.container = $('#slideLayout');
			oIndexPage.slide = new XMANSlide(oIndexPage.container,{
				direction: 'y',
				onChangeEndCB: function (e){//终止滚屏插件
					if (e === 1) {
						oIndexPage.slide.offEvent();
					}
				}
			});
			oIndexPage.slide.init();

			/*实例化slide弹出页面*/
			oSubPage.container = $('#innerSlide');
			oSubPage.slide = new XMANSlide(oSubPage.container,{
				direction: 'x',
				navigation: true,
				selectorClassName: 'slide-layout-inner',
				childClassName: 'slide-layout-inner__page',
				innerPageClassName: 'page-1',
				navigationAllowClick:true
			});
			oSubPage.slide.init();

			var aResources=[
				'http://static.gtimg.com/vd/act/m_141211_wx/img/earth.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/floating_bg.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/index_bg.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/index_bg2.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/loading_sprite.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/main_sprite.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/rocket_fire.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/rocket_fire2.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/rocket_fire3.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/slide_nav_sprite.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/star_sprite.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_bear.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_chat.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_cloud.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_cloud_human.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_fish.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_giraffa.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_giraffa_tree.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_mountain.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_ocean.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_page1_bg.jpg',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_page2_bg.jpg',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_page3_bg.jpg',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_page4_bg.jpg',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_page5_bg.jpg',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_page6_bg.jpg',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_page7_bg.jpg',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/inner_sprite.png',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/inner/share.jpg',
				'http://static.gtimg.com/vd/act/m_141211_wx/img/default_avatar.png'
			];

			var jLoadArea=$('.act-loading');
			var jLoadIcon=$('#loadIcon');
			var jLoadProcess=$('#loadProcess');

			$.fn.loader(aResources).loadend(function(){//每个资源加载结束时间

				var _percent=this.percent;
				jLoadIcon.css('left',this.percent);
				jLoadProcess.css('width',this.percent);

			}).complete(function(){//完成

				jLoadIcon.css('left','100%');
				jLoadProcess.css('width','100%');

				oIndexPage.slide.swipeTo(1);//滚动到最底屏幕

				setTimeout(function(){
					jLoadArea.hide();
					$('.container').showVisibility();
				},400);

			});
		}

		fnInit();//执行初始化函数

		/*********主流程体验*********/
		var jInnerPage=$('#innerSlide');
		//点击火箭
		$('.act-rocket').on('touchend',function(){
			$('.page-index').addClass('ani-index-start');
			setTimeout(function(){
				oIndexPage.slide.swipeTo(0);
				$('.page-select').addClass('ani-select-start');
			},1500)
		});

		//点击星球
		function fnShowInnerPage(nNum)
		{
			jInnerPage.parent().show();
			oSubPage.slide.swipeTo(nNum);
		}
		$('.ico-star1').on('touchend',function(){
			fnShowInnerPage(0);
		});
		$('.ico-star2').on('touchend',function(){
			fnShowInnerPage(1);
		});
		$('.ico-star3').on('touchend',function(){
			fnShowInnerPage(3);
		});
		$('.ico-star4').on('touchend',function(){
			fnShowInnerPage(5);
		});
		$('.ico-star5').on('touchend',function(){
			fnShowInnerPage(4);
		});
		$('.ico-star6').on('touchend',function(){
			fnShowInnerPage(2);
		});

		$('.act-btn-return').on('touchend',function(){
			jInnerPage.parent().hide();
		})

		var jFloatingShare=$("#floatingShare");
		$("#btnShare").on('touchend',function(){
			jFloatingShare.show();
		});
		jFloatingShare.on('touchend',function(){
			jFloatingShare.hide();
		});

		$('.ico-star-tips').on('touchend',function(){
			fnShowInnerPage(0);
		});

		/*****************结束******************/

	})(window.Zepto)
}
