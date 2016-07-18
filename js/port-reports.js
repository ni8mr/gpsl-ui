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

    //Loading introductory texts
    var introductory_data = JSON.parse(localStorage.getItem('introductory_data'));
    $("div#header").find("h1").html("A/C:-" + introductory_data["port"]);
    localStorage.clear();
    // Declaring call_url based on the id of this principal
    var call_url = "../json/port-details.json";

    // Loading principal data
    $.getJSON(call_url)
        .done(function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == introductory_data["port"]) {
                    // Formating data
                    var port_data = data[i]["address"] + "<br>" + "Email:" + data[i]["email"] + ", Fax:" + data[i]["fax"] + ", Phone:" + data[i]["phone"],
                        report_generating_date = "Date:-" + introductory_data["date"];
                    $("div#header").find("h3").html(port_data + "<br>" + report_generating_date + "<br>" + "CONTAINER AT THIS PORT");
                }
            }
        });// Loading principal data

});