function Timeoutcode(){
	getdate($('.am-tabs-nav').find('li.am-active').index()+1);
}

(function($) {
  'use strict';

  $(function() {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
      $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });


    var getWindowHeight = $(window).height(),
        myappLoginBg    = $('.myapp-login-bg');
    myappLoginBg.css('min-height',getWindowHeight + 'px');
    
    
    
    
  });
})(jQuery);

function jump(url){
	window.location.href=url;
}
function getTime(){
	if(cTime<0){
		document.getElementById("times").innerHTML="...";
		document.getElementById("timestwo").innerHTML="...";
		cTime--;
		if(cTime % 5==0 && cTime>-300){
			window.location.reload();
		}
	}else{
		document.getElementById("times").innerHTML=" <strong>"+cTime+"</strong>s";
		document.getElementById("timestwo").innerHTML=" <strong>"+cTime+"</strong>s";
		cTime--;
	}
	window.setTimeout('getTime()',1000);
}

function turne(num){
	return num==null?'':num>4?'Big':'Small';
}

function judgeNum(num1,num2){
	num1_ = num1>4?2:1;
	num2_ = num2>4?2:1;
	return num1_ == num2_ ? 'Win' : 'Lose';
}
function checkd(datas){
	let dnum = 0;
	for(let i=1;i<datas.length;i++){
		winlost = judgeNum(datas[i]['Draw_number'],datas[i]['Predict'])
		if (winlost=='Lose'){
			dnum = i*3;
		}else{
			if (i==1){dnum = 1;}
			break;
		}
	}
	return dnum;
}
function getdate(type){
	$.ajax({
		url:'./api.php?type='+type,
		type:'get',
		dataType :'json',
		async:true,
		success:function(data){
			do_data(data,type);
		},
		error:function(xhr){
			
		}
	})
}
function do_data(data,type){
	let str = '';
	for(let i=0;i<data.length;i++){
		let Period = data[i]['Period'];
		let Draw_number = data[i]['Draw_number'];
		Draw_number_ = Draw_number == null?'...':Draw_number;
		let Predict = data[i]['Predict'];
		let Predict_ = turne(Predict);
		if (Draw_number == null){
			let ddc = checkd(data);
			Predict_ += ddc<=0?'':'<span class="double">x'+ddc+'</span>'
		}
		let result = Draw_number == null?'...':judgeNum(Draw_number,Predict);
		str+='<tr> \
			<td>'+Period+'</td> \
			<td id="timestwo">'+Draw_number_+'</td> \
			<td>'+Predict_+'</td> \
			<td id="times">'+result+'</td> \
			</tr> \
			';
	}
	$('.am-active'+type).find('tbody').html(str)
}

getdate(1);
$('.am-tabs-nav>li').click(function(){
	getdate($(this).index()+1);
})
setInterval(Timeoutcode,5000);