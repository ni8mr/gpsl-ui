(function() {
  var url = "dummy.json",
    countries = [],
    divisions = [],
    districts = [],
    subdistricts = [],
    input_country =$('#country');
  $.getJSON(url)
    .done(function( data ) {
        countries.push(data['Country']);
        divisions.push(data['Divisions']);
        districts.push(data['Districts']);
        subdistricts.push(data['Subdistricts']);

        // input_country.empty();

        var option_string = '';

        for(var i=0; i<countries[0].length; i++){

            option_string += '<option data-tokens="' + countries[0][i]["name"].toLowerCase() +'" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>';
// ;            ('<option data-tokens="' + countries[0][i]["name"].toLowerCase() +'" value="' + countries[0][i]["id"] + '">' + countries[0][i]["name"] + '</option>');
        }

        console.log(option_string);
        // data-live-search="true"
        input_country.empty().append(option_string).change(function(){
            var selected = $(this).val();
            console.log(selected);
        }).selectpicker('refresh');

      });
})();
