class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide()
    //write code to change the background color here
    background("cyan")
    //write code to show a heading for showing the result of Quiz
    text("**result of the quiz**",340,50)
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo()

    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined)
    {
      var displayA=230
      text("contastent who answered correctly will appear in green",130,230)
      for(var plr in allContestants)
      {
        var correctA="2"
        if(correctA===allContestants[plr].answer)
        {
          fill("green")
        }
        else
        {
          fill("red")
        }
        displayA=displayA+30
        text(allContestants[plr].name+":"+allContestants[plr].answer,250,displayA)
      }
    }
    
    
  }

}
