var newRed,
    newGreen,
    newBlue,
    penColor = $('.selected').css('background-color'),
    $canvas = $('canvas'),
    ctx = $canvas[0].getContext('2d'),
    lastEvent,
    mouseDown = false;

// $('.controls li').click(function(event) {
//   $('.controls li').removeClass('selected');
//   $(this).addClass('selected');
// });

$('body').on('click', '.controls li', function(event) {
  // event.preventDefault();
  $('.controls li').removeClass('selected');
  $(this).addClass('selected');

  penColor = $(this).css('background-color');

  console.log('Pen color: ' + penColor);
});



$('#revealColorSelect').click(function(event) {
  $('#colorSelect').toggle();
});

function newColorSelect(a) {
  return $(a).val();
}

function newPenColor() {
  return 'rgb(' + newRed + ', ' + newGreen + ', ' + newBlue + ')';
}

$('#red').on('change mousemove', function(event) {
  // event.preventDefault();
  newRed = newColorSelect(this);
  // console.log(newRed);
});

$('#green').on('change mousemove', function(event) {
  // event.preventDefault();
  newGreen = newColorSelect(this);
  // console.log(newGreen);
});

$('#blue').on('change mousemove', function(event) {
  // event.preventDefault();
  newBlue = newColorSelect(this);
  // console.log(newBlue);
});

$('.sliders input').on('change mousemove', function(event) {
  // event.preventDefault();
  $('#newColor').css('background-color', newPenColor());
});

$('#addNewColor').click(function(event) {
  $('.controls ul').append('<li class="addedColor" style="background-color: ' + newPenColor() +  '"></li>');
});

$canvas.mousedown(function(event) {
  lastEvent = event;
  mouseDown = true;
}).mousemove(function(event) {
  if (mouseDown) {
    ctx.beginPath();
    ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.strokeStyle = penColor;
    ctx.stroke();
    lastEvent = event;
  }
}).mouseup(function(event) {
  mouseDown = false;
}).mouseleave(function(event) {
  $canvas.mouseup();
});
