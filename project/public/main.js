
$(document).ready(function(){
	$('.search').click(function(){
		var name = $("#name").val();

		console.log(name);
		$.ajax({
			url: '/personalhome/search',
			method: 'post',
			datatype : 'json',
			data : {'name':name},
			success:function(response){
				if(response.campaign !== 'error'){

					// $('#info').html(response.user.id);
					 
					$('#info').html('<hr>'+'Id: '+response.campaign.id+'<br>'+'Type: '+response.campaign.ctype+'<br>'+'Description: '+response.campaign.description+'<br>'+'Title: '+response.campaign.title);
					$('#name').val('');
					
				}else{
					$('#info').html('<hr>'+'**can not found!!');
				}
			},
			error:function(response){
				alert('server error')
			}
		});
	});
});
