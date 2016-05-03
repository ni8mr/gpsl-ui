$(document).ready(function () {

    /* functions */

    /*---------*/

    /* Events */

    // Add new b/l button clicking events#add-new-bl
    $('#add-new-bl').click(function (e) {
        e.preventDefault();

        // var principal_name_url = location.origin + "/api/v1/principal/";
        // var principal_name = '';
        //
        // // Collecting and populating all available principal names in the "Principal name" field
        // $.getJSON(principal_name_url).done(function (data) {
        //     for (var i = 0; i < data.length; i++) {
        //         principal_name += '<option data-tokens="' + data[i].name.toLowerCase() + '" value="' + i + '">' + data[i].name + '</option>';
        //     }
        //
        //     // Populating "Principal name" field
        //     $("select#bl-principal-name").empty().append(principal_name).change(function (e) {
        //         e.preventDefault();
        //     }).selectpicker('refresh');
        //
        // });

        var count = 0;
        //Loading dynamic fields/data for B/L list form
        for(i=0; i<=10; i++){
            $('div#bl-list-id').append("<br>" + "<input type='text'>");
            $('div#bl-volume-number').append("<input type='text'>" + "<br>");
            $('div#bl-volume-type').append("<input type='text'>" + "<br>");
            $('div#bl-status').append("<input type='text'>" + "<br>");
            $('div#bl-payable-at').append("<select></select>");
            $('div#bl-line-detention-checkbox').append("<br>" + "<input type='checkbox' checked>");
            $('div#bl-line-detention-day-count').append("<label>Free for</label>" + "<input type='text'>");
            count += 1;
        }

        console.log(count);

    });// Add new b/l button clicking events


    // Triggering jquery datepicker function for "Date of Entry" field
    $('input#bl-date-of-entry').datepicker({
        dateFormat: 'yy-mm-dd'
    });

    // Triggering jquery datepicker function for "ETA" field
    $('input#bl-eta').datepicker({
        dateFormat: 'yy-mm-dd'
    });

});
