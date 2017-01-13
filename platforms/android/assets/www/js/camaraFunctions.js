
var pictureSource;   
var destinationType; 


$( document ).ready(function() {
    try
	{
		var height = $(window).height();  
		height = height - 76;
		
		var smallImage = document.getElementById('smallImage');
		smallImage.style.height = height + 'px';
		
		var taskId = window.localStorage.getItem('taskId');
		
		var text = window.localStorage.getItem("tPhotos");
		var photos = [];
		
		if( text != null ){
			if( text.length > 0 )
			{
				photos = JSON.parse(text);
			}
		}
		
		var encontrado = false;
		for( var i = 0; i < photos.length && !encontrado; i++ )
		{
			if( String(photos[i].taskId) == String(taskId) )
			{
				encontrado = true;
				if( photos[i].picture.length > 0 )
				{
					var smallImage = document.getElementById('smallImage');
					smallImage.style.display = 'block';
					smallImage.src = "data:image/jpeg;base64," + photos[i].picture;
				}
			}
		}
	}
	catch(err)
	{
		alert("OnReady. " + err.toString());
	}
});

function capturePhoto() {
	try
	{
		var offsetWidth = document.getElementById('smallImage').offsetWidth;
		var offsetHeight = document.getElementById('smallImage').offsetHeight;
		
		var width = parseInt(String(offsetWidth));
		var height = parseInt(String(offsetHeight));
		
		navigator.camera.getPicture
		(	onPhotoDataSuccess, 
			onFail, 
			{ 	quality				: 50,
				destinationType		: 0,
				mediaType			: 0,
				cameraDirection		: 1,
				correctOrientation	: true,
				targetWidth			: width,
				targetHeight		: height
			}
		);
	}
	catch(err)
	{
		alert("CapturePhoto. " + err.toString());
	}
}

function onPhotoDataSuccess(imageData) 
{
	try
	{
		var smallImage = document.getElementById('smallImage');
		smallImage.style.display = 'block';
		smallImage.src = "data:image/jpeg;base64," + imageData;
		
		var taskId = window.localStorage.getItem('taskId');
		var text = window.localStorage.getItem("tPhotos");
		var photos = [];
		
		if( text != null ){
			if( text.length > 0 )
			{
				photos = JSON.parse(text);
			}
		}
		
		var encontrado = false;
		for( var i = 0; i < photos.length && !encontrado; i++ )
		{
			if( String(photos[i].taskId) == String(taskId) )
			{
				encontrado = true;
				photos[i].picture = imageData;
			}
		}
		
		if( !encontrado )
		{
			photos.push(
				{ 	
					taskId	: taskId,
					picture	: imageData
				}
			);
		}
		
		window.localStorage.setItem("tPhotos",JSON.stringify(photos));
	}
	catch(err)
	{
		alert("CapturePhoto. " + err.toString());
	}
}
	
function onFail(message) {
	alert('Failed because: ' + message);
}

function clearPhoto()
{
	try
	{
		var smallImage = document.getElementById('smallImage');
		smallImage.style.display = 'block';
		smallImage.src = "";
		
		var taskId = window.localStorage.getItem('taskId');
		var text = window.localStorage.getItem("tPhotos");
		var photos = [];
		
		if( text != null ){
			if( text.length > 0 )
			{
				photos = JSON.parse(text);
			}
		}
		
		var encontrado = false;
		for( var i = 0; i < photos.length && !encontrado; i++ )
		{
			if( String(photos[i].taskId) == String(taskId) )
			{
				encontrado = true;
				photos[i].picture = "";
			}
		}
		
		window.localStorage.setItem("tPhotos",JSON.stringify(photos));
	}
	catch(err)
	{
		alert("CapturePhoto. " + err.toString());
	}
}