$(document).ready(function () {

    /* functions */


    /* End of functions */

    $("#principals").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                },
                pageSize: 'LEGAL'
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                },
                title: 'List of principals'
            }
        ]
    });

    $('title').append('\nList of principals');

    // Loading dual-select box field at "country-of-operation" field in add new principal modal
    $("#country-of-operation").DualListBox({
        uri: 'country-of-operation.json'
    });


    /* Loading data in the "Country of operation" fields */
    /*---------------------------------------------------*/
    var LOCATION_URL = 'dummy.json';

    var ajax_load = false,
        countries = [],
    // Saving id's of the fields
        input_country_of_origin = $("#new-country-of-origin"),
        input_country_of_origin_for_edit = $("#country-of-origin-edit");


    // Fetching data from the json
    function json_load() {
        $.getJSON(LOCATION_URL)
            .done(function (data) {
                try {
                    countries.push(data["location"]["Country"]);
                    ajax_load = true;
                } catch (e) {
                    console.log(e);
                }
            });
    }


    // Populating "Country of origin" select tags
    function country_selection() {
        var country_option_string = '';

        for (var i = 0; i < countries[0].length; i++) {
            country_option_string += '<option data-tokens="' + countries[0][i]["name"].toLowerCase() + '" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>';
        }

        // Populating "Country of origin" select tag at "add new principal" form
        input_country_of_origin.empty().append(country_option_string).change(function (e) {
            e.preventDefault();
        }).selectpicker('refresh');

        // // Populating "Country of origin" select tag at "Principal edit" form
        // input_country_of_origin_for_edit.empty().append(country_option_string);
    }

    // Showing populated data
    $(window).load(function () {
        json_load();
        if (ajax_load == true) {
            country_selection();
        } else {
            $.getJSON(LOCATION_URL)
                .done(function (data) {
                    try {
                        countries.push(data["location"]["Country"]);
                        country_selection();
                    } catch (e) {
                        console.log(e);
                    }
                });
        }
    });


    /* Modal viewing events */
    /*----------------------*/

    /* Principal view details modal */

    // Loading principal view details modal when clicked
    $("#principals").on('click', ".principal-details", function (e) {
        e.preventDefault();
        console.log("Caught!");

        var principal_name = $(this).closest('td').text().split('(')[0],
            principal_header = 'Details of ' + principal_name,
        // Declaring call_url based on the id of this principal
            call_url = 'principal-details.json';

        // Loading principal data for showing in the modal
        $.getJSON(call_url)
            .done(function (data) {
                // Loading the header of the modal
                $('#principal-details-header').empty().append(principal_header);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == principal_name) {
                        // Loading other data
                        $("#principal-details-email").empty().append(data[i]["email"]);
                        $("#principal-details-phone").empty().append(data[i]["phone"]);
                        $("#principal-details-fax").empty().append(data[i]["fax"]);
                        $("#principal-details-url").empty().append(data[i]["url"]);
                        $("#principal-details-address").empty().append(data[i]["address"]);
                        $("#principal-details-contact-details").empty().append(data[i]["contact_detail"]);
                        $("#principal-details-account-manager").empty().append(data[i]["account_manager"]);
                    }
                }
                // Showing the modal
                $("#principal-details-modal").modal("show");
            });// Loading principal data for showing in the modal

    });// Loading principal view details modal when clicked

    /* End of "Principal view details modal" event */

    /* View country-of-operations modal */

    // Loading country of operation modal based on port when clicked
    $("#principals").on('click', ".country-of-operation", function (e) {
        e.preventDefault();

        var port_id = $(this).data('id');

        var call_url = 'port-details.json';


        $.getJSON(call_url)
            .done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    console.log(port_id);
                    console.log(data[i].id);
                    if (data[i].id == port_id) {
                        $("#operating-countries-header").empty().append("Details of " + data[i]["name"]);
                        $("#port-details-phone").empty().append(data[i]["phone"]);
                        $("#port-details-email").empty().append(data[i]["email"]);
                        $("#port-details-fax").empty().append(data[i]["fax"]);
                        $("#port-details-address").empty().append(data[i]["address"]);
                        $("#port-details-otherinfo").empty().append(data[i]["other_information"]);
                    }
                }

                // Showing port details modal
                $("#operating-countries-modal").modal("show");
            });

    });// Loading country of operation modal based on port when clicked

    /* End of "country of operation modal" event */

    /* Edit principal details modal */

    // Showing edit principal details modal when clicked
    $("#principals").on('click', ".edit", function (e) {
        e.preventDefault();

        var principal_name = $(this).closest('tr').find('td:nth-child(1)').text().split('(')[0],
            port_ids = $(this).data("coverage").split(','),
            call_url = 'principal-details.json';

        $.getJSON(call_url)
            .done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == principal_name) {
                        $('#edit-principal-details-header').empty().append('Edit details of ' + principal_name);
                        $("input#principal-name-edit").empty().val(principal_name);
                        $("input#short-name-edit").empty().val(data[i]["short_name"]);

                        //Country-of-origin
                        json_load();
                        var country_option_string = '',
                            selected_val = data[i]["country_of_origin"];
                        for (var i = 0; i < countries[0].length; i++) {
                            country_option_string += '<option data-tokens="' + countries[0][i]["name"].toLowerCase() + '" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>';
                        }
                        input_country_of_origin_for_edit.append(country_option_string).change(function (e) {
                            e.preventDefault();
                        }).selectpicker('refresh');
                        // input_country_of_origin_for_edit.selectpicker('val', selected_val);

                        // Declaring url to get the data related to the country of operations
                        var country_of_operation_json_url = "country-of-operation.json";

                        // Getting data related to the country of operations
                        $.getJSON(country_of_operation_json_url)
                            .done(function (data) {
                                var options = '';
                                for (var i = 0; i < data.length; i++) {
                                    var a = 1;
                                    for (var j = 0; j < port_ids.length; j++) {
                                        // Appending "selected" attribute to the values (port-ids) which are already selected
                                        if (port_ids[j] == data[i]["id"]) {
                                            console.log(port_ids[j]);
                                            options += '<option value="' + data[i]["id"] + '" selected="selected">' + data[i]["port_iso"] + '</option>';
                                            a = 0;
                                        }
                                    }
                                    if (a == 1) {
                                        options += '<option value="' + data[i]["id"] + '">' + data[i]["port_iso"] + '</option>';
                                    }
                                }
                                $("select#country-of-operation-edit").empty().append(options);
                                // Loading Country of operating dual-box field
                                $("#country-of-operation-edit").DualListBox();
                            });

                        $("input#phone-edit").empty().val(data[i]["phone"]);
                        $("input#email-edit").empty().val(data[i]["email"]);
                        $("input#fax-edit").empty().val(data[i]["fax"]);
                        $("input#url-edit").empty().val(data[i]["url"]);
                        $("textarea#address-edit").empty().val(data[i]["address"]);
                        $("textarea#contact-details-edit").empty().val(data[i]["contact_detail"]);
                        $("input#account-manager-edit").empty().val(data[i]["account_manager"]);
                    }
                }
            });

        // Showing the edit-principal modal
        $("#edit-principal-modal").modal("show");

    });  // End of the edit-principal modal loading code segment

});