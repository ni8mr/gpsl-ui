$(function() {
    $("#depot-submit-form").submit(function(e) {
        e.preventDefault();
        var data = $("#depot-submit-form").serializeArray();
        console.log(data);
    });
});