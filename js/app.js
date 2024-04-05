
//let next=document.querySelectorAll('.movie-list-wrapper-next');

let next=[...document.getElementsByClassName('movie-list-wrapper-next')];

let movieList=document.querySelectorAll('.movie-list');

let clickCount;
let clickCount_1;
let clickCount_2;
let itemNumber;

next.forEach((el,i)=>{
    //console.log(`${i}: `,el);
    clickCount=0;
    clickCount_1=0;
    clickCount_2=0;
    itemNumber=movieList[i].querySelectorAll("img").length;
    
    //console.log(itemNumber)
    
    el.addEventListener("click",(e)=>{
        //console.log(e.target);
        clickCount=i==0?clickCount_1++:clickCount_2++;

        console.log(clickCount);
        
        if(itemNumber-(clickCount+3)>0){

            const x=movieList[i].computedStyleMap().get("transform")[0].x.value-270;
            movieList[i].style.transform=`translateX(${x}px)`;
        }
        else{
            clickCount=i==0?clickCount_1=0:clickCount_2=0;
            movieList[i].style.transform=`translateX(0)`;
        }
        
    })
    
})

/*
next.forEach((el,i)=>{

    console.log(el);
    
    //const itemNumber=movieList[i].querySelectorAll("img").length;
    const clickCount=0;
    
    el.addEventListener("click",()=>{

        clickCount++;
        console.log(clickCount);
        
        if(itemNumber-(4+clickCount)>0){
            const x=movieList[i].computedStyleMap().get("transform")[0].x.value-270;
            movieList[i].style.transform=`translateX(${x}px)`;
        }
        else{
            movieList[i].style.transform=`translateX(0)`;
        }
    
    })
    
});
*/
//console.log(movieList[i].computedStyleMap().get("transform")[0].x.value);

