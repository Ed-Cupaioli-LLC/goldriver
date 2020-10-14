//--------------------------------API call from Instagram in case the code below will fail------------------------

$(function(){
 
    var arr = ['p/B_frooMAdGx','p/CFz9bHXHIxw','p/CFsN2mnnfcZ','p/CBOQqJmnFv8','p/CDkCs1xohWr','p/CByslopA2kt','p/CCpJG09Jv2W', 'p/CARNYS2JOgJ', 'p/B5lHDEqJ25N','p/B0HQc6CgJnH','p/BvCVcnDjFky','p/BvNArPllWep']
    for(var i=0; i<arr.length; i++){
            $.ajax({
            // url: 'https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/'+arr[i]+'&maxwidth=320&html&fields=thumbnail_url%2Cauthor_name%2Cprovider_name%2Cprovider_url%_html&access_token=401728117501247|5b862f9602225228ae6addaf22183941',
            url: 'https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/'+arr[i]+'/&maxwidth=320&access_token=401728117501247|5b862f9602225228ae6addaf22183941',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
              var $img = $("<img>", {src: data.thumbnail_url, "class": "image"});
              var $div = $('<div>', {'class':'hidden'}).append(data.html)
              console.log(data)
              $('.insta-image').append($img) 
              $('.insta-image').append($div)
             
              instgrm.Embeds.process()
            }
          });  

    } 




    
})



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


var player;
function onYouTubePlayerAPIReady() {
player = new YT.Player('ytplayer', {
width: '100%',
height: '100%',
videoId: '3rnt4hv_Qv4',
playerVars: {
'autoplay': 1,
'showinfo': 0,
'autohide': 1,
'loop': 1,
'controls': 0,
'modestbranding': 1,
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
if (event.data == YT.PlayerState.ENDED) {
player.seekTo(0);
player.playVideo();
}
}
function stopVideo() {
player.stopVideo();
}
