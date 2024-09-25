
import "../styles/scss/style.scss";

let toggle=document.querySelector('.toggle-ball');
let inicio=document.querySelector('inicio');

const http_endpoint=`https://arturtembe-my-project.000webhostapp.com/`;

document.getElementById('sunny').addEventListener('click',()=>{
    //toggle.style.left="19px";

    onActive()

});
document.getElementById('moon').addEventListener('click',()=>{
    //toggle.style.left="1px";

    offActive()
});


function onActive(){
    
    if(document.body.classList.contains('bg-all')){
        document.body.classList.remove('bg-all');
    }

    document.querySelector('header').classList.add('active');
    document.getElementById('home').classList.add('active');
    //Habilidade 
    document.getElementById('habilidade').classList.add('active');
    //projecto 
    document.getElementById('projecto').classList.add('active');
    //Contacto 
    document.getElementById('contacto').classList.add('active');

    //Footer
    document.getElementById('footer').classList.add('active');

}

function offActive(){

    if(!document.body.classList.contains('bg-all')){
        document.body.classList.add('bg-all');
    }

    document.querySelector('header').classList.remove('active');
    document.getElementById('home').classList.remove('active');
    //Habilidade 
    document.getElementById('habilidade').classList.remove('active');
    //projecto 
    document.getElementById('projecto').classList.remove('active');
    //Contacto 
    document.getElementById('contacto').classList.remove('active');

    //Footer
    document.getElementById('footer').classList.remove('active');

}

//Menu
document.getElementById('icon-menu').addEventListener('click',(e)=>{
    if(document.querySelector('.navbar').classList.contains('menu-of')){
        document.querySelector('.navbar').classList.remove('menu-of');

        document.getElementById('icon-menu').innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        `;

    }else{
        document.querySelector('.navbar').classList.add('menu-of');
        
        document.getElementById('icon-menu').innerHTML=`
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
        `;
    }
})

//Formulario

const form=document.getElementById('form');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const endpoint=http_endpoint+`db/controllers/myportifolio/contactoController/addContactoAPI.php`;
    const dataForm=new FormData(form);

    let msg_onOff=document.getElementById("msg");
    let msg_onOff_father=document.getElementById("msg").parentElement;
    msg_onOff_father.classList.remove("hidden");
            
    const data=Object.fromEntries(dataForm);

    var msg=[];

    if(!data.nome || typeof data.nome==undefined ||
        data.nome==null){
        msg.push('Nome Invalido');
    }
    
    if(data.nome.length<2){
        msg.push('Nome deve ter 2 ou mais caracteres');
    }

    if(!data.email || typeof data.email==undefined ||
        data.email==null){
        msg.push('Email Invalido');
    }
    if((data.email+'').indexOf('@')==-1 || (data.email+'').indexOf('.')==-1){
        msg.push(`Email Invalido`);
    }
    if((data.email+'').split('@').length>2){
        msg.push('Email Invalido (.)');
    }

    if(data.tel!=''){
        if(data.tel.length<9){
            msg.push('Telefone deve ter no minimo 9 digitos');
        }
        else if(data.tel.length>12){
            msg.push('Telefone deve ter no maximo 12 digitos');
        }
    }

    if(!data.conteudo || typeof data.conteudo==undefined ||
        data.conteudo==null){
        msg.push('Conteudo Invalido');
    }

    if(msg.length>0){
        msg_onOff.classList.add("error");
        msg_onOff.innerHTML=msg[0];
    }
    else{
        //console.log(data);
        const response=await fetch(endpoint,{
            method:"post",
            body:dataForm
        })
        .then(res=>res.json()).then(res=>{
            return res;
        }).catch(error=>{
            console.log("ERROR: ",error);
        });

        if(await response[0].status==1){
            msg_onOff.classList.add("sucesso");
            msg_onOff.innerHTML=await response[0].msg;
        }else{
            msg_onOff.classList.add("error");
            msg_onOff.innerHTML="Houve um erro ao enviar, porfavor tente novamente!";
        }
    }
});

// Carrousel

const inicia=()=>{
const imageList=document.querySelector(".box-projecto");
const slideButtons=document.querySelectorAll(".box-container-control");

    slideButtons.forEach(button=>{
        button.addEventListener("click",()=>{
            //console.log(button.id);
            //next-slider prev-slider
            const direction=button.id=="prev-slider" ? -1:1;
                    
            const scrollMount=imageList.clientWidth*direction;
            
                imageList.scrollBy({
                left:scrollMount,
                behavior:"smooth"
            });
        });
    });

    const handSlideButtons=()=>{
        slideButtons[0].style.display=imageList.scrollLeft <= 0 ? "none":"block";
        slideButtons[1].style.display=imageList.scrollLeft >= maxScrollLeft ? "none":"block";
    }

    getAllProject();

}

// Projectoss
async function getAllProject(){

    const endpoint=http_endpoint+`db/controllers/myportifolio/projectoController/getProjectoAPI.php`;
    
    const proj=document.getElementById('box-projecto');

    //console.log(proj);
    let data= await fetch(endpoint)
    .then(res=>res.json()).then(res=>{
        return res;
    }).catch(error=>{console.log("ERROR: ",error);});

    await data.forEach(el=>{
        
        let item=document.createElement('div');
        item.setAttribute("class","item-projectos");

            let img=document.createElement("img");
            img.setAttribute("src","");
            img.setAttribute("data-url",`${el.image}`);
            img.setAttribute("alt",`${el.titulo}`);
            //img.setAttribute("class",'src-img');
            
            img.addEventListener("load",e=>{
                e.target.classList.add("loaded");
            }); 
            
            let itemTitle=document.createElement('div');
            itemTitle.setAttribute("class","item-title");

                let h4=document.createElement("h4");
                h4.innerHTML=el.titulo;
                let h5=document.createElement("h4");
                h5.innerHTML=el.tecnologia;
                let controlItem=document.createElement("div");
                controlItem.setAttribute("class","control-item");
                    let github=document.createElement("a");
                    github.setAttribute("href",el.github);
                    github.innerHTML="GitHub"
                    
                    let live=document.createElement("a");
                    live.setAttribute("href",el.live);
                    live.innerHTML="Live";
                
                controlItem.appendChild(github);
                el.live!=""&& (controlItem.appendChild(live));

            itemTitle.appendChild(h4);
            itemTitle.appendChild(h5);
            itemTitle.appendChild(controlItem);

        item.appendChild(img);
        item.appendChild(itemTitle);

        proj.appendChild(item);

    });
}

window.addEventListener("load",inicia);

//IMG
window.addEventListener("scroll",(e)=>{

    let item=[...document.getElementsByClassName("item-projectos")]
    
    if(window.scrollY>=720){
        
        item.forEach(el=>{
            if(el.children[0].getAttribute("src")==null || 
            el.children[0].getAttribute("src")==""){
                el.children[0].setAttribute("src",el.children[0].getAttribute("data-url"));
                el.children[0].setAttribute("data-url","");
            }
        })
    }
});
