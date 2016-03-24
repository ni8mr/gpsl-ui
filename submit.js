 $(function() {
  $("#depot-submit-form").submit(function(e) {
    e.preventDefault();
    $(this).find('.has-error').each(function(){
         $(this).find('.col-md-10').append("<span>Field should not be empty!</span>");
    });
  });
});