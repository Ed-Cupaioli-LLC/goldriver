$(function(){
    let arr = ['p/B_frooMAdGx','p/CFz9bHXHIxw','p/CFsN2mnnfcZ','p/CBOQqJmnFv8','p/CDkCs1xohWr','p/CByslopA2kt','p/CCpJG09Jv2W'];
    for(let i=0; i<arr.length; i++){
            $.ajax({
            url: 'https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/'+arr[i]+'/&omitscript=true&access_token=401728117501247|5b862f9602225228ae6addaf22183941',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
            //   console.log(data) 
              let post=data.html 
              $('.insta-image').append(post)  
              instgrm.Embeds.process()
            }
          });  
    }
   
})
