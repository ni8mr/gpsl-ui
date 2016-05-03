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

        //Loading 10 dynamic rows initially for b/l list entry form
        for(i=0; i<10; i++){
            // ID entry field generation
            $("div#bl-list-id").append("<br>" + "<input type='text' name='bl-list-id'>");

            // Volume-number entry field generation
            $("div#bl-volume-number").append("<input type='text'>" + "<br>");

            // Volume-type entry field generation
            $("div#bl-volume-type").append("<input type='text'>" + "<br>");

            // Status entry field generation
            $("div#bl-status").append("<input type='text'>" + "<br>");

            // 'Payable at' entry field generation
            $("div#bl-payable-at").append("<select></select>");

            // Line detention checkbox generation
            $("div#bl-line-detention-checkbox").append("<br>" + "<input type='checkbox' checked>");

            // Line detention day-count entry field generation
            $("div#bl-line-detention-day-count").append("<label>Free for</label>" + "<input type='text'>");
        }

        //Generating unique-id for different input fields

        // For ID entry field
        $("input[name='bl-list-id']").uniqueId();

        // Adding default data to the initially generated rows of the b/l list entry form
        for(i=1; i<11; i++){
            // Appending default data for ID entry field
            var id_input_field = $("input#ui-id-" + i);
            id_input_field.val(i);
        }


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
