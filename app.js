class App
{
    constructor()
    {
        this.allCards=document.querySelectorAll('.card');
        this.cards=document.querySelectorAll('.inner');
        this.overlay=document.querySelector('.start-page');
        this.victoryPage=document.querySelector('.victory-page');
        this.lostPage=document.querySelector('.lost-page');
        this.loadingPage=document.querySelector('.loading-page');
        this.gameContainer=document.querySelector('.game-container');
        this.isPlaying=false;
        this.time=document.getElementById('time');
        this.flip=document.getElementById('flip');
        this.currTime=50;
        this.count=0;
        this.matches=[];
        this.matchedCards=[];
        this.busy=false;
        this.numberOfMatches=0;
        this.cardArray=[];
        this.times=this.times;
        this.status=null;
    }

    startGame()
    {
        this.overlay.style.display="none";
    }

    timer()
    {
        this.times=setInterval(()=>{
            this.lost();
            if(this.isPlaying)
            {
            this.currTime--;
            this.time.innerText=this.currTime;
            }
        },1000);
    }

    stopTimer()
    {
            clearInterval(this.times);
    }

    addFlip(card)
    {
        card.classList.add('flip');
    }

    removeFlip()
    {
        setTimeout(()=>{
            this.matchedCards.forEach(card=>{
                card.classList.remove('flip');
        });
            this.clearArray();
        },1000);
    }

    matched()
    {
        this.matchedCards.forEach(card=>{
            card.classList.add('matched');
        });
        this.clearArray();
        setTimeout(()=>{
        this.busy=false;
        },1000);
    }

    clearArray()
    {
        app.matches.splice(0,app.matches.length);
        app.matchedCards.splice(0,app.matchedCards.length);
    }

    addMatch(card)
    {
        this.matchedCards.push(card);
        this.matches.push(card.children[1].childNodes[1].src.match(/\/Assets\/\w+\.png/)[0]);
    }

    flipCount()
    {
        this.flip.innerText=this.count;
    }

    initial()
    {
        this.count=0;
        this.currTime=50;
        this.time.innerText=this.currTime;
        this.flip.innerText=this.count;
        this.removeMatchedClass();
        this.removeFlips('1');
        this.timer();
        this.isPlaying=true;
        this.randomize();
        this.cardArray=[];
        this.matches=[];
        this.matchedCards=[];
        this.busy=false;
    }

    randomize()
    {
        for (let i = this.allCards.length-1; i > 0; i--) {
            let j= Math.floor(Math.random()* (i+1));
            this.allCards[j].style.order=i;
            this.allCards[i].style.order=j;
        }
    }

    victory()
    {
        if(this.cardArray.length===this.allCards.length)
        {
            this.isPlaying=false;
            this.status='victory';
            this.stopTimer();
            this.victoryPage.style.display='flex';
        }
    }


    lost()
    {
        if(this.currTime<1)
        {
            this.isPlaying=false;
            this.status='lost';
            this.stopTimer();
            app.removeFlips('0');
            this.lostPage.style.display='flex';
        }
    }

    removeMatchedClass()
    {
        this.cards.forEach(card=>{
            card.classList.remove('matched');
        });
    }

    removeFlips(trans)
    {
        this.cards.forEach(card=>{
             card.style.transition=`${parseInt(trans)}s transform`;
             card.classList.remove('flip');
        });
    }

    loading()
    {
        this.loadingPage.style.display="none";
        this.gameContainer.style.display="block";
    }
}

window.onload =()=>{

const app= new App();
app.loading();

app.overlay.addEventListener('click',()=>
{
    app.startGame();
    app.initial();
});


app.cards.forEach((card)=>{
    card.addEventListener('click',()=>{
        if(!app.matchedCards.includes(card)&&!card.classList.contains('matched')&&!app.busy)
        {
        app.addFlip(card);
        app.flipCount(app.count++);
        app.addMatch(card);
        }

        if(app.matches.length>1)
        {
            if(app.matches[0]===app.matches[1])
            {
                app.busy=true;
                app.cardArray=app.cardArray.concat(app.matches);
                app.victory();
                app.matched();
            }else
            {
                app.removeFlip();
            }
        }      
});
});


app.victoryPage.addEventListener('click',()=>{
    app.initial();
    app.victoryPage.style.display='none';
    app.removeFlips('1');
});

app.lostPage.addEventListener('click',()=>{
    app.initial();
    app.lostPage.style.display='none';
});

}
