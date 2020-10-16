//--------------------------------API call from Instagram in case the code below will fail------------------------

$(function(){ 
    //insta feed
    $.ajax({
      url: 'https://www.instagram.com/goldriverdistillery/?__a=1',
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var igFeed = data.graphql.user.edge_owner_to_timeline_media.edges;
        if (igFeed.length == 0 | igFeed == undefined) {
          $('.insta-slider.api').addClass('hidden');
          $('.insta-slider.backup').removeClass('hidden');
          instaSlide('backup');
        } else {
          $(igFeed).each(function(i,obj) {
            var igPost = obj.node;
            var imgThumb = obj.node.thumbnail_src;
            var imgFull = obj.node.display_url;
            var imgAlt = obj.node.accessibility_caption;
            var shortCode = obj.node.shortcode;
            var igText = igPost.edge_media_to_caption.edges[0].node.text;
            var slide = '<div class="insta-slide" data-shortcode="'+shortCode+'" data-imagefull="'+imgFull+'" >'+
                          '<img alt="'+imgAlt+'" src="'+imgThumb+'" />'+
                          '<div class="slide-text hidden">'+igText.replace(/\n/g, "<br />")+'</div>'+
                        '<div>';  
            $('.insta-slider.api').append(slide);
          });  
        }
        instaSlide('api');     
      }, error: function(data) {
        $('.insta-slider.api').addClass('hidden');
        $('.insta-slider.backup').removeClass('hidden');
        instaSlide('backup');
      }
    });

    //test 
    $('.close-embed').click(function() {
      $('.post-embed-container,body,html').removeClass('active');
      $('.insta-image').attr('src','');
      $('.insta-caption').html('');
      $('.insta-link').attr('href','');
    });

    function instaSlide(slider) {
      $('.insta-slider.'+slider).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]  
      });
      $('.insta-slide').click(function() {
        $('.post-embed-container,body,html').addClass('active');
        var postCode = $(this).data('shortcode');
        var postLink = 'https://www.instagram.com/p/'+postCode;
        var postText = $(this).find('.slide-text').html();
        var postImage = $(this).data('imagefull');
        $('.insta-image').attr('src',postImage);
        $('.insta-caption').html(postText);
        $('.insta-link').attr('href','https://www.instagram.com/p/'+postCode);
      });   
    }
});

//----------------------------// YouTube API call //-------------------------------//
var player;
  function onYouTubePlayerAPIReady() {
  player = new YT.Player('ytplayer', {
  width: 1280,
  height: 720,
  videoId: '3rnt4hv_Qv4',
  playerVars: {
    'autoplay': 1,
    'autohide': 1,
    'disablekb': 1, 
    'showinfo': 0,
    'autohide': 1,
    'playsinline': 1,
    'loop': 1,
    'controls': 0,
    'modestbranding': 1,
    'rel': 0,
    'enablejsapi': 1,
    'vq': 'hd1080'
},
events: {
'onReady': onPlayerReady,
'onStateChange': onPlayerStateChange
}
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
player.mute(); // comment out if you don't want the auto played video muted

}

// 5. The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
  $('#yt-wrap').addClass('active');
if (event.data == YT.PlayerState.ENDED) {
player.seekTo(0);

player.playVideo();
}
}
function stopVideo() {
player.stopVideo();
}




//--------------------------------Graph QL solution without API call ----------------------------->


// var regExp = new RegExp(/<script type="text\/javascript">window\._sharedData = (.*);<\/script>/)

// var fetchInstagramPhotos = async (account) => {
//   var response = await axios.get(account)
//   var json = JSON.parse(response.data.match(regExp)[1])
//   //how many images will be displayed
//   var edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 12)
//   console.log
//   var photos = edges.map(({ node }) => {
//     return {
//       url: `https://www.instagram.com/p/${node.shortcode}/`,
//       thumbnailUrl: node.thumbnail_src,
//       displayUrl: node.display_url,
//       caption: node.edge_media_to_caption.edges.length > 0 ? node.edge_media_to_caption.edges[0].node.text : ""
//     }
//   })
//   return photos
// }

// (async () => {
//   try {
//     var photos = await fetchInstagramPhotos('https://www.instagram.com/goldriverdistillery/')
//     var container = document.getElementById('instagram-grid')
//     var postCaption = document.getElementById('post-caption')
    
    
//     console.log(photos)
//     photos.forEach(el => {
    
//       var a = document.createElement('a')
//       var img = document.createElement('img')
//       var p = document.createElement('p').innerText=(el.caption)
//       console.log(p)
 
//       a.setAttribute('href', el.url)
//       a.classList.add('instagram-photo')
//       img.setAttribute('src', el.thumbnailUrl)
//       img.setAttribute('alt', el.caption)
//       img.setAttribute('text',el.caption)
      
      
//       a.appendChild(img)
//       container.appendChild(a)
     
      
//     })
//   } catch (e) {
//     console.error('Fetching Instagram photos failed', e)
//   }
// })()

