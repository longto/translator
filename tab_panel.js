
function TabPanel() {
	this.tabMap = [];
	this.tabHeader = createTag("div","","tab-header");
	this.headerClear = createTag("div","","clear");
	this.tabBody = createTag("div","","tab-body");
	this.render = createTag("div","","tab-panel");
	this.render.appendChild(this.tabHeader);
	this.render.appendChild(this.headerClear);
	this.render.appendChild(this.tabBody);
	this.currentTab = null;
}

function handle(e) {
	var tab = e.target;
	tab.tabPanel.tabSelect(tab);
}

TabPanel.prototype = {
	constructor : TabPanel,
	
	addTab : function (head,body) {
		var newHead = this.addHeader(head);
		var newBody = this.addBody(body);
		this.tabMap.push({"head":newHead,"body":newBody});
		if (this.tabMap.length == 1)
			this.tabSelect(newHead);
	},

	addHeader : function(head) {
		var newHead = createTag("div",head,"tab-header-ele");
		newHead.tabPanel = this;
		newHead.addEventListener("click", handle);
		this.tabHeader.appendChild(newHead);
		return newHead;
	},

	addBody : function(body) {
		var newBody = createTag("div",body,"tab-body-ele");
		if (body instanceof HTMLElement) {
			newBody.clearChildren();
			newBody.appendChild(body);
		}
		newBody.setAttribute("contenteditable", true);
		this.tabBody.appendChild(newBody);
		return newBody;
	},

	clear : function() {
		this.tabHeader.clearChildren();
		this.tabBody.clearChildren();
		this.tabMap.clear();
	},

	tabSelect : function(tab){
		this.tabMap.foreach(function(m) {
			m["head"].toggleClass("selected",m["head"] === tab);
			m["body"].toggleClass("selected",m["head"] === tab);
		});
	},

	render : function(){
		return this.render;
	}
}
