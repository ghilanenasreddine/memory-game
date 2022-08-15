let player= prompt("What Is Your Name");

let startBtn=document.getElementById("btn");
let gameBlock = document.querySelectorAll(".block");
let  wrongTry = document.querySelector(".try span");
let remarque = document.querySelector(".try")
let choicesArr = [];
let mark=0;
let clicks=0;

// make the blocks shuffling
function shuffleBlocks(){
    let arr =[];
    while (arr.length !== gameBlock.length){
        let orderNumber = Math.floor(Math.random() * gameBlock.length - 1);
        if (!arr.includes(orderNumber)){
            arr.push(orderNumber)
        }
    }

    gameBlock.forEach((block,ind)=>block.style.order=arr[ind]);

}
shuffleBlocks()


// event before starting game
startBtn.onclick=function(){
    document.querySelector(".start").classList.add("hide");
    document.querySelector(".name span").textContent=player|| "Unknown";
    wrongTry.textContent=mark;
    flipAllBefore();
}

// showing the pictures in the begining
function flipAllBefore(){
    gameBlock.forEach((block)=>block.classList.add("flip"));
}

setTimeout(flipAllToStart,4000);

function flipAllToStart(){
    gameBlock.forEach((block)=>block.classList.remove("flip"));
}

// events of blocks
gameBlock.forEach((block)=>{
    block.onclick=function(){
        if(!this.classList.contains("flip")){
            this.classList.add("flip");
            clicks++;
            let choice = this.getAttribute("animal");

            choicesArr.push(choice);

            if (choicesArr.length == 2) {
                if (choicesArr[0] == choicesArr[1]) {
                    document.getElementById("right").play();
                    mark++;
                } else {
                    document.getElementById("wrong").play();
                    mark--;
                }
                wrongTry.textContent = mark;

                gameBlock.forEach((el) => el.classList.add("stopped"))
                setTimeout(function () {
                    gameBlock.forEach((el) => {
                        el.classList.remove("stopped");
                        if (el.classList.contains("flip")) {
                            el.classList.remove("flip")
                        }
                    })
                }, 1000);

                choicesArr = [];

                checkScore()
            }
        }
    }
})

// checking the score
function checkScore(){
    if(mark<= -5){
        remarque.classList.add("bad")
    }
    if(clicks>=20){
        if(mark<9){
            remarque.classList.add("bad")
        }
        if(mark>=9){
            remarque.classList.add("good")
        }
    }
}
