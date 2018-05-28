<template>
<div class="fail-wrap">
	<!-- 中间部分 -->
	<div class="fail-bg">
		<!-- 中间内容部分 -->
			<!-- 头部div -->
		<div class="fail-header-img-box">
				<div class="fail-header-sp"></div>
				<div class="fail-samll-box">
					<img src="../../src/assets/failLogo.png" height="630" width="644" class="fail-logo" ref="moveImg" v-if="seen" draggable="false">
					<img src="../../src/assets/failLogo2.png" class="fail-logo2" ref="moveImg2" v-if="seenImg" draggable="false">
				</div>
				
				<!-- <div class="fail-samll2-box"></div> -->
				
		</div>
		
			
			<!-- 底部部分 -->
		<div class="fail-foot-box">
			<div class="fail-box">
				<img src="../../src/assets/left.png" height="7" width="105" alt="" draggable="false">
				<span class="fail-rule-text">失败原因</span>
				<img src="../../src/assets/right.png" height="7" width="105" alt="" draggable="false">
			</div>
			<!-- 文字部分 -->
			<div class="fail-introduce-text">
				<p>1、若是网络不好，请在4G情况下重新领取;</p>
				<p>2、若是立柜机故障，请联系电话400-018-8626或至其它立柜机领取;</p>
			</div>

			<!-- 底部按钮部分 -->
			<button class="fail-btn" @click="goBack">重新领取</button>
		</div>
	</div>
</div>
	

</template>


<script type="text/javascript">
	export default{
		data(){
			return{
				seen:true,
				seenImg:false
			}
		},
		methods:{
			goBack(){
				this.$router.push({path:'/'})
			}
		},
		mounted(){
			var moveImg = this.$refs.moveImg;
			var top=-636;
			var _this = this;
			var seen = _this.seen;
			var seenImg = _this.seenImg;
			var moveInt = setInterval(function(){
				top +=2;
				moveImg.style.top = top/100+"rem";
				if(top >= 0){
					_this.seen = false;
					_this.seenImg = true;
					clearInterval(moveInt);
				}
			},1)
		}
	}
</script>
<style type="text/css">
	.fail-wrap{
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
	.fail-introduce-text p {
		text-indent: -20px;
		margin-left: 20px;
	}

	/*中间部分*/
	.fail-bg{
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
	.fail-header-img-box{
		width:100%;
		height:7.32rem;
		position:relative;
	}
		
	.fail-header-sp{

		width:6.78rem;
		height:0.3rem;
		border-radius:50px;
		background-color:transparent;
		border:4px solid #2e426d;
		position:absolute;
		top:0.3rem;
		left:-0.15rem;
	}
	.fail-samll-box{
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
	.fail-logo{
		display:block;
		width:6.48rem;
		height:6.36rem;
		margin:0 auto;
		position: absolute;  
        /*top:-4.36rem;	*/								/*控制图片下拉*/
	}
	.fail-logo2{
		display:block;
		width:6.48rem;
		height:6.36rem;
		margin:0 auto;
		position: absolute;
	}


	

	/*底部部分*/
	.fail-foot-box{
		width:100%;
		height:4.88rem;
		/*display:flex;
		justify-content:space-around;*/
		box-sizing:border-box;
		padding-top:0.35rem;
		position:relative;
	}
	.fail-box{
		width:5.8rem;
		margin:0 auto;
		/*height:0.15rem;*/
		/*margin-top:-0.35rem;*/
		display:flex;
		justify-content:space-around;
		align-items:center;
	}

	.fail-rule-text{
		font-size:0.3rem;
		color:#e5e5e5;
	}
	/*领取规则介绍文字部分*/
	.fail-introduce-text{
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
	/*.fail-introduce-text::-webkit-scrollbar{
		width:6px;
		height:8px;
	}
	.fail-introduce-text::-webkit-scrollbar-thumb{
		border-radius:10px;
		background-color:black;
	}
	.fail-introduce-text::-webkit-scrollbar-track{
		border-radius:10px;
		background-color:white;
		width:5px;
	}*/

	/*底部左右图片部分*/
	.fail-box img{
		width:2.02rem;
		height:0.15rem;
	}
	

	/*底部按钮部分*/
	.fail-btn{
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
