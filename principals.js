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
        uri: location.origin + '/api/v1/portlist/'
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

    /*---------------------------------------------------*/
    /* Loading data in the "Country of operation" fields */
    //
    // /*--------------------------------------*/
    //
    // /* Modal viewing events */
    // /*----------------------*/
    //
    // /* Principal view details modal */
    //
    // // Loading principal view details modal when clicked
    // $("#principals").on('click', ".principal-details", function (e) {
    //     e.preventDefault();
    //
    //     var id = $(this).data('principalid'),
    //         principal_name = 'Details of ' + $(this).data('principalname'),
    //     // Declaring call_url based on the id of this principal
    //         call_url = location.origin + '/api/v1/principal-details/' + id + '/';
    //
    //     // Loading principal data for showing in the modal
    //     $.getJSON(call_url)
    //         .done(function (data) {
    //             // Loading the header of the modal
    //             $('#principal-details-header').empty().append(principal_name);
    //
    //             // Loading other data
    //             $("#principal-details-email").empty().append(data["email"]);
    //             $("#principal-details-phone").empty().append(data["phone"]);
    //             $("#principal-details-fax").empty().append(data["fax"]);
    //             $("#principal-details-url").empty().append(data["url"]);
    //             $("#principal-details-address").empty().append(data["address"]);
    //             $("#principal-details-contact-details").empty().append(data["contact_detail"]);
    //             $("#principal-details-account-manager").empty().append(data["account_manager"]);
    //             // $("#principal-details-currentprice").empty().append(data["current_pricing"]);
    //
    //             // Showing the modal
    //             $("#principal-details-modal").modal("show");
    //         });// Loading principal data for showing in the modal
    //
    // });// Loading principal view details modal when clicked
    //
    // /* End of "Principal view details modal" event */
    //
    // /* View country-of-operations modal */
    //
    // // Loading country of operation modal based on port when clicked
    // $("#principals").on('click', ".country-of-operation", function (e) {
    //     e.preventDefault();
    //
    //     // Catching the port-id related to the port of the "Country of operation"
    //     var id = $(this).data('portid'),
    //
    //     // Declaring the header for the modal
    //         header = 'Details of ' + $(this).data('portname') + ' at ' + $(this).data('country'),
    //
    //     // Declaring the get request url based on the different port-id
    //         call_url = location.origin + '/api/v1/portdetail/' + id + '/';
    //
    //     // Collecting and appending data to the table from the url
    //     $.getJSON(call_url)
    //         .done(function (data) {
    //             $('#operating-countries-header').empty().append(header);
    //             $("#port-details-email").empty().append(data["email"]);
    //             $("#port-details-phone").empty().append(data["phone"]);
    //             $("#port-details-fax").empty().append(data["fax"]);
    //             $("#port-details-address").empty().append(data["address"]);
    //             $("#port-details-otherinfo").empty().append(data["other_information"]);
    //
    //             // Showing the modal after appending data
    //             $("#operating-countries-modal").modal("show");
    //         });// Collecting and appending data to the table from the url
    //
    // });// Loading country of operation modal based on port when clicked
    //
    // /* End of "country of operation modal" event */
    //
    // /* Edit principal details modal */
    //
    // // Showing edit principal details modal when clicked
    // $("#principals").on('click', ".edit-principals", function (e) {
    //     e.preventDefault();
    //
    //     // Declaring url to get the data related to the country of operations
    //     var country_of_operation_json_url = location.origin + "/api/v1/portlist/",
    //
    //     // Catching the selected port-ids from country-of-operation field for this principal
    //     // And saving them in an array
    //         port_ids = $(this).data("coverage").split(',');
    //
    //
    //     // Getting data related to the country of operations
    //     $.getJSON(country_of_operation_json_url)
    //         .done(function (data) {
    //             var options = '';
    //
    //             for (var i = 0; i < data.length; i++) {
    //                 var a = 1;
    //                 for (var j = 0; j < port_ids.length; j++) {
    //                     // Appending "selected" attribute to the values (port-ids) which are already selected
    //                     if (port_ids[j] == data[i]["id"]) {
    //                         options += '<option value="' + data[i]["id"] + '" selected="selected">' + data[i]["port_iso"] + '</option>';
    //                         a = 0;
    //                     }
    //                 }
    //                 if (a == 1) {
    //                     options += '<option value="' + data[i]["id"] + '">' + data[i]["port_iso"] + '</option>';
    //                 }
    //             }
    //
    //             $("select#country-of-operation-edit").empty().append(options);
    //
    //             // Loading Country of operating dual-box field
    //             $("#country-of-operation-edit").DualListBox();
    //
    //
    //         });
    //
    //
    //     // Loading the header of the modal
    //
    //     var edit_principal_head = 'Edit details of ' + $(this).data('principalname');
    //     $('#edit-principal-details-header').empty().append(edit_principal_head);
    //
    //     // Saving this principal id in the hidden field
    //     $("input#edit-principal-id").empty().val($(this).data("principalid"));
    //
    //
    //     // Adding values at the fields for edit
    //     $("input#principal-name-edit").empty().val($(this).data("principalname"));
    //
    //
    //     /* Adding selected value at the country of operation field */
    //     var country_of_origin = $(this).data("countryoforigin");
    //
    //     // Clearing previous selection if exists
    //     $('select#country-of-origin-edit option:selected').removeAttr('selected');
    //
    //     // Adding selected value at the field
    //     $('select#country-of-origin-edit option').filter(function () {
    //         return $(this).text() === country_of_origin;
    //     }).attr("selected", "selected");
    //
    //     // Showing selected value at the top
    //     $("select#country-of-origin-edit option:selected").prependTo("select#country-of-origin-edit");
    //
    //
    //     $("input#short-name-edit").empty().val($(this).data("shortname"));
    //     $("input#phone-edit").empty().val($(this).data("phone"));
    //     $("input#email-edit").empty().val($(this).data("email"));
    //     $("textarea#address-edit").empty().val($(this).data("address"));
    //     $("input#fax-edit").empty().val($(this).data("fax"));
    //     $("input#url-edit").empty().val($(this).data("url"));
    //     $("textarea#contact-details-edit").empty().val($(this).data("contactdetails"));
    //     $("input#account-manager-edit").empty().val($(this).data("accountmanager"));
    //
    //
    //     // Showing the edit-principal modal
    //     $("#edit-principal-modal").modal("show");
    //
    // });  // End of the edit-principal modal loading code segment

});