var location_url = "dummy.json",
    ajax_load = false,
    countries = [],
    divisions = [],
    districts = [],
    subdistricts = [],
    input_country = $("#country"),
    input_division = $("#division"),
    input_district = $("#district"),
    input_subdristrict = $("#subdistrict"),
    input_postcode = $("#post-code");




function json_load() {
        $.getJSON(location_url)
            .done(function (data) {
                // Todo - Implement Try/catch block
                try{
                    countries.push(data["Location"]["Country"]);
                    divisions.push(data["Location"]["Divisions"]);
                    districts.push(data["Location"]["Districts"]);
                    subdistricts.push(data["Location"]["Subdistricts"]);
                    ajax_load = true;
                }catch(e){
                    console.log(e);
                }
            });
    }


function select_options_string(array, selected = 0){
    var option_string = '';

    if(array == 'countries'){
        for(var i=0; i<countries[0].length; i++){
            option_string += '<option data-tokens="' + countries[0][i]["name"].toLowerCase() +'" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>';
        }
    }else{
        if(array == 'divisions'){
            var parent_array = 'countries';
        }else if(array == 'districts'){
            var parent_array = 'divisions';
        }else if(array == 'subdistricts'){
            var parent_array = 'districts';
        }

        for(var i=0; i<parent_array[0].length; i++){
            if(parent_array[0][i]["id"] == selected){
                related = parent_array[0][i][array];

                for(var j=0; j<related.length; j++){
                    for(var k=0; k<array[0].length; k++){
                        if(related[j]== array[0][k]["id"]){
                            option_string += '<option data-tokens="' + array[0][k]["name"].toLowerCase() +'" value="' + array[0][k]["id"] + '">' + array[0][k]["name"] + '</option>';
                        }
                    }
                }
            }
        }
    }

    return option_string;

}

function on_selection(){
    /* Country selection event */
    var country_option_string = select_options_string('countries');

    input_country.empty().append(country_option_string).change(function(e){
      e.preventDefault();
      var selected_country = $(this).val();

        /* Division selection event */

        var division_option_string = select_options_string('divisions', selected_district);

        input_division.empty().append(division_option_string).change(function(e){
          e.preventDefault();
          var selected_division = $(this).val();

          /* District selection event */

          var district_option_string = select_options_string('districts', selected_country);

          input_district.empty().append(district_option_string).change(function(e){
            e.preventDefault();
            var selected_district = $(this).val();



            /* Sub-division selection event */

            var subdivision_option_string = select_options_string('subdistricts', selected_division);

            input_division.empty().append(subdivision_option_string).change(function(e){
              e.preventDefault();
                var selected_subdivision = $(this).val();


              /* PostCodes selection event */

              var post_codes_options_string = select_options_string('postcodes', selected_subdivision)

              input_postcode.empty().append(post_codes_options_string).change(function(e){
                  e.preventDefault();
                  // Catching selected post codes, if it is needed
                  var selected_post_codes = $(this).val();

              }).selectpicker('refresh');

          }).selectpicker('refresh');

        }).selectpicker('refresh');

      }).selectpicker('refresh');

    }).selectpicker('refresh');
}


function validation(){

        /* Submission event */

        $("#depot-submit-form").submit(function(e){
          e.preventDefault();

          /* validating blank input fields */

          $(this).find('input').each(function(){
            if($(this).val().length == 0){
                $("<span>Field should not be empty!</span>").insertAfter($(this));
                $(this).closest(".form-group.row").addClass("has-error");
            }
          });

          /* validating blank select fields */

          $(this).find('select').each(function(){
            if($(this).val().length == 0){
              $("<span>Field should not be empty!</span>").insertAfter($(this));
                $(this).closest(".form-group.row").addClass("has-error");
            }
          });
        });
}


function form_load(){

    /* form onclick event */
    ('form').onclick(function(){
        on_selection();
        validation();
    });
}



$(window).load(function() {
    json_load();

    if (ajax_load == true) {
        form_load();
    } else {
        $.getJSON(location_url)
            .done(function (data) {
                try{
                    countries.push(data["Location"]["Country"]);
                    divisions.push(data["Location"]["Divisions"]);
                    districts.push(data["Location"]["Districts"]);
                    subdistricts.push(data["Location"]["Subdistricts"]);
                    ajax_load = true;
                }catch(e){
                    console.log(e);
                }
            });
    }
}


        //Todo - declare a function which will take country/division/districts/sub...... and do the selection event

        //Todo - List of functions - 1) onsubmit validator function, 2) on change e selection function. 3) onsubmit - ajax_submission function which will trigger if validator function returns true.


