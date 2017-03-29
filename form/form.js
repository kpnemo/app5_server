function _buildTable(){
	$.getJSON('/getExample_1', function(jsonData){

		var $table = $('<table class="table table-bordered"></table>');
		$table.append('<thead><tr><th>Name</th><th>Email</th></tr></thead>');
		$table.append('<tbody></tbody>');

		for(var i=0; i < jsonData.DB.length; i++){
			$table.find('tbody').append('<tr><td>'+jsonData.DB[i].name+'</td><td>'+jsonData.DB[i].email+'</td></tr>')
		}


		console.log($table);
		console.log('I am going to prepend');
		$('h1').before($table);
	});
};

function _getData_1(callback){
	var timer = null;
	var i = 0;

	timer = setInterval(function(){
		i++;
		if(i == 3){
			clearInterval(timer);
			callback('hoho data1');
		} else {
			console.log('i', i);
		}
	}, 500);
};

function _getData2(){
	for(var i=0; i<=100; i++){
		console.log(i, 'data2');
	}
	return 'some data 2';
};


function getParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function _pageStatus(){
	var formSubmitted = getParameterByName('submited', window.location.href);
	if(formSubmitted == 'true'){
		$('h1').show();
		$('form, h2').hide();
	} else if(formSubmitted == 'false') {
		$('h2').show();
		$('h1, form').hide();
	} else {
		$('h1, h2').hide();
		$('form').show();
	}
};


function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};


function _validateForm(formData, callback){
	var name = formData.name || null;
	var email = formData.email || null;

	if(name == null || email == null) {
		callback('All fields are mandatory');
	} else if(!validateEmail(email)){
		callback('Email not valid');
	} else {
		callback(null, formData);
	}
};


function _submitForm(){
	var $form = $('#userForm'),
		_formData = {};

	$form.on('submit', function(ev){
		ev.preventDefault();
		var $inputs = $form.find('input');
		$inputs.each(function(){
			_formData[$(this).attr('name')] = $(this).val();
		});

		_validateForm(_formData, function(err, data){
			if(!err){
				console.log('Form is valid');
				$form.find('.form-group').removeClass('has-error').addClass('has-success');
				$.ajax({
					url: '/',
					data: JSON.stringify(_formData),
					method: 'POST',
					contentType: "application/json",
					dataType: 'json',
					beforeSend: function(){
						console.log('Sending now');
					},
					success: function(respo){
						console.log('I did it', resp);
					},
					error: function(a,b,c){
						console.log('error', a, b, c);
					}
				});
			} else {
				$form.find('.form-group').addClass('has-error');
				console.warn('Form is not valid', err);
			}
		});
	});
};


function _init(){
	_pageStatus();
	_buildTable();
	_submitForm();

	_getData_1(function(val){
		console.log('data1', val);
	});


	var someData = _getData2();
	console.log('data2', someData);


};


$(function(){
	_init();
});