(function() {

	'use strict';

	//foundation init
	$(document).foundation();

})();


/*
 * View: Lead Detail
 * 
 */

/*
 * Progress bar
 * 
 */

// Grab current value of progress bar, add/subtract from passed val
/*
function progressBar(v) {
	'use strict';
	var value = parseInt(v);
	var currentBar = parseInt($('.meter')[0].style.width.replace(/[^\d]/g, ''));
	var newBar = value + currentBar;

	if (value + currentBar > 100) {
		$('.meter').css('width', '100%');
	} else if (value + currentBar < 0) {
		$('.meter').css('width', '0%');
	} else {
		$('.meter').css('width', newBar + '%');
	}
}
*/

/*
 * Questions area of the Lead Detail Views 
 * 
 */

function statusQuestions() {
	'use strict';
	// var radioQuestions = $('.statusQuestions').find('input[type=radio]');

	// Pull data from db to pre-populate form
	// $radioQuestions.prop('');

	// Enable/disable whyNoResponse after checking if firm responded.
	if ($('#ppcNo').prop('checked') === true) {
		$('select[name=whyNoResponse]').prop('disabled', false);
		$('input[name=ppcConsult],input[name=ppcCase]').prop('disabled', true);
	} else if ($('#ppcYes').prop('checked') === true) {
		$('select[name=whyNoResponse]').prop('disabled', true);
		$('input[name=ppcConsult],input[name=ppcCase]').prop('disabled', false);
	}
}

// Run statusQuestions() when ppcRespond
$('input[name=ppcRespond]').click(function(){
	'use strict';
	statusQuestions();
});

// Toggle Consultation and Court Case question
function consultationToCourtCase() {
	'use strict';
	var notYet = $('#ppcConsultNo').prop('checked');
	var noShow =  $('#ppcNoShow').prop('checked');

	// Disable 'Do we have a court case?' if Consultation is not set or no show
	if (notYet === true || noShow === true) {
		console.log('disable');
		$('input[name=ppcCase]').prop('disabled', true);
	} else if ($('#ppcConsult').prop('checked') === true) {
		$('input[name=ppcCase]').prop('disabled', false);
	}
}

// Updating the Status of the Lead
function confirmedLead() {
	'use strict';
	var status = $('.updatestatus small');
	var response = $('#ppcYes').prop('checked');
	var consultation = $('#ppcConsult').prop('checked');

	if (response === true && consultation === true) {
		$(status).html('Confirmed Lead');
	}
}

// Run consultationToCourtCase() && confirmedLead() when name=ppcConsult is clicked
$('input[name=ppcConsult]').click(function(){
	'use strict';
	consultationToCourtCase();
	confirmedLead();
});

function qualifiedLead() {
	'use strict';
	var status = $('.updatestatus small');
	var response = $('#ppcCourtDateSet').prop('checked');
	if (response === true) {
		$(status).html('Qualified Lead');
	}
}

// Run qualifiedLead() when name=ppcCase is clicked
$('input[name=ppcCase]').click(function(){
	'use strict';
	qualifiedLead();
});