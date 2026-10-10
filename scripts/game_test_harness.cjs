const fs=require('node:fs'),path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const {createCanvas,Image}=require('@napi-rs/canvas');
module.exports=async function openGame(){
 const errors=[],console=new VirtualConsole(),surfaces=new WeakMap();console.on('jsdomError',error=>errors.push(error.message));
 const dom=new JSDOM(fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8'),{
  url:'https://felicianovalle-dev.github.io/swrpgtest/',runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:console,
  beforeParse(w){
   w.matchMedia=()=>({matches:false,addListener(){},removeListener(){},addEventListener(){},removeEventListener(){}});
   w.HTMLElement.prototype.scrollIntoView=function(){};w.scrollTo=()=>{};w.ResizeObserver=class{observe(){}disconnect(){}};w.confirm=()=>true;w.alert=()=>{};
   w.HTMLCanvasElement.prototype.getContext=function(){let surface=surfaces.get(this);if(!surface){const canvas=createCanvas(this.width||300,this.height||150),ctx=canvas.getContext('2d'),draw=ctx.drawImage.bind(ctx);ctx.drawImage=(source,...args)=>{if(source instanceof w.HTMLCanvasElement){source.getContext('2d');source=surfaces.get(source).canvas}return draw(source,...args)};surface={canvas,ctx};surfaces.set(this,surface)}if(surface.canvas.width!==this.width)surface.canvas.width=this.width;if(surface.canvas.height!==this.height)surface.canvas.height=this.height;return surface.ctx};
   w.HTMLCanvasElement.prototype.toDataURL=function(){this.getContext('2d');return surfaces.get(this).canvas.toDataURL()};
   w.Image=function(){const image=new Image(),listeners={};image.addEventListener=(name,fn)=>{listeners[name]=fn;if(name==='load'&&image.complete)queueMicrotask(fn)};image.onload=()=>listeners.load?.();image.onerror=error=>listeners.error?.(error);Object.defineProperty(image,'naturalWidth',{get(){return image.width}});Object.defineProperty(image,'naturalHeight',{get(){return image.height}});return image};
  }
 });
 await new Promise(resolve=>setTimeout(resolve,800));
 return {window:dom.window,run:code=>dom.window.eval(code),errors,close:()=>dom.window.close()};
};
