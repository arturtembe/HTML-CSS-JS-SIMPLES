
let tecla
let nave,naveX,naveY,navePosX,navePosY,vNave,tmpNave,naveH,naveW
let tela,telaH,telaW
let tiro,conutTiro,posTiroX,posTiroY,idTiro,tiroDado
let bomba,conutBomba,posBombaX,posBombaY,idBomba,bombaDado
let explosao_ar,countExplosao_ar,posExplosao_arX,posExplosao_arY,idExplosao_ar,explosao_arDado
let explosao_chao,countExplosao_chao,posExplosao_chaoX,posExplosao_chaoY,idExplosao_chao,explosao_chaoDado
let removeBomaTmer,removeBoma,removeBomaChaoTmer,removeBomaChao;
let iSom;
let iniciarJogo
//
let pontos,totalBomba

const addEventos={
    inicia:()=>{
        //Atributos
        mtdsEventos.telaContent()
        mtdsEventos.naveContent()
        mtdsEventos.posicaoContent()

        //Total Bomba
        pontos=document.getElementsByClassName("pontos")
        pontos[0].innerHTML="0"
        pontos[1].innerHTML="10"

        //Atributos valor
        //Tiros
        conutTiro=0
        idTiro=0;
        tiroDado=false
        //Bombas
        idBomba=0
        conutBomba=0
        bombaDado=true
        //Explosao_ar
        removeBoma=[]
        removeBomaTmer=100
        idExplosao_ar=0
        countExplosao_ar=0
        explosao_arDado=true
        //Explosao_chao
        idExplosao_chao=0
        countExplosao_chao=0
        explosao_chaoDado=true
        removeBomaChaoTmer=60
        removeBomaChao=[]
        //SOM
        iSom=0
        //Inicia Jogo
        iniciarJogo=true

        //LOOP
        keyFrameNave()

        //Reiniciar
        mtdsEventos.reiniciarJogo()

        //KEYDOW-UP
        mtdsEventos.keyDownUp()
    }
}
const mtdsEventos={
    keyDownUp(){
        document.addEventListener("keydown",codeExecute.keyDown_code);
        document.addEventListener("keyup",codeExecute.keyUp_code);
    },
    telaContent(){
        tela=document.getElementsByClassName("content")[0]
        telaH=tela.offsetHeight
        telaW=tela.offsetWidth
    },
    naveContent(){
        nave=document.getElementById("nave-space")
        naveH=nave.offsetHeight
        naveW=nave.offsetWidth

        naveX=telaW/2
        naveY=telaH/2
        vNave=5
        navePosX=navePosY=5
    },
    posicaoContent(){
        //Nave
        //Verifica
        //X
        naveX<=0 ? naveX=0:naveX=naveX
        naveX>=(telaW-naveW) ? naveX=(telaW-naveW):naveX=naveX
        //Y
        naveY<=0 ? naveY=0:naveY=naveY
        naveY>=(telaH-naveH) ? naveY=(telaH-naveH):naveY=naveY

        nave.style.left=`${naveX}px`
        nave.style.top=`${naveY}px`

    },
    reiniciarJogo(){
        document.getElementsByClassName("confirm")[0].addEventListener("click",(e)=>{
            e.preventDefault()
            
            document.getElementsByClassName("modal-container")[0].style.display="none"

            iniciarJogo=true;
        })
    }
}
const codeExecute={
    keyDown_code(){
        tecla=event.keyCode

        if(tecla==37){
            //console.log("37-Esquerda")
            if(iniciarJogo)
            {
                naveX-=navePosX
            }
        }
        else if(tecla==38){
            //console.log("38-Cima")
            if(iniciarJogo){naveY-=navePosY}
        }
        else if(tecla==39){
            //console.log("39-Direita")
            if(iniciarJogo){naveX+=navePosX}
        }
        else if(tecla==40){
            //console.log("40-Baixo")
            if(iniciarJogo){naveY+=navePosY}
        }
        else if(tecla==13){
            //console.log("Enter")
        }
        else if(tecla==32){
            //console.log("BlckSpace")
            //criarElemento.tiro()
            if(iniciarJogo){tiroDado=true}
        }

    },
    keyUp_code(){
        tecla=event.keyCode

        if(tecla==37){
            if(iniciarJogo){naveX=naveX}
        }
        else if(tecla==38){
            if(iniciarJogo){naveY=naveY}
        }
        else if(tecla==39){
            if(iniciarJogo){naveX=naveX}
        }
        else if(tecla==40){
            if(iniciarJogo){naveY=naveY}
        }
        else if(tecla==32){
            //console.log("BlckSpace")
            if(iniciarJogo){tiroDado=tiroDado}
        }

    }
}
const criarElemento={
    tiro:()=>{
        
        /* SOM */

        var som=document.createElement("audio");
        //ATRIBUTE
        var attr1_som=document.createAttribute("src");
        var attr2_som=document.createAttribute("id");
        //VALUE
        attr1_som.value="../../img/nave/tiro.mp3";
        attr2_som.value="som"+iSom;
        //SETATRIBUTE
        som.setAttributeNode(attr1_som);
        som.setAttributeNode(attr2_som);
    
        //CRIAR
        var div=document.createElement("div")
        var attr_class=document.createAttribute("class")
        attr_class.value="tiros"
        var attr_id=document.createAttribute("id")
        attr_id.value="tiros"+idTiro
        //Set Atributo
        div.setAttributeNode(attr_class);
        div.setAttributeNode(attr_id);
        //Add
        div.appendChild(som)
        tela.appendChild(div)
        
        posTiroX=naveX
        posTiroY=naveY

        tiro=document.getElementsByClassName("tiros")
        tiro[tiro.length-1].style.left=`${posTiroX}px`
        tiro[tiro.length-1].style.top=`${posTiroY}px`
        idTiro++
        conutTiro++
        tiroDado=false

        //Tocar o som da explosao
        document.getElementById("som"+iSom).autoplay=true;
        iSom++;
    },
    bomba:()=>{
        if(Number(pontos[1].innerHTML)>0){

            //Caixa da boma
            var div=document.createElement("div")
            var attr_class=document.createAttribute("class")
            attr_class.value="bombas"
            var attr_id=document.createAttribute("id")
            attr_id.value="bombas"+idBomba
            //Imagem da boma
            var img=document.createElement("img")
            var attr_src=document.createAttribute("src")
            attr_src.value="../../img/nave/bb_1.png"
            var attr_alt=document.createAttribute("alt")
            attr_id.alt="Bombas"
            //Set Atributo caixa
            div.setAttributeNode(attr_class);
            div.setAttributeNode(attr_id);
            //Set Atributo IMG
            img.setAttributeNode(attr_src);
            img.setAttributeNode(attr_alt)
            //Add IMG
            div.appendChild(img)
            //Add
            tela.appendChild(div)
            
            bomba=document.getElementsByClassName("bombas")
            
            posBombaX=Math.round(Math.random()*(telaW-naveW))
            posBombaY=0
            
            bomba[bomba.length-1].style.left=`${posBombaX}px`
            bomba[bomba.length-1].style.top=`${posBombaY}px`
            idBomba++
            conutBomba++

            pontos[1].innerHTML=""+(Number(pontos[1].innerHTML)-1)
        
        }
        else{
            iniciarJogo=false

            document.getElementById("resp-info").innerHTML="Desejas continuar?"

            document.getElementsByClassName("modal-container")[0].style.display="flex"
        }
    },
    explosao_ar:(x,y)=>{

        /* SOM */

        var som=document.createElement("audio");
        //ATRIBUTE
        var attr1_som=document.createAttribute("src");
        var attr2_som=document.createAttribute("id");
        //VALUE
        attr1_som.value="../../img/nave/explosao.mp3";
        attr2_som.value="som"+iSom;
        //SETATRIBUTE
        som.setAttributeNode(attr1_som);
        som.setAttributeNode(attr2_som);

        //Caixa da Explosao
        var div=document.createElement("div")
        var attr_class=document.createAttribute("class")
        attr_class.value="explosao-ar"
        var attr_id=document.createAttribute("id")
        attr_id.value="explosao-ar"+idExplosao_ar
        //Imagem da boma
        var img=document.createElement("img")
        var attr_src=document.createAttribute("src")
        attr_src.value="../../img/nave/explosao_ar.gif"
        var attr_alt=document.createAttribute("alt")
        attr_id.alt="Explosao-ar"
        //Set Atributo caixa
        div.setAttributeNode(attr_class);
        div.setAttributeNode(attr_id);
        //Set Atributo IMG
        img.setAttributeNode(attr_src);
        img.setAttributeNode(attr_alt)
        //Add IMG
        div.appendChild(som)
        div.appendChild(img)
        //Add
        tela.appendChild(div)
        
        explosao_ar=document.getElementsByClassName("explosao-ar")
        
        posExplosao_arX=x
        posExplosao_arY=y
        
        explosao_ar[explosao_ar.length-1].style.left=`${x}px`
        explosao_ar[explosao_ar.length-1].style.top=`${y}px`
        idExplosao_ar++
        countExplosao_ar++

        //Tocar o som da explosao
        document.getElementById("som"+iSom).autoplay=true;
        iSom++;
    },
    explosao_chao:(x,y)=>{

        /* SOM */

        var som=document.createElement("audio");
        //ATRIBUTE
        var attr1_som=document.createAttribute("src");
        var attr2_som=document.createAttribute("id");
        //VALUE
        attr1_som.value="../../img/nave/explosao.mp3";
        attr2_som.value="som"+iSom;
        //SETATRIBUTE
        som.setAttributeNode(attr1_som);
        som.setAttributeNode(attr2_som);

        //Caixa da Explosao
        var div=document.createElement("div")
        var attr_class=document.createAttribute("class")
        attr_class.value="explosao-chao"
        var attr_id=document.createAttribute("id")
        attr_id.value="explosao-chao"+idExplosao_chao
        //Imagem da boma
        var img=document.createElement("img")
        var attr_src=document.createAttribute("src")
        attr_src.value="../../img/nave/explosao.gif"
        var attr_alt=document.createAttribute("alt")
        attr_id.alt="Explosao-chao"
        //Set Atributo caixa
        div.setAttributeNode(attr_class);
        div.setAttributeNode(attr_id);
        //Set Atributo IMG
        img.setAttributeNode(attr_src);
        img.setAttributeNode(attr_alt)
        //Add IMG
        div.appendChild(som)
        div.appendChild(img)
        //Add
        tela.appendChild(div)
        
        explosao_chao=document.getElementsByClassName("explosao-chao")
        
        posExplosao_chaoX=x
        posExplosao_chaoY=y
        
        explosao_chao[explosao_chao.length-1].style.left=`${x}px`
        explosao_chao[explosao_chao.length-1].style.top=`${y}px`
        idExplosao_chao++
        countExplosao_chao++

        //Tocar o som da explosao
        document.getElementById("som"+iSom).autoplay=true;
        iSom++;
    }
}
const cimaBaixoRemove={
    tiroCima(){
        //conutTiro=tiro.length;
        for(cima of tiro)
        {
            if(cima.offsetTop>0){

                for(baixo of bomba){

                    if((
                        (baixo.offsetLeft>=(cima.offsetLeft-24))
                        && (baixo.offsetLeft<=(cima.offsetLeft+24))
                        )
                        && (baixo.offsetTop==cima.offsetTop)){
                            //REMOVE
                            cima.remove()
                            //REMOVE
                            //baixo.children[0].src="../../img/nave/explosao_ar.gif";
                            
                            //Crir explosao
                            criarElemento.explosao_ar(baixo.offsetLeft,baixo.offsetTop)

                            //
                            baixo.remove()

                            //var arry=[baixo,removeBomaTmer]

                            removeBoma.push(removeBomaTmer)

                            pontos[0].innerHTML=""+(Number(pontos[0].innerHTML)+1)

                            //Length
                            conutBomba=document.getElementsByClassName("bombas").length
                            conutTiro=document.getElementsByClassName("tiros").length    
                    }  
                                        
                }

                cima.style.top=`${(cima.offsetTop-1)}px`
            }
            else{
                cima.style.top="0px"
            }
        }
    },
    tiroRemove(){
        for(cima of tiro)
        {
            if(cima.offsetTop==0){
                cima.remove()
                conutTiro=document.getElementsByClassName("tiros").length
            }
        }
    },
    bombaBaixo(){
        //conutTiro=tiro.length;
        for(baixo of bomba)
        {
            if(baixo.offsetTop<(telaH-baixo.offsetHeight))
            {
                //Verificar e adicao extra
                if(baixo.offsetTop==(telaH/2)){
                    criarElemento.bomba()
                }
                if(conutBomba<3){
                    if(baixo.offsetTop==(telaH-(baixo.offsetHeight*5))){
                        criarElemento.bomba()
                    }
                }
                baixo.style.top=`${(baixo.offsetTop+1)}px`
            }
            else{
                baixo.style.top=`${(telaH-baixo.offsetHeight)}px`
            }

        }
    },
    bombaRemove(){
        for(baixo of bomba)
        {
            if(baixo.offsetTop==(telaH-baixo.offsetHeight)){
                
                //Crir explosao
                criarElemento.explosao_chao(baixo.offsetLeft,baixo.offsetTop)
                
                removeBomaChao.push(removeBomaChaoTmer)

                baixo.remove()
                conutBomba=document.getElementsByClassName("bombas").length
                

            }
        }
    }
}

//LOOP

function keyFrameNave(){
    
    //Criar tiro depois do click e remover
    if(conutTiro>0){cimaBaixoRemove.tiroCima();cimaBaixoRemove.tiroRemove()}

    //Nave
    mtdsEventos.posicaoContent()

    //Criar Elementos do tiro
    if(tiroDado){criarElemento.tiro()}
    
    //Criar BOMBAS
    if(conutBomba>0){cimaBaixoRemove.bombaBaixo();cimaBaixoRemove.bombaRemove()}
    else if(conutBomba<=0){
        if(bombaDado){criarElemento.bomba()}
    }

    //Explosao Ar
    if(countExplosao_ar>0){
        for(var i=0;i<removeBoma.length;i++){
            if(removeBoma[i]>0){
                var tt=removeBoma[i]-1
                
                removeBoma.splice(i,1)

                removeBoma.unshift(tt);                
            }
            else{
                removeBoma.splice(i,1)
                //console.log(removeBoma[i])
                explosao_ar[0].remove()
                countExplosao_ar=explosao_ar.length
            }
        }
    }

    //Explosao Chao
    if(countExplosao_chao>0){
        for(var i=0;i<removeBomaChao.length;i++){
            if(removeBomaChao[i]>0){
                removeBomaChao[i]=removeBomaChao[i]-1                
            }
            else{
                removeBomaChao.splice(i,1)
                
                explosao_chao[0].remove()
                countExplosao_chao=explosao_chao.length
            }
        }
    }

    tmpNave=requestAnimationFrame(keyFrameNave)
}

window.addEventListener("load",addEventos.inicia)
