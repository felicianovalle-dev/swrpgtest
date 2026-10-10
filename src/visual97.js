/* Connected floor materials and consistent prop art. No map, collision,
   interaction, NPC, economic, or character data is changed here. */
(() => {
  'use strict';
  const inheritedTile = pxDrawTile67, tiles = new Map();
  const materials = new Set(['floor','road','plaza92','market92','rug92','medfloor92','deck92']);
  function paint(context, type, x, y, map) {
    const rect=(a,b,w,h,color)=>{context.fillStyle=color;context.fillRect(a,b,w,h);};
    const clinic=map.id==='clinicInterior', ship=map.id==='ship';
    const base=type==='rug92' ? clinic?'#456777':ship?'#4c6266':'#754b40' :
      type==='medfloor92'?'#91a8ae':type==='deck92'?'#495b65':
      type==='road'||type==='plaza92'?'#a88962':type==='market92'?'#76614d':'#7d6b54';
    rect(0,0,32,32,base);
    // Seeded texture stays stable across walking, redraws, and reloads.
    for(let i=0;i<12;i++) {
      const a=Math.floor(noise93(x,y,i+311)*31), b=Math.floor(noise93(y,x,i+419)*31);
      rect(a,b,1,1,i%2?'#ffffff09':'#0000000b');
    }
    if(type==='rug92') {
      const same=(dx,dy)=>pxTile67(map,x+dx,y+dy)==='rug92';
      const border=clinic?'#98bec1':ship?'#a3b49d':'#c49a61';
      const inset=clinic?'#294957':ship?'#34494d':'#52372f';
      if(!same(0,-1)){rect(0,0,32,2,inset);rect(0,3,32,2,border);}
      if(!same(0,1)){rect(0,30,32,2,inset);rect(0,27,32,2,border);}
      if(!same(-1,0)){rect(0,0,2,32,inset);rect(3,0,2,32,border);}
      if(!same(1,0)){rect(30,0,2,32,inset);rect(27,0,2,32,border);}
      for(let row=7;row<27;row+=6)rect(6,row,20,1,'#ffffff08');
    } else if(type==='deck92') {
      rect(0,31,32,1,'#233742');
      if(x%2===0){rect(0,0,1,32,'#72848b');rect(2,3,2,2,'#8a9da1');}
      rect(4,10,24,1,'#ffffff06');
    } else if(type==='medfloor92') {
      if(y%2===0)rect(0,0,32,1,'#c4d0d1');
      if(x%2===0)rect(0,0,1,32,'#708c96');
    } else if(type==='floor') {
      // Broad alternating boards replace the high-contrast square tile grid.
      rect(0,15,32,1,'#665640');rect(0,16,32,1,'#ffffff07');
      if((x+y)%3===0)rect(25,2,1,12,'#0000000c');
    } else {
      if(y%2===0)rect(0,31,32,1,'#00000016');
      if((x+(y%2))%3===0)rect(31,0,1,32,'#00000010');
      if((x+y)%5===0)rect(5,23,7,1,'#ffffff0b');
    }
  }
  pxDrawTile67=function(context,type,sx,sy,x,y) {
    if(!materials.has(type))return inheritedTile(context,type,sx,sy,x,y);
    const map=ART93.frameMap||pixelCurrentMap67();
    const neighbors=type==='rug92'?[[0,-1],[0,1],[-1,0],[1,0]].map(([dx,dy])=>pxTile67(map,x+dx,y+dy)==='rug92'?1:0).join(''):'';
    const key=[map.id,type,x%12,y%12,neighbors].join('|');
    let tile=tiles.get(key);
    if(!tile){tile=document.createElement('canvas');tile.width=tile.height=32;paint(tile.getContext('2d'),type,x,y,map);if(tiles.size>=1024)tiles.clear();tiles.set(key,tile);}
    context.drawImage(tile,sx,sy,16,16);
  };
  const inheritedDecor=decorativeSet90;
  decorativeSet90=function(map) {
    // Loose decorative mini-rugs used a second palette on top of connected rugs.
    return inheritedDecor(map).filter(item=>item.kind!=='rug');
  };
  window.Game97.visual={materials,tiles};
})();
