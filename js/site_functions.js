$(function(){

    //Age Gate
  if (Cookies.get('vl-age') !== 'over 21') {
    $('#prompt-overlay').addClass('active');
    $('.close-prompt').addClass('hidden');
  } 
  $('.age-gate .btn').click(function() {
    if ($(this).attr('href').indexOf('#yes') > -1) {
      Cookies.set('vl-age', 'over 21', { expires: 365 });
      $('#prompt-overlay').removeClass('active');
      $('.close-prompt').removeClass('hidden');
    } else {
      window.location = "https://estreet.co";
    }
  });

//hamburger dropdown menu
    $(".hamburger").click(function() {
        var val = $(this).attr('id');
        if (val == 0) {
            $('body,html').css('position','fixed');
            $("ul").hide();
            $(this).attr('id', '1');
        } else {
            $("ul").show();
            
            $('body,html').css('position','fixed');
            $(this).attr('id', '0');
        }

    });

    $(".exit").click(function() {
      var val = $(this).attr('id');
      if (val == 1) {
        $('body,html').css('position','unset');
          $("ul").hide();
          $(this).attr('id', '1');
          $('.button').attr('id', '1');
      } 

  });
  
  
});

