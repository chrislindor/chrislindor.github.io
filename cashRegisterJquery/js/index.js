$(function() {
  var total = 0, enteredAmount, itemCount = 0;

  $('#entry').submit(calculate);

  function printTotal() {
    $('#total').text('$' + total.toFixed(2));
  }
  function clearVal() {
    $('#newEntry').val("");
  }
  function clearEntries() {
    $('#entries').html("");
  }

  function addToList() {
    itemCount ++;
    $('#entries').append('<tr><td> Item ' + itemCount + ': $' + enteredAmount.toFixed(2) + '<td></tr>');
  }

  function calculate(event) {
    event.preventDefault();
    enteredAmount = parseFloat($('#newEntry').val());
    if (isNaN(enteredAmount)) {
      enteredAmount = 0;
    }
    total = total + enteredAmount;
    printTotal();
    clearVal();
    if (enteredAmount > 0) {
      addToList();
    }

  }

  $(document).bind('keypress', function(event) {
      if( event.which === 67 && event.shiftKey ) {
          event.preventDefault();
          total = 0;
          itemCount = 0;
          printTotal();
          clearEntries();
      }
  });

});
