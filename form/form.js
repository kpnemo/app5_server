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

$(function(){
    $.getJSON('/getExample_1', function(jsonData){
        var $table = $('<table></table>');
        $table.append('<thead><tr><th>Name</th><th>Email</th></tr></thead>');
        $table.append('<tbody></tbody>');

        for(var i=0; i < jsonData.DB.length; i++){
            $table.find('tbody').append('<tr><td>'+jsonData.DB[i].name+'</td><td>'+jsonData.DB[i].email+'</td></tr>')
        }


        console.log($table);
        console.log('I am going to prepend');
        $('h1').before($table);
    });
});


function validateForm() {


	var email = $("#email").val();
	if ((/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
		console.log(email);
	} else {
		alert("Please enter a valid email");
		return false;
	}

}

$(function(){

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
});