
    (function() {
               var url = "dummy.json";

               $.getJSON(url)
               .done(function( data ) {
                   var JSON = [];
                    for (var i in data){
                      JSON.push(data[i]);
                    }
                   //console.log(JSON);
                   // for (i=0; i<JSON.length; i++){
                   //     $('#select-district').empty();
                   //
                   // }
                    $('#select-district').empty();
                    $.each(data, function(key, value) {
                      if(key == "Districts"){

                        $('#select-district').append('<option value=' + data["Districts"].id + '>' + data["Districts"].name + '</option>');

                          $("#select-district").change(function() {
                              var selected = $('#select-district option:selected').key();
                          });

                        // var selected = document.getElementById("select-district"); // Use jquery selector
                        //
                        // var selectedDistrict = selected.options[selected.selectedIndex].value;

                        $.each(data, function(key, value) {
                            if(key == "Districts"){
                              if(data["Districts"].id == selected){
                                subDistricts = data["Districts"].Subdistricts;
                                for(i =0; i<subDistricts.length; i++){
                                  $.each(data, function(key, value) {
                                    if(key == "Subdistricts"){
                                      if(data["Subdistricts"].id == subDistricts[i]){
                                        $('#select-thana').append('<option value=' + data["Subdistricts"].id + '>' + data["Subdistricts"].name + '</option>');

                                          $("#select-thana").change(function() {
                                              var selected = $('#select-thana option:selected').key();
                                          });

                                        // var selected = document.getElementById("select-thana")
                                        //
                                        // var selectedThana = selected.options[selected.selectedIndex].value;

                                        $.each(data, function(key, value) {
                                          if(key == "Districts"){
                                            if(data["Districts"].id == selected){
                                              subDistricts = data["Districts"].Subdistricts;
                                              for(i =0; i<subDistricts.length; i++){
                                                $.each(data, function(key, value) {
                                                  if(key == "Subdistricts"){
                                                    for(i =0; i< data["Subdistricts"].Postcodes.length; i++ ){
                                                      $('#select-post-code').append('<option value=' + i + '>' + data["Subdistricts"].Postcodes[i] + '</option>');
                                                    }
                                                  }
                                                });
                                              }
                                            }
                                          }
                                        });
                                      }
                                    }
                                  });
                                }
                              }
                            }
                        });
                      }
                    });
                });
              })();
