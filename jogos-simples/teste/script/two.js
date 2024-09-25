
let tela,telaH,telaW;
let barraDireita,barraDH,barraDW,barraDX,barraDY,vbarraDY,posDX,posDY
let barraEsquerda,barraEH,barraEW,barraEX,barraEY,vbarraEY,posEX,posEY
let bola,bolaH,bolaW,bolaX,bolaY,vBolaX,vBolaY,posBX,posBY
let jogX,jogY,vJog
let cpuX,cpuY,vCpu
let tecla
let tmp;
let pontos,pVitoria,pPerda

const addEventos={
    inicia:()=>{
        inicializacao.telaContent()
        inicializacao.barraDireitaContent()
        inicializacao.barraEsquerdaContent()
        inicializacao.bolaContent()
        //Centralizar
        inicializacao.centralizarContent()
        //Posicionar
        inicializacao.posicaoContent()
        //Pontos
        inicializacao.pontosContent()

        //Loop
        moveBola()

        //KeyDown e Up
        inicializacao.keyDownUp()
    }
}
const inicializacao={
    telaContent(){
        tela=document.getElementsByClassName("content")[0];
        telaH=tela.offsetHeight;
        telaW=tela.offsetWidth;
    },
    barraDireitaContent(){
        barraDireita=document.getElementById("barraDireita");
        barraDH=barraDireita.offsetHeight;
        barraDW=barraDireita.offsetWidth;
    },
    barraEsquerdaContent(){
        barraEsquerda=document.getElementById("barraEsquerda");
        barraEH=barraEsquerda.offsetHeight;
        barraEW=barraEsquerda.offsetWidth;
    },
    bolaContent(){
        bola=document.getElementById("bola");
        bolaH=bola.offsetHeight;
        bolaW=bola.offsetWidth;
    },
    centralizarContent(){
        //Atributos
        posDX=30
        posEX=10
        vBolaX=vBolaY=vbarraDY=vbarraEY=5
        Math.round(Math.random()*5)<5 ? bolaX=-1:bolaX=1

        //Barra Direita
        barraDX=telaW-posDX
        barraDY=telaH/3
        
        //Barra Esquerda
        barraEX=posEX
        barraEY=telaH/3
        
        //Bola
        posBX=telaW/2
        posBY=telaH/2
        bolaY=1
    }
    ,
    posicaoContent(){
        //Barra Direita
        //Verificar Limites
        barraDY<=0? barraDY=0 : barraDY=barraDY
        barraDY>=(telaH-barraDH)? barraDY=(telaH-barraDH) : barraDY=barraDY
        //Alterar 
        barraDireita.style.left=`${barraDX}px`;
        barraDireita.style.top=`${barraDY}px`;

        //Barra Esquerda
        //Verificar Limites
        barraEY<=0? barraEY=0 : barraEY=barraEY
        barraEY>=(telaH-barraEH)? barraEY=(telaH-barraEH) : barraDY=barraDY
        //Alterar 
        barraEsquerda.style.left=`${barraEX}px`;
        barraEsquerda.style.top=`${barraEY}px`;

        //Bola
        //Alterar 
        bola.style.left=`${posBX}px`;
        bola.style.top=`${posBY}px`;
    },
    keyDownUp(){
        //Barra Esquerda
        document.addEventListener("keydown",mtdsEventos.mtdkeyDown_barraEsquerda)
        document.addEventListener("keyup",mtdsEventos.mtdkeyUp_barraEsquerda)
    },
    pontosContent(){
        pontos=document.getElementsByClassName("pontos");
        pVitoria=document.getElementsByClassName("pontos")[0]
        pPerda=document.getElementsByClassName("pontos")[1]
    }
}

//LOOP
function moveBola(){
    posBX+=vBolaX*bolaX;
    posBY+=vBolaY*bolaY;

    //var prt=(((posBY+(bolaH/2))-(barraEH+(barraEH/2)))/64)

    //Controla Bola
    controlaJogo.controlaBola()

    //Controla Barra Direita
    controlaJogo.controlaBarraDireita()

    inicializacao.posicaoContent()

    tmp=requestAnimationFrame(moveBola)
}

const controlaJogo={
    controlaBola:()=>{

        //Verificar Limites
        //X -- Horizontal
        if((posBX<=(posEX+barraEW))&&
            (barraEY>=(posBY-barraEY))&&
            (((posBY-barraEY)+bolaH)>=0))
        {
            bolaX=1
            bolaY=(((posBY+(bolaH/2))-(barraEH+(barraEH/2)))/64)
        }
        else if(posBX>=(telaW-(bolaW+barraDW))&&
        (barraDY>=(posBY-barraDY))&&
        (((posBY-barraDY)+bolaH)>=0)){
            bolaX=-1
            bolaY=(((posBY+(bolaH/2))-(barraDH+(barraDH/2)))/64)
        }
        else if(posBX<=0){
            posBX=telaW/2
            //Pontos
            pPerda.innerHTML=(Number(pPerda.innerHTML)+1)
        }
        else if(posBX>=(telaW-(barraDW))){
            posBX=telaW/2
            //Pontos
            pVitoria.innerHTML=(Number(pVitoria.innerHTML)+1)
        }

        //Verificar Limites
        //Y -- Vertical       
        if(posBY<=0){
            bolaY=1
        }
        else if(posBY>=(telaH-bolaH)){
            bolaY=-1
        }

    },
    controlaBarraDireita:()=>{

        if(posBX>(telaW/2) && posBX>0)
        {
            //Movimentar cpu
            if(((posBY+(bolaH/2))>(barraDY+(barraDH/2))+vbarraDY)){
                //Movimentar para baixo
                if((barraDY+barraDH)<=telaH){
                    barraDY+=vbarraDY;
                }
            }
            else if((barraDY+(bolaH/2))<(barraDY+(barraDH/2))-vbarraDY){
                //Movimentar para cima
                if(barraDY>=0){
                    barraDY-=vbarraDY;
                }
            }
            //console.log("Passe pela metade")
        }
        else{
            //Campo da Cpu, mas foi rebatido por Cpu pra o Jog
            //Posicionar a Cpu no centro
            if((barraDY+(barraDH/2))<(telaH/2)){
                barraDY+=vbarraDY;
            }
            else if((barraDY+(barraDH/2))>(telaH/2)){
                barraDY-=vbarraDY;
            }
        }
    }
}

const mtdsEventos={
    mtdkeyDown_barraEsquerda(){
        tecla=event.keyCode;
        var dy=10;

        if(tecla==37){
                
        }
        else if(tecla==38){
            barraEY-=dy;
        }
        else if(tecla==39){
                
        }
        else if(tecla==40){                  
            barraEY+=dy;
        }

        //console.log((barraDH)+"<="+(barraDW)+" - "+bolaW+" :: "+telaW-(bolaW+barraDW))
        inicializacao.posicaoContent()
    },
    mtdkeyUp_barraEsquerda(){
        tecla=event.keyCode;
    
        if(tecla==37){
            
        }
        else if(tecla==38){
            barraEY=barraEY;
        }
        else if(tecla==39){
            
        }
        else if(tecla==40){                  
            barraEY=barraEY;
        }
    }
}

window.addEventListener("load",addEventos.inicia)