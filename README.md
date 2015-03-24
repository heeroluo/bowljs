# Bowl.js
Bowl.js是一个运行于浏览器环境的Javascript**模块加载器**。它基于**CMD规范**，提供了良好的模块封装、调用机制，在利于分解功能的同时，也简化了依赖关系管理。

## Bowl.js与JRaiser
Bowl.js的前身是[JRaiser项目](//github.com/heeroluo/jraiser)中的加载器，分离出来是为了更加泛用。

## 简单使用
示例代码见[examples/helloworld](//github.com/heeroluo/bowljs/tree/master/examples/helloworld)，目录结构为：

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

* libPath：**类库**路径。当require的路径参数*不*以 `/` 或 `.` 开头时，以此路径为根路径进行解析，如 `require('dom')` 。
* appPath：**应用**路径。当require的路径参数以 `/` 开头时，以此路径为根路径进行解析，如 `require('/helloworld')` 。
* debug：**调试**参数，当其值为true时，加载器会在require的路径文件名后添加 `-debug` 。
* 更多可用参数见[配置文档](//github.com/heeroluo/bowljs/wiki/Configuration)。

综上所述，在 index.html 中 `require('/helloworld')` 时，由于模块路径以 `/` 开头，所以根路径为 appPath 。又因为 debug 参数为true，所以文件名后会自动添加 `-debug` 。最终解析结果为 `examples/helloworld/app/helloworld-debug.js` 。

### 模块机制
在 dom-debug.js 中，提供给外部的接口通过 `exports` 对象传递：

	exports.id = function(id) {
		return document.getElementById(id);
	};

而在 helloworld-debug.js 中，则通过 `require('dom')` 获取外部模块提供的接口。
是的，除了多出 `define(function(require, exports, module) { ... });` 这一层包装外，其他都跟 node.js 的模块机制基本一致。

## 项目构建
为了提高性能，发布到生产环境的Javascript程序一般要经过压缩和合并。[JRaiser MDK](//github.com/heeroluo/jraiser-mdk)可以协助您完成这项工作。