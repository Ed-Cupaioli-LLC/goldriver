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
    $(".button").click(function() {
        var val = $(this).attr('id');
        if (val == 0) {
            $("ul").hide();
            $(this).attr('id', '1');
        } else {
            $("ul").show();
            $(this).attr('id', '0');
        }

    });

    //Mouse click on setting button and ul list
    $("ul, .button").mouseup(function() {
        return false;
    });

    //Document Click
    $(document).mouseup(function() {
        $("ul").hide();
        $(".button").attr('id', '0');
    });
    
  
});


  