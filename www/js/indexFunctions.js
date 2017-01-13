function login() {
    try {
		
		showLoadingDiv();
		
		var conn = getConnSettings(); 
		
		var username = element = document.getElementById("username").value;
        var password = element = document.getElementById("password").value;
            
        if (username == null || username == "") {
			alert("Complete el nombre de usuario."); 
			hideLoadingDiv();
            return;  
        }
            
        if (password.length == 0 || password.length == 0) {
			alert("Complete la contraseña."); 
			hideLoadingDiv();
			return;
        }

        varType = "GET";
        varUrl = conn + "home/Authenticate";
        varData = 'Username=' + String(username) + 
				  '&Password=' + String(password);

        varContentType = "application/json; charset=utf-8";
        varDataType = "json";
        varProcessData = true; 
            
        $.ajax({
        	type          : varType, //GET or POST or PUT or DELETE verb
            url           : varUrl, // Location of the service
            data          : varData, //Data sent to server
            contentType   : varContentType, // content type sent to server
            dataType      : varDataType, //Expected data format from server
            processdata   : varProcessData, //True or False
            timeout		  : 5000,
			success       : function(msg) {//On Successfull service call
            					ServiceSucceeded(msg);                    
                            },
            error		  : ServiceFailed// When Service call fails
        });
    } catch (err) {
    	alert("login. " + err.toString());
    }
}
            
function ServiceSucceeded(result) {
	try
	{
		hideLoadingDiv();
		if(result.authenticated)
		{
			var clientBranches = result.clientBranches;
			var packageTypes = result.packageTypes;
		
			window.localStorage.setItem('clientBranches', JSON.stringify(clientBranches));
			window.localStorage.setItem('packageTypes', JSON.stringify(packageTypes));
		
			window.location = "home.html";
		}   
		else
		{
			alert("Usuaio y contraseña no concuerdan");
		}        
	}
	catch(err)
	{
		alert( "ServiceSucceeded. " + err.toString() );
	}  
}
            
function ServiceFailed(result) {
	try
	{
		hideLoadingDiv();
		window.localStorage.removeItem('clientBranches');
		window.localStorage.removeItem('packageTypes');
	
		alert("No se logro autentificar al usuario.");
	}
	catch(err)
	{
		alert( "ServiceFailed. " + err.toString() );
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

function goToConfig()
{
	try
	{
		window.location = 'config.html';
	}
	catch(err)
	{
		alert( "GoToConfig. " + err.toString() );
	}
}
/*
function getLocationDBM(){			
	try
	{
		//var storage = window.localStorage;
		//storage.setItem("mensaje", "Soy la flor silvestre que marchito el olvido"); 
		//var value = storage.getItem("mensaje");
		//storage.removeItem("mensaje");
		//alert(value);
		
		window.plugins.GPSDanBreakingNews.getGPSLocation([], resulto, noresulto);
	}
	catch(e)
	{
		alert(e.message);
	}
}
		
function resulto(resultado)
{
	if (resultado != null) {
		if( resultado.latitud <= 0 ||  resultado.longitud <= 0)
        {
			alert("Error, no se ha logrado obtener la ubicacion geográfica. Vuelva a intentarlo");   
			return;
        }
		
		alert(String(resultado));
				
		window.location = "home.html";
    } 
	else 
	{
		alert("Error, no se ha logrado obtener la ubicacion geográfica. Vuelva a intentarlo");
    }
}
		
function noresulto(mensaje)
{
	if (mensaje != null) 
	{	
		mensaje = mensaje.replace("á","&aacute;");
		mensaje = mensaje.replace("e","&eacute;");
		mensaje = mensaje.replace("í","&iacute;");
		mensaje = mensaje.replace("o","&oacute;");
		mensaje = mensaje.replace("ú","&uacute;");
		
		alert("Llama al plugin. " + mensaje);
    } 
	else 
	{
		alert("Error, no se puede leer la configuracion de su celular");    
    }
}
*/