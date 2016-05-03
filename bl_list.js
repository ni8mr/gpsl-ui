$(document).ready(function () {

    /* functions */

    /*---------*/

    /* Events */

    // Add new b/l button clicking events#add-new-bl
    $('#add-new-bl').click(function (e) {
        e.preventDefault();

        // Removing previously generated dynamic fields
        $("div#bl-list-id").empty();
        $("div#bl-volume-number").empty().append("<label>Number</label>");
        $("div#bl-volume-type").empty().append("<label>Type</label>");
        $("div#bl-status").empty();
        $("div#bl-payable-at").empty().append("<br>");
        $("div#bl-line-detention-checkbox").empty();
        $("div#bl-line-detention-day-count").empty();


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
        for (i = 0; i < 10; i++) {
            // ID entry field generation
            $("div#bl-list-id").append("<br>" + "<input type='text' name='bl-list-id'>" + "<br>");

            // Volume-number entry field generation
            $("div#bl-volume-number").append("<br>" + "<input type='text' name='bl-volume-number'>" + "<br>");

            // Volume-type entry field generation
            $("div#bl-volume-type").append("<br>" + "<input type='text' name='bl-volume-type'>" + "<br>");

            // Status entry field generation
            $("div#bl-status").append("<br>" + "<input type='text' name='bl-status'>" + "<br>");

            // 'Payable at' selection field generation
            $("div#bl-payable-at").append("<select name='bl-payable-at'><option value='POD'>POD</option><option value='POL'>POL</option></select>");

            // Line detention checkbox generation
            $("div#bl-line-detention-checkbox").append("<br>" + "<input type='checkbox' name='bl-line-detention-checkbox' checked>" + "<br>");

            // Line detention day-count entry field generation
            $("div#bl-line-detention-day-count").append("<br>" + "<input type='number' name='bl-line-detention-day-count' placeholder='Free for (in days)'>" + "<br>");
        }

        /* Generating unique-id for different input fields */

        // For ID entry field
        $("input[name='bl-list-id']").uniqueId();

        // For volume-number entry field
        $("input[name='bl-volume-number']").uniqueId();

        // For volume-type entry field
        $("input[name='bl-volume-type']").uniqueId();

        // For status entry field
        $("input[name='bl-status']").uniqueId();

        // For 'Payable at' selection field
        $("select[name='bl-payable-at']").uniqueId();

        // For line detention checkbox
        $("input[name='bl-line-detention-checkbox']").uniqueId();

        // For line detention day-count entry field
        $("input[name='bl-line-detention-day-count']").uniqueId();

        /*-----*/

        // Adding default data to the initially generated rows of the b/l list entry form
        for (i = 1; i < 11; i++) {
            // Adding default data at ID entry field
            var id_input_field = $("input#ui-id-" + i);
            id_input_field.val(i);

            // Adding default data at status entry field
            var incremented_id_for_status_entry = i + 30,
                status_input_field = $("input#ui-id-" + incremented_id_for_status_entry);
            status_input_field.val('original');

            /* Adding defaut selection at 'Payable at' selection field */
            // var incremented_id_for_payable_at_selection = i + 40,
            //     payable_at_selection_field = $("select#ui-id-" + incremented_id_for_payable_at_selection);
            //
            // // Clearing previous selection if exists
            // var targeting_selected = $(payable_at_selection_field + ' option:selected');
            // targeting_selected.removeAttr('selected');
            //
            // // Adding selected value at the field
            // var targeting_for_selection = $("select#ui-id-" + incremented_id_for_payable_at_selection + " option[value='POD']");
            // targeting_for_selection.attr("selected", "selected");
            //
            // // Showing selected value at the top
            // targeting_selected.prependTo(payable_at_selection_field);

            /* ------ */

            // Adding default value at line detention day-count entry field
            var incremented_id_for_line_detention_day_count = i + 60,
                line_detention_day_count_input_field = $("input#ui-id-" + incremented_id_for_line_detention_day_count);
            line_detention_day_count_input_field.val(14);

        }


    });// Add new b/l button clicking events


    //Cross button clicking event of "Add new b/l" modal
    $("#myModal").on('click', '#cross', function(e){
        e.preventDefault();

        // Removing previously generated dynamic fields
        $("div#bl-list-id").empty();
        $("div#bl-volume-number").empty().append("<label>Number</label>");
        $("div#bl-volume-type").empty().append("<label>Type</label>");
        $("div#bl-status").empty();
        $("div#bl-payable-at").empty().append("<br>");
        $("div#bl-line-detention-checkbox").empty();
        $("div#bl-line-detention-day-count").empty();


        // Adding default data to the initially generated rows of the b/l list entry form
        for (i = 1; i < 11; i++) {
            // Adding default data at ID entry field
            var id_input_field = $("input#ui-id-" + i);
            id_input_field.val(i);

            // Adding default data at status entry field
            var incremented_id_for_status_entry = i + 30,
                status_input_field = $("input#ui-id-" + incremented_id_for_status_entry);
            status_input_field.val('original');

            /* Adding defaut selection at 'Payable at' selection field */
            // var incremented_id_for_payable_at_selection = i + 40,
            //     payable_at_selection_field = $("select#ui-id-" + incremented_id_for_payable_at_selection);
            //
            // // Clearing previous selection if exists
            // var targeting_selected = $(payable_at_selection_field + ' option:selected');
            // targeting_selected.removeAttr('selected');
            //
            // // Adding selected value at the field
            // var targeting_for_selection = $("select#ui-id-" + incremented_id_for_payable_at_selection + " option[value='POD']");
            // targeting_for_selection.attr("selected", "selected");
            //
            // // Showing selected value at the top
            // targeting_selected.prependTo(payable_at_selection_field);

            /* ------ */

            // Adding default value at line detention day-count entry field
            var incremented_id_for_line_detention_day_count = i + 60,
                line_detention_day_count_input_field = $("input#ui-id-" + incremented_id_for_line_detention_day_count);
            line_detention_day_count_input_field.val(14);

        }



    });//Cross button clicking event of "Add new b/l" modal


    // Triggering jquery datepicker function for "Date of Entry" field at "Add new B/L" modal
    $('input#bl-date-of-entry').datepicker({
        dateFormat: 'yy-mm-dd'
    });

    // Triggering jquery datepicker function for "ETA" field at "Add new B/L" modal
    $('input#bl-eta').datepicker({
        dateFormat: 'yy-mm-dd'
    });

});
