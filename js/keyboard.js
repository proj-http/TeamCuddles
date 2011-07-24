/* Keyboard JavaScript File
 * @author Joshua Gigg
 * @copyright 2010
 * Made for Team Cuddles B202 University of Portsmouth Project
 */
 
 function createkeyboard(name)
 {
 deletekeyboard(name)
	var row0 = [1,2,3,4,5,6,7,8,9,0];
	var row1 = ['q','w','e','r','t','y','u','i','o','p'];
	var row2 = ['a','s','d','f','g','h','j','k','l'];
	var row3 = ['z','x','c','v','b','n','m'];
 
 
	var kb = $("#" + name + "-keyboard");
	
	// Get a copy of the keyboard text to "store" for later, then clear it!
	var kbtext = kb.attr('title');
	kb.html("");
	
	kb.append("<div class='kb-row0'></div>");
	kb.append("<div class='kb-row1'></div>");
	kb.append("<div class='kb-row2'></div>");
	kb.append("<div class='kb-row3'></div>");
	kb.append("<div class='kb-row4'></div>");

	$.each(row0, function(i, letter) {
		$(".kb-row0").append("<div class='kb-key' id='kb-key-" + name + "-" + letter + "'>" + letter + "</div>");
		$("#kb-key-" + name + "-" + letter).bind('click', function() {
			$("#source-" + name + " form input").val($("#source-" + name + " form input").val() + letter);
		});
	});	


	
	$.each(row1, function(i, letter) {
		$(".kb-row1").append("<div class='kb-key' id='kb-key-" + name + "-" + letter + "'>" + letter + "</div>");
		$("#kb-key-" + name + "-" + letter).bind('click', function() {
			$("#source-" + name + " form input").val($("#source-" + name + " form input").val() + letter);
		});
	});	

	$.each(row2, function(i, letter) {
		$(".kb-row2").append("<div class='kb-key' id='kb-key-" + name + "-" + letter + "'>" + letter + "</div>");
		$("#kb-key-" + name + "-" + letter).bind('click', function() {
			$("#source-" + name + " form input").val($("#source-" + name + " form input").val() + letter);
		});
	});
	
	
	$.each(row3, function(i, letter) {
		$(".kb-row3").append("<div class='kb-key' id='kb-key-" + name + "-" + letter + "'>" + letter + "</div>");
		$("#kb-key-" + name + "-" + letter).bind('click', function() {
			$("#source-" + name + " form input").val($("#source-" + name + " form input").val() + letter);
		});
	});	


	// Special keys
	
	$(".kb-row0").append("<div class='kb-key backspace' id='kb-key-" + name + "-backspace'>Backspace</div>");
		$("#kb-key-" + name + "-backspace").bind('click', function() {
			var s = $("#source-" + name + " form input").val().slice(0, - 1);
			$("#source-" + name + " form input").val(s);
		});	
		
	$(".kb-row1").append("<div class='kb-key enter' id='kb-key-" + name + "-enter'>" + kbtext + "</div>");
		$("#kb-key-" + name + "-enter").bind('click', function() {
			$("#source-" + name + " form input").submit();
		});	


	$(".kb-row4").append("<div class='kb-key space' id='kb-key-" + name + "-space'>[Space]</div>");
		$("#kb-key-" + name + "-space").bind('click', function() {
			$("#source-" + name + " form input").val($("#source-" + name + " form input").val() + " ");
		});		
		
 
 }
 
 function deletekeyboard(name)
 {
	$("#" + name + "-keyboard").html("");
 }