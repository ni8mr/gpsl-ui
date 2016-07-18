$(document).ready(function () {
    // calculating body width for styling
    var body_width = $("body").width();
    var header_width = $('header').width();
    var styling_width = $('form').width();
    // Styling form
    $('form').css('margin-left', (body_width - styling_width) / 2);
    $('form').css('margin-top', '30px');
    // Styling header
    $('header').css('margin-left', (body_width - header_width) / 2);
    // // Laden waiting for unstuff table
    // $("table#laden-waiting-for-unstuff thead tr").each(function () {
    //     $(this).find($('th')).eq(7).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(12).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(13).css('background-color', 'yellow');
    // });
    // $("table#laden-waiting-for-unstuff tbody tr").each(function () {
    //     if ($(this).find($('td')).eq(8).text()) {
    //         $(this).find($('td')).eq(8).css('background-color', 'coral');
    //         $(this).find($('td')).eq(9).css('background-color', 'coral');
    //     }
    //     if ($(this).find($('td')).eq(12).text()) {
    //         $(this).find($('td')).eq(12).css('background-color', 'coral');
    //     }
    // });// Laden waiting for unstuff table
    // // Empty waiting for unstuff table
    // $("table#empty-waiting-for-stuff thead tr").each(function () {
    //     $(this).find($('th')).eq(5).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(7).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(12).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(13).css('background-color', 'yellow');
    // });
    // $("table#empty-waiting-for-stuff tbody tr").each(function () {
    //     if ($(this).find($('td')).eq(8).text()) {
    //         $(this).find($('td')).eq(8).css('background-color', 'coral');
    //         $(this).find($('td')).eq(9).css('background-color', 'coral');
    //     }
    //     if ($(this).find($('td')).eq(12).text()) {
    //         $(this).find($('td')).eq(12).css('background-color', 'coral');
    //     }
    // });// Empty waiting for unstuff table
    // // Laden waiting for export table
    // $("table#laden-waiting-for-export thead tr").each(function () {
    //     $(this).find($('th')).eq(5).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(8).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(13).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(14).css('background-color', 'yellow');
    // });
    // $("table#laden-waiting-for-export tbody tr").each(function () {
    //     if ($(this).find($('td')).eq(9).text()) {
    //         $(this).find($('td')).eq(9).css('background-color', 'coral');
    //         $(this).find($('td')).eq(10).css('background-color', 'coral');
    //     }
    //     if ($(this).find($('td')).eq(13).text()) {
    //         $(this).find($('td')).eq(13).css('background-color', 'coral');
    //     }
    // });// Laden waiting for export table

    //Loading introductory texts
    var introductory_data = JSON.parse(localStorage.getItem('introductory_data'));
    $("div#header").find("h1").html("A/C:-" + introductory_data["depot"]);
    localStorage.clear();
    // Declaring call_url based on the id of this principal
    var call_url = "../json/port-details.json";

    // Loading principal data
    $.getJSON(call_url)
        .done(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == introductory_data["depot"]) {
                    // Formating data
                    var depot_data = data[i]["address"] + "<br>" + "Email:" + data[i]["email"] + ", Fax:" + data[i]["fax"] + ", Phone:" + data[i]["phone"],
                        report_generating_date = "Date:-" + introductory_data["date"];
                    $("div#header").find("h3").html(depot_data + "<br>" + report_generating_date + "<br>" + "CONTAINER STATUS REPORT");
                }
            }
        });// Loading principal data

});