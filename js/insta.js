// $(function(){
//     var arr = ['p/B_frooMAdGx','p/CFz9bHXHIxw','p/CFsN2mnnfcZ','p/CBOQqJmnFv8','p/CDkCs1xohWr','p/CByslopA2kt','p/CCpJG09Jv2W']
//     for(var i=0; i<arr.length; i++){
//             $.ajax({
//             url: 'https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/'+arr[i]+'/&omitscript=true&access_token=401728117501247|5b862f9602225228ae6addaf22183941',
//             type: 'GET',
//             dataType: 'json',
//             success: function(data) {
//               var post=data.html 
//               console.log(post)
//               $('.insta-image').append(post)  
//               post.map(el=>console.log(el))
//               $('instaimage').setAttribute('src', post.thumbnailUrl)
//             //   img.setAttribute('alt', el.caption)
//               instgrm.Embeds.process()
//             }
//           });  
//     }
   
// })
var instagramRegExp = new RegExp(/<script type="text\/javascript">window\._sharedData = (.*);<\/script>/)

var fetchInstagramPhotos = async (accountUrl) => {
  var response = await axios.get(accountUrl)
  var json = JSON.parse(response.data.match(instagramRegExp)[1])
  var edges = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.splice(0, 12)
  var photos = edges.map(({ node }) => {
    return {
      url: `https://www.instagram.com/p/${node.shortcode}/`,
      thumbnailUrl: node.thumbnail_src,
      displayUrl: node.display_url,
      caption: node.edge_media_to_caption.edges[0].node.text
    }
  })
  return photos
}

(async () => {
  try {
    var photos = await fetchInstagramPhotos('https://www.instagram.com/goldriverdistillery/')
    var container = document.getElementById('instagram-photos')
    console.log(photos)
    photos.forEach(el => {
      var a = document.createElement('a')
      var img = document.createElement('img')

      a.setAttribute('href', el.url)
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener noreferrer')
      a.classList.add('instagram-photo')

      img.setAttribute('src', el.thumbnailUrl)
      img.setAttribute('alt', el.caption)
      
      a.appendChild(img)
      container.appendChild(a)
    })
  } catch (e) {
    console.error('Fetching Instagram photos failed', e)
  }
})()
