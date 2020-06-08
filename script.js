let cart = [];
let = modaQt = 1;
let modalkey = 0;
const c = (el)=> document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//Listagem das pizzas
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
        modalkey = key;
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

//Eventos do Modal
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    },500);
}
//Botões para fechar o modal
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=> {
    item.addEventListener('click', closeModal);
});

//Alterando as quantidades 
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
        if(modalQt > 1){
            modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
     }
});
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});
//Selecionando o tamanho da pizza
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {  
        size.addEventListener('click', (e)=>{
            c('.pizzaInfo--size.selected').classList.remove('selected');//Removendo o selected
            size.classList.add('selected');
        });
});

//Adicionando ao carrinho
c('.pizzaInfo--addButton').addEventListener('click', ()=>{        
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalkey].id+'@'+size;
    //Verificando se se o item já existe no carrinho
    let key = cart.findIndex((item)=>{
        return item.identifier == identifier;
    });

    if(key > -1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id:pizzaJson[modalkey].id,
            size:size,
            qt:modalQt
        });    
    }    
    updateCart();
    closeModal();
});
//Abrindo Menu
c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
   
});
//Fechando Menu
c('.menu-closer').addEventListener('click',() =>{
    c('aside').style.left = '100vw';
});

function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){       
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>item.id == cart[i].id);
            //Sub total
            subTotal += pizzaItem.price * cart[i].qt;
            let cartItem = c('.models .cart--item').cloneNode(true);
            
            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;              
                }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;           
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
               if ( cart[i].qt > 1) {
                    cart[i].qt--;
               }else{
                   cart.splice(i, 1);
               }
                updateCart();

            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                    cart[i].qt++;
                    updateCart();
            });


            c('.cart').append(cartItem);
        }

        desconto = subTotal * 0.1;
        total = subTotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$: ${subTotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$: ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$: ${total.toFixed(2)}`;

    }else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}