$(document).ready(function () {

    /* Events */

    $("#ports").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3]
                }
            },
            {
                extend: 'pdfHtml5',
                exportOptions: {
                    columns: [0, 1, 2, 3]
                },
                pageSize: 'LEGAL'
            },
            {
                extend: 'print',
                exportOptions: {
                    columns: [0, 1, 2, 3]
                },
                title: 'List of ports'
            }
        ]
    });


    // Changing titles for better header of generated pdfs
    $('title').append('\nList of ports');

    /* Modal viewing events */

    // Port details modal viewing events
    $("#ports").on("click", ".port-details", function (e) {
        e.preventDefault();

        var port_name = $(this).closest('td').text().split('(')[0];

        var port_header = 'Details of ' + port_name + ' port',
            call_url = PORT_DETAILS_URL;


        $.getJSON(call_url)
            .done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == port_name) {
                        $("#portdetailsheader").empty().append(port_header);
                        $("#portdetails-phone").empty().append(data[i]["phone"]);
                        $("#portdetails-email").empty().append(data[i]["email"]);
                        $("#portdetails-fax").empty().append(data[i]["fax"]);
                        $("#portdetails-address").empty().append(data[i]["address"]);
                        $("#portdetails-otherinfo").empty().append(data[i]["other_information"]);
                    }
                }

                // Showing port details modal
                $("#portdetailsmodal").modal("show");
            });

    });// Port details modal viewing events

    // Port edit modal viewing events
    $("#ports").on("click", ".edit", function (e) {
        e.preventDefault();

        var port_name = $(this).closest('tr').find('td:nth-child(1)').text().split('(')[0];

        var call_url = '../json/port-details.json';


        $.getJSON(call_url)
            .done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].name == port_name) {
                        $("#name_edit").empty().val(port_name);
                        $("#phone_edit").empty().val(data[i]["phone"]);
                        $("#email_edit").empty().val(data[i]["email"]);
                        $("#fax_edit").empty().val(data[i]["fax"]);
                        $("#address_edit").empty().val(data[i]["address"]);
                        $("#other_info_edit").empty().val(data[i]["other_information"]);
                    }
                }
            });
        // Showing port edit modal
        $("#editmodal").modal("show");
    });// Port edit modal viewing events

    /* Location selection codes */
    var ajax_load = false,
        countries = [],
        divisions = [],
        districts = [],
        input_country = $("#country"),
        input_division = $("#division"),
        input_district = $("#district");


    var LOCATION_URL = '../json/dummy.json';


    /* Loading Json for forms */

    function json_load() {
        $.getJSON(LOCATION_URL)
            .done(function (data) {
                try {
                    countries.push(data["location"]["Country"]);
                    divisions.push(data["location"]["Divisions"]);
                    districts.push(data["location"]["Districts"]);
                    ajax_load = true;
                } catch (e) {
                    console.log(e);
                }
            });
    }


    /* generating options string for option population */

    function select_options_string(array, selected) {
        var option_string = " ";

        if (array == "countries") {
            for (var i = 0; i < countries[0].length; i++) {
                option_string += '<option data-tokens="' + countries[0][i]["name"].toLowerCase() + '" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>';
            }
        } else if (array == "divisions") {
            for (var i = 0; i < countries[0].length; i++) {
                if (countries[0][i]["id"] == selected) {
                    related_divisions = countries[0][i]["divisions"];


                    for (var j = 0; j < related_divisions.length; j++) {
                        for (var k = 0; k < divisions[0].length; k++) {
                            if (related_divisions[j] == divisions[0][k]["id"]) {
                                option_string += '<option data-tokens="' + divisions[0][k]["name"].toLowerCase() + '" value="' + divisions[0][k]["id"] + '">' + divisions[0][k]["name"] + '</option>';
                            }
                        }
                    }
                }
            }
        } else if (array == "districts") {
            for (var i = 0; i < divisions[0].length; i++) {
                if (divisions[0][i]["id"] == selected) {
                    related_districts = divisions[0][i]["districts"];

                    for (var j = 0; j < related_districts.length; j++) {
                        for (var k = 0; k < districts[0].length; k++) {
                            if (related_districts[j] == districts[0][k]["id"]) {
                                option_string += '<option data-tokens="' + districts[0][k]["name"].toLowerCase() + '" value="' + districts[0][k]["id"] + '">' + districts[0][k]["name"] + '</option>';
                            }
                        }
                    }
                }
            }
        }

        return option_string;

    }

    /* populating options based on selection  */

    function on_selection() {

        /* Country selection event for division form */
        var country_option_string = select_options_string('countries', ' ');

        /* Country selection event for subdistrict form */

        input_country.empty().append(country_option_string).change(function (e) {
            e.preventDefault();

            var selected_country = $(this).val();

            /* Populating divisions based on country selection */

            var division_option_string = select_options_string('divisions', selected_country);

            input_division.empty().append(division_option_string).change(function (e) {
                e.preventDefault();

                var selected_division = $(this).val();

                /* Populating districts based on division selection */

                var district_option_string = select_options_string('districts', selected_division);

                input_district.empty().append(district_option_string).change(function (e) {
                    e.preventDefault();

                }).selectpicker('refresh');
            }).selectpicker('refresh');
        }).selectpicker('refresh');

    }

    //Firing events
    json_load();
    if (ajax_load == true) {
        form_generation();
    } else {
        $.getJSON(LOCATION_URL)
            .done(function (data) {
                try {
                    countries.push(data["location"]["Country"]);
                    divisions.push(data["location"]["Divisions"]);
                    districts.push(data["location"]["Districts"]);
                    on_selection();
                } catch (e) {
                    console.log(e);
                }
            });
    }


});


