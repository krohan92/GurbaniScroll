import http from 'node:http';

const PORT = Number(process.env.PORT || 3000);
const verses = [
  { id: 'mool-1', ang: 1, title: 'The One Creator', gurmukhi: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ', tags: ['oneness', 'peace', 'fear'] },
  { id: 'jap-1', ang: 1, title: 'Beyond Endless Thinking', gurmukhi: 'ਸੋਚੈ ਸੋਚਿ ਨ ਹੋਵਈ ਜੇ ਸੋਚੀ ਲਖ ਵਾਰ ॥', tags: ['worry', 'anxiety', 'thinking', 'stress'] },
  { id: 'jap-2', ang: 1, title: 'Beyond Silence Alone', gurmukhi: 'ਚੁਪੈ ਚੁਪ ਨ ਹੋਵਈ ਜੇ ਲਾਇ ਰਹਾ ਲਿਵ ਤਾਰ ॥', tags: ['silence', 'peace', 'meditation'] },
  { id: 'jap-3', ang: 1, title: 'Beyond Accumulation', gurmukhi: 'ਭੁਖਿਆ ਭੁਖ ਨ ਉਤਰੀ ਜੇ ਬੰਨਾ ਪੁਰੀਆ ਭਾਰ ॥', tags: ['desire', 'gratitude', 'contentment'] }
];
const send = (res, status, data) => {res.writeHead(status, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
const server = http.createServer(async (req,res)=>{
  const url = new URL(req.url || '/', 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/health') return send(res,200,{status:'ok',service:'gurbaniscroll-api',version:'0.1.0'});
  if (req.method === 'GET' && url.pathname === '/api/verses') return send(res,200,{verses,notice:'Seed excerpts require editorial verification before public release.'});
  if (req.method === 'POST' && url.pathname === '/api/ask') {
    let body='';for await(const chunk of req){body+=chunk;if(body.length>4096)return send(res,413,{error:'Request too large'});}
    let input;try{input=JSON.parse(body);}catch{return send(res,400,{error:'Invalid JSON'});}
    const question=typeof input?.question==='string'?input.question.trim():'';
    if(!question || question.length>500)return send(res,400,{error:'Question must be 1-500 characters'});
    const q=question.toLowerCase();
    const verse=[...verses].sort((a,b)=>b.tags.filter(t=>q.includes(t)).length-a.tags.filter(t=>q.includes(t)).length)[0];
    return send(res,200,{mode:'offline-scripture-matching',answer:'This is a relevant Gurbani excerpt for further study. Read the full shabad and its context from a verified source. This is not an AI-generated interpretation.',reference:{id:verse.id,ang:verse.ang,title:verse.title,gurmukhi:verse.gurmukhi},disclaimer:'Not an authoritative translation or a statement by the Gurus.'});
  }
  return send(res,404,{error:'Not found'});
});
server.listen(PORT,'0.0.0.0',()=>console.log('GurbaniScroll API listening on '+PORT));
