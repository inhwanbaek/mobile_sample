//*******************************************//
// 교보생명 관리자 UI
//*******************************************//

var ui = { //
	init:function(){ // 초기구동
		this.cm.init();
		// this.skip.init();
		this.gnb.init();
		this.lnb.init();
		this.ly.init();
		this.form.init();
		// this.keypad.init();
		// this.tooltip.init();
		// this.balloon.init();
		// this.range.init();
		this.accd.init();
		this.tog.init();
		this.togs.init();
		// this.tab.init();
		this.tabs.init();
		this.popup.init();
		// this.slides.init();
		this.datepick.init();
		this.monthpick.init();
		// this.elip.init();
		// this.topfix.init();
		// this.steps.init();
		// this.card.init();
		// this.caption.init();
		// this.keytab.init();
		// this.doctitle.init();
		this.tbl.init();
		this.menu.init();
	},
	update:function(){ // 페이지 동적으로 뿌린 후 업데이트 ui.update();
		this.datepick.set();
		this.monthpick.set();
		this.range.set();
		this.form.set();
		this.accd.set();
		// this.tab.set();
		this.tabs.set();
		this.skip.set();
		this.elip.set();
		this.popup.set();
		this.steps.set();
		this.card.set();
		this.caption.set();
		this.doctitle.set();
		this.tbl.set();
	},
	transitionend:"transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
	skip:{ // 본문으로 스킵
		init:function() {
			this.set();
			this.evt();
		},
		els:'<div id="skip-nav"></div>',
		evt:function(){
			$(document).on("click","#skip-nav a[data-href='#gnb']",function(e){
				$(".header .bt.gnb:visible").focus();
				// $("#gnb").attr("tabindex","-1").focus();
				e.preventDefault();
			});
			$(document).on("click","#skip-nav a[data-href='#container']",function(e){
				$("#container").attr("tabindex","-1").focus();
				$(window).scrollTop(0);
				e.preventDefault();
			});
		},
		set:function(){
			if(!$("#skip-nav").length ) {
				$(".body:not(.ui)").prepend(this.els);
			}
			if( $("#container").length && !$("#skip-nav a[data-href='#container']").length ) {
				$("#skip-nav").append('<a href="javascript:;" data-href="#container" role="button"><span>본문 바로가기</span></a>');
			}
			if( $(".header .bt.gnb:visible").length && !$("#skip-nav a[data-href='#gnb']").length && $("nav.gnb").data("visible")!=false) {
				$("#skip-nav").prepend('<a href="javascript:;" data-href="#gnb" role="button"><span>메뉴 바로가기</span></a>');
			}
		}
	},
	doctitle:{
		init:function(){
			this.set();
		},
		set:function(){

		},
	},
	debug:{
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(window).on("scroll resize load", function() {
				_this.set();
			});
		},
		set:function(){
			var dhtml = '<div id="debug"></div>';
			!$("#debug").length && $("body").prepend(dhtml);
			var wHt = ui.viewport.height();
			var docH= ui.viewport.docHeight();
			var scr = ui.viewport.scrollTop() + wHt + 0; 
			var sct = ui.viewport.scrollTop(); 
			$("#debug").html('SCT : '+ sct + ' ,SCR : '+ scr + ' , DOCH : ' +docH + " , visualViewport : "+ wHt+"  , iosX :  " );
		}
	},
	caption:{
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
	
		},
		set:function(){
			$(".ut-tbl table").each(function(){
				var thtxt = $(this).find("th");			
				var cap ="";
				thtxt.each( function(i) {
					dot = i == 0 ? "": ", ";
					var th = dot + $(this).text();
					cap = cap + th;
				});
				var capti = cap + " 로 구성된 테이블입니다.";
				$(this).find("caption .cap").text(capti);
			});
		}
	},
	viewport:{
		height:function(){
			return parseInt( window.visualViewport ? visualViewport.height : window.innerHeight );
		},
		width:function(){
			return parseInt( window.visualViewport ? visualViewport.width : window.innerWidth );
		},
		docHeight:function(){
			return parseInt( document.documentElement.scrollHeight || document.body.clientHeight );
		},
		scrollTop:function(){
			var num = window.visualViewport ? visualViewport.pageTop : document.documentElement.scrollTop;
			return parseInt( num <= 0 ? 0 : num );
		},
		scrollLeft:function(){
			var num = window.visualViewport ? visualViewport.pageLeft :document.documentElement.scrollLeft;
			return parseInt( num <= 0 ? 0 : num );
		}
	},
	keypad:{ // 키패드 올라왔는지 내려갔는지 추측해보자
		init:function(){
			this.set();
			this.evt();
		},
		viewh:null,
		set:function(){
			this.viewh = ui.viewport.height();
			// console.log( this.viewh );
			var testElement = document.createElement('p');
			testElement.style.position = 'fixed';

			function isKeyboardVisible() {
				testElement.style.top = 0;
				return !!testElement.offsetTop;
			}

			setTimeout(function() {
				// console.log(  isKeyboardVisible() ? 'Keyboard is visible' : 'Keyboard is not visisble');
				if( isKeyboardVisible() ){
					$("body").addClass("is-keypad");
					$("body.ui .keystat").html('<b>KeyShow</b>');
				}else{
					$("body").removeClass("is-keypad");
					$("body.ui .keystat").html('');
				}
			}, 500);
		},
		evt:function(){
			var _this = this;
			$(document).on({
				"focus":function(e){
					//$("body").addClass("is-keypad");
				},
				"blur":function(e){
					//$("body").removeClass("is-keypad");
				}
			},"input:not([type=radio] , [type=checkbox] , [type=file]),textarea");
			$(window).on("resize", function(){
				var viewh_now = ui.viewport.height();
				if (viewh_now < _this.viewh - 100 ) {
					$("body").addClass("is-keypad");
					$("body.ui .keystat").html('<b>KeyShow</b>');
				}else{
					$("body").removeClass("is-keypad");
					$("body.ui .keystat").html('');
				}
			});
		}
	},
	keytab:{ /* 웹접근성 팝업안에서 탭키이동 */
		init:function(){
			// ui.keytab.set( $("body") );
		},
		set:function($els){
			$(document).on("keydown",function(){
				var pbd = $els;
				var pls = pbd.find("button:not([disabled]) , input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");	
				var peF = pls && pls.first();
				var peL = pls && pls.last();

				pls.length ? peF.on("keydown", function(event) { 
					// 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
					if (event.shiftKey && (event.keyCode || event.which) === 9) {
						// Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
						event.preventDefault();
						peL.focus();
					}
				}) : pbd.attr("tabindex", "0").focus().on("keydown", function(event){
					tabDisable = true;
					if ((event.keyCode || event.which) === 9) event.preventDefault();
					// Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
				});

				peL.on("keydown", function(event) {
					if (!event.shiftKey && (event.keyCode || event.which) === 9) {
						// Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
						event.preventDefault();
						peF.focus();
					}
				});
			});
		}
	},
	cm:{ // 공통
		init:function(){
			
		}
	},
	tbl:{
		init:function(){
			this.set();
		},
		set:function(){
			$(".ut-tbl.fixed-x").each(function(){

				if( $(this).find(".tbl-dumy").length) {
					$(this).find(".tbl-real .tbl-screen").remove();
					$(this).find(".tbl-real .tblist").unwrap();
					$(this).find(".tbl-dumy").remove();
				}

				var $tbl = $(this).find(">.tblist");
				
				$(this).append('<div class="tbl-dumy" aria-hidden="true"></div>');
				
				$tbl.clone().appendTo( $(this).find(".tbl-dumy") );
				$tbl.wrap('<div class="tbl-real"></div>');
				$(this).find(".tbl-real").prepend('<div class="tbl-screen"></div>');
				var fixWidth = $(this).find(".tbl-real th.fixed").outerWidth();
				$(this).find(".tbl-dumy").css("width",fixWidth+"rem");
				$(this).find(".tbl-real .tbl-screen").css("width",fixWidth+"rem");
				
				var utWidth  = $(this).outerWidth();
				var tbWidth  = $(this).find(".tbl-real").prop('scrollWidth');
				if (utWidth < tbWidth) {
					$(this).find(".tbl-dumy").removeClass("hide");
				}else{
					$(this).find(".tbl-dumy").addClass("hide");
				}

				// console.log(fixWidth, $(this).outerWidth()   )  ;
			});
		}
	},
	prd:{},
	isUA:function(t){ // 디바이스 구분
		t = t.split(" ");
		for (var i = 0; i < t.length; i++) {
			result = navigator.userAgent.indexOf(t[i]) > -1 ? true : false ;
			if (!result) {
				return result ;
			}
		}
		return result ;
	},
	param:(function(a) { // URL에서 파라미터 읽어오기  ui.param.***
			if (a == "") return {};
			var b = {};
			for (var i = 0; i < a.length; i++){
				var p=a[i].split('=');
				if (p.length != 2) continue;
				b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
			}
			return b;
		})(window.location.search.substr(1).split('&')),
	menu:{
		init:function(){
			this.set();	
		},
		set:function(){
			if(	!$("nav.gnb .menu>li.active").length ){
				ui.gnb.act(1,1);
				// console.log("Act");
			}
		},
		act:function(dep1,dep2,dep3,dep4,dep5){

			dep1 = dep1 || 1;
			dep2 = dep2 || 1;
			dep3 = dep3 || 1;
			dep4 = dep4 || 1;
			dep5 = dep5 || 1;
			if( typeof ui.html.set  != "undefined") {
				ui.html.load(function(){
					// console.log("HTML");
					ui.gnb.act(dep1,dep2);
					ui.lnb.act(dep3,dep4,dep5);
					// console.log(dep1,dep2,dep3,dep4,dep5);
				});
			}
			// console.log("DEV");
			ui.gnb.act(dep1,dep2);
			ui.lnb.act(dep3,dep4,dep5);
		}
	},
	gnb: { // GNB 
		init: function() {
			//ui.gnb.using("open");
			var _this = this;
			$(document).on("mouseover focus", "nav.gnb .menu>li , nav.gnb .menu>li>.bt", function() {
				$(this).addClass("over").siblings("li").removeClass("over");
				$("nav.gnb .menu").addClass("over");
			});
			$(document).on("mouseleave", "nav.gnb .menu", function() {
				$(this).find("li").removeClass("over");
				$("nav.gnb .menu").removeClass("over");
			});
			
		},
		act:function(dep1,dep2){
			dep1 = dep1 || 0;
			dep2 = dep2 || 0;
			$("nav.gnb .menu>li:nth-child("+dep1+")").addClass("active").siblings("li").removeClass("active");
			$("nav.gnb .menu>li.active>.sm>ul>li:nth-child("+dep2+")").addClass("active").siblings("li").removeClass("active");
		},
		using: function(opt) {
			if( opt === "open") {
				/* ui.lock.using(true);
				$("nav.gnb").after('<div class="gnb-screen" tabindex="-1"></div>');
				$("nav.gnb").show().animate({"left": 0}, 300,function(){
					$("nav.gnb .bts .bt.close").focus();
				});
				$("body").addClass("is-gnb");
				$(".gnb-screen").show(); */
				ui.popup.open('gnb',{
					"direct":"right",
					ocb:function(){
						ui.update();
					},
					ccb:function(){
						$(".header .bt.gnb").focus();
					}
				});
			}
			if( opt === "close") {
				ui.popup.close('gnb');
				/* $("nav.gnb").animate({"left": "-100%"}, 300,function(){
					$("body").removeClass("is-gnb");
					$(".gnb-screen").hide().remove();
					$("nav.gnb").hide();
					$(".header .bt.gnb").attr("tabindex","0").focus();
				});
				ui.lock.using(false); */
			}
		}
	},
	lnb:{ // LNB
		init:function(){
			if( $("nav.lnb").length )  this.using();
			$("nav.lnb .menu li").each(function(){
				if( !$(this).find(".bt").next("ul").length  ){
					$(this).find(".bt").addClass("link");
				}else{
					// $(this).removeClass("active");
				}
			});
		},
		act:function(dep3,dep4,dep5){ // LNB 활성화
			dep3 = dep3 || 0;
			dep4 = dep4 || 0;
			dep5 = dep5 || 0;
			if (typeof dep3 ==  "string") { // 1뎁스
				$("nav.lnb .menu>li").each(function(){
					if( $(this).find(">.bt").text() == dep3 ){
						$(this).addClass("active").siblings("li").removeClass("active");
					}
				});
			}else{
				$("nav.lnb .menu>li:nth-child("+dep3+")").addClass("active").siblings("li").removeClass("active");
			}

			if (typeof dep4 ==  "string") { // 2뎁스
				$("nav.lnb .menu>li>ul>li").each(function(){
					if( $(this).find(">.bt").text() == dep4 ){
						$(this).addClass("active").siblings("li").removeClass("active");
					}
				});
			}else{
				$("nav.lnb .menu>li.active>ul>li:nth-child("+dep4+") ").addClass("active").siblings("li").removeClass("active");
			}
			if (typeof dep5 ==  "string") { // 2뎁스
				$("nav.lnb .menu>li>ul>li>ul>li").each(function(){
					if( $(this).find(">.bt").text() == dep5 ){
						$(this).addClass("active").siblings("li").removeClass("active");
					}
				});
			}else{
				$("nav.lnb .menu>li.active>ul>li.active>ul>li:nth-child("+dep5+") ").addClass("active").siblings("li").removeClass("active");
			}

		},
		using:function(){
			$(document).on("click","nav.lnb .menu li>.bt:not(.link)",function(e){
				
				$(this).closest("ul").find("ul").slideUp(150,function(){
					$(this).closest("li").removeClass("active");
				});
				if ( $(this).next("ul").find("li").length ){
					if( $(this).closest("li").hasClass("active") ){
						// $(this).next("ul").slideUp(150,function(){
						// 	$(this).closest("li").removeClass("active");
						// });
					}else{
						$(this).next("ul").slideDown(150,function(){
							$(this).closest("li").addClass("active");
						});

					}
				}
			});
		}
	},
	data:{ // 로컬스토리지 set,get
		set:function(name,obj){
			var orgs = JSON.parse( localStorage.getItem(name) ) || {};
			var news = obj;
			// news[key] = val;
			if (typeof obj == "object") {
				news = $.extend(orgs,news);
				// news = Object.assign(orgs,news);
			}
			localStorage.setItem(name, JSON.stringify(news) );
		},
		get:function(name,key){
			// console.log(key);
			var data = JSON.parse( localStorage.getItem(name) );
			if( key != undefined) {
				try{
					return data[key] ;
				}catch(e){
					return false;
				}
			}else{
				return data;
			}
		}
	},
	ly:{ // 레이아웃
		init:function(){
			var _this = this;
			
			this.height();
			this.set();
			$(window).on("load resize",function(){
				_this.height();
				_this.set();
			});
			$("#container").on("scroll",function(){
				_this.scroll();
			});

			if( location.pathname  == ui.data.get("page_scr","url") ) {
				// console.log("새로고침");
				$("#container").scrollTop( ui.data.get("page_scr","scrt")  );
				setTimeout( function(){
					ui.data.set("page_scr",{"scrt":0,"url":""});
				}, 10);
			}
			/* 
			$(document).on("touchstart click",function(e){
				console.log( e.type , ui.viewport.docHeight() , ui.viewport.height() );
				setTimeout( function(){
					_this.height();
					_this.set();
				}, 100);
			});
 			*/
			function moveHandler(ev) {
				// Process the pointermove event
				// console.log("onpointerenter ");
				// _this.height();
				// _this.set();
			  }
			function init() {
				let el=document.querySelector('body.body');
				el.onpointerenter  = moveHandler;
			}
			init();
		},
		evt:function(){
			 
		},
		scroll:function(){
			var scrt = $("#container").scrollTop();
			ui.data.set("page_scr",{"scrt":scrt,"url":location.pathname});
		},
		height:function(){
			var $container = $(".wrap .container:visible");
			var $contents = $(".wrap .contents:visible");
			var winH = ui.viewport.height();
			var menebarH = $(".wrap .menubar>.inr:visible").outerHeight() || 0;
			var headH = $(".wrap .header>.inr:visible").outerHeight() || 0;
			var headCPH = $(".wrap .header.cp:visible").outerHeight() || 0;
			var locationH = $(".location:visible").outerHeight() || 10;
			var pageH = $(".wrap .pagehead:not(.hauto)>.inr:visible").outerHeight() || 0;
			var floatbtH = $(".wrap .container .floatbots>.inr:visible").outerHeight() || 0;
			var footH = $(".wrap .footer>.inr:visible").outerHeight() || 0;
			var footCPH = $(".wrap .footer.cp:visible").outerHeight() || 0;
			var docGap = ui.viewport.docHeight() - ui.viewport.height();
			//console.log(winH , headH , footH );
			// $container.css("height", parseInt( winH - headH - footH - menebarH - pageH - floatbtH ) );
			//CP페이지는 padding-top 제외
			$container.css("padding-top", locationH);
			$contents.css("min-height", parseInt( winH - headH - headCPH - footH - footCPH - menebarH - pageH - floatbtH - locationH) - 20 + docGap);
			// $("#wrap").css("height", ui.viewport.height() );
			// console.log(docGap);
		},
		set:function(){
			if( $("#container:visible").length ){
				var cls = $("#container:visible").attr("class").replace(/container|page/g,"");
				$("body").addClass(cls);
			}
			var menubar = $(".wrap nav.menubar:visible").length;
			var header  = $(".wrap .header>.inr:visible").length;
			var floatbt = $(".wrap .container .floatbots>.inr:visible").length;
			var floatbtHT = $(".wrap .container .floatbots>.inr:visible").outerHeight();
			var floatbno_hide = $(".wrap .container .floatbots.no-hide").length;
			var footer  = $(".wrap .footer:visible").length;
			var headerCP  = $(".wrap .header.cp:visible").length;
			var footerCP  = $(".wrap .footer.cp:visible").length;
			

			if( menubar ){
				$("body").addClass("is-menubar");
			}else{
				$("body").removeClass("is-menubar");
			}
			if( header ){
				$("body").addClass("is-header");
			}else{
				$("body").removeClass("is-header");
			}
			if( floatbno_hide ){
				$("body").addClass("no-hide-floatbots");
			}else{
				$("body").removeClass("no-hide-floatbots");
			}
			if( floatbt ){
				// console.log(floatbtHT);
				$("body").addClass("is-floatbots");
				$("#wrap.wrap").css("padding-bottom","calc("+floatbtHT+"rem + env(safe-area-inset-bottom))");
			}else{
				$("body").removeClass("is-floatbots");
				$("#wrap.wrap").css("padding-bottom","");
			}
			if( footer ){
				$("body").addClass("is-footer");
			}else{
				$("body").removeClass("is-footer");
			}
			if( headerCP ){
				$("body").addClass("is-header");
			}else{
				$("body").removeClass("is-header");
			}
			if( footerCP ){
				$("body").addClass("is-footer");
			}else{
				$("body").removeClass("is-footer");
			}
		}
	},
	tbsld :{
		init:function(){
			
		},
		evt:function(){

		},
		set:function(id){
			var _this = this;
			_this.slide.using(id);
		},
		slide:{  //  
			// els: ".ut-slide-dot .swiper-container",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				spaceBetween:20,
				autoHeight:true,
				loop: false,
			},
			using: function(id) {
				var _this = this;
				_this[id] = new Swiper( "#"+id+" .swiper-container", this.opt);
			}
		},
	},
	topfix:{ // 스크롤시 상단고정할것 
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(window).on("load scroll resize",function(e){
				_this.set();
			});
			$(".pop-layer .pct").on("load scroll resize",function(e){
				_this.pop();
			});
		},
		set:function(){
			var headHt = $(".header>.inr:visible").height() || 0;
			var wsc = ui.viewport.scrollTop();
			var fixedbox = $(".ut-topfix");
			var fixedHt = $(".ut-topfix>.inr").outerHeight();
			var fixedTop;
			if( typeof fixedbox.offset() != "undefined" ){
				fixedTop = fixedbox.offset().top;
				fixedbox.css("min-height",fixedHt);
			}
			if( fixedTop - headHt < wsc ) {
				fixedbox.addClass("fixed");
				fixedbox.find(">.inr").css("top",headHt);
			}else{
				fixedbox.removeClass("fixed");
				fixedbox.find(">.inr").css("top","");
			}
			// console.log(headHt , fixedTop , wsc );
		},
		pop:function(){
			var headHt = $(".pop-layer .phd>.in:visible").height() || 0;
			var wsc = $(".pop-layer .pct").scrollTop();
			var fixedbox = $(".pop-layer .pct .ut-topfix");
			var fixedHt = $(".pop-layer .pct .ut-topfix>.inr").outerHeight();
			var fixedTop;
			if( typeof fixedbox.offset() != "undefined" ){
				fixedTop = fixedbox.offset().top;
				fixedbox.css("min-height",fixedHt);
			}
			if( fixedTop - headHt < wsc ) {
				fixedbox.addClass("fixed");
				fixedbox.find(">.inr").css("top",headHt);
			}else{
				fixedbox.removeClass("fixed");
				fixedbox.find(">.inr").css("top","");
			}
			// console.log(headHt , fixedTop , wsc );
		}
	},
	tooltip:{ // 툴팁레이어
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(document).on("click",".ut-tooltip .bt-tooltip",function(e){
				var $myui = $(this).closest(".ut-tooltip");
				if( $myui.is(".open") ) {
					_this.close($myui);
				}else{
					_this.open($myui);
					_this.pos(this);
				}
			}).on("click",".ut-tooltip .tpclose",function(e){
				var $myui = $(this).closest(".ut-tooltip");
				_this.close($myui);
				
			})
			.on("click", function(e) {
				if(!$(e.target).closest(".ut-tooltip").length ) {
					$(".ut-tooltip").removeClass("open");
				}
			});

			$(window).on("scroll",function(){
				$(".ut-tooltip.open .bt-tooltip").each(function(){
					_this.pos(this);
				});
			});
			$(".pop-layer.a:visible .pct").on("scroll",function(){
				$(".ut-tooltip.open .bt-tooltip").each(function(){
					_this.pos(this);
				});
			});
		},
		set:function(){
			$(".ut-tooltip .bt-tooltip").attr("aria-expanded",false);
			$(".ut-tooltip.open .bt-tooltip").attr("aria-expanded",true);
		},
		open:function(els){
			var $myui = els;
			$(".ut-tooltip").removeClass("open");
			$myui.addClass("open").find(".bt-tooltip");
			!$myui.find(".tpclose").length && $myui.find(">.toolctn").append('<button type="button" class="tpclose">도움말닫기</button>');
			this.set();
		},
		close:function(els){
			var $myui = els;
			$myui.removeClass("open").find(".bt-tooltip").focus();
			this.set();
		},
		pos:function(els){
				
			// 메뉴 포지션		
			// console.log(els);
			var isPop = $(els).closest(".poptents").length;
			var $pop =   $(els).closest(".pop-layer:visible");
			var elsHt = $(els).outerHeight() + 10;
			var ctnHt = $(els).closest(".ut-tooltip").find(".toolctn").outerHeight() ;
			var ltp = $(els).offset().top;
			var cht = $pop.find(".pbd").outerHeight()*0.5 || ui.viewport.height()*0.5 ;
			var sct = $pop.find(".pct").scrollTop() || ui.viewport.scrollTop() ;


			var t =  $(els).offset().top + elsHt  - ui.viewport.scrollTop(); 
			var l = - $(els).offset().left + 20;
			// console.log(l,t , elsHt);

			if( isPop )  ltp = ltp + sct ; 
			// console.log(ltp , sct ,cht , ltp - sct );
			if( cht > ltp - sct + 30 ) {
				
				$(els).closest(".ut-tooltip").removeClass("bot"); // console.log("상");
			}else{
				$(els).closest(".ut-tooltip").addClass("bot"); // console.log("하");

				t = t - ctnHt - elsHt - 10;
			}
			$(els).closest(".ut-tooltip").find(".toolctn").css({"left":20,"top":t});
		}
	},
	balloon:{ // 말풍선
		init:function(){
			this.set();
			this.evt();
		},
		evt:function(){
			$(document).on("click",".ut-balloon .close",function(e){
				$(this).closest(".ball").addClass("hide");
			});
		},
		set:function(){
			$("[data-ui-balloon]").each(function(){
				var $ball = $(this);
				
				$ball.find(".msg").length ? msg = $ball.find(".msg").html() : msg = $ball.html();
				var opt = $ball.attr("data-ui-balloon");
				var cls = opt.replace(","," ");
				// console.log(opt,msg,cls);
				$ball.addClass(cls);
				var box = 
					'<div class="ball">'+
					'	<span class="msg">'+msg+'</span>'+
					'	<button type="button" class="close">말풍선닫기</button>'+
					'</div>';
					
				$ball.addClass("ut-balloon").html(box);
			});
		}
	},
	elip:{ // 5줄이상 내용더보기 
		init:function(){
			this.evt();
			this.set();
		},
		evt:function(){
			$(document).on("click", "[data-ui='elips'] .btn-tog", function() {
				if ($(this).closest("[data-ui='elips']").hasClass("open")) {
					$(this).closest("[data-ui='elips']").removeClass("open");
					$(this).text("내용더보기");
				} else {
					$(this).closest("[data-ui='elips']").addClass("open");
					$(this).text("내용닫기");
				}
			});
		},
		set:function(){
			$("[data-ui='elips']").each(function(){
				var txtH = $(this).find(".txt");
				// console.log(txtH.height());
				if(txtH.height()>105){
					txtH.closest("[data-ui='elips']").addClass("elips");
				}else{
					txtH.closest("[data-ui='elips']").removeClass("elips");
				}
			});
		}
	},
	range:{
		init:function(){
			this.set();
		},
		set:function(){
			$(".ut-barslide.a").each(function(){
				var $this  = $(this);
				!$this.find(".ui-slider-handle").length && $this.find(".barslide").append('<div class="ui-slider-handle"><span class="hantxt"></span></div><em class="bar"></em>');
				var hantxt = $this.find(".hantxt");
				var bardis = $this.find("em.bar");
				var amt    = $this.find("input.amt");
				var step   = parseInt( $this.find("input.step").val() );
				var val    = parseInt( $this.find("input.amt").val() );
				var min    = parseInt( $this.find("input.min").val() );
				var max    = parseInt( $this.find("input.max").val() );
				setHandle(val,min,max);
				function setHandle(val,min,max){
					var wid = (val-min) / (max-min) * 100;
					// console.log(val);
					bardis.css("width", wid  + "%");
					hantxt.html( ui.commas.add(val) + '<i class="w">원</i>');
					amt.val(val);
				}
				$this.find(".barslide").slider({
					value: val,
					min: min,
					max: max,
					step: step,
					create:function( event, ui ){
						setHandle(val,min,max);
					},
					slide:function( event, ui ){
						var val = ui.value;
						setHandle(val,min,max);
					},
					stop: function( event, ui ){
						var val = ui.value;
						amt.trigger("change");
					}
				});
			});

			$(".ut-barslide.b").each(function(){
				var $this  = $(this);
				!$this.find(".barslide .hantxt").length && $this.find(".barslide").html('<span class="hantxt"></span>');
				var hantxt = $this.find(".hantxt");
				var amt0   = $this.find("input.amt0");
				var amt1   = $this.find("input.amt1");
				var step   = parseInt( $this.find("input.step").val() );
				var val0   = parseInt( $this.find("input.amt0").val() );
				var val1   = parseInt( $this.find("input.amt1").val() );
				var min    = parseInt( $this.find("input.min").val() );
				var max    = parseInt( $this.find("input.max").val() );
				setHandle(val0,val1,min,max);
				function setHandle(val0,val1,min,max){
					hantxt.html( ui.commas.add(val0) + '<i class="w">원</i> ~ '+ ui.commas.add(val1) + '<i class="w">원</i>'  );
					// console.log(val0,val1);
					amt0.val(val0);
					amt1.val(val1);
				}
				$this.find(".barslide").slider({
					range: true,
					min: min,
					max: max,
					values: [ val0, val1 ],
					step: step,
					create:function( event, ui ){
						setHandle(val0,val1,min,max);
					},
					slide: function( event, ui ) {
						var val0 = ui.values[0];
						var val1 = ui.values[1];
						setHandle(val0,val1,min,max);
					},
					stop: function( event, ui ){
						var val0 = ui.values[0];
						var val1 = ui.values[1];
						amt0.trigger("change");
						amt1.trigger("change");
					}
				});
				
			});

		}
	},	
	commas:{
		add:function(str){
			return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		},
		del:function(str){
			return parseInt(str.replace(/,/g , ''));
		}
	},
	form:{  //  폼요소
		init:function(){
			// this.select.init();
			this.checked.init();
			this.input.init();
			this.intdel.init();
			// this.inthgt.init();
			// this.commas.init();
			// this.amts.init();
			// this.amtd.init();
			// this.star.init();
			// this.chktog.init();
			this.attach.init();
		},
		set:function(){
			// this.select.set();
			this.checked.set();
			this.input.set();
			this.intdel.set();
			// this.inthgt.set();
			// this.commas.set();
			// this.amts.set();
			// this.amtd.set();
			this.star.set();
			this.chktog.set();
			this.attach.set();
		},
		checked:{
			init:function(){
				this.evt();
				this.set();
			},
			evt:function(){
				var _this = this;
				$(document).on("change","label.radio>input, label.checkbox>input",function(e){
					_this.set();
				});
			},
			set:function(){
				$("label.radio,label.checkbox").each(function(){
					var $rdochk = $(this);
					$rdochk.find(">input").attr("aria-hidden","true");
					
					if( $rdochk.is(".radio") ){  // 라디오
						$rdochk.attr("role","radio");
				
						if ($rdochk.find(">input").is(":checked") == true ) {
							$rdochk.attr("aria-checked",true);
						}else{
							$rdochk.attr("aria-checked",false);
						}
					}
					if( $rdochk.is(".checkbox") ){ // 체크박스
						$rdochk.attr("role","checkbox");
						if(	$rdochk.find(">input").is(":checked") ){
							$rdochk.attr("aria-checked",true);
						}else{
							$rdochk.attr("aria-checked",false);
						}
					}
				});
			},
		},
		select:{
			init:function(){
				this.evt();
				this.set();
			},
			evt:function(){
				var _this = this;
	
				$(document).on("click",".select .btsel",function(){
					if( $(this).closest(".select").is(".open") ){
						_this.close(this);
					}else{
						_this.open(this);
					}
				});
				$(document).on("click",".select>.slist>li button",function(e){
					_this.close(this);
				});
				$(document).on({
					"focus":function(){
						$(this).closest(".select").addClass("focus");
					},
					"blur":function(){
						$(this).closest(".select").removeClass("focus");
					}
				},".select .btsel , .select.def select");
				$(document).on("click", function(e) {
					if(!$(e.target).closest(".select").length ) {
						$(".select").removeClass("open");
					}
				});
			},
			set:function(){
				$(".select").each(function(){
					
					if( $(this).find(">.lb:not(.blind)").length ) {
						$(this).removeClass("no-lb");
					}else{
						$(this).addClass("no-lb");
					}
					
					if( $(this).is(".def") ) {return;}
					
					if( !$(this).find(".btsel").length ) {
						$(this).find(">select").before('<button class="btsel" type="button" title="선택하기"></button>');
					}
					if( !$(this).is(".set").length ) {
						$(this).addClass("set");
					}
					
					$(this).find("select").attr("tabindex","-1").attr({"aria-hidden":true});
					var $btSel = $(this).find(".btsel");
					var tit = $(this).find("select").data("select-title") || "옵션선택";
					var sel = $(this).find("select").val();
					var txt = $(this).find("select option:selected").text() ;
					var dis = $(this).find("select").prop("disabled");
					// console.log(list ,sel ,txt ,dis);
					
					$btSel.text(txt).attr("aria-expanded",false);
					if( dis == true ) {
						$(this).addClass("disabled");
						$btSel.prop("disabled",true);
					}else{
						$(this).removeClass("disabled");
						$btSel.prop("disabled",false);
					}
				});
			},
			open:function(els){
				// console.log(els);
				var btnWidth = $(els).outerWidth();
				// console.log( btnWidth );
				$(".select").find(".slist").remove();
				var list = [];
				$(els).closest(".select").find("select option").each(function(){
					list.push( { v:$(this).val() ,t:$(this).text() } );
				});
				$(els).attr("aria-expanded",true);
				
				var blist="";
				for(var i in list) {
					blist += '<li><button type="button" class="bt" value="'+list[i].v+'">'+list[i].t+'<i class="blind">선택하기</i></button></li>';
				}
				var sel = $(els).closest(".select").find("select").val();
	
				var spop = '<ul class="slist">'+blist+'</ul>';
				$(els).closest(".select").append(spop);
				$(els).closest(".select").find(".slist").css("min-width",btnWidth-4);
				$(els).closest(".select").find(".slist button[value='"+sel+"']").attr("title","선택됨").closest("li").addClass("active").siblings("li").removeClass("active");
				
				$(".select").removeClass("open");
				$(els).closest(".select").addClass("open").find(".slist li.active .bt");
				ui.keytab.set( $(els).closest(".select").find(".slist") );				
				
				this.pos(els);
			},
			close:function(els){
				var sel = $(els).attr("value");
				var txt = $(els).html();
				$(els).closest(".select").find(".btsel").attr("aria-expanded",false);
				$(els).closest(".select").removeClass("open");
				$(els).closest(".select").find("select>option[value='"+sel+"']").prop("selected",true);
				$(els).closest(".select").find("select").val(sel).prop("selected",true);
				$(els).closest(".select").find(".btsel").html(txt).find(".blind").remove() ;
				$(els).closest(".select").find("select").trigger("change");
				$(els).closest(".select").find(".btsel").attr("tabindex","0").focus();
				$(els).closest(".select").find(".slist").remove();
			},
			pos:function(els){
				// 메뉴 포지션		
				// console.log(els);
				var isPop = $(els).closest(".poptents").length;
				var ltp = $(els).offset().top;
				var cht = $(".pop-layer.a:visible .pct").height()*0.5 || $(window).height()*0.5 ;
				var sct = $(".pop-layer.a:visible .pct").scrollTop() || $(window).scrollTop() ;
				if( isPop )  ltp = ltp + sct ; 
				// console.log(ltp , sct ,cht , ltp - sct );
				if( cht > ltp - sct + 30 ) {
					$(els).closest(".select").removeClass("bot"); // console.log("상");
				}else{
					$(els).closest(".select").addClass("bot"); // console.log("하");
				}
			}
		},
		input:{
			init:function(){
				this.evt();
				this.set();
			},
			comsChk:function(els){ // 입력필드에 값이 있는지 첵크
				$(els).find("input , textarea").each(function(){
					var val = $(this).val();
					if( val == "" ){
						val = false;
						$(this).closest(".input , .textarea").removeClass("coms");
					}else{
						val = true;
						$(this).closest(".input , .textarea").addClass("coms");
						return false;
					}
				});
			},
			set:function(){
				var _this = this;
				

				$(".input , .textarea").each(function(){
					// var valength = $(this).closest(".input , .textarea").find("input , textarea").val(); 
					// console.log(valength);
					var $this = $(this).find("input, textarea");
					var els = this;
					_this.comsChk(els);

					// var comsStat ;
					// if( $(this).val() == ""  ) {
					// 	comsStat = false;
					// }else{
					// 	comsStat = true;
					// }

					// console.log(comsStat);
					// if( $this.val() == "" ){
					// 	$(this).removeClass("coms");
					// }else{
					// 	$(this).addClass("coms");
					// }


					if( $this.attr("disabled") ){
						// console.log(		$this.val() );
						$(this).addClass("disabled");
					}else{
						// console.log(		$this.val() );
						$(this).removeClass("disabled");
					}
					if( $this.attr("readonly") ){
						// console.log(		$this.val() );
						$(this).addClass("readonly");
					}else{
						// console.log(		$this.val() );
						$(this).removeClass("readonly");
					}
					if( $(this).find(">.lb:not(.blind)").length ) {
						$(this).removeClass("no-lb");
					}else{
						$(this).addClass("no-lb");
					}
					if( $this.is(":focus") ) {
						$(this).addClass("focus");
					}
				});
			},
			evt:function(){
				var _this = this;
				$(document).on("click",".input .lb, .textarea .lb",function(e){
					$(this).closest(".input , .textarea").find("input, textarea").first().focus();
				});
				$(document).on("focus",".input input, .textarea textarea",function(e){
					$(this).closest(".input , .textarea").addClass("focus");
				});
				$(document).on("blur",".input input, .textarea textarea",function(e){
					$(this).closest(".input , .textarea").removeClass("focus");
					// console.log( $(this).val() );
					var els = $(this).closest(".input , .textarea");
					_this.comsChk(els);
					// if( $(this).val() == "" ){
					// 	$(this).closest(".input , .textarea").removeClass("coms");
					// }else{
					// 	$(this).closest(".input , .textarea").addClass("coms");
					// }
				});
			}
		},
		intdel:{ // .input.del 박스에 글자 삭제
			init:function(){
				this.evt();
				this.set();
			},
			set:function(){
				var _this = this;
				$(this.inpThis).each(function(){
					// $(this).trigger("input");
					_this.xpadd(this);
					
				});
			},
			// inpEls:".input:not(.notdel)>input:not([disabled],[readonly]), [data-ui='autoheight']",
			inpThis:".input>input",
			inpEls:".input.xdel>input",
			evt:function(){
				var _this = this;
				$(document).on("input focus",this.inpEls,function(e){
					var els = this;
					if( $(els).val() == "" ) {
						_this.xhide(els);
					}else{
						_this.xshow(els);
					}
				});
				$(document).on("focusout",this.inpEls,function(e){
					var els = this;
					setTimeout( function(){
						_this.xhide(els);
					},300);
				});
				$(document).on("click",".input .btdel",function(e){
					var els = this;
					var myDel = $(this);
					myDel.closest(".input").find("input,textarea").val("").focus().trigger('input');
					_this.xhide(els);
				});
			},
			xpadd:function(els){
				var _this = this;
				$(els).closest(".input").find(">input").css({"padding-right":_this.posit(els) });
				$(els).closest(".input").find(".btdel").css({ "right":_this.posit(els) });
			},
			xshow:function(els){
				$(this.inpEls).closest(".input").removeClass("del").find(".btdel").remove();
				var _this = this;
				var myInput = $(els);
				// console.log(myInput.val());
				if( myInput.val() != ""  && myInput.closest(".input").find(".btdel").length == 0  ) {
					myInput.closest(".input").addClass("del").append('<button type="button" class="btdel" tabindex="-1">삭제</button>');
				}
				
			},
			xhide:function(els){
				var myInput = $(els);
				myInput.closest(".input").removeClass("del").find(".btdel").remove();
				myInput.closest(".input:not(.ui-prcset) input").css({ "padding-right":this.posit(els) });
			},
			posit:function(els){
				var myInput = $(els);
				
				var rpost = myInput.closest(".input").is(".b") ? 0 : 0 || 0 ;
				var ibts  = myInput.closest(".input").find(".ibts");
				var btpos = ibts.length ? ibts.width()+20+ rpost : "";
				return btpos;
			}
		},
		attach:{
			init:function(){
				this.set();
				this.evt();
			},
			evt:function(){
				$(document).on("change", "[data-ui='attach'] .btn-attach input.file", function() {
					var els = $(this).closest("[data-ui='attach']");
					var lcEls;
					var fUrl = (this.value).split("\\"),
						fName = fUrl[fUrl.length - 1];
					var locVar = els.find("button.delete").length;
					console.log(locVar , els);
					if (!locVar) {				
						lcEls = '<button type="button" class="delete">삭제</button>';
						els.find(".flist").append( lcEls );
					}
					els.addClass("on");
					els.find(".flist .loc").text(fName);
					els.find(".flist .img").attr("src",this.value);
				});
				$(document).on("click", "[data-ui='attach'] .flist .delete", function() {
					var els = $(this).closest("[data-ui='attach']");
					els.find(".btn-attach input.file").val("");
					els.find(".flist .delete").remove();
					els.find(".flist .loc").text("선택된 파일 없음");
					els.removeClass("on");
				});
				$(document).on({
					"focus":function(){
						$(this).closest(".btn-attach").addClass("focus");
					},
					"blur":function(){
						$(this).closest(".btn-attach").removeClass("focus");
					},
				},".btn-attach .file");
			},
			set:function(){
			}
		}
	},
	loading:{ // 로딩중..
		show: function (id) {
			if (id) {
				$("#"+id).prepend('<div class="ui-loading is-pg" role="dialog"><b class="blind">로딩중...</b><em></em></div>');
			}else{
				if( $(".ui-loading").length ) return;
				var els = '<div class="ui-loading" role="dialog"><b class="blind">로딩중...</b><em></em></div>';
				$("body").prepend(els).addClass("is-loading");
				
			}
		},
		hide: function (id) {
			if (id) {
				$("#"+id+" .ui-loading").remove();
			}else{
				$(".ui-loading").remove();
				$("body").removeClass("is-loading");
			}
		}
	},
	accd:{ // 아코디언 UI
		init: function() {
			this.using();
			this.set();
		},
		set:function(){
			$(".ut-accd>li>.cbox").hide();
			$(".ut-accd>li.open>.cbox").show();
			$(".ut-accd>li.expt>.cbox").show();
			$(".ut-accd>li>.hbox .btn-tog").each(function(){
				if( !$(this).find(".btxt").length ){ $(this).append('<span class="btxt"></span>'); }

				if( $(this).closest("li").is(".open") ){
					$(this).attr("aria-expanded",true).find(">.btxt").text("닫기");
				}else{
					$(this).attr("aria-expanded",false).find(">.btxt").text("열기");
				}
			});
		},
		using: function() {
			$(document).on("click", ".ut-accd>li:not(.expt)>.hbox .btn-tog", function() {
				var type =  $(this).closest(".ut-accd").attr("data-accd");
				var $li =   $(this).closest("li");
				var $cbox = $li.find(">.cbox");
				// console.log(type);
				if( type == "tog" ){
					if( $cbox.is(":hidden") ){
						ui.lock.using(true);
						$cbox.slideDown(100,function(){
							$li.addClass("open").find(".btn-tog").first().attr("aria-expanded",true).find(">.btxt").text("닫기");
							ui.lock.using(false);
						});
					}else{
						ui.lock.using(true);
						$cbox.slideUp(100,function(){
							$li.removeClass("open").find(".btn-tog").first().attr("aria-expanded",false).find(">.btxt").text("열기");
							ui.lock.using(false);
						});
					}
				}
				if( type == "accd" ){
					$(this).closest(".ut-accd").find(">li.open").not("li.expt").find(">.cbox").slideUp(100,function(){
						$(this).closest(".ut-accd").find(">li.open").removeClass("open").find(".btn-tog").first().attr("aria-expanded",false).find(">.btxt").text("열기");
					});
					if( $cbox.is(":hidden") ){
						ui.lock.using(true);
						$cbox.slideDown(100,function(){
							$li.addClass("open").find(".btn-tog").first().attr("aria-expanded",true).find(">.btxt").text("닫기");
							ui.lock.using(false);
						});
					}
				}
			});
		}
	},
	togs:{ // 토글클래스  UI
		init: function() {
			this.evt();
			this.set();
		},
		evt:function(){
			var _this = this;
			$(document).on("click","[data-tog-cls='btn']",function(e){
				var val  = $(this).attr("data-tog-val") || "open";
				var $btn = $(this);
				var $box = $(this).closest("[data-tog-cls='box']");
				var $ctn = $box.find("[data-tog-cls='ctn']").first();
				if( $box.is("."+val) ) {
					$ctn.slideUp(100,function(){
						$box.removeClass(val);
						$btn.removeClass(val).attr("aria-expanded",false).find(".btxt").text("열기");
						$ctn.removeClass(val);
					});
				}else{
					$ctn.slideDown(100,function(){
						$box.addClass(val);
						$btn.addClass(val).attr("aria-expanded",true).find(".btxt").text("닫기");
						$ctn.addClass(val);
					});
				}
			});
		},
		set:function(){
			$("[data-tog-cls='box']").each(function(){
				var $box = $(this);
				var val  = $(this).attr("data-tog-val") || "open";
				$box.find("[data-tog-cls='ctn']").hide();
				$box.find("[data-tog-cls='ctn']."+val).show();
			});

			$("[data-tog-cls='btn']").each(function(){
				var $btn = $(this);
				if( !$btn.find(".btxt").length ){ $btn.append('<span class="btxt"></span>'); }
	
				if( $btn.is(".open") ){
					$btn.attr("aria-expanded",true).find(".btxt").text("닫기");
				}else{
					$btn.attr("aria-expanded",false).find(".btxt").text("열기");
				}
			});

		},
		open:function(id){

		},
		close:function(id){

		}
	},
	tog:{ // 토글 UI
		init: function() {
			this.evt();
			this.set();
			if( ui.param.tog ) this.set( ui.param.tog );
		},
		evt:function(){
			var _this = this;
			$(document).on("click", "[data-ui-tog='btn']", function(e) {
				var id = $(this).data("ui-tog-val");
				var bt = $(this);
				// console.log(id);
				if( bt.hasClass("open") ) {				
					_this.close(id);
				}else{
					_this.open(id);
				}
				e.preventDefault();
			});
		},
		set:function(id){
			$("[data-ui-tog='ctn']").hide();
			$("[data-ui-tog='ctn'].open").show();
			var _this = this;
			$("[data-ui-tog='btn']").each(function(idx){
				var $btn = $(this);
				if(!$btn.find(".btxt").length ){ $(this).append('<span class="btxt"></span>'); }
	
				if( $btn.is(".open") ){
					$btn.attr("aria-expanded",true).find(".btxt").text("닫기");
				}else{
					$btn.attr("aria-expanded",false).find(".btxt").text("열기");
				}
			});
		},
		open:function(id){
			$("[data-ui-tog='btn'][data-ui-tog-val='"+id+"']").addClass("open").attr("aria-expanded",true).find(".btxt").text("닫기");
			$("[data-ui-tog='ctn'][data-ui-tog-val='"+id+"']").slideDown(100,function(){
				$(this).addClass("open");
			});
		},
		close:function(id){
			$("[data-ui-tog='btn'][data-ui-tog-val='"+id+"']").removeClass("open").attr("aria-expanded",false).find(".btxt").text("열기");
			$("[data-ui-tog='ctn'][data-ui-tog-val='"+id+"']").slideUp(100,function(){
				$(this).removeClass("open");
			});
		}
	},
	tabs:{ // 탭 UI
		init: function() {
			var _this = this;
			this.evt();
			$(window).on("pageshow",function(){
				_this.set();
				_this.posit();
			});
		},
		set:function(speed){
			$(".ut-tabs>.menu").attr({"role":"tablist"});
			$("[data-ui-tab-btn]").each(function(){
				var tid = $(this).attr("aria-controls");
				// $(this).attr({"aria-controls":tid});
				var $li = $(this).closest("li");
				$li.find(".bt").attr({"role":"tab"});
				$li.is(".active") ? $li.find(".bt").attr({"aria-selected":"true"}) : $li.find(".bt").attr({"aria-selected":"false"});
			});
			$("[data-ui-tab-ctn]").each(function(){
				var tid = $(this).attr("aria-controls");
				$(this).attr({"aria-labelledby":tid , "role":"tabpanel" });
			});
			this.posit(speed);
			ui.ly.set();
		},
		
		posit:function(speed){
			var _this = this;
			speed = speed ? speed :  0;
			$(".ut-tabs").each(function(){
				var $tb     = $(this);
				var tbWid     = $(this).outerWidth();
				var tbScWid   = $tb.prop('scrollWidth');
				var $act    = $tb.find("li.active");
				var actMg    = parseInt( $tb.find("li.active").css("margin-left") );
				var $actWid = $act.outerWidth();
				var $actL   = $act.position() ? $act.position().left : 0;
				// var move    = ( ($actWid) - (tbScWid*0.5) + $actL );
				var move    = (  $actL  + $actWid*0.5 - tbWid*0.5 + actMg );
				// console.log(tbScWid , tbWid , $actL , $actWid , " = ",move);
				// $tb.scrollLeft(  move  );
				$tb.animate({ scrollLeft: move },speed, function() {
					
				});
			});
		},
		evt:function(){
			var _this = this;
			$(document).on("click", "[data-ui-tab-btn]", function(e){
				_this.using(this);
				_this.set(200);
			});
		},
		using:function(els){
			var val  = $(els).attr("aria-controls");
			var ctn = $(els).data("ui-tab-btn");
			// console.log(val, ctn);
			$("[data-ui-tab-btn="+ctn+"]").removeClass("active").closest("li").removeClass("active");
			
			$(els).addClass("active").closest("li").addClass("active");
			$("[data-ui-tab-ctn="+ctn+"]").removeClass("active");
			$("[data-ui-tab-ctn][aria-labelledby='"+val+"']").addClass("active");
		}
	},
	datepick:{ // 달력피커 jQuery-ui
		init:function(){
			
				
			$("input.datepicker").on("focus",function(){
				// $(this).blur();
				// $(this).prop("readonly",true);
				// $(this).attr("tabindex","-1");
				// $(this).next(".ui-datepicker-trigger").focus();
			});

			$(document).on("click",".ui-datepicker-next",function(e){
				e.preventDefault();
				setTimeout(function(){			
					$(".ui-datepicker-next").attr({"tabindex":"0"}).focus();
				});
			});
			$(document).on("click",".ui-datepicker-prev",function(e){
				e.preventDefault();
				setTimeout(function(){
					$(".ui-datepicker-prev").attr({"tabindex":"0"}).focus();
				});
			});
			$(document).on("change click",".ui-datepicker-year",function(e){
				e.preventDefault();
				setTimeout(function(){
					$(".ui-datepicker-year").attr("title","년도선택").focus();
				});
			});

		
			this.set();
		},
		set:function(params){
			var _this = this;
			this.opts = $.extend({
				id:"",
				// minDate: '-3M',
	  			// maxDate: '+28D',
				showOn: "button",
				showButtonPanel: true,
				changeYear:true ,
				// changeMonth:true,
				buttonText: "날짜선택",
				// showMonthAfterYear: true,
				prevText: "이전 달",
				nextText: "다음 달",
				closeText: "닫기",
				dateFormat:"yy.mm.dd",
				yearRange: 'c-50:c+20',	
				// yearSuffix: "년",
				showOtherMonths: true,
     			selectOtherMonths: false,
				dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
				monthNames : [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				monthNamesShort: [ "1","2","3","4","5","6","7","8","9","10","11","12"],
				beforeShow: function(els,id) {
					// console.log($(this).attr("id"));
					$(".ui-datepicker").wrap('<div class="ui-datepickwrap"></div>');
					setTimeout(function(){
						ui.keytab.set( $("#ui-datepicker-div") );
						$(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"javascript:;"});
						$("#ui-datepicker-div").attr("tabindex","-1").focus();
						$("#ui-datepicker-div").prepend('<h3 class="ptit blind" tabindex="0">날짜선택</h3>');
						$("#ui-datepicker-div .ui-state-active").attr({"title":"선택됨"});
						$("#ui-datepicker-div .ui-state-highlight").attr({"title":"오늘날짜"});
						$(".ui-datepicker-year").attr("title","년도선택");
						//_this.setYY(els,id);
						$(".ui-datepickwrap").addClass("open");
						ui.lock.using(true);
					});
				},
				onSelect :function(date,els){
					// console.log(date,els);
					// $(this).trigger("change");
					// $(this).focus();
					$(this).removeClass("init");
				},
				onChangeMonthYear  :function(els,id){

					setTimeout(function(){
						$(".ui-datepicker-header .ui-corner-all").attr({"tabindex":"0","href":"javascript:;"});
						$("#ui-datepicker-div").prepend('<h3 class="ptit blind" tabindex="0">날짜선택</h3>');
						$(".ui-datepicker-year").attr("title","년도선택").focus();
						//_this.setYY(els,id);
					});
				},
				onClose:function(date,els){
					// console.log(date,els);
					// ui.lock.using(false);
					// $("#"+els.id).focus();
					$(".ui-datepickwrap").removeClass("open");
					setTimeout(function(){
						$(".ui-datepicker").unwrap(".ui-datepickwrap");
						ui.lock.using(false);
						$("#"+els.id).next("button").focus().closest(".ut-date").addClass("coms");
					},200);
				}
			}, params); 
			if( this.opts.id ) {
				$("#"+this.opts.id+":not(:disabled)").datepicker(this.opts).addClass("datepicker");
			}else{
				$("input:not(:disabled).datepicker").datepicker(this.opts);
			}
			$("input:not(:disabled).datepicker").attr("pattern","\\d*");
			// $("input:not(:disabled).datepicker").prop("readonly",true);
			$("input.datepicker.st").next(".ui-datepicker-trigger").text("시작날짜선택");
			$("input.datepicker.ed").next(".ui-datepicker-trigger").text("종료날짜선택");
		},
		setYY:function(els,id){
			var dtit = $(els).attr("title") || "날짜선택";
			// console.log(dtit);
			if( !$(".ui-datepicker .dtit").length ) $(".ui-datepicker").prepend('<h4 class="dtit">'+dtit+'</h4>');
			var btsy = '<div class="btsy">'+
							'<button class="bt prev" type="button">이전</button>'+
							'<button class="bt next" type="button">다음</button>'+
						'</div>';
			if( !$(".ui-datepicker-header .btsy").length ) $(".ui-datepicker-header").prepend(btsy);
		}
	},
	monthpick:{
		init:function(){
			this.evt();
			this.set();
		},
		dgt:function(mm){
			mm = parseInt(mm);
			mm < 10 ? mm = "0"+mm : mm;
			return mm;
		},
		evt:function(){
			var _this = this;


			$(document).on("click",".bt-month",function(e){
				// $(this).prev("input").trigger("click");
			});
			$(document).on("click","input.monthpicker+.bt-month",function(e){
				var $month = $(this).closest(".ut-date").find(".monthpicker");
				var id = $month.attr("id");
				var mm, yy;
				var val = $month.val();
				if( val != ""){
					yy = val.split('.')[0];
					mm = val.split('.')[1];
				}else{
					var date = new Date();
					yy = date.getFullYear();
					mm = date.getMonth()+1;
				}
				mm = _this.dgt(mm);
				_this.open(id,yy,mm);
			});
			$(document).on("click",".ut-pop-month .cdts .lst>li .mt",function(e){
				var id = $(this).closest(".ut-pop-month").attr("data-id");
				var yy = $(".ut-pop-month .yy").text();
				var mm = $(this).attr("data-val");
				mm = _this.dgt(mm);
				_this.close(id,yy,mm);
			});
			$(document).on("click",".ut-pop-month .hdts .bt.prev",function(e){
				$(".ut-pop-month .yy").text( parseInt(  $(".ut-pop-month .yy").text() ) -1 );
				var id = $(this).closest(".pop-month").data("id");
				_this.setm(id);
			});
			$(document).on("click",".ut-pop-month .hdts .bt.next",function(e){
				$(".ut-pop-month .yy").text( parseInt(  $(".ut-pop-month .yy").text() ) +1 );
				var id = $(this).closest(".pop-month").data("id");
				_this.setm(id);
			});
			$(document).on("click",".ut-pop-month .btn-pop-close",function(e){
				var id = $(this).closest(".ut-pop-month").attr("data-id");
				var yy = $(".ut-pop-month .yy").text();
				var mm = $(this).closest(".ut-pop-month").find("li.active .mt").attr("data-val");
				mm = _this.dgt(mm);
				_this.close(id,yy,mm);
			});


			$(document).on("click", ".ut-pop-month", function(e) {
				var id = $(this).closest(".ut-pop-month").attr("id");
				// console.log(e.target);
				if ( $(e.target).is(".ut-pop-month") ) {
					$(".ut-pop-month  .btn-pop-close").trigger("click");
				}
			});

		},
		open:function(id,yy,mm){
			var _this = this;
			var date = new Date();
			mt = date.getMonth()+1;
			
			// console.log(yy, mm, id , mt);
			$("body").append(_this.pop);
			$(".ut-pop-month").attr("data-id",id);
			$(".ut-pop-month .yy").text(yy);
			ui.popup.open('pop-month');
			_this.setm(id);
		},
		setm:function(id){
			var _this = this;
			var todays={}, current={};
			var $input = $("input#"+id);
			var minDate = $input.attr("data-min") || "0000.00";
			var minYY = minDate.split('.')[0];
			var minMM = minDate.split('.')[1];
			var maxDate = $input.attr("data-max") || "9999.12";
			var maxYY = maxDate.split('.')[0];
			var maxMM = maxDate.split('.')[1];
			var val = $("input#"+id).val();
			var date = new Date();
			todays.yy = date.getFullYear();
			todays.mm = date.getMonth()+1;

			current.yy = val.split('.')[0];
			current.mm = val.split('.')[1];
			// console.log(todays.yy, todays.mm, id , current.yy ,current.mm , minYY , minMM , maxYY , maxMM ,"기간 - "+ minDate +"~"+ maxDate);
			var selyy = $(".ut-pop-month .yy").text();
			$(".ut-pop-month .lst").attr("data-yy",selyy);
			$(".ut-pop-month .lst>li").removeClass("today active");
			$(".ut-pop-month .lst[data-yy='"+todays.yy+"'] li:nth-child("+todays.mm+")").addClass("today");
			$(".ut-pop-month .lst[data-yy='"+current.yy+"'] li .mt[data-val='"+current.mm+"']").closest("li").addClass("active");
			$(".ut-pop-month .lst>li").each(function(){
				var selmm = $(this).find(">.mt").attr("data-val");
				// console.log(current.yy);
				$(this).attr("data-date",selyy+selmm);
				var thisDate = parseInt( $(this).attr("data-date") );
				// console.log(minYY+minMM, maxYY+maxMM , thisDate);
				if( minYY+minMM < thisDate+1  && maxYY+maxMM > thisDate-1 ) {
					$(this).removeClass("disabled").find(".mt").prop("disabled",false);
				}else{
					$(this).addClass("disabled").find(".mt").prop("disabled",true);
				}				
			});
			// console.log(  minYY +" "+ selyy +" "+ maxYY );
			if( minYY < selyy ){
				$(".ut-pop-month  .bt.prev").prop("disabled",false);
			}else{
				$(".ut-pop-month  .bt.prev").prop("disabled",true);
			}
			if( maxYY > selyy ){
				$(".ut-pop-month  .bt.next").prop("disabled",false);
			}else{
				$(".ut-pop-month  .bt.next").prop("disabled",true);
			}
			ui.keytab.set( $(".ut-pop-month").find(".pbd") );
		},
		close:function(id,yy,mm){
			var _this = this;
			mm = _this.dgt(mm);
			console.log(yy, mm, id);

			if(mm){
				$("#"+id).val(yy+"."+mm).next(".bt-month").focus().closest(".ut-date").addClass("coms");
			}else{
				$("#"+id).val('');
			}
			$("#"+id).next(".bt-month").focus();
			$(".ut-pop-month").removeClass("on").on(ui.transitionend,function(){
				$(".ut-pop-month").remove();
				$(this).off(ui.transitionend);
			}).css({"z-index":""});
			
		},
		pop:'<article class="pop-month ut-pop-month" id="pop-month">'+
			'	<div class="pbd">'+
			'		<div class="phd blind">'+
			'			<div class="in">'+
			'				<h1 class="ptit">월 선택</h1>'+
			'			</div>'+
			'		</div>'+
			'		<div class="pct">'+
			'			<main class="poptents">'+
			'				<div class="hdts">'+
			'					<div class="yy"></div>'+
			'					<button type="button" class="bt prev">이전 년도</button>'+
			'					<button type="button" class="bt next">다음 년도</button>'+
			'				</div>'+
			'				<div class="cdts">'+
			'					<ul class="lst">'+
			'						<li><button type="button" data-val="01" class="mt"><b class="t">1</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="02" class="mt"><b class="t">2</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="03" class="mt"><b class="t">3</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="04" class="mt"><b class="t">4</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="05" class="mt"><b class="t">5</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="06" class="mt"><b class="t">6</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="07" class="mt"><b class="t">7</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="08" class="mt"><b class="t">8</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="09" class="mt"><b class="t">9</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="10" class="mt"><b class="t">10</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="11" class="mt"><b class="t">11</b> <i class="m">월</i></button></li>'+
			'						<li><button type="button" data-val="12" class="mt"><b class="t">12</b> <i class="m">월</i></button></li>'+
			'					</ul>'+
			'				</div>'+
			'			</main>'+
			'		</div>'+
			'		<button type="button" class="btn-pop-close"><i class="blind">닫기</i></button>'+
			'	</div>'+
			'</article>',
		set:function(){
			$(".monthpicker").each(function(idx){
				var id = $(this).attr("id");
				id ? id : $(this).attr("id","input_month_"+idx);
				var $month = $(this);
				var $monbt = $month.next(".bt-month");
				$monbt.length ? $(this).addClass("set") : $month.after('<button type="button" class="bt-month">월선택하기</button>') ;
			});
		}
	},
	lock:{ // 스크롤 막기,풀기
		sct:0,
		stat:false,
		els:".pop-layer:visible  , .ui-confrim:visible , .ui-alert:visible",
		container:".container , .header , .footer , .floatnav",
		set:function(){
			if(	$(this.els).length <= 0 ){
				this.using(false);
			}
		},
		using:function(opt){

			if( opt === true && this.stat === false ){
				$(this.container).attr("aria-hidden","true");
				this.stat = true;
				ui.lock.sct = $(window).scrollTop();
				$("body , html").addClass("is-lock is-lock-end");
				$("html").css({"top":""+(-ui.lock.sct)+"px"});
				$(this.els).bind("touchmove scroll", function(e){ e.preventDefault(); });
			}
			if( opt === false && $(this.els).length <= 0 && $("body").is(".is-lock") ){
				this.stat = false;
				$("body , html").removeClass("is-lock");
				$("html").css({"top":""});
				$(window).scrollTop( ui.lock.sct );
				$(this.els).unbind("touchmove scroll");
				setTimeout(function(){
					$("body , html").removeClass("is-lock-end");
				},50);
				$(this.container).removeAttr("aria-hidden");
			}
		}
	},
	banner:{

	},
	slides:{ // 스와이프 슬라이드
		init:function(){
			var _this = this;

			$(this.dot.els).each(function(i){
				var id = $(this).attr("data-slide-id");
				if( !id ) {
					$(this).attr("data-slide-id","id_"+i);
					id = $(this).attr("data-slide-id");
				}				
				_this.dot.using(id);
			});
			$(this.num.els).each(function(i){
				var id = $(this).attr("data-slide-id");
				if( !id ) {
					$(this).attr("data-slide-id","id_"+i);
					id = $(this).attr("data-slide-id");
				}				
				_this.num.using(id);
			});
			
			$(this.play.els).each(function(i){
				var id = $(this).attr("data-slide-id");
				if( !id ) {
					$(this).attr("data-slide-id","id_"+i);
					id = $(this).attr("data-slide-id");
				}				
				_this.play.using(id);
			});
		},
		dot:{  //  
			els: ".ut-slide-dot .swiper-container",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				pagination: {
					el: '.pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.navigation .nav.next',
					prevEl: '.navigation .nav.prev'
				},
				zoom: {
					maxRatio: 1,
				},
				autoHeight:true,
				autoplay:false,
				preloadImages: false,
				// Enable lazy loading
				lazy: true,
				loop: false
			},
			using: function(id) {
				ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
			}
		},
		num:{  //  
			els: ".ut-slide-num .swiper-container",
			opt: {
				slidesPerView: 1,
				observer: true,
				observeParents: true,
				watchOverflow:true,
				pagination: {
					el: '.pagination',
					type:"fraction"
				},
				navigation: {
					nextEl: '.navigation .nav.next',
					prevEl: '.navigation .nav.prev'
				},
				autoHeight:true,
				autoplay:false,
				preloadImages: false,
				// Enable lazy loading
				lazy: true,
				loop: false
			},
			using:function(id) {
				if( $(this.els).find(".swiper-slide").length <= 1 ) {
					this.opt.loop = false;
				}
				ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
			}
		},
		play:{
			els:".ut-slide-play .swiper-container",
			opt:{
				observer: true,
				observeParents: true,
				watchOverflow:true,
				simulateTouch:false,
				freeMode: false,
				slidesPerView: 1,
				slidesPerGroup:1,
				spaceBetween:0,
				autoHeight:true,
				pagination: {
					el: '.dots',
					clickable: true
				},
				loop: false,
				autoplay: {
					delay: 4000,
					disableOnInteraction: false,
				}
			},
			slide:{},
			using:function(id){
				var _this = this;
				var sld = "[data-slide-id="+id+"]";
				if( $(sld).find(".swiper-slide").length <= 1 ) {
					_this.opt.loop = false;
					ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
					$(sld).find(".control .plys").hide();
					$(sld).find(".control .dots").html("");
				}else{
					_this.opt.loop = true;
					$(sld).find(".control").show();
					ui.slides[id] = new Swiper( "[data-slide-id="+id+"]", this.opt);
				}

				$(document).on("click","[data-slide-id="+id+"] .plys .bt",function(e){
					if( $(this).is(".play") ){
						$(this).removeClass("play").text("재생");
						ui.slides[id].autoplay.stop();
					}else{
						$(this).addClass("play").text("정지");
						ui.slides[id].autoplay.start();
					}
				});
			}
		},
	},
	alert:function(msg,params){ // 커스텀 알럿

		var opt = $.extend({
			msg:msg,
			tit:"",
			cls:"",
			ycb:"",
			ybt:"확인"
		}, params);

		if( $(".ui-alert").length ) return;
		
		ui.lock.using(true);
		// console.log(opt.tit);

		var lyAlert =
		'<article role="alertdialog" aria-live="assertive" tabindex="0" class="ui-alert ' + opt.cls + '">' +
		'	<div class="pbd">'+
		'		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
		'		<div class="pct"><div class="msg">'+opt.msg+'</div></div>'+
		'		<div class="pbt">'+						
		'			<button type="button" class="btn btn-confirm">'+ opt.ybt +'</button>'+
		'		</div>'+
		// '		<button type="button" class="btn-close">닫기</button>'+
		'	</div>'+
		'</article>';
		$("body").append(lyAlert).addClass("is-alert");
		if (opt.tit) {
			$(".ui-alert>.pbd>.phd").addClass("is-tit");
		}


		$(".ui-alert").find(".btn-confirm").on("click",function(){
			window.setTimeout(opt.ycb);
		});
		$(".ui-alert").find(".btn-close , .btn-confirm").on("click",alertClose);

		function alertClose(){
			$(".ui-alert").remove();
			$("body").removeClass("is-alert");
			if( $(".pop-layer:visible").length < 1 ){
				ui.lock.using(false);
			}
		}
		/* 웹접근성 팝업안에서 탭키이동 */
		ui.keytab.set( $(".ui-alert").find(".pbd") );
		$(".ui-alert").focus();
	},
	confirm:function(msg,params){ // 커스텀 컨펌

		var opt = $.extend({
			msg:msg,
			tit:"",
			cls:"",
			ycb:"",
			ybt:"확인",
			ncb:"",
			nbt:"취소"
		}, params);

		if( $(".ui-confrim").length ) return;
		
		ui.lock.using(true);

		var lyConfirm =
		'<article role="alertdialog" aria-live="assertive" tabindex="0" class="ui-confrim ' + opt.cls + '">' +
		'	<div class="pbd">'+
		'		<div class="phd"><span class="tit">'+opt.tit+'</span></div>'+
		'		<div class="pct"><div class="msg">'+opt.msg+'</div></div>'+
		'		<div class="pbt">'+
		'			<button type="button" class="btn btn-cancel">'+ opt.nbt +'</button>'+
		'			<button type="button" class="btn btn-confirm">'+ opt.ybt +'</button>'+
		'		</div>'+
		// '		<button type="button" class="btn-close">닫기</button>'+
		'	</div>'+
		'</article>';
		$("body").append(lyConfirm).addClass("is-confrim");
		if (opt.tit) {
			$(".ui-confrim>.pbd>.phd").addClass("is-tit");
		}
		

		$(".ui-confrim").find(".btn-confirm").on("click",function(){
			window.setTimeout(opt.ycb);
		});

		$(".ui-confrim").find(".btn-cancel").on("click",function(){
			window.setTimeout(opt.ncb);
		});

		$(".ui-confrim").find(".btn-confirm, .btn-close , .btn-cancel").on("click",confirmClose);

		function confirmClose(){
			$(".ui-confrim").remove();
			$("body").removeClass("is-confrim");
			if( $(".pop-layer:visible").length < 1 ){
				ui.lock.using(false);
			}
		}


		/* 웹접근성 팝업안에서 탭키이동 */
		ui.keytab.set( $(".ui-confrim").find(".pbd") );

		$(".ui-confrim:visible").focus();


	},
	toast:function(msg,params){ // 토스트창 
		var _this = this;
		_this.opt = $.extend({
			msg:msg,	
			cls:"",
			sec:2000,
			bot:"",
			ccb: null,
			zIndex:1000,
			setTime:true 
		}, params);

		if ( $(".pop-toast:visible").length ) { return; }

		var lyToast =
		'<article role="alert" aria-live="assertive" class="pop-toast ' + _this.opt.cls + '">' +
		'	<div class="pbd">' +
		'		<div class="pct">' + _this.opt.msg + '</div>' +
		'		<button type="button" class="btn-close""></button>' +
		'	</div>' +
		'</article>';

		$("body").append(lyToast).addClass("is-toast");

		$(".pop-toast").find(".btn-close").on("click",function(){
			toastClose("close");
		});

		window.setTimeout(function() {
			$(".pop-toast:visible").addClass("on").css({"padding-bottom" : _this.opt.bot , "z-index" : _this.opt.zIndex});
		});
		
		if(_this.opt.setTime){
			toastClose();
		}
		function toastClose(sec){
			if(sec == "close"){
				_this.opt.sec = 0;
				clearTimeout(_this.timer);
			}
			_this.timer = setTimeout(function() {
				$(".pop-toast:visible").removeClass("on").on(ui.transitionend,function(){
					// console.log("fsd");
					$(".pop-toast").remove();
					$("body").removeClass("is-toast");
					if( typeof _this.opt.ccb == "function" ){
						_this.opt.ccb();
					}
				});
			}, _this.opt.sec);
		}
	
		
	},
	popup:{ // 레이어팝업
		init: function() {
			var _this = this;
			$(document).on("click", ".pop-layer .btn-pop-close:not('.no-close')", function() {
				var id = $(this).closest(".pop-layer").attr("id");
				_this.close(id);
			});

			$(document).on("click", ".pop-layer:not('.no-close')", function(e) {
				var id = $(this).closest(".pop-layer").attr("id");
				// console.log(e.target);
				if ( $(e.target).is(".pop-layer") ) {
					_this.close(id);
				}
			});
			_this.resize();
			$(window).on("load resize",function(){
				_this.resize();
			});
		},
		callbacks:{},
		open: function(id,params) {
			// console.log(id,params);
			var _this = this;

			if ( $("#" + id).length  <= 0  ) return ;   // id 호출팝업이 없으면 리턴

			_this.opt = $.extend({
				ocb: null ,
				ccb: null,
				direct: "none",
				zIndex: "",
			}, params);

			_this.callbacks[id] = {} ;
			_this.callbacks[id].open  = _this.opt.ocb ? _this.opt.ocb : null ;
			_this.callbacks[id].close = _this.opt.ccb ? _this.opt.ccb : null ;

			ui.lock.using(true);

			$("body").addClass("is-pop "+ "is-"+id);

		
			$("#" + id).attr("role","dialog").attr("aria-modal","true").addClass(_this.opt.direct).css({ zIndex: _this.opt.zIndex }).fadeIn(10,function(){
				$(this).attr({"aria-labelledby":id+"-title"});
				$(this).find(".phd .ptit").attr("tabindex","0");
				$(this).find(".phd .ptit").attr({"id":id+"-title"});
				$(this).addClass("on").attr("tabindex","0").focus(); 
				_this.resize();
				_this.scroll(id);
				$(this).find(">.pbd").on(ui.transitionend,function(){
					if(_this.callbacks[id].open)  _this.callbacks[id].open();
					$(this).off(ui.transitionend);
				});
			});
			
			window.setTimeout(function(){
				_this.resize();
			});

			/* 웹접근성 팝업안에서 탭키이동 */
			ui.keytab.set( $("#" + id).find(".pbd") );
		},
		close: function(id,params) {
			var _this = this;
			_this.closOpt = $.extend({
				ccb: null,
			}, params);

			$("#"+id).removeClass("on").on(ui.transitionend,function(){
				_this.resize();
				$(this).hide().removeClass(_this.opt.direct);
				// if( typeof _this.callbacks[id].close == "function" ){ _this.callbacks[id].close(); }
				try{ _this.callbacks[id].close(); }catch(error){}
				// if( typeof _this.closOpt.ccb == "function") { _this.closOpt.ccb(); }
				try{ _this.closOpt.ccb(); }catch(error){}

				if( !$(".pop-layer:visible").length ){ 
					ui.lock.using(false);
					$("body").removeClass("is-pop").removeClass("is-"+id);
					$("body").removeClass("is-pop-pbt");
				}
				$(this).off(ui.transitionend);
			}).css({"z-index":""});
		},
		set:function(){
			this.resize();
			this.scroll();
		},
		resize:function(){
 			$(".pop-layer:visible").each(function(){
				var $pop = $(this);
				var pctnH =  $pop.outerHeight();
				var pbtnH =  $pop.find(".pbt:visible").outerHeight() || 0 ;
				var ptopH =  $pop.find(".tops:visible").outerHeight() || 0 ;
				var floatH =  $pop.find(".floatbots>.inr:visible").outerHeight() || 0 ;
				// console.log(pbtnH,floatH);
				pctnH = pctnH - ( $pop.find(".phd").outerHeight() || 0 );
				if( $pop.is(".a") ){ $pop.find(".pbd>div.pct").css({"max-height": pctnH - pbtnH - 80 }); }
				// if( $pop.is(".b") ){ $pop.find(".pbd>div.pct").css({"max-height": pctnH - pbtnH - 80 });}
				// if( $pop.is(".c") ){ $pop.find(".pbd>div.pct").css({"max-height": pctnH - ptopH - 30 });}
				if( $pop.find(".pbt:visible").length) {
					$("body").addClass("is-pop-pbt");
					$pop.addClass("is-pop-pbt");
					// $pop.filter(".a,.c").find(".pct").css({"padding-bottom":"calc("+(pbtnH+floatH-0)+"rem + env(safe-area-inset-bottom))"});
				}else{
					$("body").removeClass("is-pop-pbt");
					$pop.removeClass("is-pop-pbt");
					// $pop.filter(".a,.c").find(".pct").css({"padding-bottom":""});
				}
			 });
		},
		scroll:function(id){
			var _this = this;
			var prevPosition = 0;
			var dnVar = 0;
			var upVar = 0;
			var gap = 3;
			$("#"+id+" .pct").on("scroll",function(){
				
				 var _this = this;
				var scrTop = $(this).scrollTop();
				/*
				// console.log(id," = scrol = " , $(this).scrollTop());
				var initPosition = scrTop;
				// console.log(initPosition , prevPosition);
				// console.log(dnVar - upVar);
				if( initPosition > prevPosition ){
					dnVar ++ ;
					// console.log(id + " dn");
					//스크롤다운중;
					upVar = 0;
					$("#"+id+"").addClass("is-pop-scroll-down");
					// console.log(dnVar,upVar , upVar-dnVar);
					if( upVar-dnVar < -gap ) {
						$("#"+id+"").addClass("is-pop-pbt-hide");
					}
				}else {
					upVar ++ ;
					// console.log(id + " up");
					//스크롤 업중;
					dnVar = 0;
					$("#"+id+"").removeClass("is-pop-scroll-down");
					if( dnVar-upVar < 1 ) {
						$("#"+id+"").removeClass("is-pop-pbt-hide");
					}
				}
				prevPosition = initPosition ;
				 */

				// if (scrTop > 10) {
				// 	$("#"+id+"").addClass("is-pop-head-shadow");
				// }else{
				// 	$("#"+id+"").removeClass("is-pop-head-shadow");
				// }

				// 바닥첵크
				var docH = $("#"+id+" .poptents").outerHeight();
				var scr = scrTop + $("#"+id+" .pct").outerHeight();
				// console.log(docH,scr);
				if(docH <= scr + gap ){				
					// console.log("바닥");
					// $("#"+id+"").removeClass("is-pop-scroll-down");
					// $("#"+id+"").removeClass("is-pop-pbt-hide");
				}else{
					//
				}


			});

		},
		topfix:{
			init:function(){
				
			},
			set:function(){
				
			}
		}
	},
	cookie:{ // 쿠키 설정
		set:function(cname, cvalue, exdays){
			var d = new Date();
			d.setTime( d.getTime() + (exdays * 60 * 60 * 1000) );
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		},
		get:function(cname){
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		del:function(cname){
			document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
		}
	},
	html:{} // 이거 지우면안돼는거 였음.
};

// ui.init();
$(document).ready(function(){
	// console.log(typeof ui.html.set);
	if( typeof ui.html.set  == "undefined" ){
		ui.init();
		console.log("ui.init();");
	}else{
		ui.html.include();
		ui.html.times = setInterval(function(){ // console.log("ui.html" ,  ui.html.incCom);
			if (ui.html.incCom) {
				clearInterval(ui.html.times);
				ui.init();
				console.log("ui.init();");
			}
		});
	}
});