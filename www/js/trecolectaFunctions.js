function initTRecolecta()
{
	document.addEventListener("backbutton", cancelAll, false);
	
	document.getElementById("a01").className = "";
	document.getElementById("a02").className = "";
	document.getElementById("a03").className = "";
	document.getElementById("a04").className = "";
	
	readTask();
	readGuias();
}

function completeTask()
{
	try
	{
		var id = window.localStorage.getItem('taskId');
		
		var tasks = JSON.parse(window.localStorage.getItem("tasks"));
	
		for (var i = 0; i < tasks.length; i++) 
		{	 
			if( String(id) == String(tasks[i].id))
			{
				tasks[i].status = "COMPLETED";
				window.localStorage.setItem('tasks', JSON.stringify(tasks));
				
				readTask();
				
				alert("Tarea completada");
				return;
			}
		}
		alert("Tarea no encontrada");
	}
	catch (err) {
    	alert("CompleteTask. " + err.toString());
    }
}

function readTask()
{
	try
	{
		var id = window.localStorage.getItem('taskId');
		var txtTasks = window.localStorage.getItem("tasks");
		
		var tasks = []; 
		
		if( txtTasks != null )
		{
			if( txtTasks.length > 0 )
			{
				tasks = JSON.parse(txtTasks);
			}
		}
		
		for (var i = 0; i < tasks.length; i++) 
		{	 
			if( String(id) == String(tasks[i].id))
			{
				if( tasks[i].status == "COMPLETED" )
				{
					document.getElementById("group01").style = "display: none;";
					document.getElementById("group01").style
				}
				else
				{
					document.getElementById("group01").style = "display: block;";
				}
				return;
			}
		}
		alert("Tarea no encontrada");
	}
	catch (err) {
    	alert("ReadTask. " + err.toString());
    }
}

function goToGuia()
{	
	try
	{
		window.localStorage.removeItem('guiaId');
		
		window.localStorage.removeItem('tmpBranch_pk');
		window.localStorage.removeItem('tmpBranch_pde');
		window.localStorage.removeItem('tmpBranch_name');
		window.localStorage.removeItem('tmpBranch_address');
		
		window.localStorage.removeItem("tmpPackages");
		
		window.location = 'guia.html';
	}
	catch (err) {
    	alert("GoToGuia. " + err.toString());
    }
}

function readGuias()
{
	try
	{
		
		var tabla = document.getElementById("table-guias");
		tabla.innerHTML = "";
		tabla.style.display = "none";
		
		var taskId = window.localStorage.getItem('taskId');
		
		var txtGuias = window.localStorage.getItem("guias");
		var guias = [];
		
		if( txtGuias != null )
		{
			if( txtGuias.length != 0 )
			{
				guias = JSON.parse(txtGuias);
			}
		}
		
		headers = document.getElementById("tableTemplate01").innerHTML;
		template = document.getElementById("tableTemplate02").innerHTML;
		
		var html = "";
		
		for( var key in guias )
		{	
			var item = guias[key];
			
			if( String(item.taskId) == String(taskId) )
			{
				var item_html = Mustache.render(template, item);
				html = html + " " + item_html;
			}
		}
		
		if( html.length > 0 )
		{
			tabla.style.display = "table";
		}
		
		tabla.innerHTML = headers + html;
	}	
	catch (err) {
    	alert("ReadGuias. " + err.toString());
    }	
}
function deleteGuia(taskId,name)
{
	try
	{
		var result = confirm("¿Realmente desea borrar esta guía?");
		if( !result )
		{
			return;
		}
		
		var txtGuias = window.localStorage.getItem("guias");
		
		var guias = [];
		var newGuias = [];
		
		if( txtGuias != null )
		{
			if( txtGuias.length != 0 )
			{
				guias = JSON.parse(txtGuias);
			}
		}
		
		var contador = 0;
		
		for( var key in guias )
		{	
			var item = guias[key];
			
			if( String(item.taskId) == String(taskId) && 
				String(item.name) == String(name)
			  )
			{
				
			}
			else
			{
				contador++;
				
				var txtNewName = "Guía " + contador;
				
				newGuias.push(
					{	 	
						taskId			: item.taskId,
						name			: txtNewName,
						branch_pk		: item.branch_pk,
						branch_pde		: item.branch_pde,
						branch_name		: item.branch_name,
						branch_address	: item.branch_address,
						packages		: item.packages
					}	
				);
			}
		}
		
		window.localStorage.setItem("guias",JSON.stringify(newGuias));
		
		readGuias();
		
		alert("Guía borrada con éxito.");
	}	
	catch (err) {
    	alert("ReadGuias. " + err.toString());
    }	
}

function editGuia(taskId,name)
{
	try
	{
		var txtGuias = window.localStorage.getItem("guias");
		
		var guias = [];
		var newGuias = [];
		
		if( txtGuias != null )
		{
			if( txtGuias.length != 0 )
			{
				guias = JSON.parse(txtGuias);
			}
		}
	
		
		for( var key in guias )
		{	
			var item = guias[key];
			
			if( String(item.taskId) == String(taskId) && 
				String(item.name) == String(name)
			  )
			{
				window.localStorage.setItem('guiaId',item.name);
				
				window.localStorage.setItem('tmpBranch_pk',item.branch_pk);
				window.localStorage.setItem('tmpBranch_pde',item.branch_pde);
				window.localStorage.setItem('tmpBranch_name',item.branch_name);
				window.localStorage.setItem('tmpBranch_address',item.branch_address);
				
				window.localStorage.setItem('tmpPackages',JSON.stringify(item.packages));
				
				window.location = 'guia.html';
				
				return;
			}
		}
	}	
	catch (err) {
    	alert("ReadGuias. " + err.toString());
    }	
}

function goToFirma()
{
	try
	{
		window.location = 'firma.html';
	}
	catch(err)
	{
		alert( "GoToFirma. " + err.toString());
	}
}

function goToCamera()
{
	try
	{
		window.location = 'camara.html';
	}
	catch(err)
	{
		alert( "GoToCamera. " + err.toString());
	}
}

function cancelAll()
{
	try
	{
		if (confirm('Perdera todos los datos ¿Seguro desea cancelar?')) {
			window.history.back();
		} 
	}
	catch(err)
	{
		alert( "CancelAll. " + err.toString());
	}
}




