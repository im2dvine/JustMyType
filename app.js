// $(document).ready(function () {

//     /*hides uppercase keyboard when page loads*/
//     $("#keyboard-upper-container").hide();


//     /*shows uppercase keyboard when shift key is pressed and hides when released*/
//     $(document).on("keyup keydown", function (e) {
//         if (e.keyCode == 16) {
//             $("#keyboard-upper-container").toggle()
//             $("#keyboard-lower-container").toggle();
//         }
//     });


//     /*when keys pressed highlighted in browser*/
//     $(document).on("keypress", function (e) {
//         let key = $("#" + e.which);
//         key.css("background-color", "yellow",);

//         setTimeout(function () {
//             key.css("background-color", "");
//         }, 250);



//     });


//     /*displays sentences one at a time..
//     when sentence is completed new line should display*/
//     let sentences = [
//         "ten ate neite ate nee enet ite ate inet ent eate",
//         "Too ato too nOt enot one totA not anot tOO aNot",
//         "oat itain oat tain nate eate tea anne inant nean",
//         "itant eate anot eat nato inate eat anot tain eat",
//         "nee ene ate ite tent tiet ent ine ene ete ene ate",
//     ];

//     let sentenceCounter = 0;
//     let letterCounter = 0;
//     let currentSentence = sentences[sentenceCounter];
//     let currentLetter = currentSentence[letterCounter];

//     $("#sentence").text(currentSentence);
//     $("target-letter").text(currentLetter);

//     $(document).keypress (function (e) {
//         if (e.keyCode == 16) {
//             if (currentSentence.charCodeAt(letterCounter) === e.keyCode) {
//                 $("#feedback").append('<span class= "glyphicon glyphicon-ok"></span>');
//             } else {
//                 $("#feedback").append('<span class= "glyphicon glyphicon-remove"></span>');
//             }

//             $("#yellow-block").css("left", "+=17.5px");
//             letterCounter++;
//             currentLetter = currentSentence[letterCounter];
//             $("#target-letter").text(currentLetter);

//         }
//     });
// });


/****************************************************************/


$(document).ready(function () {

    /*global variables*/
    //let sentences = ["test sentence", "second test sentence"];  //for game testing purposes..
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let sentenceIndex = 0; //index of sentence in array
    let letterIndex = 0; //index of letter started at zero..
    let numberOfMistakes = 0; //# of mistakes
    let keysPressed = 0; //# of keys pressed
    let timeStampStart = 0; //when time stamp starts
    let timeStampEnd = 0; //when time stamp ends
    let numberOfWords = 54; //# of words in sentence array

    let replayButton = $("<input class='btn btn-success' type='button' value='Play Again?' onClick='window.location.reload()'>"); //replay button created to reload page if games wants to be played again

    /*sets the current sentence and current letter to show in the divs made for them and to show in browser*/
    let currentSentence = sentences[0]; //sets current Sentence to equal sentences at index of [0]
    let currentLetter = currentSentence[0]; //set current Letter to equal current sentence at index of [0]
    let targetLetterDiv = $("#target-letter"); //sets target Letter Div to equal element with class target-letter in html..
    targetLetterDiv.text(currentLetter); //displays text from current Letter to be entered to target Letter Div..
    $("#sentence").append(sentences[sentenceIndex]); //displays first sentence in array at page load into div..

    /*hides uppercase keyboard when page loads*/
    $("#keyboard-upper-container").hide(); //hides element with id keyboard-upper-container 


    /*shows uppercase keyboard when shift key is pressed and hides when released*/
    $(document).on("keyup keydown", function (e) {  //on keyup keydown function..
        if (e.keyCode == 16) {                      //if keycode equals 16 (Shift) then..
            $("#keyboard-upper-container").toggle()  //toggle element with id keyboard-upper-container
            $("#keyboard-lower-container").toggle(); //toggle element with id keyboard-lower-container
        }
    });


    /*when keys pressed highlighted in browser*/
    $(document).keypress(function (e) { //on keypress function..
        let key = $("#" + e.which); //sets variable for specific key that was pressed..
        key.css("background-color", "yellow",); //sets key variable background to yellow..

        setTimeout(function () {
            key.css("background-color", "");
        }, 250);

        /*starts timestamp when first key is pressed*/
        if (keysPressed < 1) { //when one key is pressed..
            timeStampStart = e.timeStamp; //sets time Stamp Start 
            keysPressed++; //increases number in keys pressed
        }


        let currentSentence = sentences[sentenceIndex];
        let currentLetter = currentSentence[letterIndex];


        if (sentenceIndex < sentences.length) {
            /*checks accuracy and adds the glyphicons to the feedback div only until the sentence is ran through*/
            if (letterIndex < currentSentence.length) {
                if (e.which === currentLetter.charCodeAt()) { //if letter pressed equals key code 
                    /*moves the letter index over and gets the next letter to put into the target letter div on each keypress*/
                    letterIndex++;
                    let nextLetter = currentSentence[letterIndex];

                    /*throws next letter into the target div on keypress if correct*/
                    targetLetterDiv.text(nextLetter);

                    $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>"); //displays green icon to element w/id feedback if correct letter pressed

                    /*moves the yellow block over if letter correct*/
                    $("#yellow-block").animate({ left: "+=17.5px" }, { duration: 1, easing: "linear" }); //animates element with id yellow-block
                } else {
                    $("#feedback").append("<span class='glyphicon glyphicon-remove'></span>");
                    numberOfMistakes++;
                }
                /*empty the feedback div, get the next sentence and put it in the sentence div, reset the yellow block*/
            } else if (sentenceIndex < sentences.length - 1) {
                $("#feedback").empty();
                sentenceIndex++;
                $("#sentence").text(sentences[sentenceIndex]);
                targetLetterDiv.text(sentences[sentenceIndex].charAt(0));
                letterIndex = 0;
                $("#yellow-block").animate({ left: "15px" }, { duration: 1, easing: "linear" });
            } else if (sentenceIndex < sentences.length) {
                /*gets an end time, subtracts the start time, convert to minutes, calc wpm*/
                timeStampEnd = e.timeStamp;
                let diff = timeStampEnd - timeStampStart;
                let minutes = Math.floor(diff / 1000) / 60;
                let wpm = Math.floor(numberOfWords / minutes - 2 * numberOfMistakes);
                /*clears out all the top divs, hides the block*/
                $("#sentence").empty();
                $("#target-letter").empty();
                $("#feedback").empty();
                $("#yellow-block").hide();
                /*adds new text to the sentence div with game info*/
                $("#sentence").append("No More Sentences!!\n" + "Your Score: " + wpm + " words per minute!");
                /*fades in a replay button*/
                targetLetterDiv.append(replayButton);
            }
        }
    })
})
