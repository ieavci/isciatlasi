	var iscountyselected = false;
	var previouscountyselected = "blank";
	var start = true;
	var past = null;
	var content_dir = "details";
	
	$(function(){
	
	var r = Raphael('map'),
	attributes = {
            fill: '#666',
            stroke: '#fff',
            'stroke-width':.5,
            'stroke-linejoin': 'round',
        },
	arr = new Array();
	
	for (var county in paths) {
		
		var obj = r.path(paths[county].path);
		
		obj.attr(attributes);
		
		arr[obj.id] = county;
			
							
		if(arr[obj.id] != 'blank') 
		{				
			obj.data('selected', 'notSelected');
			
		
		
			obj.node.id = arr[obj.id];
			
			obj.attr(attributes).attr( { title: paths[arr[obj.id]].name } );
			

			obj
			.hover(function(){
				$('#coatOfArms').addClass(arr[this.id]+'large sprite-largecrests');
				
				$('#countyInfo').text(paths[arr[this.id]].name);
				
				$('#searchResults').stop(true,true);
				
							
			}, function(){	
				$('#coatOfArms').removeClass();			
				if(paths[arr[this.id]].value == 'notSelected')
					{
					$('.'+paths[arr[this.id]].name)
							.slideUp('slow', function() { 
								$(this).remove(); 
							});
				}
			});
			$("svg a").qtip({
			
					content: {
						attr: 'title'
					},
					show: 'mouseover',
					hide: 'mouseout',
					position: {
						target: 'leave'
					},
					style: {
						classes: 'ui-tooltip-tipsy ui-tooltip-shadow',
						tip: false
					}
			});
			
			obj.click(function(){	
			
				if(paths[arr[this.id]].value == 'notSelected')
				{
						this.animate({
						fill: '#000'
					}, 200);
			
					paths[previouscountyselected].value = "notSelected";
					paths[arr[this.id]].value = "isSelected";
					
					previouscountyselected = paths[arr[this.id]].name;
					
					$('<div/>', {
							title: arr[this.id],
							'class': arr[this.id]+'small sprite-smallcrests'
						}).appendTo('#selectedCounties').qtip(countyCrest);
												
					$("#countymenu").val(paths[arr[this.id]].county); 
					
					
						
					if (!start && past != this)
					{
						past.animate({ fill: '#666'	}, 200);
					}
					past = this;
					start = false;					
				}
	
					
				else if(paths[arr[this.id]].value == 'isSelected')
					{
						this.animate({
							fill: '#15d4f5'
						}, 200);
						
						paths[arr[this.id]].value = "notSelected"; 
						
						$("." + previouscountyselected+'small').remove();
						
						
					}	
				
				});

			var countyCrest = 	{
					content: {
						attr: 'title'
					},
					position: {
						target: 'mouse'
					},
					style: {
						classes: 'ui-tooltip-tipsy ui-tooltip-shadow',
						tip: true
					}
			};
			
			function hoverin(e){
				if(paths[arr[this.id]].value == 'notSelected')
					this.animate({
						fill: '#15d4f5'}, 50);						
			}

			function hoverout(e){			
				if(paths[arr[this.id]].value == 'notSelected')
					this.animate({
						fill: '#666'}, 300);
			}

			obj.mouseout(hoverout);
				
			obj.mouseover(hoverin);

			$('#countyInfo').hide();
			
			$('#spinner').hide();
				
		}
		
	} 			
});