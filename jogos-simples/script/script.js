
var tmp,loopCount;
var search;

function inicia(){
    loopCount=0;

    search=location.search;
    //console.log(search);

    if(search!="" || search!="undefined"){
        
        removeIframe() 

        if(search.split("?")[1]=="jogo-da-forca"){
            
            nome_click.forca()

            //document.title="Jogo da Forca";
            document.getElementsByTagName("title")[0].innerHTML="Jogo da Forca";
            createIframe("jogo-da-forca");
        }
        else if(search.split("?")[1]=="jogo-da-velha"){
            nome_click.velha()
            document.getElementsByTagName("title")[0].innerHTML="Jogo da Velha";
            createIframe("jogo-da-velha");
        }
        else if(search.split("?")[1]=="jogo-de-ping-pong"){
            nome_click.pingPong()
            document.getElementsByTagName("title")[0].innerHTML="Jogo da Velha";
            createIframe("jogo-de-ping-pong");
        }
        else if(search.split("?")[1]=="jogo-da-nave"){
            nome_click.nave()
            document.getElementsByTagName("title")[0].innerHTML="jogo da Nave";
            createIframe("jogo-da-nave");
        }
        else if(search.split("?")[1]=="inicio-jogo"){ 
            document.getElementsByTagName("title")[0].innerHTML="JOGO";
            createIframe("inicio-jogo");
        }
        else{
            createIframe("inicio-jogo");    
        }

    }

    //document.getElementById("forca").addEventListener("click",createAnimateSVG);
}

window.addEventListener("load",inicia);


const nome_click={
    forca:()=>{
        let obj=document.getElementById("forca")
        obj.classList.contains("active")?obj.classList.remove("active"):obj.classList.add("active")
    },
    velha:()=>{
        let obj=document.getElementById("velha")
        obj.classList.contains("active")?obj.classList.remove("active"):obj.classList.add("active")
    },
    pingPong:()=>{
        let obj=document.getElementById("pingPong")
        obj.classList.contains("active")?obj.classList.remove("active"):obj.classList.add("active")
    },
    nave:()=>{
        let obj=document.getElementById("nave")
        obj.classList.contains("active")?obj.classList.remove("active"):obj.classList.add("active")
    }
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
    loopAnimateInicia();
}

/* CREATE IFRAME */
function createIframe(srcLink){
    //CREATE CONTAINER 
    var iframe=document.createElement("iframe");
    var src=document.createAttribute("src");
    src.value=srcLink+".html";
    var id=document.createAttribute("id");
    id.value=srcLink;

    //ADD ATRIBUTE
    iframe.setAttributeNode(src);
    iframe.setAttributeNode(id);
    
    //ADD
    document.getElementsByClassName("sidebar-info")[0].appendChild(iframe);
}
function removeIframe(){
    let typ=document.getElementsByClassName("sidebar-info")[0]
    if(typ.childElementCount>0){
        typ.children[0].remove()
    } 
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