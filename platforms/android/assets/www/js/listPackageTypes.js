function initListPackageType()
{
	try 
	{		
		var container = document.getElementById("list-container-custom");
		container.innerHTML = "";
		
		PTService();
		
    } catch (err) {
    	alert("InitListPackageType. " + err.toString());
    }
}

function PTService()
{
	try {
		var conn = getConnSettings(); 
		
		varType = "GET";
        varUrl =  conn +  "home/PackagesTypes";
        varData = "";

        varContentType = "application/json; charset=utf-8";
        varDataType = "json";
        varProcessData = true; 
            
        $.ajax({
			timeout		  : 5000, 
        	type          : varType, //GET or POST or PUT or DELETE verb
            url           : varUrl, // Location of the service
            data          : varData, //Data sent to server
            contentType   : varContentType, // content type sent to server
            dataType      : varDataType, //Expected data format from server
            processdata   : varProcessData, //True or False
            success       : function(msg) {//On Successfull service call
            					PTSSucceeded(msg);                    
                            },
                            error: PTSFailed// When Service call fails
        });
    } catch (err) {
    	alert("CBService. " + err.toString());
    }
}
function PTSSucceeded(types)
{
	try 
	{
		hideLoadingDiv();
		window.localStorage.setItem('packageTypes', JSON.stringify(types));
		readAll();
    } catch (err) {
    	alert( "CBSSucceeded. " + err.toString());
    }
}
function PTSFailed()
{
	try 
	{	
		hideLoadingDiv();
		readAll();
    } catch (err) {
    	alert("CBSFailed. " + err.toString());
    }
}

function readAll()
{
	try 
	{
		var txtTypes = window.localStorage.getItem("packageTypes");
		var types = [];
		
		if( txtTypes != null )
		{
			if( txtTypes.length > 0 )
			{
				types = JSON.parse( txtTypes );
			}
		}
		
		var container = document.getElementById("list-container-custom");
		container.innerHTML = "";
		
		if( types.length == 0 )
		{
			var errorBox = document.getElementById("error-box");
			errorBox.style.display = 'block';	
			return;
		}
		
		template = document.getElementById("template01").innerHTML;
		
		var html = "";
		
		var contador = 0;
		for( var key in types )
		{
			contador++;
			
			var item = types[key];
			
			var item_html = Mustache.render(template, item);
			html = html + " " + item_html;
		}

		container.innerHTML = html;
    } catch (err) {
    	alert( "ReadAll. " + err.toString());
    }
}

function typeSelected(id,name)
{
	try 
	{	var tmpPackageName = window.localStorage.getItem("tmpPackageName");
		var txtPackages = window.localStorage.getItem("tmpPackages");
		
		var packages = [];
		
		if( txtPackages != null )
		{
			if( txtPackages.length != 0 )
			{
				packages = JSON.parse(txtPackages);
			}
		}
		
		
		if( tmpPackageName == null )
		{	
			
			var number = packages.length + 1;
			var pName = "Paquete " + number;
		
			packages.push(
				{ 	packageName		: pName,
					packageTypeId	: id,
					packageType		: name,
					packageQuantity	: 1, 
					packageGroup	: 1
				}
			);
		}
		else
		{
			var encontrado = false;
			for( var i = 0; i <  packages.length && !encontrado; i++)
			{
				if( packages[i].packageName == tmpPackageName )
				{
					encontrado = true;
					packages[i].packageTypeId = id;
					packages[i].packageType = name;
				}
			}
		}
		
		window.localStorage.setItem("tmpPackages",JSON.stringify(packages));
		
		window.history.back();
		
    } catch (err) {
    	alert("TypeSelected. " + err.toString());
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