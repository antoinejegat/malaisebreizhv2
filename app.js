var players = {};
var mainScene;

function onYouTubeIframeAPIReady() {
  $('#container').css('height', window.innerHeight)
  // init controller
  var controller = new ScrollMagic.Controller();

  var wipeAnimation = new TimelineMax()
    
    .fromTo('section#chapitre-1a', 10, { y: '100%' }, { y: '0%'}) // From bottom
    .fromTo('section#chapitre-2', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-2a', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-2infog', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-2carte', 10, { y: '100%' }, { y: '0%'}) // From bottom
    .fromTo('section#chapitre-2c', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-2cc', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-2b', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-2d2', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-4', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-5', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-6', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-2d', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-2dd', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-21', 10, { y: '100%' }, { y: '0%'}) // From right
    .fromTo('section#chapitre-3', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-3b', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-3bb', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-3bis', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-5', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-5b', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-max', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#imagepttx', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-maxb', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-story', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-storyb', 10, { y: '100%' }, { y: '0%'})// From right
    .fromTo('section#chapitre-creditb', 10, { y: '100%' }, { y: '0%'})// From right

  // create a scene
  mainScene = new ScrollMagic.Scene({
      triggerElement: '#container',
      triggerHook: 'onLeave',
      duration: ($('section').length - 1) * 100 + '%'  // = nombre de slides * 100 (pour un scroll naturel)
    })
    .setPin('#container')
    .setTween(wipeAnimation)
    .on("update", scrollScene)
    .addTo(controller); 
}

function startVideo(chapitre) {
  var id = $(document.getElementById(chapitre)).find('[data-video-id]').attr('id')
  if (players[chapitre]) {
    players[chapitre].playVideo()
  } else {
    players[chapitre] = initPlayer(id)
  }
}


function stopVideo(chapitre) {
  if (players[chapitre] && players[chapitre].pauseVideo) {    
    players[chapitre].pauseVideo()
  }
}

function initPlayer(id) {
  var element = $("#" + id)

  return new YT.Player(id, {
    height: '100%',
    width: '100%',
    videoId: element.data('video-id'),
    playerVars: {
      autoplay: 1, 
      controls: 0,
      loop: 1,
      playlist: element.data('video-id'),
      showinfo: 0,
      modestbranding: 1
    },
    events: {
      'onReady': function(event) {
        if (isMobile()) {
          event.target.mute()
        }
        event.target.playVideo();
        scrollScene()
        resizeVideo(id)
      }
    }
  });
}

function scrollScene() {
  const progress = mainScene.progress()
  if (progress < (1/27) && progress < (10/27)) {
    startVideo('intro')
  } else {
    stopVideo('intro')
  }

  if (progress < (10/27) && progress < (15/27)) {
    startVideo('chapitre-2d2')
  } else {
    stopVideo('chapitre-2d2')
  }

    if (progress < (20/27) && progress < (24/27)) {
    startVideo('chapitre-2d')
  } else {
    stopVideo('chapitre-2d')
  }
}

function resizeVideo(id) {
  var video = $('#' + id);

  if(window.innerWidth > window.innerHeight) {    
    var newWidth = video.outerHeight() * (16  / 9);
    var scale = window.innerWidth / newWidth
    video.css('width', newWidth + "px")
    video.css('transform-origin', 'left center')
  } else { 
    var newHeight = video.outerWidth() * (9 / 16);
    var scale = window.innerHeight / newHeight
    video.css('height', newHeight + "px")
    video.css('transform-origin', 'center top')
  }
  
  //Define the new width and centrally align the iframe
  video.css("transform", "scale(" + scale + ")");
}

function isMobile()  {
  var ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)
}
