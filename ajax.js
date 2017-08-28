			//  由于每次使用ajax请求服务器 ，都有大量重复代码，为了提高开发效率，避免 代码冗余需要封装一个插件
    		// 如何封装方法：
    		// 	  1、把公共相同的点封装起来  
    		//    2-变换的部分 以参数的形式提取出来

    		//变化的部分：
    		//1-请求方式 type: get post
    		//2-请求的地址url
    		//3-传递给服务器的数据  data
    		//4-渲染数据的方法 callback


    		//1-命名空间 避免全局污染
    		//
    		//2-参数问题：function(type,url,data,callback) 这种定义方法的方式，问题是
    		// 方法在调用时 传递参数顺序必须和定义时一一对应，否则会出错
    		// 
    		// 如何优化：  使用对象作为方法的参数

    		// var itcast={
    		// 	ajax:function(type,url,data,callback){
    		// 		callback();
    		// 	}
    		// }



    		// itcast.ajax('get','01.php',null,function(){alert(222)});

    		///itcast.ajax('get','01.php',function(){alert(111)},{name:'zs'});

    		var  $={

    			ajax:function(obj){
    				//数据在要验证  验证调用者传递参数
    				var type=obj.type||'get'; //默认请求方式为get
    				var url=obj.url||location.href; // 默认请求当前页面
    				var callback=obj.callback;
    				var data=this.setParam(obj.data); //服务接受的数据格式是 {name:'zs',age:18} --> name=zs&age=18



    				//请求服务器开始了
    				var xhr=new XMLHttpRequest(); //实例化XMLHttpRequest

    				if(type=='get'){
    					url=url+'?'+data; //如果是get请求先把数据拼接好
    					data=null;
    				}

    				xhr.open(type,url);  //请求行

    				if(type=='post'){ //如果是post请求设置请求头部
    					xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    				}

    				xhr.send(data); //请求主体发送

    				//监听服务器的响应
    				xhr.onreadystatechange=function(){
    					if(xhr.readyState==4&&xhr.status==200){
    						//获取服务器返回数据
    						var r=xhr.responseText; //假设服务器返回的数据是json
    						r=JSON.parse(r);
    						//执行渲染的操作
    						callback&&callback(r); //渲染服务器返回的数据；
    					}
    				}
    			}
    			,
    			//用于将对象 {name:zs,age:18}  转成 name=zs&age=18
    			setParam:function(data){
    				if(typeof data=='object'){
    					var s='';
    					for(var key in data){
    						s+=key+'='+data[key]+'&';
    					}   					
    					//去掉最后一个&
    					s=s.slice(0,s.length-1); // 截取的起点（索引值） ，截取的长度    					

    					return s;
    				}
    			}
    		}

            
