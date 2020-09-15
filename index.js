const core = require('@actions/core');
const github = require('@actions/github');
const giphy=require('@giphy/js-fetch-api');
global.fetch = require("node-fetch");


const gf = new giphy.GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')
let gifURL;
 
// fetch 10 gifs

const getGifs=async ()=>{
  const gifs=await gf.search("dogs", {limit: 1 })
  gifs.data.forEach((each)=>{
    gifURL=each.images.original.url;
  })
}

try {
  
  const payload = github.context.payload
  core.setOutput("name", payload.sender.login);
  getGifs().then(()=>{
    core.setOutput("gif", gifURL);
    console.log(gifURL);  
  });
  getGifs();
  
  
} catch (error) {
  core.setFailed(error.message);
}

//Abel PR
