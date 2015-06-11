tableTag = "table";
trTag = "tr";
thTag = "th";
tdTag = "td";
inputTag = "input"
contenteditableAttr = "contenteditable";
missClass = "miss";
empty = "";

function Table(translator) {
	this.translator = translator;
	this.render = createTag(tableTag);
}

Table.prototype = {
	constructor : Table,

	makeHeader : function() {
		var row = createTag(trTag);
		this.translator.properties().foreach(function(value) {
			var col = createTag(thTag, value);
			row.appendChild(col);
		});
		this.render.appendChild(row);
	},

	makeContent : function() {
		var self = this;
		this.translator.data().foreach(function(m) {
			var style = self.isMiss(m) ? missClass : empty;
			var row = createTag(trTag, empty, style);
			var prop = self.translator.properties();
			self.translator.properties().foreach(function(value) {
				var col = createTag(tdTag, m[value]);
				col.setAttribute(contenteditableAttr, true);
				col.addEventListener(inputTag, function() {
					m[value] = col.innerHTML;
					if (self.isMiss(m))
						row.addClass(miss);
					else
						row.removeClass(miss);
				}, false);
				row.appendChild(col);
			});
			self.render.appendChild(row);
		});
	},

	refresh : function() {
		this.render.clearChildren();
		//this.render = createTag("table");
		this.makeHeader();
		this.makeContent();
		return this.render;
	},

	isMiss : function(m) {
		var miss = !m.key;
		this.translator.getSupportLang().foreach(function(lang) {
			miss = miss || isUndef(m[lang]);
		});
		return miss;
	},

	render : function(){
		return this.render;
	}
}
