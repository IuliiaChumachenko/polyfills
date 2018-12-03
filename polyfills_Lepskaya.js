// 1) Object.create

Object.myCreate = function(prototypeObj){
   if(!prototypeObj) {
     prototypeObj = null;
   }

	function func(){};
	func.prototype = prototypeObj;

	return new func;
}

// 2) Object.keys

Object.myKeys = function(obj) {
  var keysArr = [];

  for(var key in obj) {
    if (obj.hasOwnProperty(key)) {
        keysArr[keysArr.length] = key;
    }
  }

  return keysArr;
};

// 3) Array.pop

Array.prototype.myPop = function(){
	var popElem = this[this.length - 1];
	this.length -= 1;

	return popElem;
}

// 4) Array.push

Array.prototype.myPush = function(){
	for (var i = 0; i < arguments.length; i++) {
		this[this.length] = arguments[i];
	}

	return this.length;
}

// 5) Array.shift

Array.prototype.myShift = function(){
	var shiftElem = this[0];
	for (var i = 0; i < this.length-1; i++) {
		this[i] = this[i+1];
	}
	this.length -= 1;

	return shiftElem;
}
// 6) Array.unshift

Array.prototype.myUnshift = function(){
	for (var i = this.length - 1; i >= 0; i--) {
		this[i + arguments.length] = this[i];
	}

	for (var i = 0; i < arguments.length; i++) {
		this[i] = arguments[i];
	}

	return this.length;
}

// 7) Array.map

Array.prototype.myMap = function(callback){
	var resultArr = [];

	for (var i = 0; i < this.length; i++) {
		resultArr[i] = callback(this[i], i, this);
	}

	return resultArr;
}

// 8) Array.forEach

Array.prototype.myForEach = function(callback){
	for (var i = 0; i < this.length; i++) {
		callback(this[i], i, this);
	}
}

// 9) Array.filter

Array.prototype.myFilter = function(callback){
	var resultArr = [];

	for (var i = 0; i < this.length; i++) {
		if(callback(this[i], i, this)) {
			resultArr[resultArr.length] = this[i];
		}		
	}

	return resultArr;
}

// 10) Array.reverse

Array.prototype.myReverse = function(){
  var resArr = [];
  
  for (var i = 0; i < this.length; i++) {
    resArr[i] = this[i];
  }
  
  this.length = 0;
  
  for (var i = resArr.length - 1; i >= 0; i--) {
    this[this.length] = resArr[i];
  }

  return this;
}

// 11) Array.join

Array.prototype.myJoin = function(separator) {
  var str = '';

  if (!separator) {
    separator = ', ';
  }

  for (var i = 0; i < this.length; i++) {      
      if(i !== this.length - 1) {
        str += this[i] + separator;
      } else {
      	str += this[i];
      }
   }

  return str;
}

// 12) Array.reduce

Array.prototype.myReduce = function (callback, initialValue) {
	var acc = initialValue;
	var i = 0;

	if (!initialValue) {
		acc = this[0];
		i++;
	}

	for (i; i < this.length; i++) {
		acc = callback(acc, this[i], i, this);
	}  

	return acc;
}

// 13) Array.sort

Array.prototype.mySort = function (userCallback) {
  function basicCallback(a, b) {
    return (a > b) ? 1 : -1;
  }

  var callback = userCallback ? userCallback : basicCallback;
  var changed = false;
  
  do {
    for (var i = 0; i < this.length - 1; i++) {
      var result = callback(this[i], this[i+1]);
      
      if (result > 0) {
        var temp = this[i];
        this[i] = this[i+1];
        this[i+1] = temp;
        
        changed = true;
        break;     
      } else {
        changed = false;
      }
    }
  } while (changed)

  return this;
}

// 14) Function.bind

Function.prototype.myBind = function(context, ...args) {
    var self = this;

    return function test(...argsIn) {
        var ArgArg = args.concat(argsIn);

        return self.apply(context, ArgArg);
    };
}

// 15) Function.call

Function.prototype.myCall = function (context, ...args) {
    var a = this.bind(context, ...args);
    return a();
}

// 16) Function.apply

Function.prototype.myApply = function() {
    var [context, ...args] = arguments; 
    return this.call(context, ...args);
}

Function.prototype.myApply = function() {
    var [context, ...args] = arguments; 
    var a = this.bind(context, ...args);
    return a();
}

// 17) Object.freeze

Object.myFreeze = function(obj) {
	Object.preventExtensions(obj);
	for (var key in obj) {
		Object.defineProperty(obj, key, {
			writable: false,
			configurable: false
		});
	}
}

// 18) Array.some

Array.prototype.mySome = function(callback){
	for (var i = 0; i < this.length; i++) {
		if(callback(this[i], i, this)) {
			return true;
		}		
	}

	return false;
}

// 19) Array.every

Array.prototype.myEvery = function(callback){
	var resultLength = 0;

	for (var i = 0; i < this.length; i++) {
		if(callback(this[i], i, this)) {
			resultLength++;
		}		
	}

	return resultLength === this.length;
}