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

function getDevsHTML(devs) {
	var html = "";
	for(var i = 0; i < devs.length; i++) {
		html = html.concat("<p>" + devs[i] + "</p>");
	}
	return html;
}

function getLinksHTML(src, download) {
	var html = "";
	if(download !== "n/a") {
		html = html.concat("<div class='col-xs-6'>" +
			"<a href='" + download + "' target='_blank'>" +
				"<img class='img-responsive' src='img/download.png'/>" +
			"</a>" +
		"</div>");
	}
	else {
		html = html.concat("<div class='col-xs-6'></div>");
	}
	if(src !== "n/a") {
		html = html.concat("<div class='col-xs-6'>" +
			"<a href='" + src + "' target='_blank'>" +
				"<img class='img-responsive' src='img/github.png'/>" +
			"</a>" +
		"</div>");
	}
	else {
		html = html.concat("<div class='col-xs-6'></div>");
	}
	return html;
}

function getGameHTML(game) {
	var html = "";
	html = html.concat("<div class='game-cell col-md-3 thumb'>" +
					"<div class='row'>" +
						"<div class='col-xs-6'>" +
							"<img class='game-img img-responsive' src='img/" + game.img + "'/>" +
						"</div>" +
						"<div class='col-xs-6'>" +
							"<p class='h4'>" + game.name + "</p>" +
							"<p><strong>Devs</strong></p>" +
							getDevsHTML(game.devs) +
							"<p><strong>Event</strong></p>" +
							"<p>" + game.event + "</p>" +
							"<div class='row'>" +
							getLinksHTML(game.src, game.download) +
						"</div>" +
					"</div>" +
				 "</div>");
	return html;
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
		table.append(getGameHTML(gameList[game]));
	}

});
