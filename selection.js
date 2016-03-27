(function() {
  var url = "dummy.json",
    countries = [],
    divisions = [],
    districts = [],
    subdistricts = [],
    input_country = $("#country");
    input_division = $("#division");
    input_district = $("#district");
    input_subdristrict = $("#subdistrict");
    input_postcode = $("#post-code");
  $.getJSON(url)
    .done(function( data ) {
        countries.push(data["Location"]["Country"]);
        divisions.push(data["Location"]["Divisions"]);
        districts.push(data["Location"]["Districts"]);
        subdistricts.push(data["Location"]["Subdistricts"]);

        var country_option_string = '';

        for(var i=0; i<countries[0].length; i++){
            country_option_string += '<option data-tokens="' + countries[0][i]["name"].toLowerCase() +'" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>';
        }

        /* Country selection event */

        input_country.empty().append(country_option_string).change(function(e){
            e.preventDefault();
            var selected_country = $(this).val();

            var division_option_string = '';


            for(var i=0; i<countries[0].length; i++){
                if(countries[0][i]["id"] == selected_country){
                  related_divisions = countries[0][i]["divisions"];
                    

                  for(var j=0; j<related_divisions.length; j++){
                      for(var k=0; k<divisions[0].length; k++){
                          if(related_divisions[j] == divisions[0][k]["id"]){
                              division_option_string += '<option data-tokens="' + divisions[0][k]["name"].toLowerCase() +'" value="' + divisions[0][k]["id"] + '">' + divisions[0][k]["name"] + '</option>';
                          }
                      }
                  }
                }
            }

            /* Division selection event */

            input_division.empty().append(division_option_string).change(function (e) {
                e.preventDefault();
                var selected_division = $(this).val();

                var district_option_string = '';

                for(var i=0; i<divisions[0].length; i++){
                  if(divisions[0][i]["id"] == selected_division){
                    related_districts = divisions[0][i]["districts"];

                    for(var j=0; j<related_districts.length; j++){
                      for(var k=0; k<districts[0].length; k++){
                        if(related_districts[j]== districts[0][k]["id"]){
                              district_option_string += '<option data-tokens="' + districts[0][k]["name"].toLowerCase() +'" value="' + districts[0][k]["id"] + '">' + districts[0][k]["name"] + '</option>';
                        }
                      }
                    }
                  }
                }


                /* District selection event */

                input_district.empty().append(district_option_string).change(function(e){
                    e.preventDefault();
                    var selected_district = $(this).val();

                    var subdistrict_option_string = '';

                    for(var i=0; i<districts[0].length; i++){
                      if(districts[0][i]["id"] == selected_district){
                        related_subdistricts = districts[0][i]["subdistricts"];

                        for(var j=0; j<related_subdistricts.length; j++){
                          for(var k=0; k<subdistricts[0].length; k++){
                            if(related_subdistricts[j]== subdistricts[0][k]["id"]){
                              subdistrict_option_string += '<option data-tokens="' + subdistricts[0][k]["name"].toLowerCase() +'" value="' + subdistricts[0][k]["id"] + '">' + subdistricts[0][k]["name"] + '</option>';
                            }
                          }
                        }
                      }
                    }



                    /* subDistrict selection event */

                    input_subdristrict.empty().append(subdistrict_option_string).change(function(e){
                        e.preventDefault();
                        var selected_subdistrict = $(this).val();

                        var post_codes_options_string = '';

                        for(var i=0; i<subdistricts[0].length; i++){
                          if(subdistricts[0][i]["id"] == selected_subdistrict){
                            related_postcodes = subdistricts[0][i]["postcodes"];

                            for(var j=0; j<related_postcodes.length; j++){
                              post_codes_options_string += '<option data-tokens="' + related_postcodes[j] + 'a' +'" value="' + j + '">' + related_postcodes[j] + '</option>';
                            }
                          }
                        }

                        /* Post Code selection event */

                        input_postcode.empty().append(post_codes_options_string).change(function(e){
                            e.preventDefault();
                            // Catching selected post codes, if it is needed
                            var selected_post_codes = $(this).val();

                        }).selectpicker('refresh');

                    }).selectpicker('refresh');

                }).selectpicker('refresh');

            }).selectpicker('refresh');

        }).selectpicker('refresh');

      });
})();
