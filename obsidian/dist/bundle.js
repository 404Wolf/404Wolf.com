(()=>{var m=(s=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(s,{get:(o,t)=>(typeof require<"u"?require:o)[t]}):s)(function(s){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+s+'" is not supported')});var g=(s,o,t)=>new Promise((e,a)=>{var p=i=>{try{c(t.next(i))}catch(l){a(l)}},u=i=>{try{c(t.throw(i))}catch(l){a(l)}},c=i=>i.done?e(i.value):Promise.resolve(i.value).then(p,u);c((t=t.apply(s,o)).next())});var n=m("obsidian");var r={domain:"https://404wolf.com",secret:""},d=class extends n.Plugin{onload(){return g(this,null,function*(){yield this.loadSettings(),this.addCommand({id:"fetch",name:"Fetch Posts",callback:()=>{}}),this.addSettingTab(new h(this.app,this))})}loadSettings(){return g(this,null,function*(){this.settings=Object.assign({},r,yield this.loadData())})}saveSettings(){return g(this,null,function*(){yield this.saveData(this.settings)})}},h=class extends n.PluginSettingTab{constructor(t,e){super(t,e);this.plugin=e}display(){let{containerEl:t}=this;t.empty(),new n.Setting(t).setName("Domain").setDesc("Domain of 404wolf.com instance").addText(e=>e.setPlaceholder("https://").setValue(this.plugin.settings.domain).onChange(a=>g(this,null,function*(){this.plugin.settings.domain=a,yield this.plugin.saveSettings()}))),new n.Setting(t).setName("API Key").setDesc("Access key for website").addText(e=>e.setValue(this.plugin.settings.secret).onChange(a=>g(this,null,function*(){this.plugin.settings.secret=a,yield this.plugin.saveSettings()})))}};})();
//# sourceMappingURL=bundle.js.map
