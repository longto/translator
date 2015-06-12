if (!Object.prototype.foreach) {
	Object.prototype.foreach = function(callback) {
		for (var i = 0; i < this.length; i++) {
			callback(this[i], i);
		}
	}
}

if (!Array.prototype.clear) {
	Array.prototype.clear = function(callback) {
		this.length = 0;
	}
}

if (!String.prototype.includes) {
	String.prototype.includes = function() {
		return String.prototype.indexOf.apply(this, arguments) !== -1;
	};
}

if (!HTMLElement.prototype.addClass) {
	HTMLElement.prototype.addClass = function(className) {
		if (!this.className.includes(className)) {
			this.className = this.className + " " + className;
		}
	}
}
if (!HTMLElement.prototype.removeClass) {
	HTMLElement.prototype.removeClass = function(className) {
		if (this.className.includes(className)) {
			this.className = this.className.replace(className, "").trim();
		}
	}
}
if (!HTMLElement.prototype.toggleClass) {
	HTMLElement.prototype.toggleClass = function(className,on) {
		if (on) {
			this.addClass(className);
		} else {
			this.removeClass(className);
		}
	}
}
if (!HTMLElement.prototype.clearChildren) {
	HTMLElement.prototype.clearChildren = function() {
		while (this.firstChild) {
			this.removeChild(this.firstChild);
		}
	}
}

function isUndef(value) {
	return (typeof (value) === "undefined") || (value === null) || value == "";
}

function getLangEle(value) {
	return isUndef(value) ? "" : value;
}

function createTag(tagName, value, style) {
	var result = document.createElement(tagName);
	result.innerHTML = getLangEle(value);
	if (!isUndef(style)) {
		result.className = getLangEle(style);
	}
	return result;
}