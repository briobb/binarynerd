// Only load color data whose use AND distribution are authorized.
export const dataset={id:null,version:null,source:null,license:null,redistributionAllowed:false,whitePoint:'D65',observer:'2',colorSpace:'sRGB',systems:[],colors:[]};
export function validateDataset(data){
 if(!data||!Array.isArray(data.colors)||!Array.isArray(data.systems))throw Error('色データの形式が不正です');
 if(!data.colors.length)return data;
 if(!data.id||!data.version||!data.source||!data.license||data.redistributionAllowed!==true)throw Error('色データの利用条件を確認してください');
 if(data.whitePoint!=='D65'||data.observer!=='2'||!['sRGB','Lab-D65'].includes(data.colorSpace))throw Error('比較条件は D65・2° に統一してください');
 const ids=new Set();
 for(const c of data.colors){if(!c.id||ids.has(c.id)||!c.number||!data.systems.some(s=>s.id===c.system)||!Array.isArray(c.rgb)||c.rgb.length!==3||!c.rgb.every(n=>Number.isInteger(n)&&n>=0&&n<=255))throw Error('色レコードの形式が不正です');ids.add(c.id);if(c.lab&&(!Array.isArray(c.lab)||c.lab.length!==3||!c.lab.every(Number.isFinite)||c.lab[0]<0||c.lab[0]>100))throw Error('Lab値が不正です');if(data.colorSpace==='Lab-D65'&&!c.lab)throw Error('Lab値が必要です');}
 return data;
}
