$(document).ready(function() {
//var nameSearch = 'american';
    function resetform(){
        $(this).parent().find("input").val('');
        $("#searchButton").show();
        $("#cancelBtn").hide();
        $("#lookup").empty();
        $("#addinfo").find('input:text').val('');
        $("#forminfo").trigger("reset");
        disableform();
    }
    function disableform(){
        $("#forminfo").trigger("reset");
        $("#addinfo input").attr("disabled", "disabled");
        $("#btn button").attr("disabled", "disabled");
        $("#cancelBtn").hide();
    }    
    function symbolSearch(nameSearch) {
        lookupResults = "";
        
        var symbolUrl = "http://dev.markitondemand.com/Api/v2/Lookup/jsonp";
        // var symbolUrl = "https://dev.markitondemand.com/Api/v2/Lookup/jsonp";
        symbolUrl += '?' + $.param({
            'input': nameSearch
        });
        $.ajax({
            // crossDomain: true,
            method: "GET",
            contentType: "application/json; charset=utf-8",
            async: false,
            url: symbolUrl,
            dataType: "jsonp"
        }).done(function(lookupData) {
            $("#lookup").empty();
            opt = $("<select>");
            opt.attr("id","lookupID")
            opt.attr("class","form-control");
            $('#lookup').append(opt);

            opt = $('<option>');
            opt.attr('value',"");
            opt.text("Make your selection");
            $('#lookupID').append(opt);

            for(i=0; i < lookupData.length; i++) {
              opt = $('<option>');
              opt.attr('value',lookupData[i].Symbol);
              opt.text(lookupData[i].Name + '-' + lookupData[i].Exchange);
              $('#lookupID').append(opt);
            }
            //Seclection of item, make form available and add the symbol and name to form
            $('#lookupID').change(function(event){
                $("#cancelBtn").show();
                $("#searchButton").hide();
                var optionText = $("#lookupID option:selected").text();
                $('#getName').append(optionText);  //add to search box
                $("#getName").val(optionText);
                $('#addinfo input').prop("disabled", false);
                $("#btn button").prop("disabled", false);
                $("#symbol").val($('#lookupID').val());
                $("#stockName").val(optionText.split('-')[0]);
                $("#lookup").empty();
            })
             // if user click on the search reset icon, clear text field
                $("#cancelBtn").click(function(){
                    $(this).parent().find("input").val('');
                    $("#searchButton").show();
                    $("#cancelBtn").hide();
                    $("#lookup").empty();
                    $("#forminfo").trigger("reset");
                    disableform();
                });
         
        }).fail(function(err) {
            console.log(err)
            throw err;
        });
    }
     //Search onClick
        disableform();
        $("#searchButton").on("click", function(event) {
            event.preventDefault();
            nameSearch = $("#getName").val().trim();
            symbolSearch(nameSearch);
        })
        
});
