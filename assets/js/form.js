$(document).ready(function(){
	//if user clicks cancel it resets any data entered


	$("#cancel").on("click",function(){
		event.preventDefault();
		// $(this).parent().find("input").val('');
		$("#getName").val('');
        $("#searchButton").show();
        $("#cancelBtn").hide();
        $("#lookup").empty();
        $("#forminfo").trigger("reset");
        disableform();
	})

	$("#addStock").on("click",function(){
		event.preventDefault();
		//input information from form
		var user ="";
		var symbol = $("#symbol").val();
		var name = $("#stockName").val();
		var trans = $('input[name=transaction]:checked').val();
		var shares = $("#sharesPurchased").val().trim();
		var date = $("#datepicker").val();
		var price = parseFloat($("#pricePaid").val().trim());
		var ext = price * shares;
		$("#forminfo").trigger("reset");
		$("#addinfo").trigger("reset");
		$('#modall').modal('toggle');

		//Console Log
		console.log("Symbol: "+symbol);
		console.log("name: "+name);
		console.log("Shares: "+shares);
		console.log("Price: "+price);
		console.log("date: "+date);
		console.log("trans: "+trans);
		console.log("user " +user);
		console.log("ext " + ext);
		// push to firebase

		console.log(tickerList)
      	database.ref().push({
	        user: user,
	        symbol: symbol,
	        name: name,
	        trans: trans,
	        shares: shares,
	        date: date,
	        price: price,
	        ext: ext,
	        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

	})

})

