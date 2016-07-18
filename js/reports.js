$(document).ready(function () {

    // Styling
    $("#initial-selection").css("margin-top", "50px");

    $("#datepicker1").datepicker();

    // Populating principal selection field
    $.getJSON('json/principal-details.json').done(function (data) {
        var option_string = '';
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
        var option_string = '';
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
        var option_string = '';
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
        var option_string = '';
        for (var i = 0; i < data["container_type"].length; i++) {
            option_string += '<option data-tokens="' + data["container_type"][i].toLowerCase() + '" value="' + data["container_type"][i] + '"">' + data["container_type"][i] + '</option>';
        }
        $('#type').empty().append(option_string).change(function (e) {
            e.preventDefault();
            var selected_type = $(this).val();
        }).selectpicker('refresh');
    });// Populating container type json

    //Catching selection
    $("#initial-select").change(function (e) {
        e.preventDefault();

        var selected_val = $(this).val();
        if (selected_val == "Principal") {
            //Hide
            $("#depot-field").hide();
            $("#port-field").hide();
            $("#status-field").hide();
            $("#type-field").hide();

            //show
            $("#principal-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();

        } else if (selected_val == "Depot") {
            //Hide
            $("#principal-field").hide();
            $("#port-field").hide();
            $("#status-field").hide();
            $("#type-field").hide();

            //show
            $("#depot-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();

        } else if (selected_val == "Port") {
            //Hide
            $("#principal-field").hide();
            $("#depot-field").hide();
            $("#status-field").hide();
            $("#type-field").hide();

            //show
            $("#port-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();

        } else if (selected_val == "Status") {
            //Hide
            $("#principal-field").hide();
            $("#depot-field").hide();
            $("#port-field").hide();
            $("#type-field").hide();

            //show
            $("#status-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();

        } else if (selected_val == "Type") {
            //Hide
            $("#principal-field").hide();
            $("#depot-field").hide();
            $("#port-field").hide();
            $("#status-field").hide();

            //show
            $("#type-field").show();
            $("#from-date-field").show();
            $("#to-date-field").show();
            $("#button-field").show();
        }
    });

    // Generate report button clicking events
    $("#generate").click(function (e) {
        e.preventDefault();
        var report_based_on = $("select#initial-select").val();
        if (report_based_on == 'Principal') {
            window.open("../gpsl-ui/reports/principal-reports.html");
            var principal_name = $("#principal").val(),
                report_generating_date = $("#datepicker1").val();
            var introductory_data = {"principal": principal_name, "date": report_generating_date};
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        } else if (report_based_on == 'Depot') {
            window.open("../gpsl-ui/reports/depot-reports.html");
            var depot_name = $("#depot").val(),
                report_generating_date = $("#datepicker1").val();
            var introductory_data = {"depot": depot_name, "date": report_generating_date};
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        } else if (report_based_on == 'Port') {
            window.open("../gpsl-ui/reports/port-reports.html");
            var port_name = $("#port").val(),
                report_generating_date = $("#datepicker1").val();
            var introductory_data = {"port": port_name, "date": report_generating_date};
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        } else if (report_based_on == 'Status') {
            window.open("../gpsl-ui/reports/status-reports.html");
            var container_status = $("#status").val(),
                report_generating_date = $("#datepicker1").val();
            var introductory_data = {"status": container_status, "date": report_generating_date};
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        } else if (report_based_on == 'Type') {
            window.open("../gpsl-ui/reports/type-reports.html");
            var container_type = $("#type").val(),
                report_generating_date = $("#datepicker1").val();
            var introductory_data = {"type": container_type, "date": report_generating_date};
            localStorage.clear();
            localStorage.setItem('introductory_data', JSON.stringify(introductory_data));
        }
    });
});
