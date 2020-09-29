$(function(){
    $(".button").click(function() {
        let val = $(this).attr('id');
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
