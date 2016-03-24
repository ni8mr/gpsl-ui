$(function() {
    $("#depot-submit-form").submit(function(e) {
        e.preventDefault();
        var data = $("#depot-submit-form").serializeArray();
        console.log(data);
        for(var i=0; i<data.length(); i++){
            console.log(data[i]);
        }
    });
});