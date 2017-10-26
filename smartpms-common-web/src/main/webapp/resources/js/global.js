imports("uiplugin.popup");

function showPopup(url, id, w, h, top, left, name, srcData, type){
	var scrollTop = (document.documentElement && document.documentElement.scrollTop || document.body && document.body.scrollTop);
	var cw = document.documentElement.clientWidth;
	var ch = document.documentElement.clientHeight;
	
	top = (ch / 2 - h / 2) + scrollTop;
	left = cw / 2 - w / 2;
	
	if((top-scrollTop) < 0) top = scrollTop;
	if(left < 0 ) left = 0;
	
	WebSquare.uiplugin.popup.openPopup(url, {
		id : id,
		type : type,
		 //type popup 객체의 type으로  window, browser 중 하나  browser type의 경우 useIFrame 속성과 상관없이 window.open으로 열립니다.
		width: w+"px",
		height: h+"px",
		top: top+"px",
		left: left+"px",
	 
		popupName : name, //popupName popup 객체의 이름입니다.
		modal : true,
		useIFrame : true,
		style : "",
	 
		// popup option
		resizable : true,
		status : "",
		menubar : false,
		scrollbars : true,
		title : true,
	 
		srcData: srcData,  //부모창의 xPath 지정 
		destData: "fromMain"  //자식창의 xPath 지정
	});
}

function emptyChk(form_name, title_tag){
	var result = true;
	$(".emptyChk").each(function(){
		var input_id = $(this).attr("id");
		var input_title = $(this).attr("title");
		if(isValidInputEmpty($(this).val())){
			alert(input_title + " : 필수 항목입니다.");
			$("#"+input_id).focus();
			result = false;
			return false;
		}
	});
	return result;
}

function isValidInputEmpty(val){
	val = val.replace(/\s+$/g,"");
	if(val == ""){
		return true;
	}
	return false;
}

function validDate(val){	
	var rtnVal = val;
	var isOk = true;
	
	if(val.length != 8){
		isOk = false;
	}else{
		var yyyy = Number(val.substring(0,4));
		var mm = Number(val.substring(4,6));
		var dd = Number(val.substring(6,8));
		
		if(yyyy < 1000 || yyyy > 3000){ isOk = false; }
		if(mm < 1 || mm > 12){
			isOk = false; 
		}else{
			var endDate = 0;
			if(mm == 2){
				if(yyyy % 4 == 0){
					endDate = 29;
				}else{
					endDate = 28;
				}
			}else if(mm == 1 || mm == 3 || mm == 5 || mm == 7 || mm == 8 || mm == 10 || mm == 12){
				endDate = 31;
			}else{
				endDate = 30;
			}
			
			if(dd < 1 || dd > endDate){ isOk = false; }
		}
	}
	
	if(val == ""){ isOk = true;}
	
	if(!isOk){
		alert("날짜 형식에 맞지 않습니다.");
		rtnVal = "";
	}
	
	return rtnVal;
}

function changeDateFormat(value){
	return value.substring(5,10);
}

function changeYnFormat(value){
	return value.replace("N", "");
}

function ynFormatter(data, formattedData, rowIndex, colIndex){
	var rtnData = "";
	if(data == "Y"){
		rtnData = "Y";
	}else{
		rtnData = "N";
		this.setCellBackgroundColor(rowIndex, colIndex, "#fdf0f3");
	}
	
	this.setCellData(rowIndex, colIndex, rtnData);
	
	return rtnData;
}

function excelDown(grid,fileName,removeColumns){
	var options = {};
    options.fileName = fileName; 			
	options.type  = "0"; 						
	options.startRowIndex = 0; 			
	options.startColumnIndex = 0; 		
	options.removeColumns = removeColumns;
	options.headerColor = "#EEEEEE";
	options.useStyle = true;
	
	grid.advancedExcelDownload(options);
}

function fileAllowCSVChk(fileObj){
	if(!fileObj.getValue().toLowerCase().match(/(.csv)/)){
		alert("CSV 파일만 첨부 가능합니다.");
		fileObj.reset();
	}
}

function fileAllowEXCELChk(fileObj){
	if(!fileObj.getValue().toLowerCase().match(/(.xlsx|.xls)/)){
		alert("EXCEL[xls,xlsx] 파일만 첨부 가능합니다.");
		fileObj.reset();
	}
}

function helpWinOpen(help){
	showPopup("/pss1/resource/xml/cmn/help.xml&help="+help, "help", "1000", "600", "0", "0", "HELP", "");
}