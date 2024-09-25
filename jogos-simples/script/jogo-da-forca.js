
var tmp,tmpCron,loopCount;
var search,jogo,novJogo,palavraChave,LimparJogo;
var numJogo,checarJogo,dicaJogo,jogoControle;
var palavra,peixe,idcount;
var min, seg,idmouse;
var corpoJogo,cabeca,tronco,bracoDireito,bracoEsquerdo,pernaDireita,pernaEsquerda;

function inicia(){
    palavra=[];
    peixe=[];
    numJogo=idcount=idmouse=0;
    min=1;
    seg=60;
    //JOGO
    jogo=true;
    novJogo=document.getElementById("novoJogo");
    novJogo.addEventListener("click",novoJogo);
    palavraChave=document.getElementById("palavraChave");

    //CONTROLE
    checarJogo=document.getElementById("checarJogo");
    checarJogo.addEventListener("click",buscaPalavraChava);
    //
    dicaJogo=document.getElementById("dicaJogo");
    dicaJogo.addEventListener("click",dicaJogoPalavra);
    
    //Corpo JOGO
    corpoJogo=document.getElementsByClassName("corpo-jogo")[0];
    cabeca=document.getElementsByClassName("cabeca")[0];
    tronco=document.getElementsByClassName("troco")[0];
    bracoDireito=document.getElementsByClassName("braco-direito")[0];
    bracoEsquerdo=document.getElementsByClassName("braco-esquerdo")[0];
    pernaDireita=document.getElementsByClassName("perna-direito")[0];
    pernaEsquerda=document.getElementsByClassName("perna-esquerdo")[0];

    jogoControle=document.getElementsByClassName("jogo-controle")[0];

    //Create DIV QUIZ
    createDIVInput();

    //Loop Inicial
    loopCount=0;
    //createAnimateSVG();
    //loopAnimateInicia();
}

window.addEventListener("load",inicia);


/* CHECAR TODO TEMPO*/
function ChecarTodoTempo(){
    if(idcount==numJogo){
        jogoControle.style.display="none";
        palavraChave.style.display="none";
        
        //Parar a contagem
        clearInterval(tmpCron);
    } 
    //console.log(idcount);
    mostrarCorpoJogo(idcount);

    document.getElementById("palavraChave").value="";
    document.getElementById("palavraChave").focus();
}

/* DICA JOGO */
function dicaJogoPalavra(){
    
    if(idmouse==0){

        if(letraPalavra()>-1){
        
            if(idcount<numJogo){
                idcount+=1;
                idmouse=1;
            
                var i=letraPalavra();
                document.getElementsByClassName("quiz")[0].children[i].value=textoJogo(numJogo).charAt(i).toUpperCase();

                dicaJogo.style.backgroundColor="rgba(0, 0, 0, 0.4)";
                dicaJogo.style.color="#fff";
                //dicaJogo.disabled="false";

                console.log(idmouse);
            }
            //console.log(idcount);
            ChecarTodoTempo();
        }
    }
}

function letraPalavra(){
    var b=-1;
    var num=numJogo-1;

    var count=Math.round(Math.random()*num);
    var input_ty=document.getElementsByClassName("quiz")[0];

    for(var i=0;i<input_ty.childElementCount;i++){
        if(input_ty.children[i].value==""){
            if(i==count){
                b=i;
            }
        }
    }

    return b;
}


/* BUSCA PALAVRA CHAVE */

function buscaPalavraChava(){
    
    //console.log(document.getElementsByClassName("quiz")[0].children[0].dataset.letra);
    var letraChave=document.getElementById("palavraChave").value;
    var quiz_letra=document.getElementsByClassName("quiz")[0];
    
    if(letraChave!=""){
        
        if(confirmaArray_Letra(letraChave.toUpperCase()).length>0){

            var fr=confirmaArray_Letra(letraChave.toUpperCase());
            
            for(var i=0;i<fr.length;i++){
                var hr=fr[i];
                if(quiz_letra.children[hr].value==""){
                    quiz_letra.children[hr].value=textoJogo(numJogo).charAt(hr).toUpperCase();
                    idcount+=1;
                }
            }

            ChecarTodoTempo();   

        }

    }
    
}

function mostrarCorpoJogo(idCount){
    
    var count=Math.round((6/numJogo)*idCount);

    if(count==1){
        corpoJogo.style.display="block";
    }
    else if(count==2){
        corpoJogo.style.display="block";
        tronco.style.display="block";
    }
    else if(count==3){
        corpoJogo.style.display="block";
        tronco.style.display="block";
        bracoDireito.style.display="block";
    }
    else if(count==4){
        corpoJogo.style.display="block";
        cabeca.style.display="block";
        tronco.style.display="block";
        bracoDireito.style.display="block";
        bracoEsquerdo.style.display="block";
    }
    else if(count==5){
        corpoJogo.style.display="block";
        cabeca.style.display="block";
        tronco.style.display="block";
        bracoDireito.style.display="block";
        bracoEsquerdo.style.display="block";
        pernaDireita.style.display="block";
    }
    else if(count==6){
        corpoJogo.style.display="block";
        cabeca.style.display="block";
        tronco.style.display="block";
        bracoDireito.style.display="block";
        bracoEsquerdo.style.display="block";
        pernaDireita.style.display="block";
        pernaEsquerda.style.display="block";
    }
    /*
    switch(count){
        case 1:
            corpoJogo.style.display="block";
            break
    }*/

}

// Palavra Array

function confirmaPalavraArray(palavra_conf){
    var b=-1;
    
        for(var i=0;i<textoJogo(numJogo).length;i++){
        
            if(textoJogo(numJogo).charAt(i).toUpperCase()==palavra_conf){
                b=i;
            }
            
        }

    return b;
}

function confirmaArray_Letra(palavra_conf){
    var b=[];
    
        for(var i=textoJogo(numJogo).length-1;i>=0;i--){
        
            if(textoJogo(numJogo).charAt(i).toUpperCase()==palavra_conf){
                b.unshift(i);
            }
            
        }

    return b;
}

/*NOVO JOGO */
function novoJogo(){
    
    if(jogo){
    
        numJogo=Math.round(Math.random()*8);

        if(textoJogo(numJogo).length>0){
            
            jogo=false;
            novJogo.innerHTML="Terminar";
            novJogo.style.backgroundColor= "#f00";
            //palavraChave
            palavraChave.style.display= "block";
            palavraChave.focus();

            //Jogo Controle
            jogoControle.style.display= "block";

            //NUMERO INPUT
            idcount=0;
            for(var i=0;i<numJogo;i++){
                createInput();   
            }
            
            //console.log(palavra);
            seg=60;

            tmpCron=setInterval(cronometro,1000);

        }

    }
    else{
        //Remove Input
        removeInput();

        jogo=true;
        novJogo.innerHTML="Novo Jogo";
        novJogo.style.backgroundColor= "#00f";
        //palavraChave
        palavraChave.value="";
        palavraChave.style.display= "none";
        
        //Jogo Controle
        jogoControle.style.display= "none";

        //DICA JOGO
        dicaJogo.style.backgroundColor="#fff";
        dicaJogo.style.color="#333";
        idmouse=0;

        //Ocultar PESSO JOGO
        corpoJogo.style.display="none";
        //cabeca.style.display="none";
        tronco.style.display="none";
        bracoDireito.style.display="none";
        bracoEsquerdo.style.display="none";
        pernaDireita.style.display="none";
        pernaEsquerda.style.display="none";

        //Parar a contagem
        document.getElementById("cronometro").innerHTML="01:00";
        clearInterval(tmpCron);
    }

}
function textoJogo(num){
    var msg="";
    switch(num){
        case 1:msg="P";break;
        case 2: msg="QG";break;
        case 3: msg="TER";break;
        case 4: msg="MESA";break;
        case 5: msg="CARRO";break;
        case 6: msg="QUADRO";break;
        case 7: msg="AFINADO";break;
        case 8: msg="BRIQUEDO";break;
        case 9: msg="EMBAIXADOR";break;
        case 10: msg="PRESIDENTE";break;
        default: msg="";
    }
    return msg;
}

/*Create Input */
function createDIVInput(){
    //CREATE DIV 
    var div=document.createElement("div");
    var clas=document.createAttribute("class");
    clas.value="quiz";
    //ADD ATRIBUTE
    div.setAttributeNode(clas);
    //ADD
    document.getElementsByClassName("jogo-quiz")[0].appendChild(div);
}
function createInput(){

    //CREATE INPUT 
    var input=document.createElement("input");
    var type=document.createAttribute("type");
    type.value="text";
    var maxlength=document.createAttribute("maxlength");
    maxlength.value="1";
    var disabled=document.createAttribute("disabled");
    disabled.value="false";

    //ADD ATRIBUTE
    input.setAttributeNode(type);
    input.setAttributeNode(maxlength);
    input.setAttributeNode(disabled);
    
    //ADD
    document.getElementsByClassName("quiz")[0].appendChild(input);

}
function removeInput(){
    
    //REMOVE
    if(document.getElementsByClassName("quiz")[0]!="undefined" ||
    document.getElementsByClassName("quiz")[0]!=""){
        document.getElementsByClassName("quiz")[0].remove();
        //console.log(document.getElementsByClassName("quiz")[0]);
    }

    createDIVInput();
}

/* Create ANIMATE */
function createAnimateSVG(){
    
     //CREATE IMG 
    var img=document.createElement("img");
    var src=document.createAttribute("src");
    src.value="../../img/nave/loader.gif";

    //CREATE CONTAINER 
    var modal=document.createElement("div");
    var cl=document.createAttribute("class");
    cl.value="modal";

    //CREATE CONTAINER SON
    var son=document.createElement("div");
    var cl1=document.createAttribute("class");
    cl1.value="modal-son";

    //ADD ATRIBUTE
    img.setAttributeNode(src);
    modal.setAttributeNode(cl);
    son.setAttributeNode(cl1);
    //ADD SVG
    modal.appendChild(son);
    son.appendChild(img);
    //son.appendChild(svg);
    
    //ADD
    document.body.appendChild(modal);

    //console.log(document.getElementsByClassName("modal-son")[0].childElementCount);
}
/*Loop */
function loopAnimateInicia(){
    loopCount+=1;
    var max=500;
    if(loopCount>=max){
        document.getElementsByClassName("modal")[0].remove();
        clearInterval(tmp);
        loopCount=0;
    }
    tmp=setInterval(loopAnimateInicia,max);
}

/* CRONOMETRO */
function cronometro(){
    seg-=1;
    if(seg>0){
        if(seg>=10){
            document.getElementById("cronometro").innerHTML="00:"+seg;
        }
        else{
            document.getElementById("cronometro").innerHTML="00:0"+seg;
        }
    }
    else{
        jogoControle.style.display="none";
        palavraChave.style.display="none";
        
        document.getElementById("cronometro").innerHTML="00:00";
        clearInterval(tmpCron);
    }
}