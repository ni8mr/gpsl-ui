$(function() {
    $("#depot-submit-form").on('submit', function(e) {
        e.preventDefault();
        var data = $("#depot-submit-form").serializeArray();
        console.log(data);
    });
});