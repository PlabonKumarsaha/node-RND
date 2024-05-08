import { Hono } from "hono";
import {v4 as uuidv4} from "uuid";
import { serve } from '@hono/node-server'
import { UUID } from "crypto";

interface VideoModel{
    id: string;
    videoName :string;
     channelName:string ;
      duration:string
}
let videos:VideoModel[] = []


const app = new Hono()


app.get('/',(c)=>{
    return c.html('ok')
})

app.post('/video',async(c)=>{

    const {videoName, channelName, duration} = await c.req.json();

    const newVideo ={
        id : uuidv4(),
        videoName,
        channelName,
        duration
    }
    videos.push(newVideo);
    return c.json(newVideo);
})

app.get('/video/:id',(c)=>{

    const id = c.req.param('id');

    const vid = videos.find((v)=>v.id ===id);
    if(!vid){
        return c.json(({message :"video not found"}))
    }else{
        return c.json(vid);
    }
})

app.delete('/video/:id',(c)=>{

    const id = c.req.param('id');

    const vid = videos.find((v)=>v.id ===id);
    if(!vid){
        return c.json(({message :"video not found"}))
    }else{
        videos.pop();

    }
})
const port = 3000
console.log(`Server is running on port ${port}`)
serve({
    fetch: app.fetch,
    port
  })
  

export default app;
