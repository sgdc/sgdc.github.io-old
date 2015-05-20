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
	$.get('mustache/game.mustache.html', function(template){
		Mustache.parse(template);
		for(var game in gameList) {
			console.log(gameList[game].name);
			table.append(Mustache.render(template, gameList[game]));
		}
	});

});
