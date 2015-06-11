function TranslatorDAO() {
	this.supportLang = [ "en", "da", "fr", "sv", "nb", "nl" ];
	this.supportExt = "properties";
	this.allLangMap = [];
}

TranslatorDAO.prototype = {
	constructor : TranslatorDAO,
	
	indexOf : function(key) {
		result = -1;
		this.allLangMap.foreach(function(m, i) {
			if (m.key == key)
				result = i;
		});
		return result;
	},
	
	push : function(key, value, lang) {
		var index = this.indexOf(key);
		if (index >= 0) {
			this.allLangMap[index][lang] = value;
		} else {
			var m = {};
			m.key = key;
			m[lang] = value;
			this.allLangMap.push(m);
		}
	},

	detectLang : function(fileName) {
		var result = "en";
		this.supportLang.foreach(function(lang) {
			if (fileName.includes("_" + lang))
				result = lang;
		});
		return result;
	},

	parse : function(file, content) {
		var self = this;
		var lang = this.detectLang(file.name);
		var lines = content.split("\n");
		lines.foreach(function(line) {
			var str = line.trim();
			if (!str || str.indexOf("#") === 0)
				return;
			var res = str.split("=");
			self.push(res[0], res[1], lang);
		});
	},

    getLangResult : function (lang) {
        var result = "";
        this.allLangMap.foreach(function(m) {
            if (!isUndef(m[lang])) {
                result += m.key + "=" + m[lang] + "\n";
            }
        });
        return result;
    },

    generateZip : function () {
        var zip = new JSZip();
        var folder = zip.folder("I18N");
        var self = this;
        supportLang.foreach(function(lang) {
            var result = "" + self.getLangResult(lang);
            folder.file(lang + ".properties", result);
        });
        return zip.generate();
    },

	properties : function() {
		var prop = [ "key" ];
		this.supportLang.foreach(function(lang) {
			prop.push(lang);
		});
		return prop;
	},
	
	data: function () {
		return this.allLangMap;
	},
	
	clear : function() {
		this.allLangMap.clear();
	},
	
	getSupportLang :function(){
		return this.supportLang;
	}

}