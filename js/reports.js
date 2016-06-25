$(document).ready(function () {

    // Styling
    $("#initial-selection").css("margin-top", "50px");

    $("#datepicker1").datepicker();
    $("#datepicker2").datepicker();

    // Populating principal selection field
    $.getJSON('json/principal-details.json').done(function (data) {
        var option_string = '';
        for (var i = 0; i < data.length; i++) {
            option_string += '<option data-tokens="' + data[i]["name"].toLowerCase() + '" value="' + data[i]["name"] + '"">' + data[i]["name"] + '</option>';
        }
        $('#principal').empty().append(option_string).change(function (e) {
            e.preventDefault();
            var selected_principal = $(this).val();
            console.log(selected_principal);
        }).selectpicker('refresh');
    });// Populating principal selection field
    // Populating depot selection field
    $.getJSON('json/depot-details.json').done(function (data) {
        var option_string = '';
        for (var i = 0; i < data.length; i++) {
            option_string += '<option data-tokens="' + data[i]["name"].toLowerCase() + '" value="' + data[i]["name"] + '"">' + data[i]["name"] + '</option>';
        }
        $('#depot').empty().append(option_string).change(function (e) {
            e.preventDefault();
            var selected_depot = $(this).val();
            console.log(selected_depot);
        }).selectpicker('refresh');
    });// Populating depot selection field
    //Populating container type json
    $.getJSON('json/container_type.json').done(function (data) {
        var option_string = '';
        console.log(data["container_type"]);
        for (var i = 0; i < data["container_type"].length; i++) {
            option_string += '<option data-tokens="' + data["container_type"][i].toLowerCase() + '" value="' + data["container_type"][i] + '"">' + data["container_type"][i] + '</option>';
        }
        $('#type').empty().append(option_string).change(function (e) {
            e.preventDefault();
            var selected_type = $(this).val();
            console.log(selected_type);
        }).selectpicker('refresh');
    });// Populating container type json
});