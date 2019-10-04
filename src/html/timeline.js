var circle = $('.circle');
var radius = circle.width() / 2;
var dots = $('.one-dot');
var reverseElements = $('.rotate-reverse');
var dotsCount = dots.length;
var rotateStep = 360 / dotsCount;
var currentRotate = 0;
var positionableItems = $(".circle-positionable");
var circleMenus = $(".circle-menu");
dots.click(function () {
  var di = parseInt($(this).attr('data-rotate'));
  var index = $(this).data('index');
  circleMenus.fadeOut();
  setTimeout(function () {
    circleMenus.hide();
    $('.circle-menu-' + index).fadeIn();
  }, 1600);
  rouletteRotate(di);
  updateDegrees(di);
});
$(function () {
  initRoulette();
  initPositions();
});
$(window).resize(function () {
  initRoulette();
});
function rad(angle) {
  return angle * Math.PI / 180;
}
function initRoulette() {
  var dotsIndex = 0;
  setDegrees();
  for (var i = 180; i > -180; i -= rotateStep) {
    var coordinates = {
      x: Math.round(Math.cos(rad(i)) * radius) + radius,
      y: Math.round(Math.sin(rad(i)) * radius) + radius
    };
    dots.eq(dotsIndex).css({
      'top': coordinates.x,
      'left': coordinates.y
    });
    dotsIndex++;
  }
  circle.css({ 'transform': 'rotate(' + currentRotate + 'deg)' });
}
function setDegrees() {
  var breakpointEnd = Math.round(dotsCount / 2);
  var breakpointStart = dotsCount - breakpointEnd;
  var ss = 0;
  var si = 0;
  for (var i1 = 0; i1 < breakpointEnd; i1++) {
    dots.eq(si).attr('data-rotate', rotateStep * ss);
    dots.eq(si).find('.circle-positionable').css('left', '140px');
    ss--;
    si++;
  }
  ss = 1;
  si = dotsCount - 1;
  for (var i2 = dotsCount - 1; i2 >= breakpointStart; i2--) {
    dots.eq(si).attr('data-rotate', rotateStep * ss);
    dots.eq(si).find('.circle-positionable').css('right', '140px');
    ss++;
    si--;
  }
}
function updateDegrees(step) {
  dots.each(function (i, e) {
    var that = $(e);
    var oldDegree = parseInt(that.attr('data-rotate'));


    that.attr('data-rotate', oldDegree - step);
  });
}
function rouletteRotate(degrees) {
  positionableItems.addClass('positionable-fade');
  currentRotate += parseInt(degrees);
  setTimeout(function () {
    circle.css({ 'transform': 'rotate(' + currentRotate + 'deg)' });
    reverseElements.css({ 'transform': 'rotate(' + -1 * currentRotate + 'deg)' });
  }, 350);
  var interval = setInterval(function () {
    initPositions();
  }, 50);
  setTimeout(function () {
    clearInterval(interval);
    positionableItems.removeClass('positionable-fade');
    initPositions();
  }, 1400);
}
function initPositions() {
  positionableItems.each(function (i, e) {
    var that = $(e);
    var target = $('.' + that.data('target')).children('.one-dot-inner');
    $(e).position({
      of: target,
      my: 'center bottom',
      at: 'center top',
      collision: 'fit fit'
    });
  });
}
