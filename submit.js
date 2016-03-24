 $(function() {
  $("#depot-submit-form").submit(function(e) {
    e.preventDefault();
    $(this).find('input').each(function(){
      if($(this).val().length == 0){
         $("<span>Error in this Input!!!</span>").insertAfter( $(this));
      }
    });
      $(this).find('select').each(function(){
        if($(this).val().length == 0){
         $("<span>Error in this Input!!!</span>").insertAfter( $(this));
      }
    });
  });
});