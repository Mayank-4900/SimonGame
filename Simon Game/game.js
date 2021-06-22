var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level=0;
var started=false;

$(document).on("keypress",function(event){
	startFromBeginning();
});

function startFromBeginning(){
	if(!started){
	    nextSequence();
	    started = true;
	}
}


function playSound(name){
	var soundFile="sounds/"+name+".mp3";
	var audio=new Audio(soundFile);
	audio.play();
}

function animatePress(currentColor){
	$("#"+currentColor).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColor).removeClass("pressed");
	},100);
}


$(".btn").click(function(){
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkSequence(userClickedPattern.length-1);
});

function nextSequence(){

	
	$("#level-title").text("Level " + level);
	level++;
	userClickedPattern=[];

	var randomNumber=((Math.floor(Math.random()*10))%4);
	var randomChosenColor = buttonColors[randomNumber];
	
	gamePattern.push(randomChosenColor);
	var button="#"+randomChosenColor;
	
	$(button).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);

	
}

function checkSequence(index){
	if(userClickedPattern[index]==gamePattern[index]){
		console.log("success");
		if(userClickedPattern.length==gamePattern.length){
			setTimeout(function(){
				nextSequence();
			},1000);
		}
	}
	else{
		console.log("wrong");
		
		var audio=new Audio("sounds/wrong.mp3");
		audio.play();

		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		},100);

		$("#level-title").text("Game Over, Press Any Key to Restart");
		$(document).on("keypress",function(){
			startOver();
		});
	}
}

function startOver(){
	gamePattern=[];
	userClickedPattern=[];
	level=0;
	started=false;
	startFromBeginning();
}


