function initRecolectas()
{
	getTasksService();
}

function pendientes()
{
	selectTasks("ASSIGNED");
}

function aceptadas()
{
	selectTasks("ACCEPTED");
}

function completas()
{
	selectTasks("COMPLETED");
}

function getTasksService()
{
	try {
		
		//showLoadingDiv();
		
		var conn = getConnSettings(); 
		
		var txtTasks = window.localStorage.getItem("tasks");
		var tasks = [];
		
		if( txtTasks != null )
		{
			if( txtTasks.length > 0 )
			{
				tasks = JSON.parse(txtTasks.toString());
			}
		}
		
		var txtToSend = "";
		for (var i = 0; i < tasks.length; i++) 
		{	
			txtToSend += tasks[i].id + "#" + tasks[i].status + "|";
		}
		
		
		varType = "POST";
        varUrl = conn + "home/AssignedTasks";

        varContentType = "application/json; charset=utf-8";
        varDataType = "json";
        varProcessData = true; 
            
        $.ajax({
        	type          : varType, //GET or POST or PUT or DELETE verb
            url           : varUrl, // Location of the service
            data          : "{ 'User': '" + String("DEMO") + "', 'Text': '" + txtToSend + "' }",
            contentType   : varContentType, // content type sent to server
            dataType      : varDataType, //Expected data format from server
            processdata   : varProcessData, //True or False
            success       : function(msg) {//On Successfull service call
            					getTasksServiceSucceeded(msg);                    
                            },
                            error: getTasksServiceFailed// When Service call fails
        });
    } catch (err) {
    	alert("GetTasksService. " + err.toString());
    }
}

function getTasksServiceSucceeded(data) {
	try
	{
		hideLoadingDiv();
		window.localStorage.setItem('tasks', JSON.stringify(data));
		selectTasks("ASSIGNED");
	}
	catch (err) {
    	alert("TasksServiceSucceeded. " + err.toString());
    }
}
            
function getTasksServiceFailed(result) {
	try
	{
		hideLoadingDiv();
		selectTasks("ASSIGNED");
	}
	catch (err) {
    	alert("TasksServiceFailed. " + err.toString());
    }
}

function acceptTask(id)
{
	try
	{
		var text = window.localStorage.getItem("tasks");
		
		if( text == null ){
			return;
		}
		
		if( text.length == 0 )
		{
			return;
		}
		
		var tasks = JSON.parse(window.localStorage.getItem("tasks"));
	
		if( tasks == null )
		{
			return;
		}
		
		for (var i = 0; i < tasks.length; i++) 
		{	 
			if( String(id) == String(tasks[i].id))
			{
				tasks[i].status = "ACCEPTED";
			
				window.localStorage.setItem('tasks', JSON.stringify(tasks));
				selectTasks("ASSIGNED");
				alert("Tarea aceptada");
				return;
			}
		}
		
		alert("Tarea no encontrada");
	}
	catch (err) {
    	alert("AcceptTask. " + err.toString());
    }
}

function cancelTask(id)
{
	try
	{
		var text = window.localStorage.getItem("tasks");
		
		if( text == null ){
			return;
		}
		
		if( text.length == 0 )
		{
			return;
		}
		
		var tasks = JSON.parse(window.localStorage.getItem("tasks"));
	
		if( tasks == null )
		{
			return;
		}
		
		for (var i = 0; i < tasks.length; i++) 
		{	 
			if( String(id) == String(tasks[i].id))
			{
				tasks[i].status = "CANCELLED";
			
				window.localStorage.setItem('tasks', JSON.stringify(tasks));
				selectTasks("ASSIGNED");
				alert("Tarea cancelada");
				return;
			}
		}
		
		alert("Tarea no encontrada");
	}
	catch (err) {
    	alert("CancelTask. " +  err.toString());
    }
}

function selectTasks(filter)
{
	try
	{
		document.getElementById("custome-list-container").innerHTML = "";
		
		var text = window.localStorage.getItem("tasks");
		
		if( text == null ){
			return;
		}
		
		if( text.length == 0 )
		{
			return;
		}
		
		var tasks = JSON.parse(text);
		
		var html = "";
		var template = "";
		
		if( filter == "ASSIGNED")
		{
			document.getElementById("btn01").className = "button-custom-inline no-bottom demo-button button-minimal black-minimal";
			document.getElementById("btn02").className = "button-custom-inline no-bottom demo-button button-minimal grey2-minimal";
			document.getElementById("btn03").className = "button-custom-inline no-bottom demo-button button-minimal grey2-minimal";
			
			template = document.getElementById("template01").innerHTML;
		}else if( filter == "ACCEPTED")
		{
			document.getElementById("btn01").className = "button-custom-inline no-bottom demo-button button-minimal grey2-minimal";
			document.getElementById("btn02").className = "button-custom-inline no-bottom demo-button button-minimal black-minimal";
			document.getElementById("btn03").className = "button-custom-inline no-bottom demo-button button-minimal grey2-minimal";
			
			template = document.getElementById("template02").innerHTML;
		}else if( filter == "COMPLETED")
		{
			document.getElementById("btn01").className = "button-custom-inline no-bottom demo-button button-minimal grey2-minimal";
			document.getElementById("btn02").className = "button-custom-inline no-bottom demo-button button-minimal grey2-minimal";
			document.getElementById("btn03").className = "button-custom-inline no-bottom demo-button button-minimal black-minimal";
			
			template = document.getElementById("template03").innerHTML;
		}
			
		for( var key in tasks )
		{
			var task = tasks[key];
			if( task.status == String(filter) )
			{
				var item_html = Mustache.render(template, task);
				html = html + " " + item_html;
			}
		}
		
		document.getElementById("custome-list-container").innerHTML = html;
		
		$('.show-toggle-v5').hide();
		$('.toggle-content-v5').hide();
		
		$('.show-toggle-v5').click(function(){
			$(this).hide();		
			$(this).parent().find('.hide-toggle-v5').show();		
			$(this).parent().find('.toggle-content-v5').fadeOut(100); 
			return false;	
		});
		
		$('.hide-toggle-v5').click(function(){
			$(this).parent().find('.show-toggle-v5').show();			
			$(this).hide();		
			$(this).parent().find('.toggle-content-v5').fadeIn(200); 
			return false;	
		});	
		
		$('.sliding-door-top').click(function(){
			$(this).animate({
				left:'101%'
			}, 500, 'easeInOutExpo');
			return false;
		});
	
		$('.sliding-door-bottom a em').click(function(){
			$(this).parent().parent().parent().find('.sliding-door-top').animate({
				left:'0px'
			}, 500, 'easeOutBounce');
			return false;
		});
	}
	catch (err) {
    	alert( "SelectTasks. " + err.toString());
    }
}

function viewTask(id)
{
	try
	{
		window.localStorage.setItem('taskId', String(id));
		//window.localStorage.removeItem("guias");
		window.location = 'trecolecta.html';
	}
	catch (err) {
    	alert( "ViewTask. " + err.toString());
    }
}

function showLoadingDiv()
{
	$("#status").fadeIn();
	$("#preloader").fadeIn();
}

function hideLoadingDiv()
{
	$("#status").fadeOut(); 
	$("#preloader").delay(350).fadeOut("slow");
}
















