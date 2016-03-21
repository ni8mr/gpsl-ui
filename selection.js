(function() {
  var url = "dummy.json",
    countries = [],
    divisions = [],
    districts = [],
    subdistricts = [],
    input_country =$('#country');
    input_division = $('#division');
    input_district = $('#district');
  $.getJSON(url)
    .done(function( data ) {
        countries.push(data['Country']);
        divisions.push(data['Divisions']);
        districts.push(data['Districts']);
        subdistricts.push(data['Subdistricts']);

        var country_option_string = '';

        for(var i=0; i<countries[0].length; i++){
            country_option_string += '<option data-tokens="' + countries[0][i]["name"].toLowerCase() +'" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>';
        }

        input_country.empty().append(country_option_string).change(function(){
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

            input_division.empty().append(division_option_string).change(function () {
                var selected_division = $(this).val();

                console.log(selected_division);

                var district_option_string = '';

                for(var i=0; i<divisions[0].length; i++){
                  if(divisions[0][i]["id"] == selected_division){
                    related_districts = divisions[0][i]["districts"];

                    console.log(related_districts);

                    for(var j=0; j<related_districts.length; j++){
                      for(var k=0; k<districts[0].length; k++){
                          if(related_districts[j] == districts[0][k]["id"]){
                              district_option_string += '<option data-tokens="' + districts[0][k]["name"].toLowerCase() +'" value="' + districts[0][k]["id"] + '">' + districts[0][k]["name"] + '</option>';
                          }
                      }
                    }
                  }
                }

                input_district.empty().append(district_option_string).change(function(){
                    var selected_district = $(this).val();

                    console.log(selected_district);
                }).selectpicker('refresh');



            }).selectpicker('refresh');

        }).selectpicker('refresh');

      });
})();
