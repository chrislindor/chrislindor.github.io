

var $userInput = $('.dataSubmission input[type="text"]'),
    userSearch;



$('.dataSubmission').submit(function(event){
  event.preventDefault();

  userRawSearch = $userInput.val();

  if (userRawSearch[0] === "#") {
    hashtagSearch(userRawSearch.substr(1));
    updateName();
    $(".pictureRender").html("");
    $($userInput).val("");
  } else if (userRawSearch[0] === "@") {

  }

});

function updateName() {
  $('#searchDisplay').text(userRawSearch);
}

function displayResults(results){
  var photos = results.data;

  // use jquery to create a new table row containing data received from the API
  $.each(photos, function(index, photo){
    $(".pictureRender").append("<figure><img src='" + photo.images.standard_resolution.url +"'/>");

  });
}

function hashtagSearch(tag){
  var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent";
  // this is the public beta key, sign up for production if you want this to be live on the web
  // var accessToken = "371341073.b3244b0.cacfc856971e48239838a32de63f2226";

  // uses someone else's access token since instagram requires app approve to access public photos
  var anotherAccessToken = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";

  console.log('url', url);
  $.ajax({
    url: url,
    type: "GET",
    dataType: 'jsonp',
    data: {access_token: anotherAccessToken},
    success: function(data){
      console.log(data);
      displayResults(data);
    }
  });
}
