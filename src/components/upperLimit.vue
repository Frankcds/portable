<template>
<div class="upperLimit-wrap">
	<!-- 中间部分 -->
	<div class="upperLimit-bg">
		<!-- 中间内容部分 -->
			<!-- 头部div -->
		<div class="upperLimit-header-img-box">
				<div class="upperLimit-header-sp"></div>
				<div class="upperLimit-samll-box"><img src="../../src/assets/upperLimit.png" height="630" width="644" class="upperLimit-logo" ref="moveImg" draggable="false"></div>
		</div>
		
			
			<!-- 底部部分 -->
		<div class="upperLimit-foot-box">
			<div class="upperLimit-box">
				<img src="../../src/assets/left.png" height="7" width="105" alt="" draggable="false">
				<span class="upperLimit-rule-text">使用规则</span>
				<img src="../../src/assets/right.png" height="7" width="105" alt="" draggable="false">
			</div>
			<!-- 文字部分 -->
			<p class="upperLimit-introduce-text">OOL充电宝，仅限OOL APP扫码开启后才可充电。
下载OOL APP，点击“扫码充电”，扫码充电宝上二维码或输入充电宝编号，即可开启充电开关。
OOL充电宝，还可以赚钱哦，下载APP了解。</p>

			<!-- 底部按钮部分 -->
			<button class="upperLimit-btn" @click="downApp">下载APP</button>
		</div>
	</div>
</div>
	

</template>


<script type="text/javascript">
	export default{
		methods:{
			downApp(){
				var ua = navigator.userAgent;
				var isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
				var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
				if(isIos){
					// alert('Ios');
					window.location.href+"https://itunes.apple.com/cn/app/ool/id1268908629?mt=8";
				}else if(isAndroid){
					// alert('Android');
					window.location.href="http://app.ool.vc/?uuid=123456789";
				}else{
					alert('都不是!');
				}
			}
		},
		mounted(){
			var moveImg = this.$refs.moveImg;
			var top=-636;
			var timer;
			var moveInt = setInterval(function(){
				top +=2;
				moveImg.style.top = top/100+"rem";
				if(top >= 0){
					clearInterval(moveInt);
				}
			},1)
		}
	}
</script>
<style type="text/css">
/*html{
		width:100%;
		height:100%;
		max-width: 10.24rem;
		max-height:13.66rem;
	}*/
	.upperLimit-wrap{
		/*overflow:scroll;*/
		/*overflow-y:hidden;*/
		width:7.5rem;
		height:13.32rem;
		/*max-width: 10.24rem;*/
		max-height:13.32rem;
		background:url('../../src/assets/bggOne.jpg') left top;
		background-repeat: repeat-y;
		background-size:100%;
		/*background-attachment: fixed;*/
		text-align:center;
		display:flex;
		align-items:center;
		margin:0 auto;
	}

	/*中间部分*/
	.upperLimit-bg{
		width:89%;
		height:93%;
		/*width:670px;
		height:1220px;*/
		background-size:6.74rem 12.2rem;
		/*position: fixed;*/
	    top: 0px;
	    left: 0px;
	    right: 0px;
	    bottom: 0px;
	    margin: auto;
	    /*display: flex;
		justify-content: center;*/
		/*align-items: center; */
	}


	/*头部div  图片部分*/
	.upperLimit-header-img-box{
		width:100%;
		height:7.32rem;
		position:relative;
	}
		
	.upperLimit-header-sp{

		width:6.78rem;
		height:0.3rem;
		border-radius:50px;
		background-color:transparent;
		border:4px solid #2e426d;
		position:absolute;
		top:0.3rem;
		left:-0.15rem;
	}
	.upperLimit-samll-box{
		width:6.48rem;
		height:6.36rem;
		margin:0 auto;
		position: absolute;  
        top: 0;
        left: 0;
        bottom: 0;
        right: 0; 
        margin: auto;
        overflow:hidden;
	}
	.upperLimit-logo{
		display:block;
		width:6.48rem;
		height:6.36rem;
		margin:0 auto;
		position: absolute;  
        top:-4.36rem;									/*控制图片下拉*/
	}


	

	/*底部部分*/
	.upperLimit-foot-box{
		width:100%;
		height:4.88rem;
		/*display:flex;
		justify-content:space-around;*/
		box-sizing:border-box;
		padding-top:0.35rem;
		position:relative;
	}
	.upperLimit-box{
		width:5.8rem;
		margin:0 auto;
		/*height:0.15rem;*/
		/*margin-top:-0.35rem;*/
		display:flex;
		justify-content:space-around;
		align-items:center;
	}
	.upperLimit-rule-text{
		font-size:0.3rem;
		color:#e5e5e5;
	}
	/*领取规则介绍文字部分*/
	.upperLimit-introduce-text{
		width:5.8rem;
		height:2rem;
		overflow:auto;
		font-size:0.24rem;
		color:#e5e5e5;
		margin:0 auto;
		margin-top:0.1rem;
		margin-left:0.5rem;
		line-height:0.4rem;
		letter-spacing:0.03rem;
		text-align:left;
	}
	/*修改滚动条样式*/
	/*.upperLimit-introduce-text::-webkit-scrollbar{
		width:6px;
		height:8px;
	}
	.upperLimit-introduce-text::-webkit-scrollbar-thumb{
		border-radius:10px;
		background-color:black;
	}
	.upperLimit-introduce-text::-webkit-scrollbar-track{
		border-radius:10px;
		background-color:white;
		width:5px;
	}*/

	/*底部左右图片部分*/
	.upperLimit-box img{
		width:2.02rem;
		height:0.15rem;
	}
	

	/*底部按钮部分*/
	.upperLimit-btn{
		outline:none;
		width:4rem;
		height:0.8rem;
		background-color:transparent;
		border:2px solid #ead200;
		font-size:0.36rem;
		color:#ead200;
		border-radius:0.40rem;
		line-height:0.6rem;
		position:absolute;
		margin:auto;
		left:0;
		bottom:0.76rem;
		right:0;
	}
</style>
