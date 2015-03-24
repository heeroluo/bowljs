# Bowl.js
Bowl.js是一个运行于浏览器环境的Javascript**模块加载器**。它基于**CMD规范**，提供了良好的模块封装、调用机制，在利于功能分解的同时，也让您在复杂的模块依赖关系中解脱。

## Bowl.js与JRaiser
Bowl.js的前身是[JRaiser项目](https://github.com/heeroluo/jraiser)中的加载器，分离出来是为了更加泛用。

## 简单使用
示例代码见[examples/helloworld](https://github.com/heeroluo/bowljs/tree/master/examples/helloworld)，目录结构为：

> lib/  
>  |-- dom-debug.js  
> app/  
>  |-- helloworld-debug.js  
> index.html  

### 加载器配置
在 index.html 中，引入 bowl-debug.js 后，有一段配置代码：

	bowljs.config({
		libPath: './lib',
		appPath: './app',
		debug: true
	});

* libPath：**类库**路径。当require的路径*不*以 `/` 或 `.` 开头时，以此路径为根路径进行解析，如 `require('dom')` 。
* appPath：**应用**路径。当require的路径以 `/` 开头时，以此路径为根路径进行解析，如 `require('/helloworld')` 。
* debug：**调试**参数，当其值为true时，加载器会在require的文件名后添加 `-debug` 。

综上所述，在 index.html 中 `require('/helloworld')` 时，由于模块路径以 `/` 开头，所以根路径为 appPath 。又因为 debug 参数为true，所以文件名后会自动添加`-debug`。最终解析结果为 `examples/helloworld/app/helloworld-debug.js` 。

### 模块机制

在 dom-debug.js 中，提供给外部的接口通过 exports 对象传递：

	exports.id = function(id) {
		return document.getElementById(id);
	};

而在 helloworld-debug.js 中，则通过 `require('dom')` 获取外部模块提供的接口。
是的，除了多了 `define(function(require, exports, module) { ... });` 这一层包装外，其他都跟 node.js 的模块机制基本一致。