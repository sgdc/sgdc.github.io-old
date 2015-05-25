"use strict";

var gameList;

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

	var table = $(".rig");
	gameList = getGameList();
	$.get('mustache/gamebox.mustache.html', function(template){
		Mustache.parse(template);
		for(var i = 0; i < gameList.length; i++) {
			gameList[i].idx = i; // set idx of game in game list
			table.append(Mustache.render(template, gameList[i]));
		}
	});

	// on click for game boxes on catalog page
	$(".game-box").click(function() {
		var game = gameList[parseInt($(this).attr("data-id"))];
		$.get('mustache/game.mustache.html', function(template){
			$(".modal-title").text(game.name);
			$(".modal-body").html(Mustache.render(template, game));
			if(game.download) {
				$("#play-btn").removeClass('hide', false);
				$("#play-btn").attr("href", game.download);
			}
			else {
				$("#play-btn").addClass('hide', true);
			}
			if(game.src) {
				$("#src-btn").removeClass('hide', false);
				$("#src-btn").attr("href", game.src);
			}
			else {
				$("#src-btn").addClass('hide', true);
			}
		});
	});

});
