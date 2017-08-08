## 装饰者模式
### 什么是装饰者模式
给对象动态地增加职责的方式称为装饰者（decorator）模式。装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态地添加职责。个人对装饰者模式的理解是，如果原对象或原函数的功能不能满足需求，我们将其进行包装增强之后返回一个新的对象。
### JAVA中的装饰者模式
装饰模式可以在不改变一个对象本身功能的基础上给对象增加额外的新行为。装饰模式是一种用于替代继承的技术，它通过一种无须定义子类的方式来给对象动态增加职责，使用对象之间的关联关系取代类之间的继承关系。在装饰模式中引入了装饰类，在装饰类中既可以调用待装饰的原有类的方法，还可以增加新的方法，以扩充原有类的功能。

    //Component（抽象构件）
    interface ProgramMonkey {
    	void skills();
    }
    //ConcreteComponent（具体构件）
    class AndroidProgramMonkey implements ProgramMonkey {
    	@Override
    	public void skills() {
    		System.out.println("会写Android代码！");
    	}
    }
    //ConcreteComponent（具体构件）
    class PHPProgramMonkey implements ProgramMonkey {
    	@Override
    	public void skills() {
    		System.out.println("会写PHP代码！");
    	}
    }
    //Decorator（抽象装饰类）
    class ProgramMonkeyDecorator implements ProgramMonkey {
    	protected ProgramMonkey mProgramMonkey;
    
    	public ProgramMonkeyDecorator(ProgramMonkey mProgramMonkey) {
    		this.mProgramMonkey = mProgramMonkey;
    	}
    
    	public void skills() {
    		mProgramMonkey.skills();
    	}
    }
    //ConcreteDecorator（具体装饰类）
    class PatternDecorator extends ProgramMonkeyDecorator {
    	public PatternDecorator(ProgramMonkey mProgramMonkey) {
    		super(mProgramMonkey);
    	}
    
    	@Override
    	public void skills() {
    		super.skills();
    		System.out.println("会设计模式！");
    	}
    }
    
    public class Main {
    	public static void main(String[] args) {
    		//有一个Android程序猿只会写Android代码
    		ProgramMonkey programMonkey = new AndroidProgramMonkey();
    		programMonkey.skills();
    		//装饰一下他，装逼的技能，他竟然除了写Android还懂设计模式
    		programMonkey = new PatternDecorator(programMonkey);
    		programMonkey.skills();
    
    		programMonkey = new PHPProgramMonkey();
    		programMonkey.skills();
    	}
    }

### JS中模拟传统面向对象的装饰者模式
JS中没有类的概念，而且类似于传统面向对象的装饰者模式的场景也不多见，不过我们可以使用原型来模拟实现以下传统面向对象的装饰者模式。代码如下：
先定义一个程序猿对象：

    function ProgramMonkey(){}
    ProgramMonkey.prototype.skill = function(){
    	console.log('会写代码')
    }

再定义一个装饰类：

    function BasketBallProgramMonkey(programMonkey){
    	this.programMonkey = programMonkey;
    }
    BasketBallProgramMonkey.prototype.skill = function(){
    	this.programMonkey.skill();
    	console.log('还会打篮球')
    }
    var programMonkey = new ProgramMonkey();
    programMonkey.skill();
    programMonkey = new BasketBallProgramMonkey(programMonkey);
    programMonkey.skill();

### JS中的装饰者模式
JavaScript 语言中动态改变对象相当容易，我们可以直接改写对象或者对象的某个方法，并不需要使用“类”来实现装饰者模式，代码如下：

    var plane = { 
     fire: function(){ 
     	console.log( '发射普通子弹' ); 
     } 
    } 
    var missileDecorator = function(){ 
     console.log( '发射导弹' ); 
    } 
    var atomDecorator = function(){ 
     console.log( '发射原子弹' ); 
    } 
    var fire1 = plane.fire; 
    plane.fire = function(){ 
     fire1(); 
     missileDecorator(); 
    } 
    var fire2 = plane.fire; 
    plane.fire = function(){ 
     fire2(); 
     atomDecorator(); 
    } 
    plane.fire(); 
    // 分别输出： 发射普通子弹、发射导弹、发射原子弹

### 装饰函数
JS中，我们与函数打交道的情况很多，相比于传统面向对象中的装饰模式，JS中更多是用来装饰函数。

很多时候我们不想去碰原函数，也许原函数是由其他同事编写的，里面的实现非常杂乱。现在需要一个办法，在不改变函数源代码的情况下，能给函数增加功能，这正是开放-封闭原则给我们指出的光明道路。

比如我们想给 window 绑定 onload 事件，但是又不确定这个事件是不是已经被其他人绑定过，为了避免覆盖掉之前的 window.onload 函数中的行为，我们一般都会先保存好原先的 window.onload，把它放入新的 window.onload 里执行：

    window.onload = function(){ 
 		alert (1); 
	} 
	var _onload = window.onload || function(){}; 
	window.onload = function(){ 
 		_onload(); 
 		alert (2); 
	}

但这种方式也有自己的缺点：

1. 如果装饰的次数太多，会存在大量的中间变量
2. 会遇到this指向的问题，例如下面这段代码：

    var _getElementById = document.getElementById; 
    document.getElementById = function( id ){ 
     alert (1); 
     return _getElementById( id ); // (1) 
    } 
    var button = document.getElementById( 'button' ); 

### 用 AOP 装饰函数

>###AOP
>可以通过预编译方式和运行期动态代理实现在不修改源代码的情况下给程序动态统一添加功能的一种技术。AOP实际是GoF设计模式的延续，设计模式孜孜不倦追求的是调用者和被调用者之间的解耦,提高代码的灵活性和可扩展性，AOP可以说也是这种目标的一种实现。
先看一下给Function原型添加方法的实现方式：

    Function.prototype.before = function(beforeFn){
    	var _self = this;
    	
    	return function () {
    		beforeFn.apply(this, arguments);
    		_self.apply(this, arguments);
    	}
    }
	Function.prototype.after = function(afterFn){
    	var _self = this;
    	
    	return function () {
    		_self.apply(this, arguments);
			afterFn.apply(this, arguments);
    	}
    }

Function.prototype.before 接受一个函数当作参数，这个函数即为新添加的函数，它装载了新添加的功能代码。

接下来把当前的 this 保存起来，这个 this 指向原函数，然后返回一个“代理”函数，这个“代理”函数只是结构上像代理而已，并不承担代理的职责（比如控制对象的访问等）。它的工作是把请求分别转发给新添加的函数和原函数，且负责保证它们的执行顺序，让新添加的函数在原函数之前执行（前置装饰），这样就实现了动态装饰的效果。

我们注意到，通过 Function.prototype.apply 来动态传入正确的 this，保证了函数在被装饰之后，this 不会被劫持。

再回到 window.onload 的例子，看看用 Function.prototype.before 来增加新的 window.onload
事件是多么简单：

    window.onload = function(){ 
     alert (1); 
    } 
    window.onload = ( window.onload || function(){} ).after(function(){ 
     alert (2); 
    }).after(function(){ 
     alert (3); 
    }).after(function(){ 
     alert (4); 
    }); 

值得提到的是，上面的 AOP 实现是在 Function.prototype 上添加 before 和 after 方法，但许多人不喜欢这种污染原型的方式，那么我们可以做一些变通，把原函数和新函数都作为参数传入:
before 或者 after 方法：

    var before = function( fn, beforefn ){ 
     return function(){ 
     beforefn.apply( this, arguments ); 
     return fn.apply( this, arguments ); 
     } 
    } 
    var a = before( 
     function(){alert (3)}, 
     function(){alert (2)} 
    ); 
    a = before( a, function(){alert (1);} ); 
    a(); 
### AOP 的应用实例
用 AOP 装饰函数的技巧在实际开发中非常有用。不论是业务代码的编写，还是在框架层面，我们都可以把行为依照职责分成粒度更细的函数，随后通过装饰把它们合并到一起，这有助于我们编写一个松耦合和高复用性的系统。
#### 插件式的表单验证
我们很多人都写过许多表单验证的代码，在一个 Web 项目中，可能存在非常多的表单，如注册、登录、修改用户信息等。在表单数据提交给后台之前，常常要做一些校验，比如登录的时候需要验证用户名和密码是否为空，代码如下：

    <html> 
     <body> 
     用户名：<input id="username" type="text"/> 
    密码： <input id="password" type="password"/> 
     <input id="submitBtn" type="button" value="提交"> 
    </body> 
    <script> 
    var username = document.getElementById( 'username' ), 
     password = document.getElementById( 'password' ), 
     submitBtn = document.getElementById( 'submitBtn' ); 
     var formSubmit = function(){ 
     if ( username.value === '' ){ 
     return alert ( '用户名不能为空' ); 
     } 
     if ( password.value === '' ){ 
     return alert ( '密码不能为空' ); 
     } 
     var param = { 
     username: username.value, 
     password: password.value 
     } 
     ajax( 'http:// xxx.com/login', param ); // ajax 具体实现略
     } 
     submitBtn.onclick = function(){ 
     formSubmit(); 
     } 
     </script> 
    </html> 
formSubmit 函数在此处承担了两个职责，除了提交 ajax 请求之外，还要验证用户输入的合法性。这种代码一来会造成函数臃肿，职责混乱，二来谈不上任何可复用性。
接下来进一步优化这段代码，使 表单验证 和 表单提交 完全分离开来。首先要改写 Function. prototype.before，如果 beforefn 的执行结果返回 false，表示不再执行后面的原函数，代码如下：

    Function.prototype.before = function( beforefn ){ 
     var __self = this; 
     return function(){ 
     if ( beforefn.apply( this, arguments ) === false ){ 
     // beforefn 返回 false 的情况直接 return，不再执行后面的原函数
     return; 
     } 
     return __self.apply( this, arguments ); 
     } 
    } 
    var validata = function(){ 
     if ( username.value === '' ){ 
     alert ( '用户名不能为空' ); 
     return false; 
     } 
     if ( password.value === '' ){ 
     alert ( '密码不能为空' ); 
     return false; 
     } 
    } 
    var formSubmit = function(){ 
     var param = { 
     username: username.value, 
     password: password.value 
     } 
     ajax( 'http:// xxx.com/login', param ); 
    } 
    formSubmit = formSubmit.before( validata ); 
    submitBtn.onclick = function(){ 
     formSubmit(); 
    } 
在这段代码中，校验输入和提交表单的代码完全分离开来，它们不再有任何耦合关系，formSubmit = formSubmit.before( validata )这句代码，如同把校验规则动态接在 formSubmit 函数之前，validata 成为一个即插即用的函数，它甚至可以被写成配置文件的形式，这有利于我们分开维护这两个函数。再利用策略模式稍加改造，我们就可以把这些校验规则都写成插件的形式，用在不同的项目当中。
### 总结
与Java为代表的传统面向对象的装饰者模式不同，JS中的装饰者模式更为灵活和有特色。主要是针对函数进行装饰，我们还可以使用AOP的思想来装饰函数。AOP在代码分离和提高复用性方面有着很好的效用。