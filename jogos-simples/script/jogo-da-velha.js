
let container,jogoVelha,obj,atrr;
var nivel,jogInc;
let modalContainer,defesaJog,countV,countD;

const inicia=()=>{
    container=document.getElementsByClassName("container")[0]
    jogoVelha=null
    obj=null
    atrr=null
    nivel=0
    jogInc=0
    modalContainer=document.getElementsByClassName("modal-container")[0]
    defesaJog=true
    countV=countD=0

    for(cmp of componete_inicial){
        cmp()
    }   
}

/* CRiar componetes */
let componetes=[
    ()=>{
        Componetes.div("controla-jog")  
        
        //Parte 1
        Componetes.div_2("controla-jog","jogo-usuario")
        Componetes.p("jogo-usuario","nome-sistema","",0)
        Componetes.p("jogo-usuario","jogo-pontos","0",0)
        
        //Parte 2
        Componetes.div_2("controla-jog","jogo-usuario")
        Componetes.p("jogo-usuario","nome-sistema","",1)
        Componetes.p("jogo-usuario","jogo-pontos","0",1)
        
        document.getElementsByClassName("nome-sistema")[0].innerHTML="Usuario";
        document.getElementsByClassName("nome-sistema")[1].innerHTML="Sistema";  
    },
    ()=>{
        Componetes.div("jogo-velha")
        
        for(var i=1;i<=9;i++){
            Componetes.input(i)
            addEventos.imput("v"+i)
        }
    },
    ()=>{
        Componetes.div("controla-buttos")
        Componetes.button("controla-buttos")
        addEventos.terminar()
    }
]

let componete_inicial=[
    ()=>{
        Componetes.div("contola-nivel")
        
        Componetes.p("contola-nivel","","Escolha o nivel",0)

        Componetes.span("contola-nivel","Nivel Facil",1)
        Componetes.span("contola-nivel","Nivel Medio",2)
        Componetes.span("contola-nivel","Nivel Avancado",3)
        addEventos.nivel(0)
        addEventos.nivel(1)
        addEventos.nivel(2)
    }
]

let Componetes={
    div:(cmp)=>{
        let div=createComponetes("div");
        let atrr_class=createComponetes_atrr("class")
        atrr_class.value=cmp
        let atrr_id=createComponetes_atrr("id")
        atrr_id.value=cmp

        //
        div.setAttributeNode(atrr_class);
        div.setAttributeNode(atrr_id);

        container.appendChild(div)
    },
    div_2:(cmp,attr)=>{
        let div=createComponetes("div");
        let atrr_class=createComponetes_atrr("class")
        atrr_class.value=attr
        
        //
        div.setAttributeNode(atrr_class);

        document.getElementsByClassName(cmp)[0].appendChild(div)
    },
    button:(cmp)=>{

        let div=createComponetes("button");
        
        let atrr_id=createComponetes_atrr("id")
        atrr_id.value="btnJogo"

        //Text
        let txt=document.createTextNode("Terminar")
        div.appendChild(txt)

        //
        div.setAttributeNode(atrr_id);

        document.getElementsByClassName(cmp)[0].appendChild(div)
    },
    p:(cmp,attr,txt,index)=>{

        let div=createComponetes("p");
        let atrr_class=createComponetes_atrr("class")
        atrr_class.value=attr

        //Text
        div.appendChild(document.createTextNode(txt))

        //
        div.setAttributeNode(atrr_class);

        document.getElementsByClassName(cmp)[index].appendChild(div)
    },
    input:(count)=>{

        let div=createComponetes("input");
        let atrr_type=createComponetes_atrr("type")
        atrr_type.value="text"
        let atrr_id=createComponetes_atrr("id")
        atrr_id.value="v"+count
        let atrr_maxlength=createComponetes_atrr("maxlength")
        atrr_maxlength.value="1"

        //
        div.setAttributeNode(atrr_type);
        div.setAttributeNode(atrr_id);
        div.setAttributeNode(atrr_maxlength);

        document.getElementById("jogo-velha").appendChild(div)
    },
    span:(cmp,txt1,id)=>{

        let div=createComponetes("span");
        
        let atrr_id=createComponetes_atrr("id")
        atrr_id.value="nivel"+id

        //Text
        let txt=document.createTextNode(txt1)
        div.appendChild(txt)

        //
        div.setAttributeNode(atrr_id);

        document.getElementsByClassName(cmp)[0].appendChild(div)
    }
}
let createComponetes=(cmp)=>{
    return document.createElement(cmp)
}
let createComponetes_atrr=(cmp)=>{
    return document.createAttribute(cmp)
}

//Eventos
let addEventos={
    imput:(id)=>{
        document.getElementById(id).addEventListener("click",()=>{
            var target=event.target
            target.value="O"
            target.disabled=true
            //target.style.cursor="none"

            jogInc=1

            if(ganho_perda()>=0){
                
                if(ganho_perda()==2){
                    document.getElementById("resp-info").innerHTML="Empate!!"
                }
                else{
                    document.getElementById("resp-info").innerHTML="Venceste!!"
                    countV+=1
                }

                modalContainer.style.display="flex"

                //Evento
                addEventos.continuo()
                addEventos.cancelar()
            }
            else{
                nivelExecute()
            }
            //console.log(jogInc)
        })
    },
    terminar:()=>{
        document.getElementById("btnJogo").addEventListener("click",()=>{
            //REMOVER TUDO
            //Atributo
            countD=countV=0
            //controla-jog
            document.getElementsByClassName("controla-jog")[0].remove();
            //jogo-velha
            document.getElementById("jogo-velha").remove()
            //controla-buttos
            document.getElementsByClassName("controla-buttos")[0].remove()
            
            //Criar
            for(cmp of componete_inicial){
                cmp()
            }
            nivel=0  
        })
    },
    nivel:(i)=>{
        document.getElementsByTagName("span")[i].addEventListener("click",()=>{
            
            //REMOVER TUDO
            //contola-nivel
            document.getElementsByClassName("contola-nivel")[0].remove();
            
            //Criar JOGO
            
            nivel=i+1

            for(cmp of componetes){
                cmp()
            }

            //Jog Inc
            jogInc=Math.round(Math.random()*1)

            nivelExecute()
            
            let nomeSistema=document.getElementsByClassName("jogo-usuario")[jogInc];

            nomeSistema.style.backgroundColor="rgba(0,0,0,0.4)"
            
            //console.log(jogInc)
        })
    },
    continuo:()=>{
        document.getElementsByClassName("confirm")[0].addEventListener("click",()=>{
            
            //REMOVER TUDO
            //controla-jog
            document.getElementsByClassName("controla-jog")[0].remove();
            //jogo-velha
            document.getElementById("jogo-velha").remove()
            //controla-buttos
            document.getElementsByClassName("controla-buttos")[0].remove()
            
            for(cmp of componetes){
                cmp()
            }

            //Jog Inc
            jogInc=Math.round(Math.random()*1)

            nivelExecute()
            
            //console.log("Evento continuo: "+jogInc)

            //Pontos

            document.getElementsByClassName("jogo-pontos")[0].innerHTML=countV
            document.getElementsByClassName("jogo-pontos")[1].innerHTML=countD

            let nomeSistema=document.getElementsByClassName("jogo-usuario")[jogInc];

            nomeSistema.style.backgroundColor="rgba(0,0,0,0.4)"

            document.getElementsByClassName("modal-container")[0].style.display="none"
        })
    },
    cancelar:()=>{
        document.getElementsByClassName("cancel")[0].addEventListener("click",()=>{
            
            //REMOVER TUDO
            //Atributo
            countD=countV=0
            //controla-jog
            document.getElementsByClassName("controla-jog")[0].remove();
            //jogo-velha
            document.getElementById("jogo-velha").remove()
            //controla-buttos
            document.getElementsByClassName("controla-buttos")[0].remove()
            
            for(cmp of componete_inicial){
                cmp()
            }

            document.getElementsByClassName("modal-container")[0].style.display="none"
        })
    }
}

//CPU
let jogaCPU={
    nivel1:()=>{
        
        comparar.nivel1()
            
            if(ganho_perda()>=0){
                
                if(ganho_perda()==2){
                    document.getElementById("resp-info").innerHTML="Empate!!"
                }
                else{
                    document.getElementById("resp-info").innerHTML="Perdeste!!"
                    countD+=1
                }
                modalContainer.style.display="flex"

                //Evento
                addEventos.continuo()
                addEventos.cancelar()
            }
    },
    nivel2:()=>{

        //Defesa
        //Colunas
        if(comparar.defesa_bool(0,1,2)){
            comparar.defesa(0,1,2)
        }
        else if(comparar.defesa_bool(3,4,5)){
            comparar.defesa(3,4,5)
        }
        
        else if(comparar.defesa_bool(6,7,8)){
            comparar.defesa(6,7,8)
        }
        //Row
        else{
            if(comparar.defesa_bool(0,3,6)){
                comparar.defesa(0,3,6)
            }
            else if(comparar.defesa_bool(1,4,7)){
                comparar.defesa(1,4,7)
            }
            else if(comparar.defesa_bool(2,5,8)){
                comparar.defesa(2,5,8)
            }
            else{
                if(comparar.defesa_bool(0,4,8)){
                    comparar.defesa(0,4,8)
                }
                else if(comparar.defesa_bool(2,4,6)){
                    comparar.defesa(2,4,6)
                }
                else{
                    comparar.nivel1()
                }
            }   
        }

        if(ganho_perda()>=0){
            
            if(ganho_perda()==2){
                document.getElementById("resp-info").innerHTML="Empate!!"
            }
            else{
                document.getElementById("resp-info").innerHTML="Perdeste!!"
                countD+=1
            }
            
            modalContainer.style.display="flex"

            //Evento
            addEventos.continuo()
            addEventos.cancelar()
        }

    },
    nivel3:()=>{
       //Ataque
        //Colunas
        if(!comparar.ataque_bool(0,1,2)){
            comparar.ataque(0,1,2)
        }
        else if(!comparar.ataque_bool(3,4,5)){
            comparar.ataque(3,4,5)
        }
        
        else if(!comparar.ataque_bool(6,7,8)){
            comparar.ataque(6,7,8)
        }
        //Row
        else{
            if(!comparar.ataque_bool(0,3,6)){
                comparar.ataque(0,3,6)
            }
            else if(!comparar.ataque_bool(1,4,7)){
                comparar.ataque(1,4,7)
            }
            else if(!comparar.ataque_bool(2,5,8)){
                comparar.ataque(2,5,8)
            }
            else{
                if(!comparar.ataque_bool(0,4,8)){
                    comparar.ataque(0,4,8)
                }
                else if(!comparar.ataque_bool(2,4,6)){
                    comparar.ataque(2,4,6)
                }
                else{
                    
                    //Defesa
                    //Colunas
                    if(comparar.defesa_bool(0,1,2)){
                        comparar.defesa(0,1,2)
                    }
                    else if(comparar.defesa_bool(3,4,5)){
                        comparar.defesa(3,4,5)
                    }
                    
                    else if(comparar.defesa_bool(6,7,8)){
                        comparar.defesa(6,7,8)
                    }
                    //Row
                    else{
                        if(comparar.defesa_bool(0,3,6)){
                            comparar.defesa(0,3,6)
                        }
                        else if(comparar.defesa_bool(1,4,7)){
                            comparar.defesa(1,4,7)
                        }
                        else if(comparar.defesa_bool(2,5,8)){
                            comparar.defesa(2,5,8)
                        }
                        else{
                            if(comparar.defesa_bool(0,4,8)){
                                comparar.defesa(0,4,8)
                            }
                            else if(comparar.defesa_bool(2,4,6)){
                                comparar.defesa(2,4,6)
                            }
                            else{
                                comparar.nivel1()
                            }
                        }   
                    }

                }
            }   
        }
        
        if(ganho_perda()>=0){
            
            if(ganho_perda()==2){
                document.getElementById("resp-info").innerHTML="Empate!!"
            }
            else{
                document.getElementById("resp-info").innerHTML="Perdeste!!"
                countD+=1
            }

            modalContainer.style.display="flex"

            //Evento
            addEventos.continuo()
            addEventos.cancelar()
        }
    }
}
let comparar={
    defesa:(v1,v2,v3)=>{
        let jogCpu=document.getElementsByTagName("input")

        if(jogCpu[v1].value=="O" && jogCpu[v2].value=="O" && jogCpu[v3].value=="")
        {
            jogCpu[v3].value="X"
            jogCpu[v3].disabled=true
        }
        else if(jogCpu[v1].value=="O" && jogCpu[v2].value=="" && jogCpu[v3].value=="O")
        {
            jogCpu[v2].value="X"
            jogCpu[v2].disabled=true
        }
        else if(jogCpu[v1].value=="" && jogCpu[v2].value=="O" && jogCpu[v3].value=="O")
        {
            jogCpu[v1].value="X"
            jogCpu[v1].disabled=true
        }
        else{
            defesaJog=false
            let num=Math.round(Math.random()*8)

            if(jogCpu[num].value==""){
                jogCpu[num].value="X"
                jogCpu[num].disabled=true
            }else{
                let last=cpuDisponivel()

                jogCpu[last[cpuDisponivel().length-1]].value="X"
                jogCpu[last[cpuDisponivel().length-1]].disabled=true
            }         
        }

    },
    defesa_bool:(v1,v2,v3)=>{
        let jogCpu=document.getElementsByTagName("input")

        if(jogCpu[v1].value=="O" && jogCpu[v2].value=="O" && jogCpu[v3].value=="")
        {
            defesaJog=true
        }
        else if(jogCpu[v1].value=="O" && jogCpu[v2].value=="" && jogCpu[v3].value=="O")
        {
            defesaJog=true
        }
        else if(jogCpu[v1].value=="" && jogCpu[v2].value=="O" && jogCpu[v3].value=="O")
        {
            defesaJog=true
        }
        else{
            defesaJog=false
            
        }

        return defesaJog

    },
    ataque:(v1,v2,v3)=>{
        let jogCpu=document.getElementsByTagName("input")

        if(jogCpu[v1].value=="X" && jogCpu[v2].value=="X" && jogCpu[v3].value=="")
        {
            jogCpu[v3].value="X"
            jogCpu[v3].disabled=true
        }
        else if(jogCpu[v1].value=="X" && jogCpu[v2].value=="" && jogCpu[v3].value=="X")
        {
            jogCpu[v2].value="X"
            jogCpu[v2].disabled=true
        }
        else if(jogCpu[v1].value=="" && jogCpu[v2].value=="X" && jogCpu[v3].value=="X")
        {
            jogCpu[v1].value="X"
            jogCpu[v1].disabled=true
        }
        else{
            defesaJog=true
            let num=Math.round(Math.random()*8)
            
            if(jogCpu[num].value==""){
                jogCpu[num].value="X"
                jogCpu[num].disabled=true
            }else{
                let last=cpuDisponivel()

                jogCpu[last[cpuDisponivel().length-1]].value="X"
                jogCpu[last[cpuDisponivel().length-1]].disabled=true
            }
        }

        /*
        if(ganho_perda()>=0){
            modalContainer.style.display="flex"

            //Evento
            addEventos.continuo()
            addEventos.cancelar()
        }*/

    },
    ataque_bool:(v1,v2,v3)=>{
        let jogCpu=document.getElementsByTagName("input")

        if(jogCpu[v1].value=="X" && jogCpu[v2].value=="X" && jogCpu[v3].value=="")
        {
            defesaJog=false
        }
        else if(jogCpu[v1].value=="X" && jogCpu[v2].value=="" && jogCpu[v3].value=="X")
        {
            defesaJog=false
        }
        else if(jogCpu[v1].value=="" && jogCpu[v2].value=="X" && jogCpu[v3].value=="X")
        {
            defesaJog=false
        }
        else{
            defesaJog=true

        }

        return defesaJog
    }
    ,
    nivel1:()=>{
        let jogCpu=document.getElementsByTagName("input")
            
        if(jogInc==1){
            
            let num=Math.round(Math.random()*8)

            if(jogCpu.length>0){

                if(jogCpu[num].value!=""){
                                    
                    let last=cpuDisponivel()

                    if(last.length>0){
                        jogCpu[last[0]].value="X"
                        jogCpu[last[0]].disabled=true
                        //jogCpu[last[0]].style.cursor="none"
                    }

                }
                else{
                    jogCpu[num].value="X"
                    jogCpu[num].disabled=true
                    jogCpu[num].style.cursor="none"
                }
            }
        }
    }
}

//Nivel
let cpuDisponivel=()=>{
        
    let jogCpu=document.getElementsByTagName("input")
    
    let br=[]

    for(var i=0;i<jogCpu.length;i++)
    {
        if(jogCpu[i].value==""){
            br.push(i)
        }
    }
    return br
}
let cpuDisponivel_X_O=(valor)=>{
        
    let jogCpu=document.getElementsByTagName("input")
    
    let br=[]

    for(var i=0;i<jogCpu.length;i++)
    {
        if(jogCpu[i].value==valor){
            br.push(i)
        }
    }
    return br
}

function nivelExecute(){
    switch(nivel){
        case 1:jogaCPU.nivel1();break;
        case 2:jogaCPU.nivel2();break;
        case 3:jogaCPU.nivel3();break;
        default:;
    }
}

//Condicoes de vitoria
let ganho_perda=()=>{
    
    //0-jogador; 1-cpu
    let cond=-1

    let jogCpu=document.getElementsByTagName("input")

    //C 1   
    if((jogCpu[0].value!="" && jogCpu[1].value!="" && jogCpu[2].value!="") &&
        (jogCpu[0].value==jogCpu[1].value && jogCpu[1].value==jogCpu[2].value))
    {
        if(jogCpu[0].value="O")
            cond =0
        else
            cond=1
    }
    else if((jogCpu[3].value!="" && jogCpu[4].value!="" && jogCpu[5].value!="") &&
        (jogCpu[3].value==jogCpu[4].value && jogCpu[4].value==jogCpu[5].value))
    {
        if(jogCpu[0].value="O")
            cond =0
        else
            cond=1
    }
    else if((jogCpu[6].value!="" && jogCpu[7].value!="" && jogCpu[8].value!="") &&
        (jogCpu[6].value==jogCpu[7].value && jogCpu[7].value==jogCpu[8].value))
    {
        if(jogCpu[0].value="O")
            cond =0
        else
            cond=1
    }
    else{
        //C 2
        if((jogCpu[0].value!="" && jogCpu[3].value!="" && jogCpu[6].value!="") &&
        (jogCpu[0].value==jogCpu[3].value && jogCpu[3].value==jogCpu[6].value))
        {
            if(jogCpu[0].value="O")
                cond =0
            else
                cond=1
        }
        else if((jogCpu[1].value!="" && jogCpu[4].value!="" && jogCpu[7].value!="") &&
        (jogCpu[1].value==jogCpu[4].value && jogCpu[4].value==jogCpu[7].value))
        {
            if(jogCpu[1].value="O")
                cond =0
            else
                cond=1
        }
        else if((jogCpu[2].value!="" && jogCpu[5].value!="" && jogCpu[8].value!="") &&
        (jogCpu[2].value==jogCpu[5].value && jogCpu[5].value==jogCpu[8].value))
        {
            if(jogCpu[2].value="O")
                cond =0
            else
                cond=1
        }
        else{
            //c 3
            if((jogCpu[0].value!="" && jogCpu[4].value!="" && jogCpu[8].value!="") &&
            (jogCpu[0].value==jogCpu[4].value && jogCpu[4].value==jogCpu[8].value))
            {
                if(jogCpu[0].value="O")
                    cond =0
                else
                    cond=1
            }    
            else if((jogCpu[2].value!="" && jogCpu[4].value!="" && jogCpu[6].value!="") &&
            (jogCpu[2].value==jogCpu[4].value && jogCpu[4].value==jogCpu[6].value))
            {
                if(jogCpu[2].value="O")
                    cond =0
                else
                    cond=1
            }
            else{
                //C 4
                if(
                    (jogCpu[0].value!="" && jogCpu[1].value!="" && jogCpu[2].value!="")&&
                    (jogCpu[3].value!="" && jogCpu[4].value!="" && jogCpu[5].value!="")&&
                    (jogCpu[6].value!="" && jogCpu[7].value!="" && jogCpu[8].value!="")
                    )
                {
                    cond=2
                }
            }
        }
    }

    return cond;
}

window.addEventListener("load",inicia)