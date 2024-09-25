
var dx,dy,px,py,velocidade,velB;
var obj,barraDireita,bola,barraEsquerda;
var tmp_interval;
let telaH,telaW,content
var tmp_interval,tmp_request_animation;

var vbtIniciar;
var vbola;
var vcpu;
var vjogador;
var vPaineltxtPontos;

//Control de animacao
var game,frames;

//Posicao
var posBolax,posBolaY;
var posJogadorX,posJogadorY;
var posCpuX,posCpuY;

//Direcao de acordo com a tecla digitado
var dirJy;

//Tamanhos
var campoX=0,campoY=0;
var campoW=document.getElementsByClassName("content")[0].offsetWidth;
var campoH=document.getElementsByClassName("content")[0].offsetHeight;
var barraW=document.getElementById("barraDireita").offsetWidth
var barraH=document.getElementById("barraDireita").offsetHeight
var bolaW=document.getElementById("bola").offsetWidth;
var bolaH=document.getElementById("bola").offsetHeight;

//Posicoes iniciais
var posJogIniY=campoH-(barraH+document.getElementById("barraDireita").offsetTop);
var posCpuIniY=campoH-(barraH+document.getElementById("barraEsquerda").offsetTop);
var posBolaIniX=document.getElementById("bola").offsetLeft;
var posBolaIniY=document.getElementById("bola").offsetTop;

//Direcao
var bolaX,bolaY;
var jogX=0;

//Velocidade
var velBola,velCpu,velJogador;    

    const mtds={
        barraDireita_moveDown:(e)=>{
            let target=event.target
    
            const startY=e.clientY;
            const bara_Esq_left=target.offsetLeft;
            //barraDireita.style.width="20px";
    
            //Function Move
            const handleMouseMove=(e)=>{
                const deltaY=e.clientY-startY;
                const bara_Esq_Position=bara_Esq_left+deltaY;
    
                //Restringe Area
                const maxPosition=content.getBoundingClientRect().height-barraDireita.offsetHeight;
                const boundedPosition=Math.max(0,Math.min(maxPosition,bara_Esq_Position));
    
                barraDireita.style.top=`${boundedPosition}px`;
            }
            //Function Up -- Remove listener
            const handleMouseUp=()=>{
                //barraDireita.style.width="10px";
                document.removeEventListener("mousemove",handleMouseMove);
                document.removeEventListener("mouseup",handleMouseUp);
            }
    
            //Updade Scroll Thumb Mouse Move
            document.addEventListener("mousemove",handleMouseMove);
            //Updade Scroll Thumb Mouse Up
            document.addEventListener("mouseup",handleMouseUp);
        },
        keydown_info(){

            var tecla=event.keyCode;
    
            if(tecla==37){
                //dx-=1;
            }
            else if(tecla==38){
                dy-=1;
            }
            else if(tecla==39){
                //dx+=1;
            }
            else if(tecla==40){                  
                dy+=1;
            }
    
        },
        keyup_info(){

            var tecla=event.keyCode;
    
            if(tecla==37){
                //dx=0;
            }
            else if(tecla==38){
                dy=0;
            }
            else if(tecla==39){
                //dx=0;
            }
            else if(tecla==40){                  
                dy=0;
            }
    
        },
        enterFrame(){
                
            py+=dy*velocidade;
            
            //RESTRIGE
            const maxPosition=content.getBoundingClientRect().height-barraDireita.offsetHeight;
            const boundedPosition=Math.max(0,Math.min(maxPosition,py));
    
            barraDireita.style.top=`${boundedPosition}px`;
        }
    }

    //LOOP
    function game(){
        
        posBolax+=velBola*bolaX;
        posBolaY+=velBola*bolaY;

        //px+=dx*velB;
        //py=py+(dy*velocidade);


        //Colisao com jogador
        if(posBolax<=(posJogadorX+barraW)
        &&(((posBolaY+bolaH)>=posJogadorY)
        &&(posBolaY<=(barraH+posJogadorY))))
        {
            console.log(posBolaY+" <= "+(barraH+posJogadorY))

            bolaY=((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/16;
            bolaX*=-1;
        }
        
        //Colisao com Cpu
        if(posBolax>=(campoW-posCpuX)&&
        ((posBolaY+bolaH>=posCpuY)
        &&(posBolaY<=posCpuY+barraH)))
        {
            bolaY=((posBolaY+(bolaH/2))-(posCpuY+(barraH/2)))/16;
            bolaX*=-1;
        }

        //Limites superior e inferior
        if((posBolaY>=440)||(posBolaY<=0)){
            bolaY*=-1;
        }

        //Saiu da tela pela direita e esquerda
        
        if(posBolax>=640){
            //vbola=0;
            bolaX*=-1
            
            posBolax=posBolaIniX;
            posBolaY=posBolaIniY;
            posJogadorY=posJogIniY;
            posCpuY=posCpuIniY;
                        
            //pontos++;
            //vPaineltxtPontos.value=pontos;
            //jogo=false;
            //vjogador.style.top=posJogIniY+"px";
        }
        else if(posBolax<=0){
            //vbola=0;
            bolaX*=1
            
            posBolax=posBolaIniX;
            posBolaY=posBolaIniY;
            posJogadorY=posJogIniY;
            posCpuY=posCpuIniY;
                        
            //pontos--;
            //vPaineltxtPontos.value=pontos;
            //jogo=false;
            //vjogador.style.top=posJogIniY+"px";
        }

        bola.style.left=posBolax+"px";
        //bola.style.top=posBolaY+"px";
        
        //obj.style.top=py+"px";
        /*
        if(px>(content.offsetWidth-55)){
            dx=-1;
        }
        else{
            
            if(barraDireita.offsetTop<265 && barraDireita.offsetTop>90)
            {
                if(px<50)
                {
                    dx=1;
                }
            }
            else if(px<0){
                dx=1
                px=content.offsetWidth/2
            } 
        }*/

        tmp_request_animation=requestAnimationFrame(game);
    }

    function addEventos(){
        
        //ATRIBUTOS
        content=document.getElementsByClassName("content")[0]
        barraDireita=document.getElementById("barraDireita")
        bola=document.getElementById("bola")
        barraEsquerda=document.getElementById("barraEsquerda")

        //VALOR
        dx=1;dy=0;px=content.offsetWidth/2;
        py=barraEsquerda.offsetTop;
        velocidade=10;
        velB=5;
        velBola=velCpu=velJogador=8;
        bolaY=0;

        Math.round((Math.random()*10))<5 ? bolaX=-1:bolaX=1

        //pontos=0;
        posBolax=posBolaIniX;
        posBolaY=posBolaIniY;
        posJogadorX=32;
        posJogadorY=posJogIniY;
        posCpuY=posCpuIniY;
        posCpuX=(bolaW*2)+32

        //MOUSE
        //Mouse
        barraDireita.addEventListener("mousedown",mtds.barraDireita_moveDown)

        //KEYDOW E UP
        document.addEventListener("keydown",mtds.keydown_info);
        document.addEventListener("keyup",mtds.keyup_info);
        
        //LOOP
        game();
        tmp_interval=setInterval(mtds.enterFrame,20);

        console.log(posBolaY+" <= "+(barraH+posJogadorY))
        console.log("--------------------------")
    }

    window.addEventListener("load",addEventos);