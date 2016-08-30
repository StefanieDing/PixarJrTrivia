var triviaQuestions = [{
	question: "What is Sulley's full name?",
	answerList: ["Michael J. Sullivan", "James P. Sullivan", "Sully Sullivan", "Jeff"],
	answer: 1
},{
	question: "What kind of bug is Frances from 'A Bug's Life'?",
	answerList: ["Ladybug", "Ant", "Grasshopper", "Caterpillar"],
	answer: 0
},{
	question: "What's the name of Woody's boy?",
	answerList: ["Andy", "Danny", "Max", "Sid"],
	answer: 0
},{
	question: "Merida's mother changes into what after eating the enchanted cake?",
	answerList: ["Dragon", "Witch", "Bear", "Will-o'-the-Wisp"],
	answer: 2
},{
	question: "What precious cargo is Wall-E protecting?",
	answerList: ["trash", "photos", "gold", "a plant"],
	answer: 3
},{
	question: "Which of the following is not an emotion showed in 'Inside Out'?",
	answerList: ["Confusion", "Sadness", "Fear", "Disgust"],
	answer: 0
},{
	question: "What is the name of Mr. Incredible's nemesis?",
	answerList: ["Frozone", "Syndrome", "Mirage", "Elastigirl"],
	answer: 1
},{
	question: "What is Nemo's mom's name?",
	answerList: ["Pearl", "Deb", "Coral", "Dory"],
	answer: 2
},{
	question: "What is the big race called in 'Cars'?",
	answerList: ["Daytona 500", "Piston Cup", "Radiator Springs", "Route 66"],
	answer: 1
},{
	question: "In 'Up', what is Russell trying to earn a badge for?",
	answerList: ["Wild Wilderness Scouts", "Explorers of America", "Wilderness Explorer", "Boy Scouts"],
	answer: 2
},{
	question: "From 'The Good Dinosaur,' what does Arlo call his pet?",
	answerList: ["Spunky", "Spot", "Sparky", "Fido"],
	answer: 1
},{
	question: "What fraternity does Mike Wazowski end up joining in college?",
	answerList: ["Zeta Hiss Alpha", "Python Nu Kappa", "Roar Omega Roar", "Oozma Kappa"],
	answer: 3
},{
	question: "Which of the following ISN'T a phrase when you pull on Woody's drawstring?",
	answerList: ["Reach for the sky!", "Ride like the wind, Bullseye!", "There's a snake in my boot!", "Somebody's poisoned the water hole!"],
	answer: 1
},{
	question: "Who's your friend who like's to play...?",
	answerList: ["Bong Bong, Bong Bong", "Ding Dong, Ding Dong", "Bing Bong, Bing Bong", "Sing Song, Sing Song"],
	answer: 2
},{
	question: "Do you think it's odd that 'Ratatouille' takes place is Paris, but the two main characters don't have accents?",
	answerList: ["Yes! So weird!", "They don't have accents?", "Nope!", "What's a Ratatouille?"],
	answer: 0
}];
var search = ['sully+monsters+inc', 'bugs+life', 'toy+story+andy', 'brave+bear', 'wall-e+plant', 'inside+out+emotions', 'the+incredibles+nemesis', 'finding+nemo', 'lightning+mcqueen', 'up+russell', 'the+good+dinosaur', 'monsters+university', 'toy+story+woody','bing+bong','ratatouille'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//giphy api
	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=pixar+" + search[currentQuestion] + "&limit=1&rating=g&api_key=dc6zaTOxFJmzC"
	$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
		var currentGif = giphy.data;
		$.each(currentGif, function(index,value){
		var embedGif = value.images.original.url;
		newGif = $('<img>');
		newGif.attr('src', embedGif);
		newGif.addClass('gifImg');
		$('#gif').html(newGif);
		});
	});
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
