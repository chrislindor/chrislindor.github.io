/***** Set Global Varibales******/
var itemToAdd,
    tasksToComplete = 0,
    taskCache;


/******* Start functions *******/
// checks to see if string is blank if not add item to list
function addItemToList() {
  if (itemToAdd.length > 1) {
    $('#list-master').append(' <li class="list-item">' + itemToAdd + '</li><i class="fa fa-cog"></i>');
    tasksToComplete++;
  }
}
// displays current count status
function displayCount() {
  $('.task-number').text(tasksToComplete);
}


/***** To Do functionality *******/
// Sets value of item then prints info to page
$('.enter-list').submit(function(event) {
  event.preventDefault();
  itemToAdd = $('#user-input').val();
  addItemToList();
  displayCount();
  $('#user-input').val('');
});

// mark individual items complete
$('body').on('click', '#list-master li', function() {
  if ($(this).hasClass('list-item')) {
    $(this).toggleClass('done');
    if ($(this).hasClass('done')) {
      tasksToComplete--;
      $(this).next().addClass('no-cog');
    } else {
      tasksToComplete++;
      $(this).next().removeClass('no-cog');
    }
    displayCount();
  }
});

/******** Edit functionality *****/

$('body').on('click', '#list-master .fa-cog', function() {
  if (!$(this).prev().hasClass('done')) {
    $(this).hide();
    $(this).prev().removeClass('list-item');
    taskCache = $(this).prev().text();
    $(this).prev().html('<input type="text" class="edit-input" placeholder="' + taskCache + '"/><span class="edit-buttons"><button id="save">Save</button><button id="cancel">Cancel</button></span>');
  }
});

// Functionality for save button
$('body').on('click', '#list-master #save', function() {
  itemToAdd = $('.edit-input').val();
  if (itemToAdd !== "") {
    $(this).parent().parent().replaceWith(' <li class="list-item">' + itemToAdd + '</li><i class="fa fa-cog"></i>');
  }

});

// Cancel Functionality
$('body').on('click', '#list-master #cancel', function() {
  $(this).parent().parent().replaceWith(' <li class="list-item">' + taskCache + '</li><i class="fa fa-cog"></i>');

});
