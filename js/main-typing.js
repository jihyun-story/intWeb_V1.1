$(document).ready(function () {
  var typingBool = false;
  var typingIdx = 0;
  var liIndex = 0;
  var liLength = $("#visual .title-con .typing-txt h2").length;

  var typingTxt = $("#visual .title-con .typing-txt h2").eq(liIndex).text();
  typingTxt = typingTxt.split("");
  if (typingBool == false) {
    typingBool = true;
    var tyInt = setInterval(typing, 100);
  }

  function typing() {
    $("#visual .title-con .typing h2").removeClass("on");
    $("#visual .title-con .typing h2").eq(liIndex).addClass("on");
    if (typingIdx < typingTxt.length) {
      $("#visual .title-con .typing h2").eq(liIndex).append(typingTxt[typingIdx]);
      typingIdx++;
    } else {
      if (liIndex < liLength - 1) {
        liIndex++;
        typingIdx = 0;
        typingBool = false;
        typingTxt = $("#visual .title-con .typing-txt h2").eq(liIndex).text();

        clearInterval(tyInt);

        setTimeout(function () {
          tyInt = setInterval(typing, 100);
        }, 100);
      } else if (liIndex == liLength - 1) {
        clearInterval(tyInt);
      }
    }
    
    $('#visual .title-con h3').addClass('on');
    $('#visual button').addClass('on');
  }
});
