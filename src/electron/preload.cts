
const electron = require('electron');

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics:(callback:(statics:any) => void)=> callback({}),
    getStaticData:()=>console.log('static'),
    
})
