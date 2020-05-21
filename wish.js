window.onload = function() {
	logIn();
	$('.frame').css('height',window.innerHeight+'px');
	document.getElementById('wish_content').select();
}

var wishPaper = 0;
var wishContent = '';
var wishName = '';
var wishPhone = '';
var wishWechat = '';

function selectPaper(num) {
	wishPaper = num;
	$('.btn_paper').html('');
	$('.btn_paper').css('background-color','rgba(78,92,89,0.5)');
	$('#btn_paper'+num).html('✔');
	$('#btn_paper'+num).css('background-color','currentColor');
}

function collectData() {	//内容-内容-()-检查-发送。完成内容后，检查页前，除了信纸之外的信息收集，外加判断
	wishContent = document.getElementById('wish_content').value;	//直接记录内容，是否非法后面检测
	wishName = document.getElementById('wish_name').value;	//直接记录姓名，是否非法后面检测
	if(document.getElementById('wish_phone').value.replace(/ /g, "")!='') {	//如果电话是空的（或只含空格），就记录100
		wishPhone = document.getElementById('wish_phone').value;
	}
	else {wishPhone = '10000000000'}
	
	if(document.getElementById('wish_wechat').value.replace(/ /g, "")!='') { //如果微信是空的（或只含空格），就记录'null'
		wishWechat = document.getElementById('wish_wechat').value;
	}
	else {wishWechat = 'null'}

	var alertWord='';

	if(wishContent.replace(/ /g, "") == '') {alertWord+='信的内容不得为空或只含空格\n'}
	if(wishName.replace(/ /g, "") == '') {alertWord+='署名不得为空或只含空格\n'}
	if(wishPhone == '10000000000' && wishWechat == 'null') {alertWord+='手机号和微信号至少填写一项\n'}
	if(wishPhone!='10000000000') {
		if(!(/^1\d{10}$/.test(wishPhone))){
        alertWord+='若填写手机号，则手机号必须为1开头、11位\n';
    	}
	}
	if(alertWord!='') {
		alert(alertWord);
	}
	else {
		printData();
	}
}

function printData() {	//将信息重新打一遍供检查
	goTo('p3');
	$('#confirm_name').html(wishName);
	if(wishPhone == '10000000000') {
		$('#confirm_phone').html('保密');
	}
	else {
		$('#confirm_phone').html(wishPhone);
	}
	if(wishWechat == 'null') {
		$('#confirm_wechat').html('保密');
	}
	else {
		$('#confirm_wechat').html(wishWechat);
	}
	$('#confirm_content').html(wishContent);
}

var x3 = new XMLHttpRequest(); //许愿请求 - post - wish

function sendWish() {
	x3.open('post',baseurl + '/playground/player/wish', false);
	x3.withCredentials = true;
	x3.setRequestHeader('Content-Type','application/json');

	x3.onload = () => {
		if(x3.status !== 200) {
			alert('许愿请求出错，状态码为'+x3.status+'，出错信息为'+JSON.parse(x3.responseText).message);
		}
		else {
			goTo('p4');
		}
	}
	x3.onerror = () => {
		alert('登录请求出错，网络异常');
	}

	x3.send(JSON.stringify({"title": "","content": wishContent,"paper": wishPaper,"name": wishName,"tel": wishPhone,"wechat": wishWechat}));
}