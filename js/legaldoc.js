/* */

	function shake_window(win) {
	    win.removeClass('shake animated').addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	      $(this).removeClass('shake animated');
	    });
	}

	function set_current_section(sec) {

		$(".simplified-version").html("");
		$(".doc-hints").css("border-color","#fff");

		$(".section-nav .current").removeClass("current").addClass("completed");
		sec.addClass("current");

		var str = sec.attr("href");
		var loc2 = str.substring(1);

		$temp = $(".doc-content section."+loc2+" h3").text() + " <a href='#simplified-" + loc2 + "'>Simplified Version</a>";
		$(".legal-doc .doc-subtitle").html( $temp );

		if ( $(".section-nav ul li").length-1 <= $(".section-nav ul li a.completed").length ) {
			if ( !$('.close-simplified-terms span.congrats').is(":visible") ) {
				$('.close-simplified-terms span.congrats').show();
			}
		}		
	}

	function set_completed_section(sec) {
		sec.addClass("completed");
	}

	function set_default_section(sec) {
		sec.removeClass("current completed");
	}

$(function() {		

	$(".doc-subtitle a").click(function(e){
		console.log(".doc-subtitle a");
		e.preventDefault();
		var str = $(this).attr("href");
		var loc2 = str.substring(12); /* skip '#simplified-' */
		$(".simplified-version").html( $(".simple-"+loc2).html() );		
		$(".doc-hints").css("border-color","#ccc");
	});

	$("#simplified-terms").click(function(e){
		e.preventDefault();
		$(".doc-container").fadeIn("slow");		
	});

	$("#complete-terms, .close-simplified-terms").click(function(e){
		e.preventDefault();
		$(".doc-container").fadeOut("slow");		
	});

	$(".section-nav a, .toc-nav a").click(function(e){

		e.preventDefault();

		var orig_this = $(this);
		var loc = $(this).attr("href");
		 
		var str = "" + loc;
		var target_section = str.substring(1);
		
	    $(".doc-content section:visible").fadeOut("fast",function(){
	      // $(".legal-doc .doc-subtitle").text( $(".doc-content section."+target_section+" h3").text() );
	      ////$(".legal-doc .doc-subtitle").text( $(".doc-content section."+target_section+" h3").text() + ' <a href="#simplified-'+target_section+'">Simplified Version</a>' );
	      $(".doc-content section."+target_section).fadeIn("slow",function(){		      
		      //console.log( $('a[href="'+loc+'"]') );		      
		      set_current_section( $('a[href="'+loc+'"]') );
	      });
	    });

	});

	$(".nav-right").click(function(e){

		e.preventDefault();

		var next_section = $(".doc-content section:visible").next('section');
		if ( next_section.length > 0 ) {
			$(".doc-content section:visible").fadeOut("fast",function(){
				////$(".legal-doc .doc-subtitle").text( next_section.find("h3").text() );
		    	next_section.fadeIn("slow");
		    	var loc = "";
		    	var loc2 = "";
		    	var classList = next_section.attr('class').split(/\s+/);
				$.each( classList, function(index, item){
				    if ( (item != 'current') && (item != 'completed') ) {
				       loc = "#"+item;
				       loc2 = item;
				    }
				});
				if (loc==="") {
					set_current_section( $(".section-nav ul li a").first() );
				}
				else {
					$(".legal-doc .doc-subtitle").text( next_section.find("h3").text() + ' <a href="#simplified-'+loc2+'">Simplified Version</a>' );
		    		set_current_section( $('a[href="'+loc+'"]') );
		    	}
		    });
		}
		else {
			shake_window( $(".legal-doc") );
		}
	});

	$(".nav-left").click(function(e){

		e.preventDefault();

		var previous_section = $(".doc-content section:visible").prev('section');
		if ( previous_section.length > 0 ) {
			$(".doc-content section:visible").fadeOut("fast",function(){
				////$(".legal-doc .doc-subtitle").text( previous_section.find("h3").text() );

		    	previous_section.fadeIn("slow");
		    	var loc = "";
		    	var loc2 = "";
		    	var classList = previous_section.attr('class').split(/\s+/);
				$.each( classList, function(index, item){
				    if ( (item != 'current') && (item != 'completed') ) {
				       loc = "#"+item;
				       loc2 = item;
				    }
				});				
				if (loc==="") {
					set_current_section( $(".section-nav ul li a").first() );
				}
				else {
					$(".legal-doc .doc-subtitle").text( previous_section.find("h3").text() + ' <a href="#simplified-'+loc2+'">Simplified Version</a>' );
		    		set_current_section( $('a[href="'+loc+'"]') );
		    	}
		    });
		}
		else {
			shake_window( $(".legal-doc") );
		}
	});

});



$(document).ready(function(){

 	$(".doc-content section").hide("fast",function(){
 		$(".doc-content section").first().fadeIn("slow");
 		set_current_section( $(".section-nav ul li a").first() );
 	});

 	$("#text-zoom").zoom({
		path: ".doc-content section"

		//show/hide				
		,show_zoom: true //font-size
		,show_alignment: false //text-align
		,show_font_family: false //font-family
		,show_bold: false //font-weight
		,show_colors: false //color
		,show_reset: true //reset
	});

	$(".toc-toggle").click(function(e){
		e.preventDefault();
		console.log("1");
		if ( $(".doc-reference").is(":visible") ) {
			console.log("2");
			$(".doc-content").removeClass("col-lg-8 col-sm-8");
			$(".doc-reference").fadeOut();
		}
		else {
			console.log("3");
			$(".doc-content").addClass("col-lg-8 col-sm-8");
			$(".doc-reference").fadeIn();
		}
		console.log("4");
	});

});

