const Class_2 = "Z2";
const Class_4 = "Z4";
const Class_8 = "Z8";
const Class_16 = "Z16";
const Class_32 = "Z32";
const Class_64 = "Z64";
const Class_128 = "Z128";
const Class_256 = "Z256";
const Class_512 = "Z512";
const Class_1024 = "Z1024";
const Class_2048 = "Z2048";
let score;
let moved;
let Highscore;
let AlgorithmGo;
let rounds = 0;
let roundArray = [];
let FinalScoreCollection = [];
let GraphicStarted = false;
let myChart;
let LastTenScores = [];
const restartButton = document.getElementById("restartButton");
const StartAlgorithmButton = document.getElementById("StartAlgorithm");
const EndAlgorithmButton = document.getElementById("pauseAlgorithm");
const FeldElements = document.querySelectorAll('[Feld]');
const LoosingMessage = document.getElementById("loosing-message");

//Variablen zum Überprüfen ob Bereits etwas gematcht ist
let matched1;
let matched2;
let matched3;
let matched4;
let matched5;
let matched6;
let matched7;
let matched8;
let matched9;
let matched10;
let matched11;
let matched12;
let matched13;
let matched14;
let matched15;
let matched16;


restartButton.addEventListener("click", StartGame);

function CheckforBelegung(Zelle){
    const Cell = document.getElementById(Zelle);
    return Cell.classList.contains(Class_2) || Cell.classList.contains(Class_4) ||Cell.classList.contains(Class_8) ||Cell.classList.contains(Class_16) || Cell.classList.contains(Class_32) || Cell.classList.contains(Class_64) || Cell.classList.contains(Class_128) || Cell.classList.contains(Class_256) || Cell.classList.contains(Class_512) || Cell.classList.contains(Class_1024) || Cell.classList.contains(Class_2048)
}

function addnewElement(){
    let randomCell = (Math.floor(Math.random()*16));
   randomCell++; 
    if (randomCell == 0){
        console.log("0")
        randomCell == 1;
    }
    //console.log(randomCell);
    const valid = CheckforBelegung(randomCell);
    //console.log(valid);
    if (valid == true || randomCell == 0){
        addnewElement()
    }else{
        const random = Math.random();
        if (random < 0.8){
            document.getElementById(randomCell).classList.add("Z2");
            document.getElementById(randomCell).innerText = "2"
        }else{
            document.getElementById(randomCell).classList.add("Z4");
            document.getElementById(randomCell).innerText = "4"
        }
        
    }
}

//Movements
function moveLeft(){
     //2. Spalte 
     Left("2", 1);
     Left("6",1);
     Left("10", 1);
     Left("14", 1);

     //3. Spalte
     Left("3", 2);
     Left("7", 2);
     Left("11", 2);
     Left("15", 2);
     
     //4. Spalte
     Left("4", 3);
     Left("8", 3);
     Left("12", 3);
     Left("16", 3)

     if (moved == true){
        addnewElement();
        moved = false;
        return true;
    }else {
        return false;
    }
}

function Move(oldIndex, newIndex){
    const value = document.getElementById(oldIndex).innerText;
    document.getElementById(oldIndex).classList.remove("Z"+value);
    document.getElementById(oldIndex).innerText = "";
    document.getElementById(newIndex).classList.add("Z"+value);
    document.getElementById(newIndex).innerText = value;
}

function CheckMatch(index1, index2){
    const value1 = document.getElementById(index1).innerText;
    const value2 = document.getElementById(index2).innerText;
    let check;
    //Abfragen
    if (index1 == "1"){
        check = matched1;
    }else if(index1 == "2"){
        check = matched2;
    }else if(index1 == "3"){
        check = matched3;
    }else if(index1 == "4"){
        check = matched4;
    }else if(index1 == "5"){
        check = matched5;
    }else if(index1 == "6"){
        check = matched6;
    }else if(index1 == "7"){
        check = matched7;
    }else if(index1 == "8"){
        check = matched8;
    }else if(index1 == "9"){
        check = matched9;
    }else if(index1 == "10"){
        check = matched10;
    }else if(index1 == "11"){
        check = matched11;
    }else if(index1 == "12"){
        check = matched12;
    }else if(index1 == "13"){
        check = matched13;
    }else if(index1 == "14"){
        check = matched14;
    }else if(index1 == "15"){
        check = matched15;
    }else if(index1 == "16"){
        check = matched16;
    }



    if(check == false){
        //console.log("Match")
        if (value1 == value2){
            let newValue = (parseInt(value1))*2;
            if (newValue == 2048){
                pauseAlgorithm();
            }
            //console.log(newValue)
            //newValue = toString(newValue);
            document.getElementById(index1).classList.remove("Z"+value1);
            document.getElementById(index2).classList.remove("Z"+value2);
            document.getElementById(index2).innerText = "";
    
            //Neues Objekt
            document.getElementById(index1).innerText = newValue;
            document.getElementById(index1).classList.add("Z"+newValue);
            score+= newValue;
            setMatchedtoTrue(index1);
            //console.log(score);
        }
    }

    return value1 == value2
}

function setMatchedtoTrue(Index){
    if(Index == "1"){
        matched1 = true;
    }else if(Index == "2"){
        matched2 = true;
    }else if(Index == "3"){
        matched3 = true;
    }else if(Index == "4"){
        matched4 = true;
    }else if(Index == "5"){
        matched5 = true;
    }else if(Index == "6"){
        matched6 = true;
    }else if(Index == "7"){
        matched7 = true;
    }else if(Index == "8"){
        matched8 = true;
    }else if(Index == "9"){
        matched9 = true;
    }else if(Index == "10"){
        matched10 = true;
    }else if(Index == "11"){
        matched11 = true;
    }else if(Index == "12"){
        matched12 = true;
    }else if(Index == "13"){
        matched13 = true;
    }else if(Index == "14"){
        matched14 = true;
    }else if(Index == "15"){
        matched15 = true;
    }else if(Index == "16"){
        matched16 = true;
    }
}

function Left(Index, AbstandLinks){
    const CheckCell = CheckforBelegung(Index);
    if (CheckCell == true){
        const IndexL = parseInt(Index)-1;
        const CheckIndexL = CheckforBelegung(IndexL);
        if (CheckIndexL == false){
            Move(Index, IndexL);
            moved = true;
            if (AbstandLinks>1){
                const IndexLL = parseInt(IndexL)-1;
                const CheckIndexLL = CheckforBelegung(IndexLL);
                if (CheckIndexLL == false){
                    Move(IndexL, IndexLL);
                    if (AbstandLinks > 2){
                        const IndexLLL = parseInt(IndexLL)-1;
                        const CheckIndexLLL = CheckforBelegung(IndexLLL);
                        if (CheckIndexLLL == false){
                            Move(IndexLL, IndexLLL);
                        }else{
                            CheckMatch(IndexLLL, IndexLL)
                        }
                    }
                }else{
                    CheckMatch(IndexLL, IndexL);
                }
            }
        }else{
            const Match = CheckMatch(IndexL, Index);
            if (Match == true){
                moved = true
            }
        }
    }
}

function Right(Index, AbstandRechts){
    const CheckCell = CheckforBelegung(Index);
    if (CheckCell == true){
        const IndexR = parseInt(Index)+1;
        const CheckIndexR = CheckforBelegung(IndexR);
        if (CheckIndexR == false){
            Move(Index, IndexR);
            moved = true;
            if (AbstandRechts>1){
                const IndexRR = parseInt(IndexR)+1;
                const CheckIndexRR = CheckforBelegung(IndexRR);
                if (CheckIndexRR == false){
                    Move(IndexR, IndexRR);
                    if (AbstandRechts>2){
                        const IndexRRR = parseInt(IndexRR)+1;
                        const CheckIndexRRR = CheckforBelegung(IndexRRR);
                        if (CheckIndexRRR == false){
                            Move(IndexRR, IndexRRR)
                        }else{
                            const Match = CheckMatch(IndexRRR, IndexRR);
                        }
                    }
                }else{
                    const Match = CheckMatch(IndexRR, IndexR);
                }
            }
        }else{
            const Match = CheckMatch(IndexR, Index);
            if (Match == true){
                moved = true
            }
        }

    }
}

function Top(Index, AbstandOben){
    const CheckCell = CheckforBelegung(Index);
    if (CheckCell == true){
        const IndexO = parseInt(Index)-4;
        const CheckIndexO = CheckforBelegung(IndexO);
        if(CheckIndexO == false){
            Move(Index, IndexO);
            moved = true;
            if (AbstandOben>1){
                const IndexOO = parseInt(IndexO)-4;
                const CheckIndexOO = CheckforBelegung(IndexOO);
                if(CheckIndexOO == false){
                    Move(IndexO, IndexOO);
                    if (AbstandOben>2){
                        const IndexOOO = parseInt(IndexOO)-4;
                        const CheckIndexOOO = CheckforBelegung(IndexOOO);
                        if (CheckIndexOOO == false){
                            Move(IndexOO, IndexOOO);
                        }else{
                            CheckMatch(IndexOOO, IndexOO);
                        }
                    }
                }else{
                    CheckMatch(IndexOO, IndexO)
                }
            }
        }else{
            const Match = CheckMatch(IndexO, Index);
            if(Match == true){
                moved = true;
            }
        }
    }
}

function moveRight(){
    //Move Right
    //console.log("Move right");
    Right("3", 1);
    Right("7", 1);
    Right("11", 1);
    Right("15", 1);
    
    //2.Spalte v. links
    Right("2", 2);
    Right("6", 2);
    Right("10", 2);
    Right("14", 2);

    //Linkeste Spalte
    Right("1", 3);
    Right("5", 3);
    Right("9", 3);
    Right("13", 3);

    if (moved == true){
        addnewElement();
        moved = false;
        return true;
    }else{
        return false;
    }
}

function moveUp(){
    //Move Up Funktion wie bei Right
    //console.log("Move up")
    //2. Reihe
    Top("5", 1);
    Top("6", 1);
    Top("7", 1);
    Top("8", 1);

    //3. Reihe
    Top("9", 2);
    Top("10", 2);
    Top("11", 2);
    Top("12", 2);

    //4. Reihe
    Top("13", 3);
    Top("14", 3);
    Top("15", 3);
    Top("16", 3);

    if (moved == true){
        addnewElement();
        moved = false;
        return true;
    }else{
        return false;
    }

    
}


function Down(Index, AbstandUnten){
    const CheckCell = CheckforBelegung(Index);
    if (CheckCell == true){
        const IndexU = parseInt(Index)+4;
        const CheckIndexU = CheckforBelegung(IndexU);
        if(CheckIndexU == false){
            Move(Index, IndexU);
            moved = true;
            if (AbstandUnten>1){
                const IndexUU = parseInt(IndexU)+4;
                const CheckIndexUU = CheckforBelegung(IndexUU);
                if(CheckIndexUU == false){
                    Move(IndexU, IndexUU);
                    if (AbstandUnten>2){
                        const IndexUUU = parseInt(IndexUU)+4;
                        const CheckIndexUUU = CheckforBelegung(IndexUUU);
                        if (CheckIndexUUU == false){
                            Move(IndexUU, IndexUUU);
                        }else{
                            CheckMatch(IndexUUU, IndexUU);
                        }
                    }
                }else{
                    CheckMatch(IndexUU, IndexU)
                }
            }
        }else{
            const Match = CheckMatch(IndexU, Index);
            if(Match == true){
                moved = true;
            }
        }
    }
}

function moveDown(){
    //Move Down
    //console.log("Move Down");
    
    //3. Reihe
    Down("12", 1);
    Down("11", 1);
    Down("10", 1);
    Down("9", 1);

    //2. Reihe
    Down("8", 2);
    Down("7", 2);
    Down("6", 2);
    Down("5", 2);

    //1. Reihe
    Down("4", 3);
    Down("3", 3);
    Down("2", 3);
    Down("1", 3);

    if (moved == true){
        addnewElement();
        moved = false;
        return true
    }else{
        return false;
    }

   
}


function StartGame(){
    FeldElements.forEach(feld=>{
        feld.classList.remove(Class_2);
        feld.classList.remove(Class_4);
        feld.classList.remove(Class_8);
        feld.classList.remove(Class_16);
        feld.classList.remove(Class_32);
        feld.classList.remove(Class_64);
        feld.classList.remove(Class_128);
        feld.classList.remove(Class_256);
        feld.classList.remove(Class_512);
        feld.classList.remove(Class_1024);
        feld.classList.remove(Class_2048);
        feld.innerText = "";
        LoosingMessage.classList.remove("show");

    })
    setDefaultMatched();
    addnewElement();
    addnewElement();
    score = 0;
    moved = false;
    
    ShowPoints();

    ShowHighscore();
}

window.addEventListener("load", function (){
    StartGame();
})

document.onkeydown = CheckKey;

function CheckKey(e){
    e = e || window.event;

    if (e.keyCode == "38"){
        //Up Arrow 
        moveUp();
        ShowPoints();
        ShowHighscore();
        CheckPossibility();
        setDefaultMatched();

    }else if(e.keyCode == "40"){
        //Down Arrow
        moveDown();
        ShowPoints();
        ShowHighscore;
        CheckPossibility();
        setDefaultMatched();

    }else if (e.keyCode == "37"){
        //Left arrow
        moveLeft();
        ShowPoints();
        CheckPossibility();
        ShowHighscore();
        setDefaultMatched();


    }else if (e.keyCode == "39"){
        //Right arrow
        moveRight();
        ShowPoints();
        ShowHighscore();
        CheckPossibility();
        setDefaultMatched();



    }
}

//Punkte anzeigen
function ShowPoints(){
    document.getElementById("score").innerText = score;
    const SCORE = parseInt(score);
    const HIGHSCORE = parseInt(Highscore);
    if (SCORE > HIGHSCORE){
        Highscore = score;
        localStorage.removeItem("Highscore");
        localStorage.setItem("Highscore", score)
    }
}

//Highscore anzeigen
 function ShowHighscore(){
    const HighscoreLocal = localStorage.getItem("Highscore");
    if (HighscoreLocal){
        Highscore = HighscoreLocal;
    }else{
        localStorage.setItem("Highscore", 0)
    }

     
     document.getElementById("highscore").innerText = Highscore
 }

 function CheckPossibility(){
     const CheckCel1 = CheckforBelegung(1);
     const CheckCel2 = CheckforBelegung(2);
     const CheckCel3 = CheckforBelegung(3);
     const CheckCel4 = CheckforBelegung(4);
     const CheckCel5 = CheckforBelegung(5);
     const CheckCel6 = CheckforBelegung(6);
     const CheckCel7 = CheckforBelegung(7);
     const CheckCel8 = CheckforBelegung(8);
     const CheckCel9 = CheckforBelegung(9);
     const CheckCel10 = CheckforBelegung(10);
     const CheckCel11 = CheckforBelegung(11);
     const CheckCel12 = CheckforBelegung(12);
     const CheckCel13 = CheckforBelegung(13);
     const CheckCel14 = CheckforBelegung(14);
     const CheckCel15 = CheckforBelegung(15);
     const CheckCel16 = CheckforBelegung(16);
     
     if (CheckCel1 == true && CheckCel2 == true &&CheckCel3 == true &&CheckCel4 == true &&CheckCel5 == true &&CheckCel6 == true &&CheckCel7 == true &&CheckCel8 == true &&CheckCel9 == true &&CheckCel10 == true &&CheckCel11 == true &&CheckCel12 == true &&CheckCel13 == true &&CheckCel14 == true &&CheckCel5 == true && CheckCel16 == true){
        const CheckFeld1 = CheckifMatchisPossible(1, 0, 0);
        const CheckFeld2 = CheckifMatchisPossible(2, 1, 0);
        const CheckFeld3 = CheckifMatchisPossible(3, 2, 0);
        const CheckFeld4 = CheckifMatchisPossible(4, 3, 0);
        const CheckFeld5 = CheckifMatchisPossible(5, 0, 1);
        const CheckFeld6 = CheckifMatchisPossible(6, 5, 2);
        const CheckFeld7 = CheckifMatchisPossible(7, 6, 3);
        const CheckFeld8 = CheckifMatchisPossible(8, 7, 4);
        const CheckFeld9 = CheckifMatchisPossible(9, 0, 5);
        const CheckFeld10 = CheckifMatchisPossible(10, 9, 6);
        const CheckFeld11 = CheckifMatchisPossible(11, 10, 7);
        const CheckFeld12 = CheckifMatchisPossible(12, 11, 8);
        const CheckFeld13 = CheckifMatchisPossible(13, 0, 9);
        const CheckFeld14 = CheckifMatchisPossible(14, 13, 10);
        const CheckFeld15 = CheckifMatchisPossible(15, 14, 11);
        const CheckFeld16 = CheckifMatchisPossible(16, 15, 12);

        if (CheckFeld1 == false && CheckFeld2 == false && CheckFeld3 == false && CheckFeld4 == false && CheckFeld5 == false && CheckFeld6 == false && CheckFeld7 == false && CheckFeld8 == false && CheckFeld9 == false && CheckFeld10 == false && CheckFeld11 == false && CheckFeld12 == false && CheckFeld13 == false && CheckFeld14 == false && CheckFeld15 == false && CheckFeld16 == false){
                //console.log(score);
                LastTenScores.push(score);
                //console.log(LastTenScores);
                rounds++;
                roundArray.push(rounds);
                let score1 = 0;
                if (LastTenScores.length != 0){
                    LastTenScores.forEach(score => {
                        score1 += score
                    })
                    const FinalScore = score1 /rounds;
                    console.log(FinalScore + " Round: "+rounds);
                    //LastTenScores = [];
                    FinalScoreCollection.push(FinalScore)
                }

                LoosingMessage.classList.add("show");
                LoosingMessage.classList.remove("show");
                StartGame();
                
                
                const ctx = document.getElementById("Statistik").getContext("2d");
                
                console.log(GraphicStarted);
if (GraphicStarted == false){

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels:  [roundArray],
            datasets: [{
                label: 'Scores',
                data: [LastTenScores]
                
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    GraphicStarted = true;  
}

myChart.destroy();
                
        
myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: roundArray,
        datasets: [{
            label: 'Durchschnittliche Punkte',
            data: FinalScoreCollection,
            borderColor: 'black'
        },
    {
        label: "Punkte in der jeweiligen Runde",
        data: LastTenScores,
        borderColor: 'red'
    }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

        }

     }
     
 }

 function CheckifMatchisPossible(Zelle, ZelleLinks, ZelleOben){
    const Value = document.getElementById(Zelle).innerText;
    let ValueLinks = "0";
    let ValueOben = "0";
    if (ZelleLinks>0){
        ValueLinks = document.getElementById(ZelleLinks).innerText;
    }
    if (ZelleOben>0){
        ValueOben = document.getElementById(ZelleOben).innerText;
    }

    if (Value == ValueLinks || Value == ValueOben){
        return true;
    }else{
        return false;
    }
 }

 function CheckLeftMatch(Zelle, AbstandLinks){
     const CheckZell = CheckforBelegung(Zelle);
    if (CheckZell == true){
        const Value = document.getElementById(Zelle).innerText;
    const ZelleL = parseInt(Zelle)-1;
    let ValueL = document.getElementById(ZelleL).innerText;
    const CheckCellL = CheckforBelegung(ZelleL);
    //console.log(Value);

    if (Value == ValueL){
        return true;
    }else{
        if (AbstandLinks > 1){
            const ZelleLL = parseInt(ZelleL)-1;
            let ValueLL = document.getElementById(ZelleLL).innerText;
            if (Value == ValueLL && CheckCellL == false){
                return true
            }else{
                if (AbstandLinks > 2){
                    const ZelleLLL = parseInt(ZelleLL)-1;
                    let ValueLLL = document.getElementById(ZelleLLL).innerText;
                    const CheckCellLL = CheckforBelegung(ZelleLL);
                    if (Value == ValueLLL && CheckCellL == false && CheckCellLL == false){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            }

        }else{
            return false
        }
    }
 }else{
    return false
}
}

 function CheckTopMatch(Zelle, AbstandOben){
     const ZelleAusgang = parseInt(Zelle);
     const CheckCell = CheckforBelegung(Zelle);
    if (CheckCell == true){
    const Value = document.getElementById(Zelle).innerText;
    const ZelleO = parseInt(Zelle)-4;
    let ValueO = document.getElementById(ZelleO).innerText;
    const CheckCellO = CheckforBelegung(ZelleO);

      if (Value == ValueO){
          const Down = isDownBetter(ZelleAusgang);
          if (Down == true){
              return "Down"
          }else{
            return true;
          }
          
          
      }else{
          if(AbstandOben > 1){
              const ZelleOO = parseInt(ZelleO)-4;
              let ValueOO = document.getElementById(ZelleOO).innerText;
              if (Value == ValueOO && CheckCellO == false){
                const Down = isDownBetter(ZelleAusgang);
                if (Down == true){
                    return "Down"
                }else{
                     return true;
                }
              }else{
                  if (AbstandOben > 2){
                      const ZelleOOO = parseInt(ZelleOO)-4;
                      let ValueOOO = document.getElementById(ZelleOOO).innerText;
                      const CheckCellOO = CheckforBelegung(ZelleOO);
                      if (Value == ValueOOO && CheckCellO == false && CheckCellOO == false){
                        const Down = isDownBetter(ZelleAusgang);
                        if (Down == true){
                            return "Down"
                        }else{
                          return true;
                        }

                      }else{
                          return false;
                      }
                  }else{
                      return false
                  }
              }
          }else{
              return false;
          }
      }
    }else{
        return false;
    }
}
    
 
function isDownBetter(Zelleunten){
    const ZelleU = parseInt(Zelleunten);
    const ValueU = parseInt(document.getElementById(Zelleunten).innerText)*2;
    //console.log(ValueU);
    if(ZelleU <= 8){
        //M = Minus = Eine Reihe tiefer
        const ZelleM = ZelleU+4;
        const ZelleMM = ZelleM+4;
        const CheckM = CheckforBelegung(ZelleM);
        const CheckMM = CheckforBelegung(ZelleMM);
        if (CheckM == false && CheckMM == false){
            //Gematchte Zelle geht zwei nach Unten
            let ValueL = "0";
            let ValueR = "0";
            const MatchL = ZelleU+7;
            const MatchR = ZelleU+9;
            if (ZelleU !== 5){
                const CheckLowest = CheckforBelegung(MatchL);
                if (CheckLowest == true){
                    ValueL = parseInt(document.getElementById(MatchL).innerText);
                }else{
                    const MatchL2 = ZelleU+3;
                    const CheckLowest2 = CheckforBelegung(MatchL2);
                    if (CheckLowest2 == true){
                        ValueL = parseInt(document.getElementById(MatchL2).innerText);
                    }else{
                        const MatchL3 = ZelleU-1;
                        const CheckLowest3 = CheckforBelegung(MatchL3);
                        if (CheckLowest3 == true){
                            ValueL = parseInt(document.getElementById(MatchL3).innerText);
                        }else{
                            const MatchL4 = ZelleU-5;
                            const CheckLowest4 = CheckforBelegung(MatchL4);
                            if (CheckLowest4 == true){
                                ValueL = parseInt(document.getElementById(MatchL4).innerText);
                            }
                        }
                    }
                }
                
            }

            if (ZelleU !== 8){
                const CheckR = CheckforBelegung(MatchR);
                if (MatchR == true){
                    ValueR = parseInt(document.getElementById(MatchR).innerText);
                }else{
                    const MatchR2 = ZelleU+5;
                    const CheckR2 = CheckforBelegung(MatchR2);
                    if (CheckR2 == true){
                        ValueR = parseInt(document.getElementById(MatchR2).innerText);
                    }else{
                        const MatchR3 = ZelleU+1;
                        const CheckR3 = CheckforBelegung(MatchR3);
                        if (CheckR3 == true){
                            ValueR = parseInt(document.getElementById(MatchR3).innerText);
                        }else{
                            const MatchR4 = ZelleU-3;
                            const CheckR4 = CheckforBelegung(MatchR4);
                            if (CheckR4 == true){
                                ValueR = parseInt(document.getElementById(MatchR4).innerText);
                            }
                        }
                    }
                }
            }
            
            
            if (ValueU == ValueL || ValueU == ValueR){
                
                //console.log("Links "+ValueL);
                //console.log("Rechts "+ ValueR)
                //console.log(ValueU);
                return true;
            }else{
                return false
            }
        }else if(CheckM == false || CheckMM == false){
            //Block stoppt in der 2. Reihe von unten 
            let ValueL = "0";
            let ValueR = "0";
            const MatchL = ZelleU+3;
            const MatchR = ZelleU+5;
            if(ZelleU !== 5){
                const MatchLPuffer = ZelleU+7;
                const CheckLPuffer = CheckforBelegung(MatchLPuffer);
                if (CheckLPuffer == true){
                    const CheckL1 = CheckforBelegung(MatchL);
                    if (CheckL1 == true){
                        ValueL == parseInt(document.getElementById(MatchL));
                    }else{
                        const MatchL2 = ZelleU-1;
                        const CheckL2 = CheckforBelegung(MatchL2);
                        if (CheckL2 == true){
                            ValueL == parseInt(document.getElementById(MatchL2));
                        }else{
                            const MatchL3 = ZelleU-5;
                            const CheckL3 = CheckforBelegung(MatchL3);
                            if (CheckL3 == true){
                                ValueL == parseInt(document.getElementById(MatchL3));
                            }
                        }
                    }

                }else{
                    //Verschiebung der jetzigen Ausgangslage 
                    const CheckL = CheckforBelegung(MatchL);
                    if (CheckL == true){
                        //2. von unten rutscht runter um aufzufüllen, dh. nur die da drüber können potenzielle leichte Matches werden
                        const MatchL2 = ZelleU-1;
                        const CheckL2 = CheckforBelegung(MatchL2);
                        if (CheckL2 == true){
                            ValueL == parseInt(document.getElementById(MatchL2));
                        }else{
                            const MatchL3 = ZelleU-5;
                            const CheckL3 = CheckforBelegung(MatchL3);
                            if (MatchL3 == true){
                                ValueL == parseInt(document.getElementById(MatchL3));
                            }
                        }
                    }else{
                        //Nur wenn jetzt die beiden oberen true sind kann es zu einem potenziellen einfachen Match kommen 
                        const MatchL2 = ZelleU-1;
                        const MatchL3 = ZelleU-5;
                        const CheckL2 = CheckforBelegung(MatchL2);
                        const CheckL3 = CheckforBelegung(MatchL3);
                        if (CheckL2 == true && CheckL3 == true){
                            ValueL == parseInt(document.getElementById(MatchL3));
                        }
                    }
                }
            }

            if (ZelleU !== 8){
                const MatchRPuffer = ZelleU+7;
                const CheckRPuffer = CheckforBelegung(MatchRPuffer);
                if (CheckRPuffer == true){
                    //Die Ausgangssituation verschiebt sich aufgrund des Puffers nicht
                    const CheckR = CheckforBelegung(MatchR);
                    if (CheckR == true){
                        ValueR = parseInt(document.getElementById(MatchR).innerText);
                    }else{
                        const MatchR1 = ZelleU+1;
                        const CheckR1 = CheckforBelegung(MatchR1);
                        if (CheckR1 == true){
                            ValueR = parseInt(document.getElementById(MatchR1).innerText);
                        }else{
                            const MatchR2 = ZelleU-3;
                            const CheckR2 = CheckforBelegung(MatchR2);
                            if (CheckR2 == true){
                                ValueR = parseInt(document.getElementById(MatchR2).innerText);
                            }
                        }
                    }
                }else{
                    //Die Ausgangssituation verschiebt sich um eins nach unten
                    const CheckR = CheckforBelegung(MatchR);
                    if (MatchR == true){
                        //2. von unten rutscht runter um aufzufüllen, dh. nur die da drüber können potenzielle leichte Matches werden
                        const MatchR1 = ZelleU+1;
                        const CheckR1 = CheckforBelegung(MatchR1)
                        if (CheckR1 == true){
                            ValueR = parseInt(document.getElementById(MatchR1).innerText);
                        }else{
                            const MatchR2 = ZelleU-3;
                            const CheckR2 = CheckforBelegung(MatchR2);
                            if(CheckR2 == true){
                                ValueR = parseInt(document.getElementById(MatchR2).innerText);
                            }
                        }
                    }else{
                        //Nur wenn jetzt die beiden oberen true sind kann es zu einem potenziellen einfachen Match kommen 
                        const MatchR1 = ZelleU+1;
                        const CheckR1 = CheckforBelegung(MatchR1)
                        const MatchR2 = ZelleU-3;
                        const CheckR2 = CheckforBelegung(MatchR2);
                        if (CheckR1 == true && CheckR2 == true){
                            ValueR = parseInt(document.getElementById(MatchR2).innerText);
                        }
                    }
                }
            }

            if(ValueL == ValueU || ValueR == ValueU){
                //console.log("Links "+ValueL);
                //console.log("Rechts "+ ValueR)
                //console.log(ValueU);
                return true;
            }else{
                return false;
            }
        }else{
            let ValueL = "0";
            let ValueR = "0";
            const MatchL = ZelleU-1;
            const MatchR = ZelleU+1;
            if (ZelleU !== 5){
                const MatchLPuffer = ZelleU+7;
                const MatchLPuffer2 = ZelleU+3;
                const CheckLPuffer = CheckforBelegung(MatchLPuffer);
                const CheckLPuffer2 = CheckforBelegung(MatchLPuffer2);
                if (CheckLPuffer == true && CheckLPuffer2 == true){
                    //An der Ausgangssituation verändert sich nichts, da die Puffer ein runterrutschen verhindern
                    const CheckL = CheckforBelegung(MatchL);
                    if (CheckL == true){
                        ValueL = parseInt(document.getElementById(MatchL).innerText);
                    }else {
                        const MatchL2 = ZelleU-5;
                        const CheckL2 = CheckforBelegung(MatchL2);
                        if (CheckL2 == true){
                            ValueL = parseInt(document.getElementById(MatchL2).innerText);
                        }
                    }
                }else if (CheckLPuffer == true || CheckLPuffer2 == true){
                    //Ausgangssituation rutscht um ein Feld nach unten, da nur ein Puffer vorhanden ist 
                    const MatchL1 = ZelleU-5;
                    const CheckL = CheckforBelegung(MatchL);
                    const CheckL1 = CheckforBelegung(MatchL1);
                    if (CheckL == true && CheckL1 == true){
                        ValueL = parseInt(document.getElementById(MatchL1).innerText);
                    }
                }
            } 

            if (ZelleU !== 8){
                const MatchRPuffer = ZelleU+9;
                const MatchRPuffer2 = ZelleU+5;
                const CheckRPuffer = CheckforBelegung(MatchRPuffer);
                const CheckRPuffer2 = CheckforBelegung(MatchRPuffer2);
                if (CheckRPuffer == true && CheckRPuffer2 == true){
                    //Die Ausgangssituation verändert sich nicht, da zwei Puffer vorhanden sind 
                    const CheckR = CheckforBelegung(MatchR);
                    if (CheckR == true){
                        ValueR = parseInt(document.getElementById(MatchR).innerText);
                    }else{
                        const MatchR1 = ZelleU-3;
                        const CheckR1 = CheckforBelegung(MatchR1);
                        if (CheckR1 == true){
                            ValueR = parseInt(document.getElementById(MatchR1).innerText);
                        }
                    }
                }else if(CheckRPuffer == true || CheckRPuffer2 == true){
                    //Die Ausgangssituation verschiebt sich um einen nach unten, da nur ein Puffer vorhanden ist
                    const MatchR1 = ZelleU-3;
                    const CheckR1 = CheckforBelegung(MatchR1);
                    const CheckR = CheckforBelegung(MatchR);
                    if(CheckR == true && CheckR1 == true){
                        ValueR = parseInt(document.getElementById(MatchR1).innerText);
                    }
                }
               
            }

            if (ValueL == ValueU || ValueR == ValueU){
                //console.log("Links "+ValueL);
                //console.log("Rechts "+ ValueR)
                //console.log(ValueU);
                return true;
            }else{
                return false;
            }
        }   
    }else if(ZelleU <= 12){
        const ZelleM = ZelleU+4;
        const CheckM = CheckforBelegung(ZelleM);
        if (CheckM == false){
            let ValueL = "0";
            let ValueR = "0";
            const MatchL = ZelleU+3;
            const MatchR = ZelleU+5;

            if(ZelleU !== 9){
                const CheckL = CheckforBelegung(MatchL);
                if (CheckL == true){
                    ValueL = parseInt(document.getElementById(MatchL).innerText);
                }else{
                    const MatchL1 = ZelleU-1;
                    const CheckL1 = CheckforBelegung(MatchL1);
                    if (CheckL1 == true){
                        ValueL = parseInt(document.getElementById(MatchL1).innerText);
                    }else{
                        const MatchL2 = ZelleU-5;
                        const CheckL2 = CheckforBelegung(MatchL2);
                        if (CheckL2 == true){
                            ValueL = parseInt(document.getElementById(MatchL2).innerText);
                        }else{
                            const MatchL3 = ZelleU-9;
                            const CheckL3 = CheckforBelegung(MatchL3);
                            if (CheckL3 == true){
                                ValueL = parseInt(document.getElementById(MatchL3).innerText);
                            }
                        }
                    }
                }
            }

            if (ZelleU !== 12){
                const CheckR = CheckforBelegung(MatchR);
                if (CheckR == true){
                    ValueR = parseInt(document.getElementById(MatchR).innerText);
                }else{
                    const MatchR1 = ZelleU+1;
                    const CheckR1 = CheckforBelegung(MatchR1);
                    if (CheckR1 == true){
                        ValueR = parseInt(document.getElementById(MatchR1).innerText);
                    }else{
                        const MatchR2 = ZelleU-3;
                        const CheckR2 = CheckforBelegung(MatchR2);
                        if (CheckR2 == true){
                            ValueR = parseInt(document.getElementById(MatchR2).innerText);
                        }else{
                            const MatchR3 = ZelleU-7;
                            const CheckR3 = CheckforBelegung(MatchR3);
                            if (CheckR3 == true){
                                ValueR = parseInt(document.getElementById(MatchR3).innerText);
                            }
                        }
                    }
                }
            }

            if(ValueL == ValueU || ValueR == ValueU){
                //console.log("Links "+ValueL);
                //console.log("Rechts "+ ValueR)
                //console.log(ValueU);
                return true;
            }else{
                return false;
            }
        }else{
            let ValueL = "0";
            let ValueR = "0";
            const MatchL = ZelleU-1;
            const MatchR = ZelleU+1;
            if (ZelleU !== 9){
                const MatchLPuffer = ZelleU+3;
                const CheckLPuffer = CheckforBelegung(MatchLPuffer);
                if (CheckLPuffer == true){
                    //Normale Ausgangssituation, da ein Puffer vorhanden ist 
                    const CheckL = CheckforBelegung(MatchL);
                    if (CheckL == true){
                        ValueL = parseInt(document.getElementById(MatchL).innerText);
                    }else{
                        const MatchL2 = ZelleU-5;
                        const CheckL2 = CheckforBelegung(MatchL2);
                        if (CheckL2 == true){
                            ValueL = parseInt(document.getElementById(MatchL2).innerText);
                        }else{
                            const MatchL3 = ZelleU-9;
                            const CheckL3 = CheckforBelegung(MatchL3);
                            if (CheckL3 == true){
                                ValueL = parseInt(document.getElementById(MatchL3).innerText);
                            }
                        }
                    }

                }else{
                    //Ausgangssituation verschiebt sich um ein Feld nach unten, da kein Puffer vorhanden ist
                    const CheckL = CheckforBelegung(MatchL);
                    if (CheckL == true){
                        //Der 2. Block von unten wird zum Puffer
                        const MatchL1 = ZelleU-5;
                        const CheckL1 =  CheckforBelegung(MatchL1);
                        if (CheckL1 == true){
                            ValueL = parseInt(document.getElementById(MatchL1).innerText);
                        }else{
                            const MatchL2 = ZelleU-9;
                            const CheckL2 = CheckforBelegung(MatchL2);
                            if (CheckL2 == true){
                                ValueL = parseInt(document.getElementById(MatchL2).innerText);
                            }
                        }
                    }else{
                        //Beide oberen Blocks müssen vorhanden sein, damit es zu einem möglichen leichten Match kommen kann
                        const MatchL1 = ZelleU-5;
                        const CheckL1 =  CheckforBelegung(MatchL1);
                        const MatchL2 = ZelleU-9;
                        const CheckL2 = CheckforBelegung(MatchL2);
                        if (CheckL1 == true && CheckL2 == true){
                            ValueL = parseInt(document.getElementById(MatchL2).innerText);
                        }
                    }
                }
            } 

            if (ZelleU !== 12){
                const MatchRPuffer = ZelleU+5;
                const CheckRPuffer = CheckforBelegung(MatchRPuffer);
                if (CheckRPuffer == true){
                    //Die Ausgangssituation bleibt gleich, da ein Puffer vorhanden ist
                    const CheckR = CheckforBelegung(MatchR);
                    if (MatchR == true){
                        ValueR = parseInt(document.getElementById(MatchR).innerText);
                    }else{
                        const MatchR1 = ZelleU-3;
                        const CheckR1 = CheckforBelegung(MatchR1);
                        if (CheckR1 == true){
                            ValueR = parseInt(document.getElementById(MatchR1).innerText);
                        }else{
                            const MatchR2 = ZelleU-7;
                            const CheckR2 = CheckforBelegung(MatchR2);
                            if (CheckR2 == true){
                                ValueR = parseInt(document.getElementById(MatchR2).innerText);
                            }
                        }
                    }
                }else{
                    //Die Ausgangssituation verschiebt sich um einen nach unten, da kein Puffer vorhanden ist
                    const CheckR = CheckforBelegung(MatchR);
                    if (CheckR == true){
                        // Der zweite Block von unten wird zum neuen Puffer
                        const MatchR1 = ZelleU-3;
                        const CheckR1 = CheckforBelegung(MatchR1);
                        if (CheckR1 == true){
                            ValueR = parseInt(document.getElementById(MatchR1).innerText);
                        }else{
                            const MatchR2 = ZelleU-7;
                            const CheckR2 = CheckforBelegung(MatchR2);
                            if (CheckR2 == true){
                                ValueR = parseInt(document.getElementById(MatchR2).innerText);
                            }
                        }
                    }else{
                        //Beide oberen Blöcke müssen vorhanden sein, damit es zu einem leichtem Match kommen kann
                        const MatchR1 = ZelleU-3;
                        const CheckR1 = CheckforBelegung(MatchR1);
                        const MatchR2 = ZelleU-7;
                        const CheckR2 = CheckforBelegung(MatchR2);
                        if (CheckR1 == true && CheckR2 == true){
                            ValueR = parseInt(document.getElementById(MatchR2).innerText);
                        }
                    }
                }
            }

            if (ValueL == ValueU || ValueR == ValueU){
                //console.log("Links "+ValueL);
                //console.log("Rechts "+ ValueR)
                //console.log(ValueU);
                return true;
            }else{
                return false;
            }
        }
    }else{
            let ValueL = "0";
            let ValueR = "0";
            const MatchL = ZelleU-1;
            const MatchR = ZelleU+1;
            if (ZelleU !== 13){
                const CheckL = CheckforBelegung(MatchL);
                if (CheckL == true){
                    ValueL = parseInt(document.getElementById(MatchL).innerText);
                }else{
                    const MatchL1 = ZelleU-5;
                    const CheckL1 = CheckforBelegung(MatchL1);
                    if (CheckL1 == true){
                        ValueL = parseInt(document.getElementById(MatchL1).innerText);
                    }else{
                        const MatchL2 = ZelleU-9;
                        const CheckL2 = CheckforBelegung(MatchL2);
                        if (CheckL2 == true){
                            ValueL = parseInt(document.getElementById(MatchL2).innerText);
                        }else{
                            const MatchL3 = ZelleU-13;
                            const CheckL3 = CheckforBelegung(MatchL3);
                            if (CheckL3 == true){
                                ValueL = parseInt(document.getElementById(MatchL3).innerText);
                            }
                        }
                    }
                }
            } 

            if (ZelleU !== 16){
                const CheckR = CheckforBelegung(MatchR);
                if (CheckR == true){
                    ValueR = parseInt(document.getElementById(MatchR).innerText);
                }else{
                    const MatchR1 = ZelleU-3;
                    const CheckR1 = CheckforBelegung(MatchR1);
                    if (CheckR1 == true){
                        ValueR = parseInt(document.getElementById(MatchR1).innerText);
                    }else{
                        const MatchR2 = ZelleU-7;
                        const CheckR2 = CheckforBelegung(MatchR2);
                        if (CheckR2 == true){
                            ValueR = parseInt(document.getElementById(MatchR2).innerText);
                        }else{
                            const MatchR3 = ZelleU-11;
                            const CheckR3 = CheckforBelegung(MatchR3);
                            if (CheckR3 == true){
                                ValueR = parseInt(document.getElementById(MatchR3).innerText);
                            }
                        }
                    }
                }
            }

            if (ValueL == ValueU || ValueR == ValueU){
                //console.log("Links "+ValueL);
                //console.log("Rechts "+ ValueR)
                //console.log(ValueU);
                return true;
            }else{
                return false;
            }
    }
}
 

 function setDefaultMatched(){
    matched1 = false;
    matched2 = false;
    matched3 = false;
    matched4 = false;
    matched5 = false;
    matched6 = false;
    matched7 = false;
    matched8 = false;
    matched9 = false;
    matched10 = false;
    matched11 = false;
    matched12 = false;
    matched13 = false;
    matched14 = false;
    matched15 = false;
    matched16 = false;

 }

StartAlgorithmButton.addEventListener("click", StartAlgorithm)
EndAlgorithmButton.addEventListener("click", pauseAlgorithm);

function pauseAlgorithm(){
    document.getElementById("StartAlgorithm").style.display = "inline";
    document.getElementById("pauseAlgorithm").style.display = "none";
    AlgorithmGo = false;
}

function StartAlgorithm(){
    document.getElementById("StartAlgorithm").style.display = "none";
    document.getElementById("pauseAlgorithm").style.display = "inline";
    AlgorithmNew();
}

function Algorithm(){
    let counter = 0;
    AlgorithmGo = true;
    console.log("Go");
            const RepeatAlgorithm = setInterval(function(){
               // Hoch
        
                const moveup = moveUp();
                if (moveup == false){
                    counter++;
                }
                
                setDefaultMatched();
    

            //Links
        
                const moveleft = moveLeft();
                if (moveleft == false){
                    counter++;
                }
           
            setDefaultMatched()

            //Runter
            
                const movedown = moveDown();
                if (movedown == false){
                    counter++;
                }
                
                setDefaultMatched();
        

            //2. Links
            
                const moveleft2 = moveLeft();
                if (moveleft2 == false){
                    counter++;
                }
           
            setDefaultMatched();
        


            if (counter >= 3){
                //console.log("Gerettet!")
                moveRight();
                counter = 0;
            }else{
                counter = 0;
            }

            ShowPoints();
            ShowHighscore();
            CheckPossibility();

            //Algorithmus stoppen
            if (AlgorithmGo == false){
               clearInterval(RepeatAlgorithm);
            }
            }, 50)
}

function AlgorithmInactiv(){
    let counter = 0;
    AlgorithmGo = true;
    const RepeatAlgorithm = setInterval(function(){
        //console.log(counter)
        let moveleft;
        let movedown = true;
        let moveup = true;
        if (counter < 3 || counter == 4){
            moveleft = moveLeft();
            counter += 1;
            //console.log("Update: "+ counter)
        }else if(counter == 3){
            moveleft = moveUp();
            counter++;
        }else if(counter == 5){
            moveleft = moveDown();
            counter = 0;
        }

        if(moveleft == false){
            moveup = moveUp();
            ShowPoints();
        ShowHighscore();
        CheckPossibility();
        setDefaultMatched();
        }

        if (moveup == false){
            movedown = moveDown();
            ShowPoints();
        ShowHighscore();
        CheckPossibility();
        setDefaultMatched();
        }

        if (movedown == false){
            moveRight();
            ShowPoints();
        ShowHighscore();
        CheckPossibility();
        setDefaultMatched();
        }

        ShowPoints();
        ShowHighscore();
        CheckPossibility();
        setDefaultMatched();

        if (AlgorithmGo == false){
            clearInterval(RepeatAlgorithm);
         }
    }, 100)
}

function AlgorithmNew(){
    let counter = 0;
    AlgorithmGo = true;
    const RepeatAlgorithm = setInterval(function(){
        //Checken ob es leichte Matches gibt
        const CheckMatch = CheckMovesLT();
        if (CheckMatch == "Down true"){
            //console.log("Unten");
            moveDown();
            ShowPoints();
            ShowHighscore();
            CheckPossibility();
            setDefaultMatched();
        }else if(CheckMatch == "Links true"){
           // console.log("Links")
            moveLeft();
            ShowPoints();
            ShowHighscore();
            CheckPossibility();
            setDefaultMatched();
        }else if(CheckMatch == "Oben true"){
            //console.log("Oben")
            moveUp();
            ShowPoints();
            ShowHighscore();
            CheckPossibility();
            setDefaultMatched();
        }else{
            const GoodMoves = CheckGoodMoves();
            if (GoodMoves == "LEFT"){
                //console.log("Good Left")
                moveLeft();
                ShowPoints();
                ShowHighscore();
                CheckPossibility();
                setDefaultMatched();
            }else{
                //console.log("Alternative");
                //console.log(counter)
                let moveleft;
                let movedown = true;
                let moveup = true;
                moveleft = moveUp();
        
                if(moveleft == false){
                    moveup = moveLeft();
                    ShowPoints();
                ShowHighscore();
                CheckPossibility();
                setDefaultMatched();
                }
        
                if (moveup == false){
                    movedown = moveDown();
                    ShowPoints();
                ShowHighscore();
                CheckPossibility();
                setDefaultMatched();
                }
        
                if (movedown == false){
                    moveRight();
                    ShowPoints();
                ShowHighscore();
                CheckPossibility();
                setDefaultMatched();
                }
        
                ShowPoints();
                ShowHighscore();
                CheckPossibility();
                setDefaultMatched();
            }
}
if (AlgorithmGo == false){
    clearInterval(RepeatAlgorithm);
 }
},50)};

function CheckMovesLT(){
    const CheckT1 = CheckTopMatch("5", 1);
        const CheckT2 = CheckTopMatch("6", 1);
        const CheckT3 = CheckTopMatch("7", 1);
        const CheckT4 = CheckTopMatch("8", 1);
        const CheckT5 = CheckTopMatch("9", 2);
        const CheckT6 = CheckTopMatch("10", 2);
        const CheckT7 = CheckTopMatch("11", 2);
        const CheckT8 = CheckTopMatch("12", 2);
        const CheckT9 = CheckTopMatch("13", 3);
        const CheckT10 = CheckTopMatch("14", 3);
        const CheckT11 = CheckTopMatch("15", 3);
        const CheckT12 = CheckTopMatch("16", 3);
        if(CheckT1 == "Down" || CheckT2 == "Down" || CheckT3 == "Down" || CheckT4 == "Down" || CheckT5 == "Down" || CheckT6 == "Down" || CheckT7 == "Down" || CheckT8 == "Down" || CheckT9 == "Down" || CheckT10 == "Down" || CheckT11 == "Down" || CheckT12 == "Down" ){
            return "Down true"
        }else if(CheckT1 == true || CheckT2 == true || CheckT3 == true || CheckT4 == true || CheckT5 == true || CheckT6 == true || CheckT7 == true || CheckT8 == true || CheckT9 == true || CheckT10 == true || CheckT11 == true || CheckT12 == true ){
            return "Oben true"
        }else{
            //Links
    const CheckL1 = CheckLeftMatch("2", 1);
    const CheckL2 = CheckLeftMatch("3", 2);
    const CheckL3 = CheckLeftMatch("4", 3);
    const CheckL4 = CheckLeftMatch("6", 1);
    const CheckL5 = CheckLeftMatch("7", 2);
    const CheckL6 = CheckLeftMatch("8", 3);
    const CheckL7 = CheckLeftMatch("10", 1);
    const CheckL8 = CheckLeftMatch("11", 2);
    const CheckL9 = CheckLeftMatch("12", 3);
    const CheckL10 = CheckLeftMatch("14", 1);
    const CheckL11 = CheckLeftMatch("15", 2);
    const CheckL12 = CheckLeftMatch("16", 3);
     if (CheckL1 == true || CheckL2 == true ||CheckL3 == true || CheckL4 == true || CheckL5 == true || CheckL6 == true || CheckL7 == true || CheckL8 == true || CheckL9 == true || CheckL10 == true || CheckL11 == true || CheckL12 == true ){
         return "Links true"
     }
        }
}

function GoodLeftMove(Cell, AbstandLinks){
    const Zelle = parseInt(Cell);
    const Value = parseInt(document.getElementById(Cell).innerText);
    const Check = CheckforBelegung(Cell);
    if (Check == true){
        if (AbstandLinks == 1){
            const ZelleL = Zelle-1;
            const Check1 = CheckforBelegung(ZelleL);
        if (ZelleL == false){
            let ValueO = "0";
            let ValueU = "0";

            if (Zelle != 2){
                const MatchO = Zelle-5;
                const CheckO = CheckforBelegung(MatchO);
                if (CheckO == true){
                    ValueO = parseInt(document.getElementById(MatchO).innerText);
                }else{
                    const MatchO2 = Zelle-4;
                    const CheckO2 = CheckforBelegung(MatchO2);
                    if (CheckO2 == true){
                        ValueO = parseInt(document.getElementById(MatchO2).innerText);
                    }else{
                        const MatchO3 = Zelle-3;
                        const CheckO3 = CheckforBelegung(MatchO3);
                        if (CheckO3 == true){
                            ValueO = parseInt(document.getElementById(MatchO3).innerText);
                        }else{
                            const MatchO4 = Zelle-2;
                            const CheckO4 = CheckforBelegung(MatchO4);
                            if (CheckO4 == true){
                                ValueO = parseInt(document.getElementById(MatchO4).innerText);
                            }
                        }
                    }
                }
            }

            if (Zelle != 14){
                const MatchU = Zelle+3;
                const CheckU = CheckforBelegung(MatchU);
                if (CheckU == true){
                    ValueU = parseInt(document.getElementById(MatchU).innerText);
                }else{
                    const MatchU2 = Zelle+4;
                    const CheckU2 = CheckforBelegung(MatchU2);
                    if (CheckU2 == true){
                        ValueU = parseInt(document.getElementById(MatchU2).innerText);
                    }else{
                        const MatchU3 = Zelle+5;
                        const CheckU3 = CheckforBelegung(MatchU3);
                        if (CheckU3 == true){
                            ValueU = parseInt(document.getElementById(MatchU3).innerText);
                        }else{
                            const MatchU4 = Zelle+6;
                            const CheckU4 = CheckforBelegung(MatchU4);
                            if (CheckU4 == true){
                                ValueU = parseInt(document.getElementById(MatchU4).innerText);
                            }
                        }
                    }
                }
            }

            if (ValueO == Value || ValueU == Value){
                return true;
            }else{
                return false
            }
        }else{
            return false
        }
        }else if (AbstandLinks == 2){
            //3. Reihe
            const MatchL = Zelle-1;
            const MatchLL = Zelle-2;
            const CheckL = CheckforBelegung(MatchL);
            const CheckLL = CheckforBelegung(MatchLL);
            if (CheckL == false && CheckLL == false){
                //Zelle bewegt sich zwei nach links
            let ValueO = "0";
            let ValueU = "0";

            if (Zelle != 3){
                const MatchO = Zelle-6;
                const CheckO = CheckforBelegung(MatchO);
                if (CheckO == true){
                    ValueO = parseInt(document.getElementById(MatchO).innerText);
                }else{
                    const MatchO2 = Zelle-5;
                    const CheckO2 = CheckforBelegung(MatchO2);
                    if (CheckO2 == true){
                        ValueO = parseInt(document.getElementById(MatchO2).innerText);
                    }else{
                        const MatchO3 = Zelle-4;
                        const CheckO3 = CheckforBelegung(MatchO3);
                        if (CheckO3 == true){
                            ValueO = parseInt(document.getElementById(MatchO3).innerText);
                        }else{
                            const MatchO4 = Zelle-3;
                            const CheckO4 = CheckforBelegung(MatchO4);
                            if (CheckO4 == true){
                                ValueO = parseInt(document.getElementById(MatchO4).innerText);
                            }
                        }
                    }
                }
            }

            if (Zelle != 15){
                const MatchU = Zelle+2;
                const CheckU = CheckforBelegung(MatchU);
                if (CheckU == true){
                    ValueU = parseInt(document.getElementById(MatchU).innerText);
                }else{
                    const MatchU2 = Zelle+3;
                    const CheckU2 = CheckforBelegung(MatchU2);
                    if (CheckU2 == true){
                        ValueU = parseInt(document.getElementById(MatchU2).innerText);
                    }else{
                        const MatchU3 = Zelle+4;
                        const CheckU3 = CheckforBelegung(MatchU3);
                        if (CheckU3 == true){
                            ValueU = parseInt(document.getElementById(MatchU3).innerText);
                        }else{
                            const MatchU4 = Zelle+5;
                            const CheckU4 = CheckforBelegung(MatchU4);
                            if (CheckU4 == true){
                                ValueU = parseInt(document.getElementById(MatchU4).innerText);
                            }
                        }
                    }
                }
            }

            if (ValueO == Value || ValueU == Value){
                return true;
            }else{
                return false
            }

            }else if (CheckL == false || CheckLL == false){
                //Zelle bewegt sich um einen nach links
                let ValueO = "0";
                let ValueU = "0"
                
                if (Zelle != 3){
                    const ZelleLPuffer = Zelle-6;
                    const CheckLPuffer = CheckforBelegung(ZelleLPuffer);
                    if (CheckLPuffer == true){
                        //Ausgangssituation ändert sich nicht, da ein Puffer vorhanden ist
                        const MatchO = Zelle-5;
                        const CheckO = CheckforBelegung(MatchO);
                        if (CheckO == true){
                            ValueO = parseInt(document.getElementById(MatchO).innerText);
                        }else{
                            const MatchOO = Zelle-4;
                            const CheckOO = CheckforBelegung(MatchOO);
                            if (CheckOO == true){
                                ValueO = parseInt(document.getElementById(MatchOO).innerText);
                            }else{
                                const MatchOOO = Zelle-3;
                                const CheckOOO = CheckforBelegung(MatchOOO);
                                if (CheckOOO == true){
                                    ValueO = parseInt(document.getElementById(MatchOOO).innerText);
                                }
                            }
                        }
                    }else{
                        //Oberer Reihe verschiebt sich um einen weiter nach rechts
                        const MatchO = Zelle-5;
                        const CheckO = CheckforBelegung(MatchO);
                        if (CheckO == true){
                            //MatchO wird zum Puffer und es können zwei Zellen (falls vorhanden) nachrücken
                            const MatchOO = Zelle-4;
                            const CheckOO = CheckforBelegung(MatchOO);
                            if (CheckOO == true){
                                ValueO = parseInt(document.getElementById(MatchOO).innerText);
                            }else{
                                const MatchOOO = Zelle-3;
                                const CheckOOO = CheckforBelegung(MatchOOO);
                                if (CheckOOO == true){
                                    ValueO = parseInt(document.getElementById(MatchOOO).innerText);
                                }
                            }
                        }else{
                            //Die letzten beiden Zellen müssen belegt sein, damit es zu einem potenziellen leichten Match kommen kann
                            const MatchOO = Zelle-4;
                            const CheckOO = CheckforBelegung(MatchOO);
                            const MatchOOO = Zelle-3;
                            const CheckOOO = CheckforBelegung(MatchOOO);
                            if (CheckOO == true && CheckOOO == true){
                                ValueO = parseInt(document.getElementById(MatchOOO).innerText);
                            }
                        }
                    }
                }

                if (Zelle != 15){
                    const MatchUPuffer = Zelle+2;
                    const CheckUPuffer = CheckforBelegung(MatchUPuffer);
                    if (CheckUPuffer == true){
                        //Obere Reihe verschiebt sich nicht weiter als die untere , da ein Puffer vorhanden ist
                        const MatchU = Zelle+3;
                        const CheckU = CheckforBelegung(MatchU);
                        if (CheckU == true){
                            ValueU = parseInt(document.getElementById(MatchU).innerText);
                        }else{
                            const MatchUU = Zelle+4;
                            const CheckUU = CheckforBelegung(MatchUU);
                            if (CheckUU == true){
                                ValueU = parseInt(document.getElementById(MatchUU).innerText);
                            }else{
                                const MatchUUU = Zelle+5;
                                const CheckUUU = CheckforBelegung(MatchUUU);
                                if (CheckUUU == true){
                                    ValueU = parseInt(document.getElementById(MatchUUU).innerText);
                                }
                            }
                        }
                    }else{
                        // Obere Reihe verschiebt sich um einen weiter als die untere, da kein Puffer vorhanden ist
                        const MatchU = Zelle+3;
                        const CheckU = CheckforBelegung(MatchU);
                        if (CheckU == true){
                            //MatchU wird zum neuen Puffer -> 2 mögliche leichte Matches
                            const MatchUU = Zelle+4;
                            const CheckUU = CheckforBelegung(MatchUU);
                            if (CheckUU == true){
                                ValueU = parseInt(document.getElementById(MatchUU).innerText);
                            }else{
                                const MatchUUU = Zelle+5;
                                const CheckUUU = CheckforBelegung(MatchUUU);
                                if (CheckUUU == true){
                                    ValueU = parseInt(document.getElementById(MatchUUU).innerText);
                                }
                            }
                        }else{
                            //Die beiden letzten Zellen müssen belegt sein, damit es zu einem potenziellen einfachen Match kommen kann
                            const MatchUU = Zelle+4;
                            const CheckUU = CheckforBelegung(MatchUU);
                            const MatchUUU = Zelle+5;
                            const CheckUUU = CheckforBelegung(MatchUUU);

                            if (CheckUU == true && CheckUUU == true){
                                ValueU = parseInt(document.getElementById(MatchUUU).innerText);
                            }
                        }
                    }
                }

                if (ValueO == Value || ValueU == Value){
                    return true;
                }else{
                    return false
                }
            }else{
                //Zelle bewegt sich gar nicht
                return false
            }
        }else if (AbstandLinks == 3){
            //Zelle befindet sich ganz rechts außen
            const L1 = Zelle-1;
            const L2 = Zelle-2;
            const L3 = Zelle-3;
            const CheckL1 = CheckforBelegung(L1);
            const CheckL2 = CheckforBelegung(L2);
            const CheckL3 = CheckforBelegung(L3);
            if (CheckL1 == true && CheckL2 == true && CheckL3 == true){
                //Zelle bewegt sich nicht 
                return false
            }else if ((CheckL1 == true && CheckL2 == true) || (CheckL1 == true && CheckL3 == true) || (CheckL2 == true && CheckL3 == true)){
                //Zelle bewegt sich um einen nach links
                let ValueO = "0";
                let ValueU = "0";

                if (Zelle != 4){
                    const MatchOPuffer = Zelle-7;
                    const MatchOPuffer2 = Zelle-6;
                    const CheckOPuffer = CheckforBelegung(MatchOPuffer);
                    const CheckOPuffer2 = CheckforBelegung(MatchOPuffer2);
                    if (CheckOPuffer == true && CheckOPuffer2 == true){
                        const MatchO = Zelle-5;
                        const CheckO = CheckforBelegung(MatchO);
                        if (CheckO == true){
                            ValueO = parseInt(document.getElementById(MatchO).innerText);
                        }
                    }
                }

                if (Zelle != 16){
                    const MatchUPuffer = Zelle+1;
                    const MatchUPuffer2 = Zelle+2;
                    const CheckUPuffer = CheckforBelegung(MatchUPuffer);
                    const CheckUPuffer2 = CheckforBelegung(MatchUPuffer2);

                    if (CheckUPuffer == true && CheckUPuffer2 == true){
                        const MatchU = Zelle+3;
                        const CheckU = CheckforBelegung(MatchU);
                        if (CheckU == true){
                            ValueU = parseInt(document.getElementById(MatchU).innerText);
                        }
                    }
                }

                if (ValueO == Value || ValueU == Value){
                    return true;
                }else{
                    return false
                }

            }else if (CheckL1 == true || CheckL2 == true || CheckL3 == true){
                //Zelle bewegt sich 2 nach links
                let ValueO = "0";
                let ValueU = "0"
                
                if (Zelle != 4){
                    const ZelleLPuffer = Zelle-7;
                    const CheckLPuffer = CheckforBelegung(ZelleLPuffer);
                    if (CheckLPuffer == true){
                        //Ausgangssituation ändert sich nicht, da ein Puffer vorhanden ist
                        const MatchO = Zelle-6;
                        const CheckO = CheckforBelegung(MatchO);
                        if (CheckO == true){
                            ValueO = parseInt(document.getElementById(MatchO).innerText);
                        }else{
                            const MatchOO = Zelle-5;
                            const CheckOO = CheckforBelegung(MatchOO);
                            if (CheckOO == true){
                                ValueO = parseInt(document.getElementById(MatchOO).innerText);
                            }else{
                                const MatchOOO = Zelle-4;
                                const CheckOOO = CheckforBelegung(MatchOOO);
                                if (CheckOOO == true){
                                    ValueO = parseInt(document.getElementById(MatchOOO).innerText);
                                }
                            }
                        }
                    }else{
                        //Oberer Reihe verschiebt sich um einen weiter nach rechts
                        const MatchO = Zelle-6;
                        const CheckO = CheckforBelegung(MatchO);
                        if (CheckO == true){
                            //MatchO wird zum Puffer und es können zwei Zellen (falls vorhanden) nachrücken
                            const MatchOO = Zelle-5;
                            const CheckOO = CheckforBelegung(MatchOO);
                            if (CheckOO == true){
                                ValueO = parseInt(document.getElementById(MatchOO).innerText);
                            }else{
                                const MatchOOO = Zelle-4;
                                const CheckOOO = CheckforBelegung(MatchOOO);
                                if (CheckOOO == true){
                                    ValueO = parseInt(document.getElementById(MatchOOO).innerText);
                                }
                            }
                        }else{
                            //Die letzten beiden Zellen müssen belegt sein, damit es zu einem potenziellen leichten Match kommen kann
                            const MatchOO = Zelle-5;
                            const CheckOO = CheckforBelegung(MatchOO);
                            const MatchOOO = Zelle-4;
                            const CheckOOO = CheckforBelegung(MatchOOO);
                            if (CheckOO == true && CheckOOO == true){
                                ValueO = parseInt(document.getElementById(MatchOOO).innerText);
                            }
                        }
                    }
                }

                if (Zelle != 16){
                    const MatchUPuffer = Zelle+1;
                    const CheckUPuffer = CheckforBelegung(MatchUPuffer);
                    if (CheckUPuffer == true){
                        //Obere Reihe verschiebt sich nicht weiter als die untere , da ein Puffer vorhanden ist
                        const MatchU = Zelle+2;
                        const CheckU = CheckforBelegung(MatchU);
                        if (CheckU == true){
                            ValueU = parseInt(document.getElementById(MatchU).innerText);
                        }else{
                            const MatchUU = Zelle+3;
                            const CheckUU = CheckforBelegung(MatchUU);
                            if (CheckUU == true){
                                ValueU = parseInt(document.getElementById(MatchUU).innerText);
                            }else{
                                const MatchUUU = Zelle+4;
                                const CheckUUU = CheckforBelegung(MatchUUU);
                                if (CheckUUU == true){
                                    ValueU = parseInt(document.getElementById(MatchUUU).innerText);
                                }
                            }
                        }
                    }else{
                        // Obere Reihe verschiebt sich um einen weiter als die untere, da kein Puffer vorhanden ist
                        const MatchU = Zelle+2;
                        const CheckU = CheckforBelegung(MatchU);
                        if (CheckU == true){
                            //MatchU wird zum neuen Puffer -> 2 mögliche leichte Matches
                            const MatchUU = Zelle+3;
                            const CheckUU = CheckforBelegung(MatchUU);
                            if (CheckUU == true){
                                ValueU = parseInt(document.getElementById(MatchUU).innerText);
                            }else{
                                const MatchUUU = Zelle+4;
                                const CheckUUU = CheckforBelegung(MatchUUU);
                                if (CheckUUU == true){
                                    ValueU = parseInt(document.getElementById(MatchUUU).innerText);
                                }
                            }
                        }else{
                            //Die beiden letzten Zellen müssen belegt sein, damit es zu einem potenziellen einfachen Match kommen kann
                            const MatchUU = Zelle+3;
                            const CheckUU = CheckforBelegung(MatchUU);
                            const MatchUUU = Zelle+4;
                            const CheckUUU = CheckforBelegung(MatchUUU);

                            if (CheckUU == true && CheckUUU == true){
                                ValueU = parseInt(document.getElementById(MatchUUU).innerText);
                            }
                        }
                    }
                }

                if (ValueO == Value || ValueU == Value){
                    return true;
                }else{
                    return false
                }


            }else if (CheckL1 == false && CheckL2 == false && CheckL3 == false){
                //Zelle bewegt sich 3 nach links
            let ValueO = "0";
            let ValueU = "0";

            if (Zelle != 4){
                const MatchO = Zelle-7;
                const CheckO = CheckforBelegung(MatchO);
                if (CheckO == true){
                    ValueO = parseInt(document.getElementById(MatchO).innerText);
                }else{
                    const MatchO2 = Zelle-6;
                    const CheckO2 = CheckforBelegung(MatchO2);
                    if (CheckO2 == true){
                        ValueO = parseInt(document.getElementById(MatchO2).innerText);
                    }else{
                        const MatchO3 = Zelle-5;
                        const CheckO3 = CheckforBelegung(MatchO3);
                        if (CheckO3 == true){
                            ValueO = parseInt(document.getElementById(MatchO3).innerText);
                        }else{
                            const MatchO4 = Zelle-4;
                            const CheckO4 = CheckforBelegung(MatchO4);
                            if (CheckO4 == true){
                                ValueO = parseInt(document.getElementById(MatchO4).innerText);
                            }
                        }
                    }
                }
            }

            if (Zelle != 16){
                const MatchU = Zelle+1;
                const CheckU = CheckforBelegung(MatchU);
                if (CheckU == true){
                    ValueU = parseInt(document.getElementById(MatchU).innerText);
                }else{
                    const MatchU2 = Zelle+2;
                    const CheckU2 = CheckforBelegung(MatchU2);
                    if (CheckU2 == true){
                        ValueU = parseInt(document.getElementById(MatchU2).innerText);
                    }else{
                        const MatchU3 = Zelle+3;
                        const CheckU3 = CheckforBelegung(MatchU3);
                        if (CheckU3 == true){
                            ValueU = parseInt(document.getElementById(MatchU3).innerText);
                        }else{
                            const MatchU4 = Zelle+4;
                            const CheckU4 = CheckforBelegung(MatchU4);
                            if (CheckU4 == true){
                                ValueU = parseInt(document.getElementById(MatchU4).innerText);
                            }
                        }
                    }
                }
            }

            if (ValueO == Value || ValueU == Value){
                return true;
            }else{
                return false
            }
            }
        }
    }else{
        return false
    }

}

function CheckGoodMoves(){
    //1. Spalte
    const Check1 = GoodLeftMove("2", 1);
    const Check2 = GoodLeftMove("6", 1);
    const Check3 = GoodLeftMove("10", 1);
    const Check4 = GoodLeftMove("14", 1);

    //2. Spalte
    const Check5 = GoodLeftMove("3", 2);
    const Check6 = GoodLeftMove("7", 2);
    const Check7 = GoodLeftMove("11", 2);
    const Check8 = GoodLeftMove("15", 2);

    //3. Spalte
    const Check9 = GoodLeftMove("4", 3);
    const Check10 = GoodLeftMove("8", 3);
    const Check11 = GoodLeftMove("12", 3);
    const Check12 = GoodLeftMove("16", 3);

    if (Check1 == true || Check2 == true || Check3 == true || Check4 == true || Check5 == true || Check6 == true || Check7 == true || Check8 == true || Check9 == true || Check10 == true || Check11 == true || Check12 == true){
        return "LEFT"
    }
}



