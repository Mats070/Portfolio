const X_Class = 'x'
const CIRCLE_Class = 'circle'
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton")
let circleTurn;
let counter = 0;
let WegRechts = false;


StartGame();

restartButton.addEventListener("click", StartGame);

function CheckforBelegung(Zelle){
    let cell = document.getElementById(Zelle);
    return cell.classList.contains(CIRCLE_Class);
}

function CheckXBelegung(Zelle){
    let cell = document.getElementById(Zelle);
    return cell.classList.contains(X_Class);
}

function addXAutomation(Zelle){
    let cell = document.getElementById(Zelle);
    setTimeout(function(){
        cell.classList.add(X_Class);
        cell.removeEventListener("click", handleClick)
        setTimeout(function(){
            if (checkWin(X_Class)){
                endGame(false);
              }else if(isDraw()){
               endGame(true);
             }else{
                swapTurns();
                setBoardHoverClass();
             }
        }, 500)
    }, 500)
    //Counter erhöhen
   cellElements.forEach(cell => {
    if(cell.classList.length == 2){
        counter++
    }})
    


    
    
}


function StartGame(){
    counter = 0;
    circleTurn = false;
    console.log(cellElements)
    cellElements.forEach(cell=>{
        cell.classList.remove(X_Class);
        cell.classList.remove(CIRCLE_Class);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true })
    })
    setBoardHoverClass();
    addXAutomation(1);
    winningMessageElement.classList.remove("show");

}


function handleClick(e){
    const cell = e.target;
    console.log(cell);
    circleTurn=true;;
    if (circleTurn == true){
        const currentClass = CIRCLE_Class;
        //place the Mark
        placeMark(cell, currentClass);
        //Check for win
        if (checkWin(currentClass)){
           endGame(false);
         }else if(isDraw()){
          endGame(true);
        }else {
       swapTurns();
       setBoardHoverClass();
       ComputerMoves(counter);
}
//Check for draw
//Switch Turns
    }else {
        console.log("Fehler");
    }
    
   
   
}

function endGame(draw){
    if(draw){
       winningMessageTextElement.innerText = "Unentschieden! Ich krieg dich noch!!"
    }else{
        if(circleTurn){
            winningMessageTextElement.innerText = "Du hast gewonnen!"
        }else{
            winningMessageTextElement.innerText = "Mats hat gewonnen!"
        }
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell=> {
        return cell.classList.contains(X_Class) || cell.classList.contains(CIRCLE_Class);
    })
}

function placeMark(cell, currentClass){
    
    if (currentClass == CIRCLE_Class){
        cell.classList.add(currentClass);
        //Counter erhöhen
       cellElements.forEach(cell => {
         if(cell.classList.length == 2){
         counter++
    }
})
console.log(counter)
}}

function ComputerMoves(counter){
    //Ebene: 2 Moves durchgeführt
    if(counter == 2){
       // console.log("Hey")
        let CheckCell2 = CheckforBelegung(2);
        if (CheckCell2 == true){
            addXAutomation(4);
        }else{
            addXAutomation(2);
        }
        //console.log(test);
    }

    //Ebene 2: 4 Moves durchgeführt
    if (counter == 8){
        //Linke Seite
        let CheckCell2 = CheckforBelegung(2);
        if (CheckCell2 == true){
            let CheckCell7 = CheckforBelegung(7);
            if(CheckCell7==true){
                addXAutomation(5)
            }else{
                addXAutomation(7)
            }
        }else{
            //Rechte Seite
            let CheckCell3 = CheckforBelegung(3);
            if(CheckCell3 == true){
              let CheckCell5 = CheckforBelegung(5);
              if (CheckCell5 == true){
                  addXAutomation(7)
              }else{
                  let CheckCell6 = CheckforBelegung(6);
                  if (CheckCell6 == true){
                      addXAutomation(9)
                  }else{
                      let CheckCell9 = CheckforBelegung(9);
                      if (CheckCell9 == true){
                          addXAutomation(6);
                      }else{
                          addXAutomation(5);
                      }
                  }
              }
            }else{
                addXAutomation(3);
            }
        }
    }

    //Ebene 3: 6 Elemente
    if (counter == 18){
        let CheckCell2 = CheckforBelegung(2);
        if (CheckCell2 == true){
            //Linke Seite
            let CheckCell9 = CheckforBelegung(9);
            if (CheckCell9 == true){
                addXAutomation(6)
            }else{
                addXAutomation(9)
            }
        }else{
            //Rechte Seite
            let CheckX7 = CheckXBelegung(7);
            let CheckX9 = CheckXBelegung(9);
            let CheckX5 = CheckXBelegung(5);
            let CheckX6 = CheckXBelegung(6);

            if (CheckX7 == true){
                //Wir befinden uns auf dem rechtesten Pfad
                WegRechts = true;
                let CheckCell4 = CheckforBelegung(4);
                if (CheckCell4 == true){
                    addXAutomation(6);
                }else{
                    addXAutomation(4);
                }

            }else if (CheckX9 == true){
                //2.Pfad von rechts
               let CheckCell5 = CheckforBelegung(5);
               if (CheckCell5 == true){
                   addXAutomation(7);
               }else{
                   addXAutomation(5);
               }


            }else if (CheckX5 == true){
                //2. Pfad von links
                let CheckCell9 = CheckforBelegung(9);
                if (CheckCell9 == true){
                    //Gegner hat Falle gebaut
                    let CheckCell8 = CheckforBelegung(8);
                    if (CheckCell8 == true){
                        addXAutomation(7)
                    }else{
                        addXAutomation(8)
                    }

                }else{
                    addXAutomation(9);
                }


            }else if(CheckX6 == true){
                //Linkester Pfad
                let CheckCell5 = CheckforBelegung(5);
                if (CheckCell5 == true){
                    addXAutomation(7)
                }else{
                    addXAutomation(5)
                }

            }
        }
    }

    // Ebene 4: Jeder Spieler hatte bereits 4 Spielzüge --> Nurnoch ein Feld ist offen
    if (counter == 32){
        console.log("Letzter Zug")
        //Weg ganz rechts
        let CheckX7 =  CheckXBelegung(7);
        let CheckX6 = CheckXBelegung(6);

        //2. Weg von rechts
        

        //Weg in der Mitte
        let CheckX5 = CheckXBelegung(5);
        
        //2. Weg links
      

        //Weg ganz links
        

        if (WegRechts == true){
            //Weg ganz rechts
            let CheckCell9 = CheckforBelegung(9)
            if (CheckCell9 == true){
                addXAutomation(8)
                //Draw
            }else{
                addXAutomation(9);
                //Draw
            }


        }else if(CheckX9 == true || CheckCell7 == true){
            //2.Weg rechts
            let CheckCell4 = CheckforBelegung(4);
             if (CheckCell4 == false){
                 addXAutomation(4);
                 //Win allerdings anderer Weg --> Loose
             }

        }else if(CheckX5 == true && CheckX7 == true){
            //Weg in der Mitte
            let CheckCell4 = CheckforBelegung(4);
            if (CheckforBelegung == true){
                addXAutomation(6)
                //Draw, allerdings anderer Weg --> Loose
            }

        }else if (CheckX6 == true && CheckX5 == true){
            //2.Weg links
            let CheckCell8 = CheckforBelegung(8);
            if (CheckCell8 == false){
                addXAutomation(8);
                //Win, allerdings anderer Weg --> Loose
            }

        }else{
            //Weg ganz links
            let CheckCell4 = CheckforBelegung(4);
            if (CheckCell4 == true){
                addXAutomation(8);
                //Draw
            }else{
                addXAutomation(4);
                //Win
            }
        }
    }

}


function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
     board.classList.remove(X_Class);
     board.classList.remove(CIRCLE_Class);
     if (circleTurn){
         board.classList.add(CIRCLE_Class)
     } else {
         board.classList.add(X_Class)
     }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}