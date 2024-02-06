function remove_hide(i){
  $(".fullsections.full"+i).removeClass("hide");

  setTimeout(function(){
    $(".fullsections.full"+i).find(".tdelay").removeClass("tdelay");
  }, 1650);
}

var change_speed = 750;
var release_times, times;
var w_w, w_h, re_resize_timer;

var startY, endY;
$(document).on("touchstart", function(e){
  startY = e.originalEvent.changedTouches[0].screenY;
});
$(document).on("touchend", function(e){
  endY = e.originalEvent.changedTouches[0].screenY;
})

function moving_sections(gnbindex,length){ 
  $(".quick li").removeClass("on").eq(gnbindex).addClass("on");
  $("body").removeClass("mixed-mode");
  $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
  remove_hide(gnbindex+1);
  if($(".fullsections").eq(gnbindex).hasClass("light")){
    $("body").addClass("light-mode");
  }else{
    $("body").removeClass("light-mode");
  }
  if($(".fullsections").eq(gnbindex).hasClass("btn")){
    $("button").addClass("on");
  }
  if($(".fullsections").eq(gnbindex).hasClass("mixed-mode")){
    $("body").addClass("mixed-mode");
  }else{
    $("body").removeClass("mixed-mode");
  }
}

function quickClick(){
  $(".quick li").click(function(){
    var gnbindex = $(this).index();
    var length = 0;
    for(var i=1; i<(gnbindex+1); i++){
      length+=$(".full"+i).height();
    }
    //if($("body").find("#fullpage:animated").length >= 1) return false;
    moving_sections(gnbindex,length);
    $(".quick li").css({"visibility": 'visible'})
    return false;
  });
} 

function fullset(){
  var pageindex = $("#fullpage > .fullsections").length;
  for(var i=1;i<=pageindex;i++){
    $("#fullpage > .quick > ul").append("<li></li>");
  }

  $("#fullpage .quick ul li:first-child").addClass("on");
  $("body").addClass("mixed-mode");
  

  function moving_page(){
    clearTimeout(times);
    times = setTimeout(function(){
      $("body").removeClass("locked");
    }, change_speed);
    //event.preventDefault();
    $(".quick li").css({"visibility": 'visible'});

    if(!$("body").hasClass("locked")){
      $("body").addClass("locked");
      var page = $(".quick ul li.on");
      //console.log(page.index()+1); 
      if($("body").find("#fullpage:animated").length >= 1){
        return false;
      }

      if (event.wheelDelta > 0 || event.detail < 0 || startY < endY) {
        var before = page.index();
        var pagelength=0;
        for(var i=1; i<(before); i++){
            pagelength += $(".full"+i).height();
        }
        if(page.index() > 0){ 
            page = page.index()-1;                        
            moving_sections(page, pagelength);
        }
      }else{ 	
        var nextPage = parseInt(page.index()+1); 
        var lastPageNum = parseInt($(".quick ul li").length);
        if(nextPage < lastPageNum){ 
          var pagelength=0;
          for(var i = 1; i<(nextPage+1); i++){ 
              pagelength += $(".full"+i).height();
          }
          moving_sections(nextPage, pagelength);
        }
      }                      
    }else{
      return false;
    }
    clearTimeout(release_times);
    release_times = setTimeout(function(){            
      $("body").removeClass("locked");
    }, change_speed);
    
  }

  window.addEventListener("mousewheel", moving_page, {passive: false});
  window.addEventListener("DOMMouseScroll", moving_page, {passive: false});   
  window.addEventListener("touchmove", moving_page, {passive: false});  

  $(window).resize(function(){ 
    var resizeindex = $(".quick ul li.on").index()+1;
    var pagelength = 0;
    for(var i = 1; i<resizeindex; i++){ 
      pagelength += $(".full"+i).height();
    }
    $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
  });
}

function resize(){
  clearTimeout(re_resize_timer);
  re_resize_timer = setTimeout(function(){ 
    w_w = $(window).width();
    w_h = $(window).height();
    if(w_w < 1000){
      $("#header .gnb").height(w_h);
      $('#area .full-inner .v-con li.cells .title-con h2').html('Main Business<br>Areas');
    }else{
      $("#header .gnb").attr("style","");
      $("html").removeClass("open-menu");
      $('#area .full-inner .v-con li.cells .title-con h2').html('Main<br>Business<br>Areas');
    }
    if(w_h > 945){
      $('.fullsections.full2 .full-inner .v-con').css('margin-top', '3%');
    }else{
      $('.fullsections.full2 .full-inner .v-con').css('margin-top', '0');
    }
    if(w_w == 1920, w_h == 945){
      $("html, body").css("transform", "translate(-50%, -50.06%)");
      $("#area .full-inner .v-con li.cells ul .list-con").css("padding", "41px 0");
      $("#area .full-inner .v-con li.cells ul .list-con:first-child").css("padding", "10px 0 41px");
    }else{
      $("html, body").css("transform", "translate(-50%, -50.00%)");
      $("#area .full-inner .v-con li.cells ul .list-con").css("padding", "4% 0");
      $("#area .full-inner .v-con li.cells ul .list-con:first-child").css("padding", "10px 0 4%");
    }
    // if(w_w % 2 == 1){
    //   $("html").css("transform", "translate(-50.05%, -50%)");
    //   $("body").css("transform", "translate(-50.04%, -50%)");
    //   $("html, body").css("left", "50.05%");
    //   $(".full-inner").css({"transform":"translate(-50%, -50.05%)", "height":"calc(79% + 8.25px)", "top":"50.05%", "left":"50.01%"});
    // }else{
    //   $("html, body").css({"transform":"translate(-50%, -50%)", "left":"50%"});
    //   $(".full-inner").css({"transform":"translate(-50%, -50%)", "height":"80%", "top":"50%", "left":"50%"});
    // }
  }, 100);
}

$(function(){
  fullset();
  quickClick();
  resize();

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

  $("#area .full-inner .v-con li.cells ul .list-con, #compline .full-inner ul.popup-con li").click(function(){
    $("#area .full-inner .v-con li.cells ul .list-con, #compline .full-inner ul.popup-con li").removeClass("on");
    $(this).addClass("on");
  });

});

$(window).load(function(){
  resize();
});

$(window).resize(function(){
  resize();
});
