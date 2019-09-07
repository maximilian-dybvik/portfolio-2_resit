// PARTICLES EFFECT
particlesJS.load('particles-js', '/js/vendors/particles.json');

// TYPED ANIMATION
var typed = new Typed('#media-header-typed', {
  stringsElement: '#media-header',
  startDelay: 500,
  typeSpeed: 60,
  backDelay: 500,
  backSpeed: 50,
  showCursor: false,
});

// FLICKR GALLERY (by Trung Ho)
var apiKey = 'f4e15fb65970a8443eb02b6b8140ac19',
    authorId = 'spacex',
    perPage = 10,
    startPage = 0;

// Main content container
var $container = $('#container');

// Masonry
$container.masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-item',
  percentPosition: true
});

var gallery;

function loadImages(page, callback) {
  console.log('loadImages page: '+page);
  var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&user_id=' + authorId + '&per_page=' + perPage + '&page=' + page + '&format=json&nojsoncallback=1';
  $.getJSON(url, function(response) {
    if (response.stat === 'ok') {
      (function loadEachImg(arrPhotos, index) {
        if (index < arrPhotos.length) {
          var photo = arrPhotos[index];
          var link = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
          var $newElem = $('<a href="'+link+'"><img class="grid-item " src=' + link + ' style="display: none"></a>');
          $container.append($newElem);
          // ensure that new image loaded before adding to masonry layout
          $newElem.imagesLoaded(function(){
            $newElem.show();
            $container.masonry( 'appended', $newElem, true );
            $container.masonry('layout');
            // Init lightGallery
            if (gallery) {
              gallery.destroy(true);
            }
            gallery = $container.lightGallery({
              thumbnail: true,
              animateThumb: true,
              showThumbByDefault: false,
            }).data('lightGallery');
            loadEachImg(arrPhotos, ++index);
          });
        } else {	// done looping
          if (callback) {
            callback();
          }
        }
      })(response.photos.photo, 0);
    }
  });
}
console.log('-----------loadImages');
loadImages(++startPage, function() {
  // make sure body has scroll therefore be able to do infinitescroll
  if (document.body.scrollHeight <= window.innerHeight) {
    loadImages(++startPage);
  }
});

// infinite scroll
var loadingImages = false;
$(document).scroll(function() {
  var docScrollTop = $(document).scrollTop();
  var endScroll = $(document).height() - $(window).height() - 100;
  if (!loadingImages && (docScrollTop > endScroll)) {
    loadingImages = true;
    loadImages(++startPage, function(){
      loadingImages = false;
    });
  }
});
