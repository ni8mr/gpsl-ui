$(document).ready(function () {
    /* Functions */


    /* ----- */
    // calculating body width for styling
    var body_width = $("body").width();
    var header_width = $('header').width();
    var styling_width = $('form').width();
    // Styling form
    $('form').css('margin-left', (body_width - styling_width) / 2);
    $('form').css('margin-top', '30px');
    // Styling header
    $('header').css('margin-left', (body_width - header_width) / 2);
    $('header').css('margin-top', '20px');
    // Coloring some headings
    // $("table#dhaka-icd-import thead tr").each(function () {
    //     $(this).find($('th')).eq(6).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(7).css('background-color', 'yellow');
    // });
    // $("table#dhaka-icd-empty thead tr").each(function () {
    //     $(this).find($('th')).eq(6).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(7).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(8).css('background-color', 'yellow');
    // });
    // $("table#mongla-import thead tr").each(function () {
    //     $(this).find($('th')).eq(6).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(7).css('background-color', 'yellow');
    // });
    // $("table#mongla-empty thead tr").each(function () {
    //     $(this).find($('th')).eq(5).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(6).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(7).css('background-color', 'yellow');
    // });
    // $("table#chittagong-import thead tr").each(function () {
    //     $(this).find($('th')).eq(5).css('background-color', 'yellow');
    //     $(this).find($('th')).eq(6).css('background-color', 'yellow');
    // });
    // // Coloring remarks field which has some texts
    // $("table#chittagong-import tbody tr").each(function () {
    //     if ($(this).find($('td')).eq(5).text()) {
    //         $(this).find($('td')).eq(5).css('background-color', 'coral');
    //     }
    // });
    // $("table#chittagong-empty tbody tr").each(function () {
    //     if ($(this).find($('td')).eq(6).text()) {
    //         $(this).find($('td')).eq(6).css('background-color', 'coral');
    //     }
    // });

    //Loading introductory texts
    var introductory_data = JSON.parse(localStorage.getItem('introductory_data'));
    $("div#header").find("h1").html("A/C:-" + introductory_data["principal"]);
    localStorage.clear();
    // Declaring call_url based on the id of this principal
    var call_url = "../json/principal-details.json";

    // Loading principal data
    $.getJSON(call_url)
        .done(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == introductory_data["principal"]) {
                    // Formating data
                    var principal_data = data[i]["address"] + "<br>" + "Email:" + data[i]["email"] + ", Fax:" + data[i]["fax"] + ", Phone:" + data[i]["phone"],
                        report_generating_date = "Date:-" + introductory_data["date"];
                    $("div#header").find("h3").html("AGENTS:-" + principal_data + "<br>" + report_generating_date);
                }
            }
        });// Loading principal data
});