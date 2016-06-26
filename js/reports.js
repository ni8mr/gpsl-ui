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

    //Catching selection
    $("#initial-select").change(function(e){
        e.preventDefault();
        
        var selected_val = $(this).val();
        if(selected_val == "Principal"){
            //Hide
            $("#depot-field").hide();
            $("#status-field").hide();
            $("#type-field").hide();

            //show
            $("#principal-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();

        }else if(selected_val == "Depot"){
            //Hide
            $("#principal-field").hide();
            $("#status-field").hide();
            $("#type-field").hide();

            //show
            $("#depot-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();

        }else if(selected_val == "Status"){
            //Hide
            $("#principal-field").hide();
            $("#depot-field").hide();
            $("#type-field").hide();

            //show
            $("#status-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();

        }else if(selected_val == "Type"){
            //Hide
            $("#principal-field").hide();
            $("#depot-field").hide();
            $("#status-field").hide();

            //show
            $("#type-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();

        }
    });

    // Generate report button clicking events
    $("#generate").click(function(e){
        e.preventDefault();
        var report_based_on = $("select#initial-select").val();
        if(report_based_on == 'Principal'){

        }else if(report_based_on == 'Depot'){

        }else if(report_based_on == 'Status'){

        }else if(report_based_on == 'Type'){

        }
    });
});
