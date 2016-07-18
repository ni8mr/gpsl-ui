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
    $("div#header").find("h1").html(introductory_data["status"] + " containers");
    localStorage.clear();
    $("div#header").find("h3").html("Date: " + introductory_data["date"]);
    $("#container-table").find("thead tr:nth-child(1) th").html(introductory_data["status"] + " containers at different locations");
});