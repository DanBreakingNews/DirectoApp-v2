function initGuia()
{
	try
	{
		document.addEventListener("backbutton", cancelAll, false);
		
		var codigo = document.getElementById("v-codigo");
		var nombre = document.getElementById("v-nombre");
		var pde = document.getElementById("v-pde");
	
		codigo.innerHTML = "";
		nombre.innerHTML = "";
	
		var taskId = window.localStorage.getItem('taskId');
		var tasks = getTasks();
		
		var encontrado = false;
		for( var i = 0; i < tasks.length && !encontrado; i++ )
		{	
			if( String(taskId) == String(tasks[i].id) )
			{
				codigo.innerHTML = tasks[i].client;
				nombre.innerHTML = tasks[i].client_name;
			
				encontrado = true;
			}
		}
		
		branch_pk = window.localStorage.getItem('tmpBranch_pk');
		branch_pde = window.localStorage.getItem('tmpBranch_pde');
		branch_name = window.localStorage.getItem('tmpBranch_name');
		branch_address = window.localStorage.getItem('tmpBranch_address');
		
		if( branch_pk != null && branch_pde != null && 
			branch_name != null && branch_address != null )
		{
			pde.innerHTML = "Nombre: " + branch_name + "<br/>Direcci&oacute;n: " + branch_address;
		}
		else
		{
			pde.innerHTML = "";
		}
		
		readPackages();
	}
	catch(err)
	{
		alert( "InitGuia. " + err.toString());
	}
}

function getTasks()
{
	var tasks = [];
	try
	{
		var text = window.localStorage.getItem("tasks");
		
		if( text == null ){
			return tasks;
		}
		
		if( text.length == 0 )
		{
			return tasks;
		}
		
		tasks = JSON.parse(text);
	}
	catch(err)
	{
		//alert( "GetTasks. " + err.toString());
	}
	return tasks;
}

function selectBranch()
{
	try
	{
		var codigo = document.getElementById("v-codigo");
		var client = codigo.innerHTML;
		window.localStorage.setItem('client',client);
		window.location = 'list-cliente-branches.html';
	}
	catch(err)
	{
		alert("selectBranch. " + err.toString());
	}
}

function createPackage()
{
	try
	{
		window.localStorage.removeItem('tmpPackageName');
		window.location = 'list-package-types.html';
	}
	catch(err)
	{
		alert("CreatePackage. " + err.toString());
	}
}

function selectPackageType(packageName)
{
	try
	{
		window.localStorage.setItem('tmpPackageName', packageName);
		window.location = 'list-package-types.html';
	}
	catch(err)
	{
		alert("SelectPackageType. " + err.toString());
	}
}

function quantityMinus(packageName)
{
	try 
	{	
		var txtPackages = window.localStorage.getItem("tmpPackages");
		
		var packages = [];
		
		if( txtPackages != null )
		{
			if( txtPackages.length != 0 )
			{
				packages = JSON.parse(txtPackages);
			}
		}
		
		var encontrado = false;
		for( var i = 0; i <  packages.length && !encontrado; i++)
		{
			if( packages[i].packageName == packageName )
			{
				encontrado = true;
				
				if( packages[i].packageQuantity > 1 )
				{
					packages[i].packageQuantity = packages[i].packageQuantity - 1;
					packages[i].packageGroup = packages[i].packageQuantity;
					
					var quantity = document.getElementById("quantity" + packageName);
					var group = document.getElementById("group" + packageName);
					
					quantity.value = packages[i].packageQuantity;
					group.value = packages[i].packageGroup;
				}
			}
		}
		
		window.localStorage.setItem("tmpPackages",JSON.stringify(packages));
		
    } catch (err) {
    	alert("QuantityMinus. " + err.toString());
    }
}
function quantityPlus(packageName)
{
	try 
	{	
		var txtPackages = window.localStorage.getItem("tmpPackages");
		
		var packages = [];
		
		if( txtPackages != null )
		{
			if( txtPackages.length != 0 )
			{
				packages = JSON.parse(txtPackages);
			}
		}
		
		var encontrado = false;
		for( var i = 0; i <  packages.length && !encontrado; i++)
		{
			if( packages[i].packageName == packageName )
			{
				encontrado = true;
				
				packages[i].packageQuantity = packages[i].packageQuantity + 1;
				packages[i].packageGroup = packages[i].packageQuantity;
					
				var quantity = document.getElementById("quantity" + packageName);
				var group = document.getElementById("group" + packageName);
					
				quantity.value = packages[i].packageQuantity;
				group.value = packages[i].packageGroup;
			}
		}
		
		window.localStorage.setItem("tmpPackages",JSON.stringify(packages));
		
    } catch (err) {
    	alert("QuantityMinus. " + err.toString());
    }
}
function groupMinus(packageName)
{
	try 
	{	
		var txtPackages = window.localStorage.getItem("tmpPackages");
		
		var packages = [];
		
		if( txtPackages != null )
		{
			if( txtPackages.length != 0 )
			{
				packages = JSON.parse(txtPackages);
			}
		}
		
		var encontrado = false;
		for( var i = 0; i <  packages.length && !encontrado; i++)
		{
			if( packages[i].packageName == packageName )
			{
				encontrado = true;
				
				if( packages[i].packageGroup > 1 )
				{
					packages[i].packageGroup = packages[i].packageGroup - 1;
					
					var group = document.getElementById("group" + packageName);
					group.value = packages[i].packageGroup;
				}
			}
		}
		
		window.localStorage.setItem("tmpPackages",JSON.stringify(packages));
		
    } catch (err) {
    	alert("QuantityMinus. " + err.toString());
    }
}
function groupPlus(packageName)
{
	try 
	{	
		var txtPackages = window.localStorage.getItem("tmpPackages");
		
		var packages = [];
		
		if( txtPackages != null )
		{
			if( txtPackages.length != 0 )
			{
				packages = JSON.parse(txtPackages);
			}
		}
		
		var encontrado = false;
		for( var i = 0; i <  packages.length && !encontrado; i++)
		{
			if( packages[i].packageName == packageName )
			{
				encontrado = true;
				
				if( packages[i].packageGroup < packages[i].packageQuantity )
				{
					packages[i].packageGroup = packages[i].packageGroup + 1;
					
					var group = document.getElementById("group" + packageName);
					group.value = packages[i].packageGroup;
				}
			}
		}
		
		window.localStorage.setItem("tmpPackages",JSON.stringify(packages));
		
    } catch (err) {
    	alert("QuantityMinus. " + err.toString());
    }
}
function deletePackage(packageName)
{
	try
	{	
		if (!confirm('¿Desea borrar el paquete?')) {
			return;
		}	 
		
		var txtPackages = window.localStorage.getItem("tmpPackages");
		var packages = [];
		var newPackages = [];
		
		if( txtPackages != null )
		{
			if( txtPackages.length != 0 )
			{
				packages = JSON.parse(txtPackages)
			}
		}
		
		var contador = 0;
		for( var key in packages )
		{	
			var item = packages[key];
			if( String(item.packageName) != String(packageName) )
			{
				contador++;
				
				var pName = "Paquete " + contador;
				
				newPackages.push(
					{ 	packageName		: pName,
						packageTypeId	: item.packageTypeId,
						packageType		: item.packageType,
						packageQuantity	: item.packageQuantity, 
						packageGroup	: item.packageGroup
					}
				);
			}
		}
		
		window.localStorage.setItem("tmpPackages",JSON.stringify(newPackages));
		
		readPackages();
	}
	catch(err)
	{
		alert( "DeletePackage. " + err.toString());
	}
}

function readPackages()
{
	try
	{
		var txtPackages = window.localStorage.getItem("tmpPackages");
		var packages = [];
		
		if( txtPackages != null )
		{
			if( txtPackages.length != 0 )
			{
				packages = JSON.parse(txtPackages)
			}
		}
		
		var container = document.getElementById("packages-container-custom");
		container.innerHTML = "";
		
		template = document.getElementById("packageTemplate01").innerHTML;
		
		var html = "";
		
		for( var key in packages )
		{	
			var item = packages[key];
			
			var item_html = Mustache.render(template, item);
			html = html + " " + item_html;
		}

		container.innerHTML = html;
		
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
	}
	catch(err)
	{
		alert( "ReadPackages. " + err.toString());
	}
}

function cancelAll()
{
	if (confirm('Perdera todos los datos ¿Seguro desea cancelar?')) {
		clear();
	} 
}

function clear()
{
	try
	{
		var pde = document.getElementById("v-pde");
		var container = document.getElementById("packages-container-custom");
		
		pde.innerHTML = "";
		container.innerHTML = "";
		
		
		window.localStorage.removeItem('tmpBranch_pk');
		window.localStorage.removeItem('tmpBranch_pde');
		window.localStorage.removeItem('tmpBranch_name');
		window.localStorage.removeItem('tmpBranch_address');
		
		window.localStorage.removeItem('tmpPackageName');
		window.localStorage.removeItem("tmpPackages");
		
		window.history.back();
	}
	catch(err)
	{
		alert( "CancelAll. " + err.toString());
	}
}

function saveGuia()
{
	try
	{
		var taskId = window.localStorage.getItem('taskId');
		var guiaId = window.localStorage.getItem('guiaId');
		
		branch_pk = window.localStorage.getItem('tmpBranch_pk');
		branch_pde = window.localStorage.getItem('tmpBranch_pde');
		branch_name = window.localStorage.getItem('tmpBranch_name');
		branch_address = window.localStorage.getItem('tmpBranch_address');
		
		if( branch_pk == null || branch_pde == null || 
			branch_name == null || branch_address == null )
		{
			alert("Debe seleccionar un PDE antes de guardar.");
			return;
		}
		
		var txtPackages = window.localStorage.getItem("tmpPackages");
		var packages = [];
		
		if( txtPackages != null )
		{
			if( txtPackages.length != 0 )
			{
				packages = JSON.parse(txtPackages)
			}
		}
		
		if( packages.length == 0 )
		{
			alert("Debe agregar paquetes antes de guardar.");
			return;
		}
		
		var txtGuias = window.localStorage.getItem("guias");
		var guias = [];
		
		if( txtGuias != null )
		{
			if( txtGuias.length != 0 )
			{
				guias = JSON.parse(txtGuias);
			}
		}
		
		if( guiaId == null )
		{
			var numero = guias.length + 1;
			var nombre = "Guía " + numero;
			//var npackages = packages.length;
		
			guias.push(
				{ 	
					taskId			: taskId,
					name			: nombre,
					branch_pk		: branch_pk,
					branch_pde		: branch_pde,
					branch_name		: branch_name,
					branch_address	: branch_address,
					packages		: packages
				}
			);
		}
		else
		{
			for( var key in guias )
			{	
				var item = guias[key];
			
				if( String(item.taskId) == String(taskId) && 
					String(item.name) == String(guiaId)
				)
				{
					item.branch_pk 		= branch_pk;
					item.branch_pde 	= branch_pde;
					item.branch_name 	= branch_name;
					item.branch_address = branch_address;
					item.packages 		= packages;
				}
			}
		}
		
		window.localStorage.setItem("guias",JSON.stringify(guias));
		
		alert("Guía guardada con éxito.")
		clear();
	}
	catch(err)
	{
		alert( "SaveGuia. " + err.toString());
	}
}

















