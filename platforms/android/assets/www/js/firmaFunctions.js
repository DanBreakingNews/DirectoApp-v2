
//Declaracion global del objecto jsignature 
var $sigdiv;

$( document ).ready(function() {
    try
	{
		// This is the part where jSignature is initialized.
		$sigdiv = $("#signature").jSignature();
		
		var tasksId = window.localStorage.getItem("taskId");
		var txtTasks = window.localStorage.getItem("tasks");
		var tasks = [];
		
		if( txtTasks != null )
		{
			if( txtTasks.length > 0 )
			{
				tasks = JSON.parse(txtTasks.toString());
			}
		}
		
		var signature = "";
		var encontrado = false;
		for (var i = 0; i < tasks.length && !encontrado; i++) 
		{	
			if( String(tasks[i].id) ==  String(tasksId))
			{
				encontrado = true;
				signature = tasks[i].signature;
			}
		}
		
		if( signature != null )
		{
			if( signature.length > 0 )
			{
				datapair = ["image/jsignature;base30", signature];
				$sigdiv.jSignature("setData", "data:" + datapair.join(","));
			}
		}
	}
	catch(err)
	{
		alert("OnReady. " + err.toString());
	}
});

function limpiar()
{
	try
	{
		var datapair = $sigdiv.jSignature("getData","base30");
		
		if( datapair.length == 2)
		{
			if( datapair[1].length == 0 )
			{
				return;
			}
		}
		
		if (!confirm('¿Seguro desea borrar la firma actual?')) {
			clear();
		} 
	
		var tasksId = window.localStorage.getItem("taskId");
		var txtTasks = window.localStorage.getItem("tasks");
		var tasks = [];
		
		if( txtTasks != null )
		{
			if( txtTasks.length > 0 )
			{
				tasks = JSON.parse(txtTasks.toString());
			}
		}
		
		var signature = "";
		var encontrado = false;
		for (var i = 0; i < tasks.length && !encontrado; i++) 
		{	
			if( String(tasks[i].id) ==  String(tasksId))
			{
				encontrado = true;
				tasks[i].signature = "";
				$sigdiv.jSignature("reset");
			}
		}
		
		if( encontrado )
		{
			window.localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	}
	catch(err)
	{
		alert("Limpiar. " + err.toString());
	}
}

function exportToImg()
{
	try
	{
		var datapair = $sigdiv.jSignature("getData","base30");
		
		var tasksId = window.localStorage.getItem("taskId");
		var txtTasks = window.localStorage.getItem("tasks");
		var tasks = [];
		
		if( txtTasks != null )
		{
			if( txtTasks.length > 0 )
			{
				tasks = JSON.parse(txtTasks.toString());
			}
		}
		
		var signature = "";
		var encontrado = false;
		for (var i = 0; i < tasks.length && !encontrado; i++) 
		{	
			if( String(tasks[i].id) ==  String(tasksId))
			{
				encontrado = true;
				tasks[i].signature = datapair;
				alert("Firma Guardada con exito.");
			}
		}
		
		if( encontrado )
		{
			window.localStorage.setItem('tasks', JSON.stringify(tasks));
			window.history.back();
		}
		else
		{
			alert( "Lo sentimos no se encontro la tarea" );
		}
	}
	catch(err)
	{
		alert("ExportToImg. " + err.toString());
	}
}