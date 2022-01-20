function addhighlight() {
  $('.highlight').each(function () {
    setTimeout('$(".highlight").addClass("highlighted")', 300);
  });
}
function applyZoom() {
  if ($(".zoom")[0]) {
    $('.zoom').zoom({ on: 'click' });
  }
}
function displayPage() {
  $('#page-now').html('&nbsp' + page_display + '&nbsp/&nbsp' + num_modulo);
}
function textWrite() {
  let letter = 0;
  let title = document.getElementById("titulo-objetivo");
  let html = document.getElementById("titulo-objetivo").innerHTML;
  let attr = title.setAttribute("data", html);
  let txt = title.getAttribute("data");
  let speed = 30;

  typeWriter();

  function typeWriter() {
    if (letter <= txt.length) {
      document.getElementById("titulo-objetivo").innerHTML = txt.slice(0, letter + 1);
      letter++;
      setTimeout(typeWriter, speed);
    } else {
      title.classList.add("finish");
    }

  }
}