let brick1Pic=document.createElement("img");
let brick2Pic=document.createElement("img");
let brick3Pic=document.createElement("img");
let paddlePic=document.createElement("img");
let ballPic=document.createElement("img");
let redBallPic=document.createElement("img");

let skyPic=document.createElement("img");
let lifePic=document.createElement("img");
let cannonPic=document.createElement("img");


let cannonPowerupPic=document.createElement("img");
let extraScorePowerupPic=document.createElement("img");
let multiBallPowerupPic=document.createElement("img");
let redBallPowerupPic=document.createElement("img");
let stickyBallPowerupPic=document.createElement("img");


let picsToLoad = 0;

const countLoadedImageAndLaunchIfReady = () => {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

const beginLoadingImage = (imgVar, fileName) => {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

const loadImages = () =>{

  let imageList = [
    {varName:ballPic, theFile:"ball.png"},
    {varName:redBallPic, theFile:"redball.png"},
    {varName:paddlePic, theFile:"paddle.png"},
    {varName:brick1Pic, theFile:"brick.png"},
    {varName:brick2Pic, theFile:"brick2.png"},
    {varName:brick3Pic, theFile:"brick3.png"},
    {varName:cannonPic, theFile:"cannon.png"},
    {varName:skyPic, theFile:"sky.png"},
    {varName:lifePic, theFile:"life.png"},
    {varName:cannonPowerupPic, theFile:"cannonPowerup.png"},
    {varName:extraScorePowerupPic, theFile:"extraScorePowerup.png"},
    {varName:multiBallPowerupPic, theFile:"multiBallPowerup.png"},
    {varName:redBallPowerupPic, theFile:"redBallPowerup.png"},
    {varName:stickyBallPowerupPic, theFile:"stickyBallPowerup.png"}

  ];

  picsToLoad = imageList.length;

  for(let i=0;i<imageList.length;i++) {
    
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
   
  } // end of for imageList

} // end of function loadImages
