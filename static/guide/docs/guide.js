let GUIDE = {
	init : function(){
		this.tabMenu.init();
		this.tog.init();
		this.gnb.init();
		this.xscroll.init();
	},
	tabMenu: {
		init: function(){
			this.evt();
		},
		evt: function(){
			$wrap = $('.tab_area');
			$menu = $wrap.find('.tab_menu li a');
			$box = $wrap.find('.box');
			$box.first().css({display: 'block'});
			$box.each(function(i){
				$(this).attr('data-tab' , Number(i));
				currentBox = Number($(this).attr('data-tab')); 
			});
			$menu.on("click", function() {
				_this = $(this);
				currentIndex = $(this).closest('li').index();
				_this.parent().addClass('active').siblings().removeClass('active');
				$(this).closest('.tab_area').find('.box[data-tab=' + currentIndex + ']').show().siblings().hide();
			});
		},
		set: function(){}
	},
	tog : {
		init : function(){
			this.evt();	
		},
		evt: function(){
			$(document).on('click', '.tog-btn', function(){
				var _this = $('.tog-btn');
 				var type = $(this).closest("h2").next().attr("data-show");
				if(type == 'hide'){
					$('[data-show]').attr("data-show", "show");
					_this.css({
						transform: "rotate(180deg)"
					})
				}else {
					$('[data-show]').attr("data-show", "hide");
					_this.css({
						transform: "rotate(0deg)"
					})
				};
			});
		}
	},
	gnb : {
		init : function(){
			this.open();
			this.close();
		},
		open : function(){
			$(document).on('click', '.bt.open', function(){
				var _this = $(this);
				_this.next('.gnb').animate({
					right: '0px',
				});
				_this.closest('body').css({
					overflow: 'hidden',
				});
				_this.closest('.gnb-area').addClass('active');
			});
		},
		close : function(){
			$(document).on('click', '.bt.close', function(){
				var _this = $(this);
				_this.closest('.gnb').animate({
					right: '-81%',
				});
				_this.closest('body').css({
					overflow: 'auto',
				});
				_this.closest('.gnb-area').removeClass('active')
			});
		}
	},
	xscroll : {
        init:function(){
            this.scroll();
        },
        scroll : function(){
            let xPosition = $('.xscroll');
            $(window).on('scroll load', function(){
                let allHeight = $(window).scrollTop() / ( $(document).height() - visualViewport.height ) * 100; 
                xPosition.children().width(allHeight + '%' );
            });
        }
    },


};

$(document).ready(function(){
	GUIDE.init();
});