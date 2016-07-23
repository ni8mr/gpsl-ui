$(document).ready(function () {

    // Styling
    $("#initial-selection").css("margin-top", "50px");

    $("#datepicker1").datepicker();
    $("#datepicker2").datepicker();

    // TODO: ALWAYS SHOW SELECTED AND DISABLED OPTIONS AT THE TOP

    // Populating principal selection field
    $.getJSON('json/principal-details.json').done(function (data) {
        var option_string = '<option data-tokens="all" value="all">All</option>';
        for (var i = 0; i < data.length; i++) {
            option_string += '<option data-tokens="' + data[i]["name"].toLowerCase() + '" value="' + data[i]["name"] + '"">' + data[i]["name"] + '</option>';
        }
        $('#principal').empty().append(option_string).change(function (e) {
            e.preventDefault();
            var selected_principal = $(this).val();
        }).selectpicker('refresh');
    });// Populating principal selection field
    // Populating depot selection field
    $.getJSON('json/depot-details.json').done(function (data) {
        var option_string = '<option data-tokens="all" value="all">All</option>';
        for (var i = 0; i < data.length; i++) {
            option_string += '<option data-tokens="' + data[i]["name"].toLowerCase() + '" value="' + data[i]["name"] + '"">' + data[i]["name"] + '</option>';
        }
        $('#depot').empty().append(option_string).change(function (e) {
            e.preventDefault();
            var selected_depot = $(this).val();
        }).selectpicker('refresh');
    });// Populating depot selection field
    // Populating port selection field
    $.getJSON('json/port-details.json').done(function (data) {
        var option_string = '<option data-tokens="all" value="all">All</option>';
        for (var i = 0; i < data.length; i++) {
            option_string += '<option data-tokens="' + data[i]["name"].toLowerCase() + '" value="' + data[i]["name"] + '"">' + data[i]["name"] + '</option>';
        }
        $('#port').empty().append(option_string).change(function (e) {
            e.preventDefault();
            var selected_depot = $(this).val();
        }).selectpicker('refresh');
    });// Populating port selection field
    //Populating container type json
    $.getJSON('json/container_type.json').done(function (data) {
        var option_string = '<option data-tokens="all" value="all">All</option>';
        for (var i = 0; i < data["container_type"].length; i++) {
            option_string += '<option data-tokens="' + data["container_type"][i].toLowerCase() + '" value="' + data["container_type"][i] + '"">' + data["container_type"][i] + '</option>';
        }
        $('#container-type').empty().append(option_string).change(function (e) {
            e.preventDefault();
            var selected_type = $(this).val();
        }).selectpicker('refresh');
    });// Populating container type json

    // Showing fields based on "Reports based on" field value
    $("#initial-selection-for-report-generation").change(function (e) {
        e.preventDefault();

        // TODO: SHOW DEPOT OR PORT FIELD BASED ON LOCATION SELECTION
        if ($(this).val() == "container-age") {
            //Showing fields
            $("#principal-field").show();
            $("#location-field").show();
            $("#depot-field").show();
            $("#port-field").show();
            $("#status-field").show();
            $("#container-type-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#report-generate-button-field").show();

            // Hiding fields
            $("#report-type-field").hide();
            $("#movement-type-field").hide();
        } else if ($(this).val() == "depot-transaction") {
            //Showing fields
            $("#depot-field").show();
            $("#report-type-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#report-generate-button-field").show();

            // Hiding fields
            $("#principal-field").hide();
            $("#location-field").hide();
            $("#port-field").hide();
            $("#status-field").hide();
            $("#container-type-field").hide();
            $("#movement-type-field").hide();
        } else if ($(this).val() == "depot-container") {
            //Showing fields
            $("#depot-field").show();
            $("#status-field").show();
            $("#container-type-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#report-generate-button-field").show();

            // Hiding fields
            $("#principal-field").hide();
            $("#location-field").hide();
            $("#port-field").hide();
            $("#report-type-field").hide();
            $("#movement-type-field").hide();
        } else if ($(this).val() == "container-movement-report") {
            //Showing fields
            $("#principal-field").show();
            $("#location-field").show();
            $("#depot-field").show();
            $("#port-field").show();
            $("#status-field").show();
            $("#container-type-field").show();
            $("#movement-type-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#report-generate-button-field").show();

            // Hiding fields
            $("#report-type-field").hide();
        }
    });

    // Generate report button clicking events
    $("#generate").click(function (e) {
        e.preventDefault();
        var report_based_on = $("select#initial-selection-for-report-generation").val();
        if (report_based_on == 'container-age') {
            window.open("../gpsl-ui/reports/container-age-report.html");
            // Selected values by users
            var selected_principal = $("#principal").val(),
                selected_location = $("#location").val();
            if (selected_location == "port") {
                var selected_port = $("#port").val();
            } else {
                var selected_depot = $("#depot").val();
            }
            var selected_container_status = $("#status").val(),
                selected_container_type = $("#container-type").val(),
                from_date = $("#datepicker1").val(),
                to_date = $("#datepicker1").val();
            var introductory_data = {"principal": selected_principal, "container-status": selected_container_status, "container-type":selected_container_type, "from-date": from_date, "to-date": to_date};
            if(selected_location == "port"){
                introductory_data["port"] = selected_port;
            }else{
                introductory_data["depot"] = selected_depot;
            }
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        } else if (report_based_on == 'depot-transaction') {
            window.open("../gpsl-ui/reports/depot-transaction-report.html");
            // Selected value by users
            var selected_depot = $("#depot").val(),
                selected_report_type = $("#report-type").val(),
                from_date = $("#datepicker1").val(),
                to_date = $("#datepicker1").val();
            var introductory_data = {"depot": selected_depot, "report-type": selected_report_type, "from-date":from_date, "to-date":to_date};
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        } else if (report_based_on == 'depot-container') {
            window.open("../gpsl-ui/reports/depot-container-report.html");
            // Selected value by users
            var selected_depot = $("#depot").val(),
                selected_container_status = $("#status").val(),
                selected_container_type = $("#container-type").val(),
                from_date = $("#datepicker1").val(),
                to_date = $("#datepicker1").val();
            var introductory_data = {"depot": selected_depot, "container-status": selected_container_status, "container-type":selected_container_type, "from-date":from_date, "to-date":to_date};
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        } else if (report_based_on == 'container-movement-report') {
            window.open("../gpsl-ui/reports/container-movement-report.html");
            // Selected values by users
            var selected_principal = $("#principal").val(),
                selected_location = $("#location").val();
            if (selected_location == "port") {
                var selected_port = $("#port").val();
            } else {
                var selected_depot = $("#depot").val();
            }
            var selected_container_status = $("#status").val(),
                selected_container_type = $("#container-type").val(),
                selected_movement_type = $("#movement-type").val(),
                from_date = $("#datepicker1").val(),
                to_date = $("#datepicker1").val();
            var introductory_data = {"principal": selected_principal, "container-status": selected_container_status, "container-type":selected_container_type, "from-date": from_date, "to-date": to_date, "movement-type": selected_movement_type};
            if(selected_location == "port"){
                introductory_data["port"] = selected_port;
            }else{
                introductory_data["depot"] = selected_depot;
            }
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        }
    });
});
