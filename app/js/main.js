$(function () {

    $(".news__slider").slick({
      prevArrow:
        '<button type="button" class="slick-btn slick-prev">',
      nextArrow:
        '<button type="button" class="slick-btn slick-next">',
    });
    $('.menu__burger').on('click', function (){
      $('.header__top-menu,.menu__burger').toggleClass('active');
      $('body').toggleClass('lock');

    });

});
