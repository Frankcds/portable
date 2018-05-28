<template>

<div class="receive-wrap">
	<!-- {{message}} -->
	<!-- 用户是否已经关注弹框 -->
	<div class="receive-follow-popBg" v-if="whether">
		<div class="receive-follow-popBox">
			<div class="receive-follow-text">关注OOL公众账号后即可免费领取充电宝</div>
			<button class="receive-follow-true" @click="follow">去关注</button>
			
		</div>
	</div>

	<!-- 中间部分 -->
	<div class="receive-bg">
		<!-- 中间内容部分 -->
			<!-- 头部div -->
		<div class="receive-header-img-box">
			<img src="../../src/assets/logo.png" height="231" width="490" alt="logo" class="receive-logo" draggable="false">
		</div>
			<!-- 手机号部分 -->
		<div class="receive-verification">
			<input type="text" class="receive-ipt" placeholder="请输入11位手机号码" ref="num" maxlength="11">
			<div class="receive-vfCode-box">
				<input type="text" class="receive-ipt2" placeholder="请输入验证码" maxlength="6" ref="vfcode" v-if="inpCode">
				<button class="receive-sp" @click="obtain" ref="obt" v-if="obtCode">获取验证码</button>
			</div>
			
			<!-- disabled 禁用-->
			<!-- enabled 启用-->
			<!-- 验证发送成功弹窗部分 -->
			<div class="receive-popups-box" ref="popups">
				<img src="../../src/assets/successfulLogo.png" height="40" width="40" class="receive-successful-logo" draggable="false">
				<div class="receive-popups-text">验证码已发</div>
			</div>

			<!-- 验证码错误弹窗部分 -->
			<div class="receive-popups-error-box" ref="codeErr">
				<img src="../../src/assets/symbol.png" height="40" width="40" class="receive-successful-logo" draggable="false">
				<div class="receive-popups-text">验证码输入有误</div>
			</div>

			<!-- 手机判断错误弹窗部分 -->
			<div class="receive-popups-box2" ref="popupsM">
				<img src="../../src/assets/symbol.png" class="receive-successful-logo" draggable="false">
				<div class="receive-popups-text">手机号输入有误,请重新输入</div>
			</div>
		</div>
			
			<!-- 底部部分 -->
		<div class="receive-foot-box">
			<div class="receive-box">
				<img src="../../src/assets/left.png" height="7" width="105" alt="" draggable="false">
				<span class="receive-rule-text">领取规则</span>
				<img src="../../src/assets/right.png" height="7" width="105" alt="" draggable="false">
			</div>
			<!-- 文字部分 -->
			<p class="receive-introduce-text">OOL充电宝免费领取。领取时，仅需通过微信扫码，填写领取手机号即可。为方便更多用户使用，每个手机号每天只可领取限定次数的充电宝哦。</p>

			<!-- 底部按钮部分 -->
			<button class="receive-btn" @click="goTo" ref="free">免费领取</button>
		</div>
	</div>

	
</div>
	

</template>
<script type="text/javascript">
	import param from '../js/href-parameter.js'
	export default{
		data(){
			return{
				//verfCode:null,									//验证码
				whether:false,										//是否关注弹框
				// codeTime:null,									//当前倒计时的时间									
				time:60,											//倒计时时间
				newOpenId:null,
				random:null,											//立柜机链接里的随机数
				uuid:null,												//立柜机uuid
				epc:null,										//设备uuid
				inpCode:true,										//验证码输入框是否显示
				obtCode:true										//获取验证码按钮是否显示
			}
		},
		//页面载入时
		
		mounted(){
			var _this = this;
			var openid = _this.$route.query.openid;				//获取链接里的openid;
			 var uuid = param.get('cabinetUuid');			//获取链接里立柜机的uId;
			 var random = param.get('random');				//获取链接里的随机数;
			 var epc = param.get('epc');					//获取设备id

			

			var newOpenId = _this.newOpenId;
			var numVal = _this.$refs.num;						//手机号输入框
			var regnum = /^1(3|4|5|7|8)\d{9}$/;	

			_this.epc = epc;
			_this.random = random;
			_this.uuid = uuid;


			//微信鉴权
			// if(openid === undefined || openid === ''){
			// 	window.location.href="http://wx.ool.vc/wx.php?epc="+epc+"&uuid="+uuid+"&random="+random;
			// 	_this.newOpenId = openid;
			// 	return;
			// }
			_this.newOpenId = openid;
			// var follow = param.get('follow');
			// if(follow == 1){
			// 	_this.whether = false;
			// }else{
			// 	_this.whether = true;
			// }



				//发送请求 获取手机号;

			var qs = require('qs');
			var userOpenid = {
				"openid":openid
			}

			this.$http.post('http://test.ool.vc/chargerbaby-app-server/wechat/getPhone',JSON.stringify(userOpenid),{
					 	 headers: {
    						'Content-Type': 'application/json;charset=UTF-8'
  						}
					 }).then(function (res) {
					     if(regnum.test(res.data.datas)){
					     	alert("res.datas:"+res.datas);
					     	numVal.value = res.data.datas;		//获取手机号并且填写
					     	_this.inpCode = false;
					     	_this.obtCode = false;
					     	numVal.style.marginTop = 1.15+"rem";
					     	numVal.setAttribute("readonly",true);
					     }else{
					     	console.log("该openid尚未登录");
					     }
					 })
					   .catch(function (error) {
					     alert(error);
					 });


			var whether = this.whethier;
			var timer = localStorage.getItem("time");
			var obt = this.$refs.obt;
			var oldTime = localStorage.getItem("oldTime");
			var newTime = Date.now();
			var difference = Math.round((newTime-oldTime)/1000);
			var nowTime = (timer - difference);
			var userWxOpenid = null;
			var id = null;
			

			//防止页面刷新倒计时失效
			if(nowTime > 0){
				obt.innerText = nowTime + '秒';
				obt.setAttribute('disabled',true);
				var codetime = setInterval(function(){
						obt.innerText = nowTime + '秒';
						nowTime--;
						if(nowTime < 0){
							clearInterval(codetime);
							obt.innerText = '获取验证码';
							obt.removeAttribute('disabled');
						}
				},1000)
			}else{
				obt.innerText = '获取验证码';
				obt.removeAttribute('disabled');
			}
			
		},
		methods:{

			//获取验证码

			obtain(){
				var _this = this;
				var regnum = /^1(3|4|5|7|8)\d{9}$/;					//手机号正则
				var numVal = this.$refs.num;						//手机号输入框
				var popupsM = this.$refs.popupsM;					//手机号错误弹框
				var popups = this.$refs.popups;						//验证码正确弹框
				var obt = this.$refs.obt;							//短信按钮
				var time = this.time;								//倒计时时间
				var oldTime = null;
				var free = this.$refs.free;							//领取按钮


				//手机号码 是否正确
				if(!regnum.test(numVal.value) && obt.innerText === '获取验证码'){						//手机号码不正确的时候
					popupsM.style.visibility = 'visible';			//让错误框可见
					popupsM.style.opacity = 1;			
					if(popupsM.style.visibility === 'visible'){		
						obt.setAttribute('disabled',true);			//设置按钮为禁用
						free.setAttribute('disabled',true);
					}

					setTimeout(function(){
						obt.removeAttribute('disabled');		
						popupsM.style.visibility = 'hidden';
						popupsM.style.opacity = 0.5;
						free.removeAttribute('disabled');
					},2000)
				}else if(obt.innerText === '获取验证码' && regnum.test(numVal.value)){
					var numVal = this.$refs.num.value;
					var vfcode = this.$refs.vfcode.value;
					var codeErr = this.$refs.codeErr;
					var free = this.$refs.free;
					var openID = _this.newOpenId;
					var params = {
						"phone":numVal,
					 	"type":0
					}


					// var qs = require('qs');

					//发送请求获取验证码
					 this.$http.post('http://test.ool.vc/chargerbaby-app-server/sendMsgCode',JSON.stringify(params),{
					 	 headers: {
    						'Content-Type': 'application/json;charset=UTF-8'
  						}
					 }).then(function (res) {
					     if(res.data.code == 200 && res.data.msg == "OK"){
					     	obt.setAttribute('disabled',true);
							popups.style.visibility = 'visible';
							popups.style.opacity = 1;
							free.setAttribute('disabled',true);
							setTimeout(function(){
								popups.style.visibility = 'hidden';
								popups.style.opacity = 0.5;
								free.removeAttribute('disabled');
							},2000);
							var codetime = setInterval(function(){
								obt.innerText = time + '秒';
								time--;
								if(time < 0){
									obt.removeAttribute('disabled');
									clearInterval(codetime);
									obt.innerText = '获取验证码';
									time = 10;	
								}
								oldTime = Date.now();
								localStorage.setItem("oldTime",oldTime);
								localStorage.setItem("time",time);
							},1000);
					     }else if(res.data.code == 9106){			//验证码发送失败
					     	alert("验证码发送失败");
					     }
					 })
					   .catch(function (error) {
					     console.log(error);
					 });

					
				}
			},

			//路由跳转部分
			goTo(){
				var _this = this;
				var numVal = this.$refs.num.value;			//输入的手机号
				var vfcode = this.$refs.vfcode.value;		//验证码输入框的值
				var codeErr = this.$refs.codeErr;
				var free = this.$refs.free;
				var obt = this.$refs.obt;
				var popupsM = this.$refs.popupsM;					//手机号错误弹框
				var codeRx = /^[\d]{6}$/;							//短信正则
				var regnum = /^1(3|4|5|7|8)\d{9}$/;					//手机号正则
				// var newUId = localStorage.getItem('uuid');			//获取到立柜机的UID
				var newUId = _this.uuid									//获取到立柜机的UID



				
				// 判断验证码是否正确部分
				if(regnum.test(numVal)){		//判断手机号与验证码是否符合
					var params = {
						'mobilephone':numVal,
						'valiCode':vfcode,
						'openid':_this.newOpenId,
						'cabinetUuid':newUId,
						'random':_this.random,
						'epc':_this.epc
					}

					// var qs = require('qs');
					this.$http.post('http://test.ool.vc/chargerbaby-app-server/wechat/getDevice',JSON.stringify(params),{
					 	 headers: {
    						'Content-Type': 'application/json;charset=UTF-8'
  						}
					 }).then(function (res) {
					     //
					     if(res.data.code == 200){				//成功

					     	//设备轮询结果
					     	var datas = res.data.datas;
					     	var count = 0;
					     	var pollingTimer = setInterval(function(){
					     		
					     		_this.$http.post('http://test.ool.vc/chargerbaby-app-server/wechat/getDeviceCheck',JSON.stringify(datas),{
						     		headers: {
	    								'Content-Type': 'application/json;charset=UTF-8'
	  								}
						     	}).then(function(res){
						     		console.log(res);
						     		if(res.data.code == 200 && res.data.datas.status == 1){
						     			clearInterval(pollingTimer);
						     			_this.$router.push({path:'/Successful'});
						     		}else if(res.data.code == 1020){
						     			clearInterval(pollingTimer);
						     			console.log("请求超时");
						     		}else if(res.data.datas.status == 0 && count == 5){
						     			clearInterval(pollingTimer);
						     			_this.$router.push({path:'/Fail'});
						     		}
						     	})
						     	count++;
						     },1000);
					     	
					     }else if(res.data.code == 9103){		//验证码错误
					     	codeErr.style.visibility = "visible";
							codeErr.style.opacity = 1;
							obt.setAttribute('disabled',true);
							free.setAttribute('disabled',true);
							setTimeout(function(){
								codeErr.style.visibility = "hidden";
								codeErr.style.opacity = 0.5;
								free.removeAttribute('disabled');
								obt.removeAttribute('disabled');
							},2000);
					     }else if(res.data.code == 9114){
					     	_this.$router.push({path:'/upperLimit'});		  //已达到上限页面
					     }else if(res.data.code == 9112){
					     	_this.$router.push({path:'/Fail'});
					     }else if(res.data.code == 408){
					     	alert("请求超时");
					     }else if(res.data.code == 500){
					     	alert("系统繁忙,请稍后再试");
					     	console.log(params);
					     }

					      
					 })
					   .catch(function (error) {
					     console.log(error);
					 });

					
				}else if(regnum.test(numVal) === false){
					popupsM.style.visibility = "visible";
					popupsM.style.opacity = 1;
					obt.setAttribute('disabled',true);
					free.setAttribute('disabled',true);
					setTimeout(function(){
						popupsM.style.visibility = "hidden";
						popupsM.style.opacity = 0.5;
						free.removeAttribute('disabled');
						obt.removeAttribute('disabled');
					},2000);
				}else if(codeRx.test(vfcode) === false){
					codeErr.style.visibility = "visible";
					codeErr.style.opacity = 1;
					obt.setAttribute('disabled',true);
					free.setAttribute('disabled',true);
					setTimeout(function(){
						codeErr.style.visibility = "hidden";
						codeErr.style.opacity = 0.5;
						free.removeAttribute('disabled');
						obt.removeAttribute('disabled');
					},2000);
				}
				
			},
			follow(){
				window.location.href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyMzk0NzAyMA==&scene=110#wechat_redirect";	//关注的链接地址
			}
		}

	}
</script>
<style type="text/css">
	@import '../css/receiveStyle.css'
</style>