$(document).ready(function () {

    /* functions */

    // CSS to make dynamically generated rows of b/l entry form
    function css_for_field_alignment() {
        // For all ID, Volume and Status input fields
        $("div#bl-list-entry").find("input[type='text']").css("margin-bottom", "20px");

        // For "Volume type" select field
        $("div#bl-list-entry").find("select[name='bl-volume-type']").css("margin-bottom", "18px");

        // For the "Payable at" select field
        $("div#bl-list-entry").find("select[name='bl-payable-at']").css("margin-bottom", "18px");

        // For line detenton fields
        $("div#bl-list-entry").find("input[name='bl-line-detention-checkbox']").css("display", "block");
        $("div#bl-list-entry").find("input[name='bl-line-detention-checkbox']").css("margin-top", "12px");
        $("div#bl-list-entry").find("input[name='bl-line-detention-checkbox']").css("margin-bottom", "32px");

        $("div#bl-list-entry").find("input[name='bl-line-detention-day-count']").css("margin-bottom", "20px");

    }// CSS to make dynamically generated rows of b/l entry form


    // Populating "BL-Volume-Type" select field
    function bl_entry_volume_type_field_population() {
        $.getJSON(CONTAINER_TYPE_URL).done(function (data) {
            var container_types = data["container_type"],
                option_string = "";

            for (var i = 0; i < container_types.length; i++) {
                option_string += '<option value="' + container_types[i] + '">' + container_types[i] + '</option>';
            }

            //Appending options at the field
            $("div#bl-volume-type").find("select[name='bl-volume-type']").empty().append(option_string);
        });

    }// Populating "BL-Volume-Type" select field


    /*---------*/

    /* Events */

    // Add new b/l button clicking events#add-new-bl
    $('#add-new-bl').click(function (e) {
        e.preventDefault();

        /* Removing previously generated dynamic fields and appending labels */
        $("div#bl-list-id").empty().append("<label>ID</label><label>&nbsp</label>");
        $("div#bl-volume-number").empty().append("<label>Number</label>");
        $("div#bl-volume-type").empty().append("<label>Type</label>");
        $("div#bl-status").empty().append("<label>Status</label><label>&nbsp</label>");
        $("div#bl-payable-at").empty().append("<label>Payable at</label><label>&nbsp</label>");
        $("div#bl-line-detention-checkbox").empty().append("<label>&nbsp</label>");
        $("div#bl-line-detention-day-count").empty().append("<label>Free for (in days)</label>");

        // Populating Principal Name field
        var principal_name_url = location.origin + "/api/v1/principal/";
        var principal_name = '';

        // Collecting and populating all available principal names in the "Principal name" field
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
        // });// Collecting and populating all available principal names in the "Principal name" field

        //Loading 10 dynamic rows initially for b/l list entry form
        for (i = 0; i < 10; i++) {
            // ID entry field generation
            $("div#bl-list-id").append("<input type='text' name='bl-list-id'>");

            // Volume-number entry field generation
            $("div#bl-volume-number").append("<input type='text' name='bl-volume-number'>");

            // Volume-type entry field generation
            $("div#bl-volume-type").append("<select name='bl-volume-type'></select>");

            // Status entry field generation
            $("div#bl-status").append("<input type='text' name='bl-status'>");

            // 'Payable at' selection field generation
            $("div#bl-payable-at").append("<select name='bl-payable-at'><option value='POD'>POD</option><option value='POL'>POL</option></select>");

            // Line detention checkbox generation
            $("div#bl-line-detention-checkbox").append("<input type='checkbox' name='bl-line-detention-checkbox' checked>");

            // Line detention day-count entry field generation
            $("div#bl-line-detention-day-count").append("<input type='number' name='bl-line-detention-day-count' placeholder='Free for (in days)'>" + "<br>");
        }//Loading 10 dynamic rows initially for b/l list entry form

        // Populating "B/L volume type" select field with options
        bl_entry_volume_type_field_population();

        //Applying css to make the fields aligned
        css_for_field_alignment();

        /* Generating unique-id for different input fields */

        // For ID entry field
        $("input[name='bl-list-id']").uniqueId();

        // For volume-number entry field
        $("input[name='bl-volume-number']").uniqueId();

        // For volume-type entry field
        $("select[name='bl-volume-type']").uniqueId();

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

        // At ID fields
        // Getting all ids of the fields
        var ids = $("input[name='bl-list-id']").map(function () {
            return this.id;
        }).get();
        //Assigning different values at different ids
        for (var i = 0; i < 10; i++) {
            $("input[id='" + ids[i] + "']").val(i + 1);
        }

        // At status field
        $("input[name='bl-status']").val('original');

        // At line-detention-free-days field
        $("input[name='bl-line-detention-day-count']").val(14);

    });// Add new b/l button clicking events

    // "Add more' button clicking event
    $("#myModal").on('click', "#add-more-bl", function (e) {
        e.preventDefault();

        //Catching last generated value from the ID input field for later use
        var id_input_field_value = parseInt($("div#bl-list-id input[name='bl-list-id']").last().val());

        /* Defining values for the id attribute of newly generated input fields */

        // Getting latest id
        var last_id_of_ID_field = $("div#bl-list-id input[name='bl-list-id']").last().attr("id"),
            last_id_of_volume_number_field = $("div#bl-volume-number input[name='bl-volume-number']").last().attr("id"),
            last_id_of_volume_type_field = $("div#bl-volume-type select[name='bl-volume-type']").last().attr("id"),
            last_id_of_status_field = $("div#bl-status input[name='bl-status']").last().attr("id"),
            last_id_of_payable_at_field = $("div#bl-payable-at input[name='bl-payable-at']").last().attr("id"),
            last_id_of_line_detention_checkbox_field = $("div#bl-line-detention-checkbox input[name='bl-line-detention-checkbox']").last().attr("id"),
            last_id_of_line_detention_day_count = $("div#bl-line-detention-day-count input[name='bl-line-detention-day-count']").last().attr("id");

        //Defining values for the id attribute of each field
        var id = last_id_of_ID_field + 1,
            volume_number = last_id_of_volume_number_field + 1,
            volume_type = last_id_of_volume_type_field + 1,
            status = last_id_of_status_field + 1,
            payable_at = last_id_of_payable_at_field + 1,
            line_detention_checkbox = last_id_of_line_detention_checkbox_field + 1,
            line_detention_day_count = last_id_of_line_detention_day_count + 1;

        /* ------- */

        /* Generating fields in new row */
        // ID entry field generation
        $("div#bl-list-id").append("<input type='text' name='bl-list-id' id='" + id + "'>");

        // Volume-number entry field generation
        $("div#bl-volume-number").append("<input type='text' name='bl-volume-number' id='" + volume_number + "'>");

        // Volume-type entry field generation
        $("div#bl-volume-type").append("<select name='bl-volume-type' id='" + volume_type + "'></select>");

        // Status entry field generation
        $("div#bl-status").append("<input type='text' name='bl-status' id='" + status + "'>");

        // 'Payable at' selection field generation
        $("div#bl-payable-at").append("<select name='bl-payable-at' id='" + payable_at + "'><option value='POD'>POD</option><option value='POL'>POL</option></select>");

        // Line detention checkbox generation
        $("div#bl-line-detention-checkbox").append("<input type='checkbox' name='bl-line-detention-checkbox' id='" + line_detention_checkbox + "' checked>");

        // Line detention day-count entry field generation
        $("div#bl-line-detention-day-count").append("<input type='number' name='bl-line-detention-day-count' placeholder='Free for (in days)' id='" + line_detention_day_count + "'>");

        /*--------------*/

        // Populating "B/L volume type" select field with options
        bl_entry_volume_type_field_population();

        //Applying css to make the fields aligned
        css_for_field_alignment();

        /* Adding default data to the newly generated row */

        // Adding default data at ID entry field
        var last_id = $("div#bl-list-id input[name='bl-list-id']").last().attr("id"),
            id_input_field = $("input#" + last_id);
        id_input_field.val(id_input_field_value + 1);

        // Adding default data at status entry field
        var last_id = $("div#bl-status input[name='bl-status']").last().attr("id"),
            status_input_field = $("input#" + last_id);
        status_input_field.val('original');

        // Adding default value at line detention day-count entry field
        var last_id = $("div#bl-line-detention-day-count input[name='bl-line-detention-day-count']").last().attr("id"),
            line_detention_day_count_input_field = $("input#" + last_id);
        line_detention_day_count_input_field.val(14);

        /*--------------*/

    });// "Add more' button clicking event


    // "Add 10 more' button clicking event
    $("#myModal").on('click', "#add-10-more-bl", function (e) {
        e.preventDefault();

        for (var i = 0; i < 10; i++) {
            //Catching last generated value from the ID input field for later use
            var id_input_field_value = parseInt($("div#bl-list-id input[name='bl-list-id']").last().val());

            /* Defining values for the id attribute of newly generated input fields */

            // Getting latest id
            var last_id_of_ID_field = $("div#bl-list-id input[name='bl-list-id']").last().attr("id"),
                last_id_of_volume_number_field = $("div#bl-volume-number input[name='bl-volume-number']").last().attr("id"),
                last_id_of_volume_type_field = $("div#bl-volume-type select[name='bl-volume-type']").last().attr("id"),
                last_id_of_status_field = $("div#bl-status input[name='bl-status']").last().attr("id"),
                last_id_of_payable_at_field = $("div#bl-payable-at input[name='bl-payable-at']").last().attr("id"),
                last_id_of_line_detention_checkbox_field = $("div#bl-line-detention-checkbox input[name='bl-line-detention-checkbox']").last().attr("id"),
                last_id_of_line_detention_day_count = $("div#bl-line-detention-day-count input[name='bl-line-detention-day-count']").last().attr("id");

            //Defining values for the id attribute of each field
            var id = last_id_of_ID_field + 1,
                volume_number = last_id_of_volume_number_field + 1,
                volume_type = last_id_of_volume_type_field + 1,
                status = last_id_of_status_field + 1,
                payable_at = last_id_of_payable_at_field + 1,
                line_detention_checkbox = last_id_of_line_detention_checkbox_field + 1,
                line_detention_day_count = last_id_of_line_detention_day_count + 1;

            /* ------- */

            /* Generating fields in new row */
            // ID entry field generation
            $("div#bl-list-id").append("<input type='text' name='bl-list-id' id='" + id + "'>");

            // Volume-number entry field generation
            $("div#bl-volume-number").append("<input type='text' name='bl-volume-number' id='" + volume_number + "'>");

            // Volume-type entry field generation
            $("div#bl-volume-type").append("<select name='bl-volume-type' id='" + volume_type + "'></select>");

            // Status entry field generation
            $("div#bl-status").append("<input type='text' name='bl-status' id='" + status + "'>");

            // 'Payable at' selection field generation
            $("div#bl-payable-at").append("<select name='bl-payable-at' id='" + payable_at + "'><option value='POD'>POD</option><option value='POL'>POL</option></select>");

            // Line detention checkbox generation
            $("div#bl-line-detention-checkbox").append("<input type='checkbox' name='bl-line-detention-checkbox' id='" + line_detention_checkbox + "' checked>");

            // Line detention day-count entry field generation
            $("div#bl-line-detention-day-count").append("<input type='number' name='bl-line-detention-day-count' placeholder='Free for (in days)' id='" + line_detention_day_count + "'>");

            /*--------------*/

            // Populating "B/L volume type" select field with options
            bl_entry_volume_type_field_population();

            //Applying css to make the fields aligned
            css_for_field_alignment();

            /* Adding default data to the newly generated row */

            // Adding default data at ID entry field
            var last_id = $("div#bl-list-id input[name='bl-list-id']").last().attr("id"),
                id_input_field = $("input#" + last_id);
            id_input_field.val(id_input_field_value + 1);

            // Adding default data at status entry field
            var last_id = $("div#bl-status input[name='bl-status']").last().attr("id"),
                status_input_field = $("input#" + last_id);
            status_input_field.val('original');

            // Adding default value at line detention day-count entry field
            var last_id = $("div#bl-line-detention-day-count input[name='bl-line-detention-day-count']").last().attr("id"),
                line_detention_day_count_input_field = $("input#" + last_id);
            line_detention_day_count_input_field.val(14);

            /*--------------*/
        }

    });// "Add 10 more' button clicking event


    // "Cross" button clicking event
    $("#myModal").on('click', "#cross", function (e) {
        e.preventDefault();

        // Removing divs with generated dynamic fields
        $("div#bl-list-id").remove();
        $("div#bl-volume-number").remove();
        $("div#bl-volume-type").remove();
        $("div#bl-status").remove();
        $("div#bl-payable-at").remove();
        $("div#bl-line-detention-checkbox").remove();
        $("div#bl-line-detention-day-count").remove();

        // Adding divs again
        $("div#bl-list-entry").html("<div data-field-span='2' id='bl-list-id'></div>" +
            "<div data-field-span='3'><label>Volume</label><div data-row-span='2'> <div data-field-span='1' id='bl-volume-number'></div><div data-field-span='1' id='bl-volume-type'></div></div></div>" +
            "<div data-field-span='2' id='bl-status'></div>" +
            "<div data-field-span='2' id='bl-payable-at'></div>" +
            "<div data-field-span='3'><label>Line detention</label><div data-row-span='4'><div data-field-span='1' id='bl-line-detention-checkbox'></div><div data-field-span='3' id='bl-line-detention-day-count'></div></div></div>");

    });// "Cross" button clicking event

    // Triggering jquery datepicker function for "Date of Entry" field
    $('input#bl-date-of-entry').datepicker({
        dateFormat: 'yy-mm-dd'
    });

    // Triggering jquery datepicker function for "ETA" field at "Add new B/L" modal
    $('input#bl-eta').datepicker({
        dateFormat: 'yy-mm-dd'
    });

});
