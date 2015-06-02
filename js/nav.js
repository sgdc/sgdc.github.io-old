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

function getMemberList() {
	var memberList = {
		eboard: {},
		minor_eboard: {},
		general_members: []
	};
	$.ajaxSetup({
		async: false
	});
	// get member list
	$.getJSON("data/members.json", function(data) {
		// get president
		$.getJSON("data/members/" + data.eboard.president + ".json", function(member) {
			memberList.eboard.president = member;
		});
		// get vice president
		$.getJSON("data/members/" + data.eboard.vice_president + ".json", function(member) {
			memberList.eboard.vice_president = member;
		});
		// get treasurer
		$.getJSON("data/members/" + data.eboard.treasurer + ".json", function(member) {
			memberList.eboard.treasurer = member;
		});
		// get secretary
		$.getJSON("data/members/" + data.eboard.secretary + ".json", function(member) {
			memberList.eboard.secretary = member;
		});
		// get alumni rep
		$.getJSON("data/members/" + data.minor_eboard.alumni_rep + ".json", function(member) {
			memberList.minor_eboard.alumni_rep = member;
		});
		// get cabinet manager
		$.getJSON("data/members/" + data.minor_eboard.cabinet_man + ".json", function(member) {
			memberList.minor_eboard.cabinet_man = member;
		});
		// get general members
		for(var i = 0; i < data.general_members.length; i++) {
			$.getJSON("data/members/" + data.general_members[i] + ".json", function(data) {
				memberList.general_members.push(data);
			});
		}
	});
	return memberList;
}

$(document).ready(function() {

	// nav bar functionality
	$(".nav-item").click(function() {
		// reset all nav items
		$(".nav-item").removeClass("active");
		// set clicked nav-item to active
		$(this).addClass("active");
		$("#myCarousel").carousel($(this).index());
	});

	// populate game catalog based on JSON data
	var gameTable = $("#catalogSlide");
	gameList = getGameList();
	$.get('mustache/gamebox.mustache.html', function(template){
		Mustache.parse(template);
		for(var i = 0; i < gameList.length; i++) {
			gameList[i].idx = i; // set idx of game in game list
			gameTable.append(Mustache.render(template, gameList[i]));
		}
	});

	// populate member page based on JSON data
	var generalMembersSection = $("#general_members");
	var presidentSection = $("#president");
	var vicePresidentSection = $("#vice_president");
	var treasurerSection = $("#treasurer");
	var secretarySection = $("#secretary");
	var alumniRepSection = $("#alumni_rep");
	var cabinetManagerSection = $("#cabinet_man");
	var memberList = getMemberList();
	$.get('mustache/member.mustache.html', function(template){
		Mustache.parse(template);
		presidentSection.append(Mustache.render(template, memberList.eboard.president));
		vicePresidentSection.append(Mustache.render(template, memberList.eboard.vice_president));
		treasurerSection.append(Mustache.render(template, memberList.eboard.treasurer));
		secretarySection.append(Mustache.render(template, memberList.eboard.secretary));
		alumniRepSection.append(Mustache.render(template, memberList.minor_eboard.alumni_rep));
		cabinetManagerSection.append(Mustache.render(template, memberList.minor_eboard.cabinet_man));
		for(var i = 0; i < memberList.general_members.length; i++) {
			generalMembersSection.append(Mustache.render(template, memberList.general_members[i]));
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
			if(game.amazon) {
				$("#amazon-btn").removeClass('hide', false);
				$("#amazon-btn").attr("href", game.amazon);
			}
			else {
				$("#amazon-btn").addClass('hide', true);
			}
			if(game.google) {
				$("#google-btn").removeClass('hide', false);
				$("#google-btn").attr("href", game.google);
			}
			else {
				$("#google-btn").addClass('hide', true);
			}
			if(game.apple) {
				$("#apple-btn").removeClass('hide', false);
				$("#apple-btn").attr("href", game.apple);
			}
			else {
				$("#apple-btn").addClass('hide', true);
			}
			if(game.steam) {
				$("#steam-btn").removeClass('hide', false);
				$("#steam-btn").attr("href", game.steam);
			}
			else {
				$("#steam-btn").addClass('hide', true);
			}
		});
	});

});
