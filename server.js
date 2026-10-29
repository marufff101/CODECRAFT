// Local static server with a same-origin proxy to the loopback Piston runner.
// Learner source is accepted only at /runner/v2/execute and capped at 100 KiB.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const maxBody = 100 * 1024;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.md':'text/markdown; charset=utf-8'};
const server = http.createServer((req,res)=>{
  const url = new URL(req.url, 'http://127.0.0.1');
  if(url.pathname.startsWith('/runner/v2/')) return proxyRunner(req,res,url.pathname.slice('/runner/v2'.length));
  if(req.method !== 'GET' && req.method !== 'HEAD'){res.writeHead(405,{'content-type':'text/plain'});return res.end('Method not allowed');}
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch {res.writeHead(400);return res.end('Invalid path');}
  if(pathname === '/') pathname='/index.html';
  const target=path.resolve(root,'.'+pathname);
  if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden');}
  fs.stat(target,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404,{'content-type':'text/plain'});return res.end('Not found');}
    res.writeHead(200,{'content-type':mime[path.extname(target)]||'application/octet-stream','x-content-type-options':'nosniff','referrer-policy':'no-referrer'});
    if(req.method==='HEAD')return res.end();
    fs.createReadStream(target).pipe(res);
  });
});
function proxyRunner(req,res,apiPath){
  if(!['/runtimes','/execute','/packages'].includes(apiPath)){res.writeHead(404,{'content-type':'application/json'});return res.end('{"message":"Runner route not found"}');}
  if(apiPath==='/runtimes'&&req.method!=='GET'||apiPath==='/execute'&&req.method!=='POST'||apiPath==='/packages'&&!['GET','POST'].includes(req.method)){res.writeHead(405,{'content-type':'application/json'});return res.end('{"message":"Method not allowed"}');}
  const chunks=[];let size=0;
  req.on('data',chunk=>{size+=chunk.length;if(size>maxBody){res.writeHead(413,{'content-type':'application/json'});res.end('{"message":"Code payload exceeds the 100 KiB limit"}');req.destroy();return;}chunks.push(chunk);});
  req.on('end',()=>{
    const upstream=http.request({hostname:'127.0.0.1',port:2000,path:'/api/v2'+apiPath,method:req.method,headers:{'content-type':req.headers['content-type']||'application/json','content-length':size}},up=>{
      res.writeHead(up.statusCode||502,{'content-type':up.headers['content-type']||'application/json','cache-control':'no-store'});up.pipe(res);
    });
    upstream.on('error',err=>{if(!res.headersSent){res.writeHead(503,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify({message:`Local Piston runner unavailable: ${err.message}`}));}});
    if(size)upstream.write(Buffer.concat(chunks));upstream.end();
  });
}
const port=Number(process.env.PORT)||8000;
server.listen(port,'127.0.0.1',()=>console.log(`Codecraft: http://127.0.0.1:${port}`));
