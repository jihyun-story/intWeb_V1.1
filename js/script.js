window.onload=function(){
  // header
  let navList = document.querySelector("header");
  navList.addEventListener("mouseover", function(){
  navList.querySelectorAll(".sub-menu").forEach(sub=>{
      sub.style.height = "165px";
    });
  });
  navList.addEventListener("mouseout", function(){
  navList.querySelectorAll(".sub-menu").forEach(sub=>{
      sub.style.height = "0";
    });
  });
}

// 모바일 header - jQuery
var w_w, w_h, re_resize_timer;

function resize(){
    clearTimeout(re_resize_timer);
    re_resize_timer = setTimeout(function(){ 
        w_w = $(window).width();
        w_h = $(window).height();
        if(w_w < 1000){
            $("#header .gnb, #header .open-bg.open").height(w_h);
        }else{
            $("#header .gnb").attr("style","");
            $("html").removeClass("open-menu");
        }
    }, 100);
}

$(function(){
    resize();

    $("#header .open-btn, #header .open-bg").click(function(){
        if(w_w < 1000){
            resize();
            $("html").toggleClass("open-menu");

            if($("#header .open-bg").hasClass("open")){
                $("#header .open-bg").removeClass("open");
                $("#header .open-bg").attr("style","");
            }else{
                $("#header .open-bg").addClass("open");
            }
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


// About us - 기업연혁

const HistoryData = (year, listClass) => { //해당 연도와 리스트를 인자로 받음
  fetch(`../js/HistoryList/history${year}.json`) //해당 연도의 json 파일을 가져오기
    .then((response) => response.json()) //json데이터로 변환
    .then((json) => {
      const data = json[`item${year}`]; //해당 연도의 데이터 배열

      let html = ''; // html 문자열 초기화

      // 각 데이터 아이템에 대해 반복
    data.forEach((element) => {
      // console.log(element); //콘솔에 데이터 출력
      html += `<li class="list"><span class="month-box">${element.month}</span><p class="text">${element.text}</p></li>`; // html 문자열에 각 아이템 추가
      });

      // 리스트클래스에 해당하는 요소에 html 문자열 삽입
      $(listClass).html(html);
    });
};
// 함수 호출 : 각 연도에 대해 함수를 호출하여 데이터 로드 및 출력하기
HistoryData("2021", ".list1");
HistoryData("2022", ".list2");
HistoryData("2023", ".list3");
HistoryData("2024", ".list4");



// services - 모바일 버전
function toggleTab(tabId){
    const moblieOpen = document.querySelectorAll('.moblie-open');
    // 펼쳐질 요소를 정해준다. 여기서 tabId는 toggleTab 함수의 매개변수이며 이 값은 ul이 된다. id=tab1 값이 tabId가 되는 것이다.

    moblieOpen.forEach(function(content){
        content.classList.remove('active');
    });
    // 
    const tabList = document.getElementById(tabId);
    tabList.classList.toggle('active');
    // 




}
// 카카오 지도 - 황지현 개인로그인으로 API 연결해서 썼음 / 추후 다른 이가 홈페이지 만들 경우, 회사나 개인아이디로 API키 발급받아서 새로 사용해야함.
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
    center: new kakao.maps.LatLng(37.520282, 126.890205), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};
  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
  // 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(37.520282, 126.890205); 
  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition
  });
  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
  // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
  // marker.setMap(null); 

