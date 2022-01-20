$(document).ready(function () {
  $('#mySidenav li').click(function () {
    var id = this.id;
    stepNavigation(id);
    closeNav();
  });
});
function openNav() {
  document.getElementById("mySidenav").style.left = "0px";
  $('.stepBack').removeClass('tooltip');
}
function closeNav() {
  document.getElementById("mySidenav").style.left = "-15rem";
  if ($('.stepBack').hasClass('btn-disabled')) {
    $('.stepBack').addClass('tooltip');
  }
}
function activeClass(page){
  $("#mySidenav li").removeClass('active');
  $('#' + page).addClass('active');
  closeNav();
}
function choosedMenu(topic,icon,mainTopic){
  $(topic).collapse('show');
  if($(icon).hasClass('fa-angle-right')){
    $(icon).toggleClass('fas fa-angle-right fas fa-angle-down');
  }
  $(mainTopic).addClass('choosed-menu');
}
function removedMenu(openElement){
  let num_id = $('[id^=menu-topico]').length;
  for(let i=1; i<=num_id; i++){
      if(i !== openElement){
          $('#menu-topico-'+i).removeClass('choosed-menu');
          $('#topico'+i).collapse('hide');
          if($('#menu0'+i).hasClass('fas fa-angle-down')){
            $('#menu0'+i).removeClass('fas fa-angle-down');
            $('#menu0'+i).addClass('fas fa-angle-right');
          }

      }
  }
}
function changeIcon(element){
  $(element).find('i').toggleClass('fas fa-angle-right fas fa-angle-down'); 
}

