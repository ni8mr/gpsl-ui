
(function() {
  var url = "dummy.json";
    countries = [];
    divisions = [];
    districts = [];
    subdistricts = [];
  $.getJSON(url)
    .done(function( data ) {
      countries.push(data['Country']);
      divisions.push(data['Divisions']);
      districts.push(data['Districts']);
      subdistricts.push(data['Subdistricts']);
       $('#country').empty();
        for(var i=0; i<countries[0].length; i++){
            // console.log(countries[0][i]["name"]);
            console.log(countries[0][i]["id"]);
            // var cc = $('#country');
            $('#country').append('<option data-tokens="' + countries[0][i]["name"] +'" value="' + i + '">' + countries[0][i]["name"] + '</option>');
        };
        $('#country').change(function(){
                var selected = $( this ).val();
                console.log(selected);
            });
      });
})();

              //  $.getJSON(url)
              //  .done(function( data ) {
              //      var JSON = [];
              //       for (var i in data){
              //         JSON.push(data[i]);
              //       }
              //      //console.log(JSON);
              //      // for (i=0; i<JSON.length; i++){
              //      //     $('#select-district').empty();
              //      //
              //      // }
              //
              //       $('#select-district').empty();
              //       $.each(data, function(key, value) {
              //         if(key == "Districts"){
              //
              //           $('#select-district').append('<option value=' + data["Districts"].id + '>' + data["Districts"].name + '</option>');
              //
              //             // $("#select-district").change(function() {
              //             //     var selected = $( this ).val();
              //             //     $.each(data, function(key, value) {
              //             //       if(key == "Districts"){
              //             //         if(data["Districts"].id == selected){
              //             //           subDistricts = data["Districts"].Subdistricts;
              //             //           for(i =0; i<subDistricts.length; i++){
              //             //             $.each(data, function(key, value) {
              //             //                 if(key == "Subdistricts"){
              //             //                 if(data["Subdistricts"].id == subDistricts[i]){
              //             //                     $('#select-thana').append('<option value=' + data["Subdistricts"].id + '>' + data["Subdistricts"].name + '</option>');
              //             //                     $("#select-thana").change(function() {
              //             //                       var selectedThana = $( this ).val();
              //             //                         $.each(data, function(key, value) {
              //             //                           if(key == "Districts"){
              //             //                             if(data["Districts"].id == selected){
              //             //                               subDistricts = data["Districts"].Subdistricts;
              //             //                               for(i =0; i<subDistricts.length; i++){
              //             //                                 $.each(data, function(key, value) {
              //             //                                   if(key == "Subdistricts"){
              //             //                                     for(i =0; i< data["Subdistricts"].Postcodes.length; i++ ){
              //             //                                         $('#select-post-code').append('<option value=' + i + '>' + data["Subdistricts"].Postcodes[i] + '</option>');
              //             //                                     }
              //             //                          }
              //             //                       });
              //             //                     }
              //             //                   }
              //             //                 }
              //             //               });
              //             //                     });
              //             //
              //             //               // var selected = document.getElementById("select-thana")
              //             //               //
              //             //               // var selectedThana = selected.options[selected.selectedIndex].value;
              //             //
              //             //
              //             //             }
              //             //           }
              //             //         });
              //             //       }
              //             //     }
              //               }
              //           //});
              //             //});
              //
              //           // var selected = document.getElementById("select-district"); // Use jquery selector
              //           //
              //           // var selectedDistrict = selected.options[selected.selectedIndex].value;
              //
              //
              //         //}
              //       });
              //   });
              // })();
