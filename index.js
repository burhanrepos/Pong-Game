const ball=document.getElementById("ball");
//computer Data
const computerPaddle=document.getElementById("computer-paddle");
var comTop=175,comLeft,comRight=5,comBottom;
var comScore=document.getElementById("computer-score");
//user data
const userPaddle=document.getElementById("user-paddle");
var userTop=175,userLeft=5,userRight,userBottom;
var userScore=document.getElementById("user-score");

var uScore=0,cScore=0;

var container=document.getElementById("gameContainer");

var containerHeight=500,containerWidth=1200;
var topDirection=1,leftDirection=1;
var ballTop=235,ballBottom,ballLeft=585,ballRight;
var ballSpeed=10;


//User Event listner
userPaddle.addEventListener("mousemove",paddleMove);
function paddleMove(e){
    let react=container.getBoundingClientRect();
    userTop=e.y-react.top-75;
    if(userTop<0)
    {
        userTop=0;
    }
    else if((userTop+150)>containerHeight)
    {
        userTop=350;
    }
    userPaddle.style.top=userTop+"px";
}
function collision(player)
{
    ballBottom=containerHeight-(ballTop+30);
    ballRight=containerWidth-(ballLeft+30); 
    if(player=="comPortion")
    {
        comLeft=containerWidth-35;
        comBottom=containerHeight-(comTop+150);
        return ballTop>comTop && ballBottom>comBottom&&(ballLeft+30)==comLeft;
    }
    else if(player=="userPortion")
    {
        userRight=containerWidth-35;
        userBottom=containerHeight-(userTop+150);
        return ballTop>userTop && ballBottom>userBottom&&ballLeft==(userLeft+30);
    }
}
function resetBall()
{
    ballTop=235;
    ballLeft=585;
}
function update()
{
    //ballMovement
    ballTop+=ballSpeed*topDirection;
    ballLeft+=ballSpeed*leftDirection;
    ball.style.top=ballTop+"px";
    ball.style.left=ballLeft+"px";
    //paddleMovement
    comTop=(ballTop-75);
    if(comTop<0)
    {
        comTop=0;
    }
    else if((comTop+150)>containerHeight)
    {
        comTop=350;
    }
    computerPaddle.style.top=comTop+"px";
    if((ballTop+30)>containerHeight || ballTop<0)
    {
        topDirection*=-1;
    }
    let player=(ballLeft>600)?"comPortion":"userPortion";
    if(collision(player))
    {
        leftDirection*=-1;
    }
    if(ballLeft > containerWidth)
    {
        uScore++;
        resetBall();
    }
    else if(ballLeft < 0)
    {
        cScore++;
        resetBall();
    }
    userScore.innerHTML=uScore;
    comScore.innerHTML=cScore;
}
function startGame()
{
    update();
}
setInterval(startGame,50);
