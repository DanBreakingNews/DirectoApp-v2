function initListClientBranches()
{
	try 
	{
		var container = document.getElementById("list-container-custom");
		container.innerHTML = "";
		
		CBService();
		
    } catch (err) {
    	alert("InitListClientBranches. " + err.toString());
    }
}

function CBService()
{
	try {
		var conn = getConnSettings(); 

        varType = "GET";
        varUrl = conn + "home/ClientBranches";
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
            					CBSSucceeded(msg);                    
                            },
                            error: CBSFailed// When Service call fails
        });
    } catch (err) {
    	alert("CBService. " + err.toString());
    }
}
function CBSSucceeded(branches)
{
	try 
	{
		hideLoadingDiv();
		window.localStorage.setItem('clientBranches', JSON.stringify(branches));
		readAll();
    } catch (err) {
    	alert( "CBSSucceeded. " + err.toString());
    }
}

function CBSFailed()
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
		var client = window.localStorage.getItem("client");
		var txtBranches = window.localStorage.getItem("clientBranches");
		var branches = [];
		
		if( txtBranches != null )
		{
			if( txtBranches.length > 0 )
			{
				branches = JSON.parse( txtBranches );
			}
		}
		
		var container = document.getElementById("list-container-custom");
		container.innerHTML = "";
		
		if( branches.length == 0 )
		{
			var errorBox = document.getElementById("error-box");
			errorBox.style.display = 'block';	
			return;
		}
		
		template = document.getElementById("template01").innerHTML;
		
		var html = "";
		
		for( var key in branches )
		{
			
			var item = branches[key];
			if( String(item.client) == String(client) )
			{
				var item_html = Mustache.render(template, item);
				html = html + " " + item_html;
			}
		}

		container.innerHTML = html;
		
    } catch (err) {
    	alert( "ReadAll. " + err.toString());
    }
}


function branchSelected(branch_pk,branch_pde,branch_name,branch_address)
{
	try 
	{
		window.localStorage.removeItem('client');
		
		window.localStorage.setItem('tmpBranch_pk',branch_pk);
		window.localStorage.setItem('tmpBranch_pde',branch_pde);
		window.localStorage.setItem('tmpBranch_name',branch_name);
		window.localStorage.setItem('tmpBranch_address',branch_address);
	
		window.history.back();
    } catch (err) {
    	alert("BranchSelected. " + err.toString());
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