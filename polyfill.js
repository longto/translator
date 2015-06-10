if (!Object.prototype.foreach) {
    Object.prototype.foreach = function(callback) {
        for (var i = 0; i < this.length; i++) {
            callback(this[i]);
        }
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
            this.className = this.className + className;
        }
    }
}
if (!HTMLElement.prototype.removeClass) {
    HTMLElement.prototype.removeClass = function(className) {
        if (this.className.includes(className)) {
            this.className = this.className.replace(className, "");
        }
    }
}
if (!HTMLElement.prototype.clear) {
    HTMLElement.prototype.clear = function() {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
    }
}
