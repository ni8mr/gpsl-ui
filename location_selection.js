var ajax_load = false,
    countries = [],
    divisions = [],
    districts = [],
    input_country0 = $("#country0"),
    input_country1 = $("#country1"),
    input_country2 = $("#country2"),
    input_division0 = $("#division0"),
    input_division1 = $("#division1"),
    input_district0 = $("#district0");


var LOCATION_URL = 'dummy.json';



/* Loading Json for forms */

function json_load() {
    $.getJSON(LOCATION_URL)
        .done(function (data) {
            try{
                countries.push(data["location"]["Country"]);
                divisions.push(data["location"]["Divisions"]);
                districts.push(data["location"]["Districts"]);
                ajax_load = true;
            }catch(e){
                console.log(e);
            }
        });
}


/* generating options string for option population */

function select_options_string(array, selected){
    var option_string = " ";

    if(array == "countries"){
        for(var i=0; i<countries[0].length; i++){
            option_string += '<option data-tokens="' + countries[0][i]["name"].toLowerCase() +'" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>';
        }
    }else if(array == "divisions"){
        for(var i=0; i<countries[0].length; i++){
            if(countries[0][i]["id"] == selected){
                related_divisions = countries[0][i]["divisions"];


                for(var j=0; j<related_divisions.length; j++){
                    for(var k=0; k<divisions[0].length; k++){
                        if(related_divisions[j] == divisions[0][k]["id"]){
                            option_string += '<option data-tokens="' + divisions[0][k]["name"].toLowerCase() +'" value="' + divisions[0][k]["id"] + '">' + divisions[0][k]["name"] + '</option>';
                        }
                    }
                }
            }
        }
    }else if(array == "districts"){
        for(var i=0; i<divisions[0].length; i++){
            if(divisions[0][i]["id"] == selected){
                related_districts = divisions[0][i]["districts"];

                for(var j=0; j<related_districts.length; j++){
                    for(var k=0; k<districts[0].length; k++){
                        if(related_districts[j]== districts[0][k]["id"]){
                              option_string += '<option data-tokens="' + districts[0][k]["name"].toLowerCase() +'" value="' + districts[0][k]["id"] + '">' + districts[0][k]["name"] + '</option>';
                        }
                    }
                }
            }
        }
    }

    return option_string;

}


/* populating options based on selection  */

function on_selection(){

    /* Country selection event for division form */
    var country_option_string = select_options_string('countries', ' ');

    input_country0.empty().append(country_option_string).change(function(e){
      e.preventDefault();

    }).selectpicker('refresh');


    /* Country selection event for district form */
    input_country1.empty().append(country_option_string).change(function(e){
      e.preventDefault();

      var selected_country = $(this).val();

      /* Populating divisions based on country selection */

      var division_option_string = select_options_string('divisions', selected_country);

      input_division0.empty().append(division_option_string).change(function(e){
        e.preventDefault();

      }).selectpicker('refresh');
    }).selectpicker('refresh');


    /* Country selection event for subdistrict form */

    input_country2.empty().append(country_option_string).change(function(e){
      e.preventDefault();

      var selected_country = $(this).val();

      /* Populating divisions based on country selection */

      var division_option_string = select_options_string('divisions', selected_country);

      input_division1.empty().append(division_option_string).change(function(e){
        e.preventDefault();

        var selected_division = $(this).val();

        /* Populating districts based on division selection */

        var district_option_string = select_options_string('districts', selected_division);

        input_district0.empty().append(district_option_string).change(function(e){
            e.preventDefault();
        }).selectpicker('refresh');

      }).selectpicker('refresh');
    }).selectpicker('refresh');
}


/*  Generating form */

function form_generation(){
    var input_location = $("#location");
    on_selection();


    input_location.change(function(e){
        e.preventDefault();
        var selected_location = $(this).val();

        if(selected_location == 'country'){
            $('#depot-submit-form').each(function(){
                $('div').each(function(){
                    if($(this).hasClass('country')){
                        $(this).show();
                    }else if($(this).hasClass('division') || $(this).hasClass('district') || $(this).hasClass('subdistrict')){
                        $(this).hide();
                    }
                });
            });
        }else if(selected_location == 'division'){
            $('#depot-submit-form').each(function(){
                $('div').each(function(){
                    if($(this).hasClass('division')){
                        $(this).show();
                    }else if($(this).hasClass('country') || $(this).hasClass('district') || $(this).hasClass('subdistrict')){
                        $(this).hide();
                    }
                });
            });
        }else if(selected_location == 'district'){
            $('#depot-submit-form').each(function(){
                $('div').each(function(){
                    if($(this).hasClass('district')){
                        $(this).show();
                    }else if($(this).hasClass('country') || $(this).hasClass('division') || $(this).hasClass('subdistrict')){
                        $(this).hide();
                    }
                });
            });
        }else if(selected_location == 'subdistrict'){
            $('#depot-submit-form').each(function(){
                $('div').each(function(){
                    if($(this).hasClass('subdistrict')){
                        $(this).show();
                    }else if($(this).hasClass('country') || $(this).hasClass('division') || $(this).hasClass('district')){
                        $(this).hide();
                    }
                });
            });
        }
       });
}

$(window).load(function(){
    $('form').click(function(){
        json_load();
        if(ajax_load == true){
            form_generation();
        }else{
            $.getJSON(LOCATION_URL)
            .done(function (data) {
                try{
                    countries.push(data["location"]["Country"]);
                    divisions.push(data["location"]["Divisions"]);
                    districts.push(data["location"]["Districts"]);
                    form_generation();
                }catch(e){
                    console.log(e);
                }
            });
        }
    });
});


/*Trying to reduce the form_generation code, but it is failing */

// function form_generation(location_type){
//     var input_location = $("#location"),
//         location_type_arr = ['country','division','district','subdistrict'];
//
//     if(location_type == 'country'){
//         var removed = location_type_arr.splice(location_type_arr.indexOf('country'),1);
//     }else if(location_type == 'division'){
//         location_type_arr.splice(location_type_arr.indexOf('division'),1);
//     }else if(location_type == 'district'){
//         location_type_arr.splice(location_type_arr.indexOf('district'),1);
//     }else if(location_type == 'subdistrict'){
//         location_type_arr.splice(location_type_arr.indexOf('subdistrict'),1);
//     }
//
//
//     input_location.change(function(e){
//         e.preventDefault();
//         $('#depot-submit-form').each(function(){
//             $('div').each(function(){
//                 if($(this).hasClass(location_type)){
//                     $(this).show();
//                 }else if($(this).hasClass(location_type_arr[0]) || $(this).hasClass(location_type_arr[1]) || $(this).hasClass(location_type_arr[2])){
//                     $(this).hide();
//                 }
//             });
//         });
//     })
// }
//
//
// $(window).load(function(){
//     $('form').click(function(){
//         if($(this).val() == 'country'){
//             form_generation('country');
//         }else if($(this).val() == 'division'){
//             form_generation('division');
//         }else if($(this).val() == 'district'){
//             form_generation('district');
//         }else if($(this).val() == 'subdistrict'){
//             form_generation('subdistrict');
//         }
//     });
// });
