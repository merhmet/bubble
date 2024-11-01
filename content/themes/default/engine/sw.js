function go(h){ document.location.hash=h; }
function done(){document.location = window.location.href.substr(0, window.location.href.indexOf('#')); }




$(document).ready(function(){
    
    
    $("#mobil_langs").change(function() {
         window.location = $(this).val();
     });   
    
    $('.openhidden').live("click",function(){
        var div = $(this).attr("data-open");
        
        if($(this).hasClass("active")){
            $(this).removeClass("active");
		      $(div).css({right:"unset", left:"100%"});
        }else{
            $(this).addClass("active");
            $(div).css({right:0, left:"unset"});
        }
	});
	
	/*$("input.arama").sw_onerme();*/
	
	$('a.captcha').live("click",function(){
		event.preventDefault();
		$("a.captcha img").attr("src",$("a.captcha img").attr("data-src")+"?sw="+new Date().getTime());
	});
	
	
	var footermenu = $('footer nav > ul').clone();
	$(footermenu).find('li').removeClass('m').addClass("fmenu");
	$("header nav > ul").append($(footermenu).html());

	$('header a[data-for]').click(function(){
		event.preventDefault();
		$('nav.drillmenu').removeClass('active');
 		if($(this).hasClass("active")){
			$('header a[data-for]').removeClass('active');
			$("body").css({overflow:"auto"});
			$('main').delay(250).show(200);
 		}else{
			$('header a[data-for]').removeClass('active');
			$(this).addClass('active');
			$('nav.drillmenu[data-formenu="'+$(this).attr('data-for')+'"]').addClass('active');
			$('main').hide();
			$("body").css({overflow:"hidden"});
 		}
	});
  	
	$('.drillmenu li.has-sub > a').click(function(event){
		if($('nav.drillmenu').hasClass('active') && !$(this).parent('li').hasClass('active')){
			event.preventDefault();
 			$(this).parent('li').addClass('active');
			return false;
		}
	});
	
	
	var map;
	function initialize() {
	var map_canvas = document.getElementById('ulasimHarita');
	var map_options = {
		center: new google.maps.LatLng(36.920023,30.786096),
		zoom: 15,
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var styles = [
		{
			stylers: [
				{ hue: "#70AA53" },
				{ saturation: 20 },
				{ lightness: 10 }
			]
		}, {
			featureType: "all",
			elementType: "all",

		}, {
			featureType: "road",
			elementType: "labels",
			stylers: [
				{ visibility: "on" }
			]
		}
	];
	map = new google.maps.Map(map_canvas, map_options);
	map.setOptions({ styles: styles });

	var service = new google.maps.places.PlacesService(map);
	var geocoder = new google.maps.Geocoder();
	var myPos = new google.maps.LatLng(36.920023,30.786096);
	var image = 'content/themes/default/design/image_google_logo.png';
	var pin = new google.maps.Marker({ position: myPos, map: map, icon: image });

	google.maps.event.addListener(map, 'zoom_changed', function () {
		var zoomLevel = map.getZoom();
		//map.setCenter(myLatLng);


		pin = new google.maps.Marker({ position: myPos, map: map, icon: image });
		//infowindow.setContent('Zoom: ' + zoomLevel);
	});

	google.maps.event.addDomListener(window, "resize", function () {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	});
	}
	
	if($("#ulasimHarita").length){
		initialize();
	}
	 
});

(function($){
    $.fn.extend({
        sw_onerme : function(options){
            var defaults = { ajaxFilePath : "do?action=instant_search" };
            options = $.extend(defaults, options);		
 			var ajaxFilePath = options.ajaxFilePath;
 			var autoFill     = options.autoFill;
 			return this.each(function() {
				var obj = $(this);
				var obcont = $(this).parent();
				$(obcont).css("position","relative").append('<div class="search_content" style="display:none"></div>');
				obj.keyup(function(event){
 					var keyword = obj.val();
 					if(keyword.length > 2){
 						 if(event.keyCode != 13 && event.keyCode != 27 && event.keyCode != 38 && event.keyCode != 40){
 							$.ajax({
								type: "POST",
								url: ajaxFilePath,
								data: "data="+keyword,
								success: function(response){
  									$(obcont).find(".search_content").html(response).css("display",(response != '') ? "block" : "none");
								}
							});
 						 }else if(event.keyCode == 38 || event.keyCode == 40){
							if($(obcont).find(".search_results li.selected").size() == 0){
								var selected = (event.keyCode == 40) ? "eq(0)" : "last-child";
								$(obcont).find(".search_results li.result:"+selected).addClass('selected');
							}else{
								var selected = $(obcont).find(".search_results li.selected");
								$(obcont).find(".search_results li.selected").removeClass("selected");
								var newselected = (event.keyCode == 40) ? $(selected).next('li') : $(selected).prev('li');
								if(newselected!=undefined && !$(newselected).hasClass("result")){ var newselected = (event.keyCode == 40) ? $(newselected).next('li') : $(newselected).prev('li'); }
 								if(newselected==undefined || $(newselected).html() == null){
									var selected = (event.keyCode == 40) ? "eq(0)" : "last-child";
									var newselected = $(obcont).find(".search_results li.result:"+selected);
								}
								$(newselected).addClass('selected');
							}
							return false;
						 }
					}else{
						$(obcont).find(".search_content").css("display","none");
					 };
				});
				
				obj.keypress(function(event){
 					if(event.keyCode == 13){
						if($(obcont).find(".search_results li.selected").size() > 0){
							event.preventDefault();
							var url = $(obcont).find(".search_results li.selected a").attr('href');
							window.location.href=url;
							return false;
						}else if(obj.val().length<3){
							event.preventDefault();
							alert("Lütfen daha fazla yazınız..");
							return false;
						};
					};
				});
				
				$(".search_content li").live("mouseover",function(){
 					$(".search_content li").removeClass("selected");
					$(this).addClass("selected");
				});
				
 				$(document).click(function(){ $(obcont).find(".search_content:visible").css("display","none"); });
				
 			});
	    }
	});	
}) (jQuery);

$.fn.sw_popup = function(options){
	$(this.selector).removeAttr('onclick');
	$(this.selector).bind('click',function(event){
		event.preventDefault();
  		if(options.url==null) var data=$.extend({url:$(this).attr('href')},options); else var data=options;
 		$.sw_popup(data);
		return false;
	});
}

$.sw_popup=function(options){
	options = $.extend({id:'',width:'320px',ok:'Evet',cancel:'Hayır',result_ok:function(){},result_no:function(){},oncomplete:function(){},stayopen:0,border:1,close:1,refresh:false,wait:0,redirect:null},options);
	if(((options.mod!='confirm' && options.mod!='alert') || options.stayopen) && $('.sw_popup_content').html()!=null) $.sw_popup_close(options);
 	var uniqe_id = (options.id=='') ? 'sw_'+new Date().getTime() : options.id;
	var zindex = $(".sw_popup_content:last-child").css("z-index");
	var loading = (options.url!='' && options.mod=='html') ? '<small class="sw_popup_loading" rel="'+uniqe_id+'"><i class="fa fa-spinner fa-pulse fa-fw"></i></small>' : '';
	$('body').append('<small class="sw_popup_bg" rel="'+uniqe_id+'"></small>'+loading+'<div class="sw_popup_content sw_'+options.mod+' brdr'+options.border+'" id="'+uniqe_id+'"><div class="append"></div></div>');
	var sw_selector='#'+uniqe_id;
	if(options.close){ 
		$(sw_selector).append('<span class="sw_popup_close popup_kapat_button br" rel="'+uniqe_id+'"><i class="fa fa-times"></i></span>');
		$('small[rel='+uniqe_id+']').addClass('sw_popup_close');
	}
	if(options.width!=null) $(sw_selector).attr('width',options.width);
	if(options.height!=null) $(sw_selector).attr('height',options.height);
	if(options.maxwidth!=null) $(sw_selector).css('max-width',options.maxwidth);
	if(options.maxheight!=null) $(sw_selector).css('max-height',options.maxheight);
	$('.sw_popup_bg[rel='+uniqe_id+']').css("z-index",zindex+1); $('small[rel="'+uniqe_id+'"]').css("z-index",zindex+2); $(sw_selector).css("z-index",zindex+3);
	$(".sw_popup_bg").fadeIn('fast',function(){ if(!(options.mod=='html' && options.url!=null)){ $(sw_selector).fadeIn("normal"); } });
	if(options.mod=='iframe'){
		$(sw_selector+' .append').html('<iframe name="sw" src="'+options.url+'" scrolling="no" width="100%" height="100%" frameborder="0" class="sw_popup_frame"></iframe>');
	}else if(options.mod=='html'){
		$('.sw_popup_content form').unbind('submit');
		if(options.html!=null){ 
			$(sw_selector+' .append').html(options.html);
			$(sw_selector).sw_popup_resize();
		}else if(options.url==null && options.content!=null){
			var kopya = $(options.content).html();
 			$(sw_selector+' .append').html($(kopya).removeAttr('id').html());
			$(sw_selector).sw_popup_resize();
  		}else if(options.url!=null){
 			$.get(options.url,function(cevap){
 				$('.sw_popup_loading[rel="'+uniqe_id+'"]').remove();
				if(options.content!=null) $(sw_selector+' .append').html($(cevap).find(options.content).detach()); else $(sw_selector+' .append').html(cevap);				
 				$(sw_selector).sw_popup_resize();$(sw_selector).fadeIn("normal");
 			});
		}
	}else if(options.mod=='confirm'){
		html = '<div class="sw_popup_txt gr">'+options.message+'</div>';
		if(options.ok!='' || options.cancel!=''){
			html +='<div class="sw_popup_buttons">';
			if(options.ok!='') html +='<button class="btn large gri sw_popup_ok" rel="'+uniqe_id+'">'+options.ok+'</button>';
			if(options.cancel!='') html +='<button class="btn large gri sw_popup_no" rel="'+uniqe_id+'">'+options.cancel+'</button>';
			html +='</div>';
 		}
		$(sw_selector+' .append').html(html)
		$('.sw_popup_ok[rel='+uniqe_id+']').bind('click',function(){options.result_ok.call();$($(this).attr('rel')).sw_popup_close(options);});
		$('.sw_popup_no[rel='+uniqe_id+']').bind('click',function(){options.result_no.call();$($(this).attr('rel')).sw_popup_close(options);});
		$(sw_selector).sw_popup_resize();
	}else if(options.mod=='alert'){
		if(options.alert_class==1) options.alert_class='success'; if(options.alert_class==0) options.alert_class='error';
		$(sw_selector+' .append').html('<div class="alert '+options.alert_class+'">'+options.message+'</div>');
	}
	$('.sw_popup_close').click(function(){
		$($(this).attr('rel')).sw_popup_close(options);
	 }); 
	$(sw_selector).sw_popup_resize(); if(options.url==undefined){ $('.sw_popup_loading[rel="'+uniqe_id+'"]').remove(); }
	if(options.wait>0)setTimeout(function(){ if(options.refresh){ location.reload();} else if(options.redirect!=null){ window.location.href=options.redirect; }else{ $(uniqe_id).sw_popup_close(options); options.result_ok.call(); }},options.wait*1000);
}
$.fn.sw_popup_resize=function(){
	if(this.selector!='body'){
		if($(this.selector).attr('width')!=null) $(this.selector).css('width',$(this.selector).attr('width'));
		if($(this.selector).attr('height')!=null) $(this.selector).css('height',$(this.selector).attr('height'));
	}	
	$('.sw_popup_content').each(function(index) {
 		if($(this).height()>$(window).height()){
			$(this).css('position','absolute');
			$("html, body").animate({ scrollTop:0 }, 600);
			var sw_popup_y=10;
		}else{ 
			$(this).css('position','fixed');
			var sw_popup_y = ($(window).height()-$(this).outerHeight())*.5;
		}
		var sw_popup_x = ($(window).width()-$(this).width())*.5;
		$(this).css({'top':sw_popup_y,'left':sw_popup_x});	
	});	
}
$.fn.sw_popup_close=function(options){
	options = $.extend({onclose:function(){}},options);
	options.onclose.call();
	$("#"+this.selector).fadeOut('fast',function(){$(this).remove();})
	$("small[rel="+this.selector+"]").fadeOut('fast',function(){$(this).remove();})
}

$.sw_popup_close=function(options){
	$($('.sw_popup_bg:last').attr('rel')).sw_popup_close(options);
}

$.sw_all_popup_close=function(options){
	$(".sw_popup_content").fadeOut('fast',function(){$(this).remove();})
	$(".sw_popup_bg").fadeOut('fast',function(){$(this).remove();})
	$(".sw_popup_loading").fadeOut('fast',function(){$(this).remove();})
}

$.sw_loading=function(options){
	if($('small[rel="bg_loading"]').size()==0){
		var zindex = $(".sw_popup_content:last-child").css("z-index");
		$('body').append('<small class="sw_popup_bg" rel="bg_loading"></small><small class="sw_popup_loading" rel="bg_loading"><i class="fa fa-spinner fa-pulse fa-fw"></i></small>');
		$('small[rel="bg_loading"]').css("z-index",zindex+1);
	}else{
		$('small[rel="bg_loading"]').remove();
	}
}

$(document).keyup(function(e) { if (e.keyCode == 27) $.sw_popup_close(); });
$(window).resize(function() { $('body').sw_popup_resize(); });