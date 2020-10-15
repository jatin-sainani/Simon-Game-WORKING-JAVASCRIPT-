var buttonColors=["red","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var flag=true;
function nextSequence(){
        var randomNumber=Math.floor(Math.random()*3);
        var randomChosenColor=buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#"+randomChosenColor).fadeIn(200).fadeOut(200).fadeIn(200);
        playSound(randomChosenColor);
        level++;
        $("h1").text("Level "+level);
        
        userClickedPattern=[];
        
}   
 
$(".btn").on("click",function(e){
        var userChosenColor= e.target.id;
        console.log(userChosenColor);
        userClickedPattern.push(userChosenColor);
        console.log(userClickedPattern);
        console.log(gamePattern);
        
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    });

    
function playSound(name){   
        var audio1= new Audio("sounds/"+name+".mp3");
        audio1.play();
}

function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setInterval(function(){
        $("#"+currentColor).removeClass("pressed");
    },100)
}

$(document).on("keypress",function(){
        if(flag===true){
            nextSequence();
        }
        flag=false;
});
function gameOverSound(){
    var gameOver=new Audio("sounds/wrong.mp3");
    gameOver.play();
}
function checkAnswer(currentLevel){
    
        
            if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
                if(userClickedPattern.length===gamePattern.length){
                        setTimeout(function(){
                            nextSequence();
                        },1000);
                    }
                }
                else{
                    $("h1").text("Game Over - Press any key to restart");
                    $("body").addClass("game-over");
                    setTimeout(function(){
                        $("body").removeClass("game-over");
                    },200);
                    gameOverSound(); 
                   $(document).on("keypress",function(){
                    if(flag==false){
                        startOver();
                    }
                   });
                }

  
}
function startOver(){
    level=0;
    gamePattern=[];
    nextSequence();
   flag=true;
}
