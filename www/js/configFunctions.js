function initConfig()
{
	try
	{
		var ip = window.localStorage.getItem("ip");
		var port = window.localStorage.getItem("port");
		
		if( ip == null )
			ip = "";
		
		if( port == null )
			port = "";
		
		var inputIp = document.getElementById("ip");
		var inputPort = document.getElementById("port");
		
		inputIp.value = ip;
		inputPort.value = port;
	}
	catch(err)
	{
		alert( "InitConfig. " + err.toString() );
	}
}

function saveSettings()
{
	try
	{
		var inputIp = document.getElementById("ip");
		var inputPort = document.getElementById("port");
		
		var ip = inputIp.value;
		var port = inputPort.value;
		
		if( ip == null )
		{
			alert("Debe brindar una direccion IP.");
			return;
		}
		
		if( ip.length == 0 )
		{
			alert("Debe brindar una direccion IP.");
			return;
		}
		
		
		window.localStorage.setItem("ip",ip);
		window.localStorage.setItem("port",port);
		
		alert("Configuracion guardada con exito.");
		window.history.back();
	}
	catch(err)
	{
		alert( "InitConfig. " + err.toString() );
	}
}

function getConnSettings()
{
	var connString = "";
	
	try
	{
		var ip = window.localStorage.getItem("ip");
		var port = window.localStorage.getItem("port");
		
		if( ip == null )
			ip = "";
		
		if( port == null )
			port = "";
		
		connString = "http://" + ip ;
		
		if( port.length > 0 )
		{
			connString = "http://" + ip + ":" + port + "/";
		}
		else
		{
			connString = "http://" + ip + "/";
		}
	}
	catch(err)
	{
		alert( "GetConnSettings. " + err.toString() );
	}
	
	return connString;
}