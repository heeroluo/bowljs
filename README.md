# Bowl.js
Bowl.js是一个运行于浏览器环境的Javascript**模块加载器**。它基于**CMD规范**，提供了良好的模块封装、调用机制，在利于分解功能的同时，也简化了依赖关系管理。

## 关于命名
加载器的工作就是根据依赖关系把需要的模块加载进来。这让人想起一个热门的网络用语“快到碗里来”，所以就以碗的英文单词bowl命名。

## 兼容性
兼容时下主流的PC浏览器和移动浏览器，包括IE6、IE7。

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

* libPath：**类库**路径。当require的模块id*不*以 `/` 或 `.` 开头且不是绝对路径时，基于此路径进行解析，如 `require('dom')` 。
* appPath：**应用**路径。当require的模块id以 `/` 开头时，基于此路径进行解析，如 `require('/helloworld')` 。
* debug：**调试**参数。值为true时，加载器会在文件名中添加 `-debug` 后缀。
* 更多可用参数见[配置文档](//github.com/heeroluo/bowljs/wiki/%E5%8A%A0%E8%BD%BD%E5%99%A8%E9%85%8D%E7%BD%AE)。

综上所述，在 `index.html` 中 `require('/helloworld')` 时，由于模块id以 `/` 开头，所以基于 `appPath` 进行解析 。又因为 debug 参数为true，所以文件名后会自动添加 `-debug` 。最终解析结果为 `examples/helloworld/app/helloworld-debug.js` 。

### 模块机制
在 dom-debug.js 中，提供给外部的接口通过 `exports` 对象传递：

	exports.id = function(id) {
		return document.getElementById(id);
	};

而在 helloworld-debug.js 中，则通过 `require('dom')` 获取外部模块提供的接口。
是的，除了多出 `define(function(require, exports, module) { ... });` 这一层包装外，其他都跟Node.js的模块机制基本一致。

## 模块编译
为了提高性能，发布到生产环境的Javascript模块一般要经过压缩和合并。[JRaiser MDK](//github.com/heeroluo/jraiser-mdk)可以协助您完成这项工作。

## 问题反馈
如果在使用本加载器的过程中出现问题，可以把问题描述连同**加载器日志**发到[Issues](//github.com/heeroluo/bowljs/issues)。其中加载器日志可以通过以下JS代码获取：

    bowljs.logs