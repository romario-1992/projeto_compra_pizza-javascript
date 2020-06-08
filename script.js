let = modaQt = 0;
const c = (el)=> document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);


pizzaJson.map((item, index) =>{
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    //Pegando o ID (indice) da pizza pelo index
    pizzaItem.setAttribute('data-key', index);
    //Preencher as informações em pizzaItem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    //Abrindo Modal
    pizzaItem.querySelector('a').addEventListener('click', (e)=> {
        //Bloqueando Ação para não atualizar a tela.
        e.preventDefault();
        //Definindo o ID da Pizza na div .pizza-item
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        //Preenchendo modal
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$: ${pizzaJson[key].price.toFixed(2)} `;
        c('.pizzaInfo--size.selected').classList.remove('selected');//Removendo o selected
        //Tamanhos
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {  
            if(sizeIndex == 2 ){
                size.classList.add('selected');
            }      
            size.querySelector('span').innerHTML =  pizzaJson[key].sizes[sizeIndex];
        });
       //Quantidades de Pizza
        c('.pizzaInfo--qt').innerHTML = modalQt;
       

        //Abrindo o modal
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);       
    });
    
    

   c('.pizza-area').append( pizzaItem );
});