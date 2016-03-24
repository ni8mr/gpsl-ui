$(function() {
    $("#depot-submit-form").submit(function(e) {
        e.preventDefault();
        var data = $("#depot-submit-form").serializeArray();
        console.log(data);
        for(var i=0; i<data.length; i++){
            if(data[i].value.length == 0){
                console.log(data[i].name);
            }
        }
    });
});