"use strict";

function getGameList() {
	var gameList = [];
	$.ajaxSetup({
		async: false
	});
	$.getJSON("data/games.json", function(data) {
		for(var game in data.games) {
			$.getJSON("data/games/" + data.games[game] + ".json", function(data) {
				gameList.push(data);
			});
		}
	});
	console.log("Got game list, size: " + gameList.length);
	return gameList;
}

$(document).ready(function() {

	$(".nav-item").click(function() {
		// reset all nav items
		$(".nav-item").removeClass("active");
		// set clicked nav-item to active
		$(this).addClass("active");
		$("#myCarousel").carousel($(this).index());
	});

	var table = $(".row");
	var gameList = getGameList();
	for(var game in gameList) {
		console.log(gameList[game].name);
		table.append("<div class='game-cell col-md-3 thumb'>" +
					 	"<div class='row'>" +
					 		"<div class='col-xs-6'>" +
								"<img class='game-img img-responsive' src='img/" + gameList[game].img + "'/>" +
							"</div>" +
							"<div class='col-xs-6'>" +
								"<p class='lead'>" + gameList[game].name + "</p>" +
								"<p class='text-left'><strong>Devs:</strong> " + gameList[game].devs + "</p>" +
								"<p class='text-left'><strong>Event:</strong> " + gameList[game].event + "</p>" +
								"<div class='row'>" +
									"<div class='col-xs-6'>" +
										"<a href='" + gameList[game].download + "'>" +
											"<img class='img-responsive' src='img/github.png'/>" +
										"</a>" +
									"</div>" +
									"<div class='col-xs-6'>" +
										"<a href='" + gameList[game].src + "'>" +
											"<img class='img-responsive' src='img/download.png'/>" +
										"</a>" +
									"</div>" +
							"</div>" +
						"</div>" +
					 "</div>");
	}

});
