const core = require('@actions/core');
const github = require('@actions/github');
const giphy=require('@giphy/js-fetch-api');
global.fetch = require("node-fetch");
const {Octokit}=require('@octokit/core');
const { url } = require('inspector');



const gf = new giphy.GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')
let gifURL;
 
// fetch 10 gifs

const getGifs=async ()=>{
  const gifs=await gf.search("dogs", {limit: 1 })
  gifs.data.forEach((each)=>{
    gifURL=each.images.original.url;
  })
}

const makeComment=async (github_token,url,owner,repo,number,body)=>{
  const octokit=new Octokit({auth:github_token})
  const new_comment = await octokit.request('POST '+url, {
    owner: 'octocat',
    repo: 'hello-world',
    issue_number: 42,
    body: body
  })
}

try {
  
  const payload = github.context.payload
  // const github_token = core.getInput('GITHUB_TOKEN');
  const github_token="f5831f1c9f074f3dc787f717abeda4977c6399f6";
  const context = github.context;
  // const senderLogin=payload.sender.login;
  const senderLogin="hari";
  // if (context.payload.pull_request == null) {
  //     core.setFailed('No pull request found.');
  //     return;
  // }
  // const pull_request_number = context.payload.pull_request.number;
  const pull_request_number="1";
 
  
  
  getGifs().then(()=>{
    console.log(payload);
    const message= '![image]('+gifURL+') \n  Hello '+senderLogin+' , '+
    'Thanks for your Commits, keep it rolling and be patient until a Reviewer merges it. '+ 
    'Until then hope this doggy keeps you company 🚀  . ';
    makeComment(github_token,"/repos/HarishTeens/woofy/issues/1/comments","HarishTeens","woofy",pull_request_number,message);
  });
  
} catch (error) {
  core.setFailed(error.message);
}

//Abel PR
