

var $userInput = $('.dataSubmission input[type="text"]'),
    userSearch,
    searchId;


$('body').on('click', '.mainLogo', function() {
  showElement('.searchInput');
  $(".pictureRender").html("");
  $('.searchDisplay').text('');
  $('footer').addClass('footer-bottom');
});

$('.dataSubmission').submit(function(event){
  event.preventDefault();
  userSearch = $userInput.val().toLowerCase();
  if (userSearch[0] === "#" && userSearch.length > 2) {
    hashtagSearch(userSearch.substr(1));
    $(".pictureRender").html("");
    $($userInput).val("");
    $('footer').removeClass('footer-bottom');
  } else if (userSearch[0] === "@" && userSearch.length > 2) {
    userIdLookUp(userSearch.substr(1));
    $(".pictureRender").html("");
    $($userInput).val("");
    $('footer').removeClass('footer-bottom');
  } else if (userSearch[0] !== '#' || userSearch[0] !== '@') {
    inputError();
  }
});

function getCurrentScroll() {
  return window.scrollY;
}

$(window).scroll(function(event) {
  var shrinkTop = 400,
  scrollNumb = getCurrentScroll();
  if (scrollNumb >= shrinkTop) {
    $('header').addClass('shrink');
    $('.mainLogo').addClass('img-shrink');
    $('.searchDisplay').addClass('text-shrink');
    console.log(scrollNumb);
  } else {
    $('header').removeClass('shrink');
    $('.mainLogo').removeClass('img-shrink');
    $('.searchDisplay').removeClass('text-shrink');
  }
});

function inputError() {
  $userInput.effect('shake');
}

function hideElement(element) {
  $(element).addClass('hideElement');
}

function showElement(element) {
  $(element).removeClass('hideElement');
}

function updateName() {
  $('.searchDisplay').text(userSearch);
}

function userCheck(results) {
  var userMeta = results.meta;
  console.log(userMeta.code);
  if (userMeta.code !== 200) {
    return false;
  } else {
    return true;
  }

}

function userIdMatch(results) {
  var userData = results.data;

  for (var i = 0; i < userData.length; i++) {
    if (userData[i].username === userSearch.substr(1)) {
      searchId = userData[i].id;
      console.log(searchId);
      console.log(userData[i].username);
    }
  }
}

function displayResults(results){
  var photos = results.data;
  // use jquery to create a new figure and image element containing data received from the API
  $.each(photos, function(index, photo){
    $(".pictureRender").append("<figure><img src='" + photo.images.standard_resolution.url +"'/></figure>");
  });
  updateName();
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
      hideElement('.searchInput');
    }
  });
}

// https://api.instagram.com/v1/users/search?q=

function userLookUp(userid){
  var url = 'https://api.instagram.com/v1/users/' + userid + '/media/recent';
  var anotherAccessToken = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";

  console.log('url', url);
  $.ajax({
    url: url,
    type: "GET",
    dataType: 'jsonp',
    data: {access_token: anotherAccessToken},
    success: function(data){
      console.log(data);
      if (userCheck(data)) {
        displayResults(data);
        hideElement('.searchInput');
      } else {
        inputError();
      }
    }
  });
}

function userIdLookUp(username){
  var url = 'https://api.instagram.com/v1/users/search?q=' + username;
  // this is the public beta key, sign up for production if you want this to be live on the web
  // var accessToken = "371341073.b3244b0.cacfc856971e48239838a32de63f2226";
  // var anotherAccessToken = "16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587";
  // uses someone else's access token since instagram requires app approve to access public photos
  var anotherAccessToken = "30809397.e3f6f42.eb2a35cacea54357bec78bc2b93ea7ed";

  console.log('url', url);
  $.ajax({
    url: url,
    type: "GET",
    dataType: 'jsonp',
    data: {access_token: anotherAccessToken},
    success: function(data){
      console.log(data);
      userIdMatch(data);
      userLookUp(searchId);
    },

  });

}
