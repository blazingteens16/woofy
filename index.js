const core = require('@actions/core');
const github = require('@actions/github');
const giphy=require('@giphy/js-fetch-api');
global.fetch = require("node-fetch");
const {Octokit}=require('@octokit/core');



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
  const github_token = core.getInput('GITHUB_TOKEN');
  const context = github.context;
  if (context.payload.pull_request == null) {
      core.setFailed('No pull request found.');
      return;
  }
  const pull_request_number = context.payload.pull_request.number;
 
  const octokit = new github.GitHub(github_token);
  
  getGifs().then(()=>{
    const message= '![image]('+gifURL+') \n  Hello '+payload.sender.login+' , '+
    'Thanks for your Commits, keep it rolling and be patient until a Reviewer merges it. '+ 
    'Until then hope this doggy keeps you company 🚀  . ';
    const new_comment = octokit.issues.createComment({
      ...context.repo,
      issue_number: pull_request_number,
      body: message
    });
  });
  
} catch (error) {
  core.setFailed(error.message);
}

//Abel PR
