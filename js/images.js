// images.js
// (c) Joshua Gigg 2010
// Part of the "Team Cuddles" Group Design Project


var source = { flickr:0, picasa:0, photobucket:0, deviantart:0, twitpic:0 };
var hit_her_in_the_stomach = 0;
var can_drag_into_wrapper = 1;
var does_my_bum_look_big_into_this = 1;
var we_have_to_make_my_z_index_bigger = 100;

document.multitouchData = true;

var X1, Y1, X2, Y2;

var fingersTracked = 0;

var fingerIds = [-1,-1,-1,-1];


$(function() {
	addwrapperdrag();
	addbottomdrag();

	var helpful = $.cookie("are_you_really_being_helpful");

	if (helpful == null)
	{
		$('#quote').fadeIn('slow');
	}
		
	});

function hidequote()
{
	$('#quote').fadeOut('slow');
	var helpful = $.cookie("are_you_really_being_helpful");

	if (helpful == null)
	{
		var date = new Date();
		date.setTime(date.getTime() + (1 * 60 * 60 * 1000));
		$.cookie("are_you_really_being_helpful", 'nope', { path: '/', expires: date });
	}
}
	
function addbottomdrag()
{
		
	$("#bottom #bl img").draggable({ helper: 'clone', revert: true, stop: function(event,ui) {
		var pos = $("#bottom").offset();
		
		if (event.clientY < pos.top)
		{
			var src = ui.helper.attr('src');
			var t = ui.offset.top - 4;
			var l = ui.offset.left - 4;
			we_have_to_make_my_z_index_bigger++;
			$('#wrapper').append("<img class='mainimg' style='height: 100px; position: absolute; top: " + t + "px; left: " + l + "; z-index: " + we_have_to_make_my_z_index_bigger + ";' src='" + src + "' />");
			$('#wrapper img').draggable( "destroy" );
			addwrapperdrag();
		}
		
		
	}, drag: function(event,ui){
		var pos = $("#bottom").offset();
		if (event.clientY < pos.top)
		{
			// Turn revert off
			$("#bottom #bl img").draggable( "option", "revert", false );
		}
		else
		{
			$("#bottom #bl img").draggable( "option", "revert", true );
		}
	
	
	}});
}	
	
	
function addwrapperdrag()
{
		$("#wrapper img").draggable({ stack: ".mainimg", drag: function(event, ui) {
			var pos = $("#trashcan").offset();
			if (pos.left < event.clientX && event.clientX < (pos.left + 150) &&
			    pos.top < event.clientY && event.clientY < (pos.top + 150))
			{
				// They are over trashcan
				ui.helper.css('border','4px solid red');
				ui.helper.css('opacity','0.7');
				$("#trashcan img").attr('src','images/TRASH_FULL.png');
			}
			else
			{
				$("#trashcan img").attr('src','images/TRASH_EMPTY.png');
				ui.helper.css('border','4px solid transparent');
				ui.helper.css('opacity','1');
			}
		}, stop: function(event,ui) {
			var pos = $("#trashcan").offset();
			if (pos.left < event.clientX && event.clientX < (pos.left + 150) &&
			    pos.top < event.clientY && event.clientY < (pos.top + 150))
			{
				// They are over trashcan
				ui.helper.remove();
				$("#trashcan img").attr('src','images/TRASH_EMPTY.png');
			}
		}});
		
		$('#wrapper img').bind('MozTouchDown', function(e) {
			  if (fingersTracked < 4)
				fingerIds[fingersTracked] = e.originalEvent.streamId;
			  fingersTracked++;
		  });
		  
		$('#wrapper img').bind('MozTouchRelease', function(e) {
			  fingersTracked--;
		  });	

		$('#wrapper img').bind('MozTouchMove', function(e) {
				var img1 = $(this);
			  console.log(e.originalEvent.streamId);
			  console.log(fingerIds);
			  console.log(this);
			  
			  var diagonal, sidesize;
			  
			  if (fingerIds[0] == e.originalEvent.streamId) { // finger 1
				X1 = e.originalEvent.clientX;
				Y1 = e.originalEvent.clientY;

			  } else if (fingerIds[1] == e.originalEvent.streamId) { // finger 2
				diagonal = dist(X1, e.originalEvent.clientX, Y1, e.originalEvent.clientY);
				sidesize = diagonal / Math.sqrt(2);
				
				img1.style.left = ((e.originalEvent.clientX < X1) ? e.originalEvent.clientX : X1) + "px"
				img1.style.top  = ((e.originalEvent.clientY < Y1) ? e.originalEvent.clientY : Y1) + "px"
				
				img1.style.width  = sidesize + "px"
				img1.style.height = sidesize + "px"

			  }
		  });
		  
}

function dist(x1,x2,y1,y2) {
  return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
}



	
function addsource(name)
{
	$("#loading-" + name).html("");
	deletekeyboard(name);
	hidequote();
	if (hit_her_in_the_stomach == 0)
	{
		$("#hit_her_in_the_stomach").fadeIn('fast');
		$("#bottom #bl img").draggable( "destroy" );
		hit_her_in_the_stomach = 1;
		can_drag_into_wrapper = 0;
	}
	$.each(source, function(i, val) {
		deletekeyboard(i);
		if (val == 1)
		{
			if (i == name)
				return;
			$("#source-" + i).fadeOut('fast');
			source[i] = 0;
		}
	});
	$("#source-" + name + " form .input").val("");
	createkeyboard(name);
	$("#source-" + name).fadeIn();
	source[name] = 1;
	$("#source-" + name + " form").submit(function() {
		var val = $("#source-" + name + " form .input").val();
		$("#loading-" + name).html("<img src='images/ajax-loading.gif' /> Loading...");
		$.getJSON('ajax/' + name + '/index.php?username=' + val, function(data) {
			if (data == null)
				return;
			if (data.error != '')
			{
				$("#loading-" + name).html("<b class='error'>" + data.error + "</b>");
			}
			else
			{
				$.each(data.photos, function(i, v) {
					addphoto(name,val,v.src,v.title,i);
				});
				$("#loading-" + name).html("");
				closesource(name);
			}
		});
		return false;
	});
}

function addphoto(source,user,src,title,i)
{
	$("#bl").append("<li id='" + source + "-" + user + "-" + i + "'><a title='" + title + "'><img style='height: 100px;' src='" + src + "' /></a></li>");
}

function closesource(name)
{
		deletekeyboard(name);
	can_drag_into_wrapper = 1;
	hit_her_in_the_stomach = 0;
	source[name] = 0;
	addbottomdrag();
	// Hide keyboard
	$("#hit_her_in_the_stomach").fadeOut('fast');
	$("#source-" + name).fadeOut('fast');
}

function toggleside()
{
	if (does_my_bum_look_big_into_this == 1)
	{
		$("#leftmenu #more").css('left',0);
		$("#leftmenu").css('left',-250);
		$("#leftmenu #more a").html('Show');
		$("#leftmenu #more a").css('margin-top',31);
		$("#leftmenu #more a").css('margin-left',-1);
		does_my_bum_look_big_into_this = 0;
	}
	else
	{
		$("#leftmenu #more").css('left',70);
		$("#leftmenu").css('left',0);
		$("#leftmenu #more a").html('Hide');
		$("#leftmenu #more a").css('margin-top',25);
		$("#leftmenu #more a").css('margin-left',-1);	
		does_my_bum_look_big_into_this = 1;
	}
}

function scrollleft()
{
	$("#bl").scrollTo( {left: 0, top:'-=130'}, 400 );
}

function scrollright()
{
	$("#bl").scrollTo( {left: 0, top:'+=130'}, 400 );
}