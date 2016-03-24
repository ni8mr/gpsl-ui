 $(function() {
  $("#depot-submit-form").submit(function(e) {
    e.preventDefault();
    $(this).find('input').each(function(){
      if($(this).val().length == 0){
         $("<span>Field should not be empty!</span>").insertAfter( $(this));
      }
    });
      $(this).find('select').each(function(){
        if($(this).val().length == 0){
         $("<span>Field should not be empty!</span>").insertAfter( $(this));
      }
    });
  });
});