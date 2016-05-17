/*

-create submission form
-pull form data
-switch string information to number value
-input number into a math equation to fahrenheit
- build an "if/then" based on fahrenheit range which deter,omes background color/icon
-when new data is input, reset the background

0-25 winter
26-50 fall
51-75 spring
76-100 summer

*/
var enteredTemp = 0,
    tempRange = [
      {
        className: 'winter',
        min: -100,
        max: 32,
      },
      {
        className: 'fall',
        min: 33,
        max: 60,
      },
      {
        className: 'spring',
        min: 61,
        max: 80,
      },
      {
        className: 'summer',
        min: 76,
        max: 300,
      }
    ];

//Converison  Multiply by 9, then divide by 5, then add 32
function convertToFahrenheit(temp) {
  return (temp * 1.8) + 32;
}

$('.temp').submit(displayTemp);

function displayTemp(event) {
  event.preventDefault();
  enteredTemp = parseFloat($('.celsiusValue').val()).toFixed(1);
  $('.Celsius').html(enteredTemp + ' &deg;C');
  enteredTemp = convertToFahrenheit(enteredTemp).toFixed(1);
  console.log(enteredTemp);
  for (var i = 0; i < tempRange.length; i++) {
    if (enteredTemp >= tempRange[i].min && enteredTemp <= tempRange[i].max) {
      $('.Fahrenheit').html(enteredTemp + ' &deg;F');
      console.log(tempRange[i].className);
      $('body').attr('class', tempRange[i].className);
      enteredTemp = 0;
    }
  }
  $('.celsiusValue').val('');
}
