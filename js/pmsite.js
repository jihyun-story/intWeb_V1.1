var w_w, w_h, re_resize_timer, scheight;

function resize(){
  clearTimeout(re_resize_timer);
  re_resize_timer = setTimeout(function(){ 
    w_w = $(window).width();
    w_h = $(window).height();
    if(w_w < 1000){
      $("#header .gnb").height(w_h);
    }else{
      $("#header .gnb").attr("style","");
      $("html").removeClass("open-menu");
    }
    if(w_h > 945){
      $('.fullsections.full2 .full-inner .v-con').css('margin-top', '3%');
    }else{
      $('.fullsections.full2 .full-inner .v-con').css('margin-top', '0');
    }
  }, 100);
}

function scroll_height(){
  $(window).scroll(function(){
    var scheight = $(document).scrollTop();
    var endwait = $('#merit .pr-inner .pc').offset().top;
    
    parallax(window.scrollY);
    if(scheight > endwait - w_h){
      $("#merit .pr-inner .pc").removeClass('wait');
    }
  });
}

function parallax(scheight){
	var $front = $("#visual .front"),
      $mid = $("#visual img.mid"),
      $back = $("#visual img.back"),
      front_move_value_top,
      mid_move_value_top,
      back_move_value_top;

	front_move_value_top = scheight * 0.03;
	mid_move_value_top = scheight * 0.02;
	back_move_value_top = scheight * 0.05;
    
  $front.css({"transform": "translateY(-" + front_move_value_top + "%)"});
	$mid.css({"transform": "translateY(-" + mid_move_value_top + "%)"});
	$back.css({"transform": "translateY(" + back_move_value_top + "%)"});

}

$(function(){
  resize();
  scroll_height();

  $("#header .open-btn, #header .open-bg").click(function(){
    if(w_w < 1000){
      resize();
      $("html").toggleClass("open-menu");
    }
  });

  $("#header ul.nav .main-menu").each(function(){
    $(this).click(function(){
      if($(this).hasClass("open")){
        $(this).removeClass("open");
      }else{
        $("#header ul.nav .main-menu").removeClass("open");
        $(this).addClass("open");
      }
    });
  });

});

$(window).load(function(){
  resize();
});

$(window).resize(function(){
  resize();
});