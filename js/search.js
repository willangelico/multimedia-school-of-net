function search(){
	var search = document.getElementById("search").value;
	if(search === "" ){
		document.getElementById("iframe").style.display = "none";		
	}else{
		document.getElementById("iframe").style.display = "inline-block";
	}
	var url = "http://www.youtube.com/embed?listType=search&channel=UCgalanuPiVJUqHnE17OoW6Q&list=";
	document.getElementById("iframe").src = url + search;

}