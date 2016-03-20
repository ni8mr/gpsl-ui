(function() {
  var url = "dummy.json",
    countries = [],
    divisions = [],
    districts = [],
    subdistricts = [],
    input_country =$('#country');
    input_division = $('#division');
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
                  
                }
            }

            input_division.empty().append(division_option_string).change(function () {
                var selected_division = $(this).val();
                console.log(selected_division);
            }).selectpicker('refresh');


        }).selectpicker('refresh');

      });
})();
