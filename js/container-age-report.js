$(document).ready(function(){
    //Catching introductory data
    var introductory_data = JSON.parse(localStorage.getItem('introductory_data'));
    console.log(introductory_data);
    // if(introductory_data["location"] != "all" && introductory_data["container-type"] != "all"){
    //     var table = $("#individual-container-age").DataTable();
    //     $("#location-all-container-age").hide();
    //     $("#type-all-container-age").hide();
    // }else if(introductory_data["location"] == "all" && introductory_data["container-type"] != "all"){
    //     var table = $("#location-all-container-age").DataTable();
    //     $("#individual-container-age").hide();
    //     $("#type-all-container-age").hide();
    // }else if(introductory_data["location"] != "all" && introductory_data["container-type"] == "all"){
    //     var table = $("#type-all-container-age").DataTable();
    //     $("#individual-container-age").hide();
    //     $("#location-all-container-age").hide();
    // }

});