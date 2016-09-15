var addCart = document.querySelectorAll('.catalog_cart__btn');
var basketList = document.querySelector('.catalog_basket__list');
var basketSum  = document.querySelector('.catalog_basket__summ_text')
var closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 44.238 44.238" style="enable-background:new 0 0 44.238 44.238;" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M15.533,29.455c-0.192,0-0.384-0.073-0.53-0.22c-0.293-0.293-0.293-0.769,0-1.062l13.171-13.171     c0.293-0.293,0.768-0.293,1.061,0s0.293,0.768,0,1.061L16.063,29.235C15.917,29.382,15.725,29.455,15.533,29.455z" fill="#546e7a"/>
		</g>
		<g>
			<path d="M28.704,29.455c-0.192,0-0.384-0.073-0.53-0.22L15.002,16.064c-0.293-0.293-0.293-0.768,0-1.061s0.768-0.293,1.061,0     l13.171,13.171c0.293,0.293,0.293,0.769,0,1.062C29.088,29.382,28.896,29.455,28.704,29.455z" fill="#546e7a"/>
		</g>
		<path d="M22.119,44.237C9.922,44.237,0,34.315,0,22.12C0,9.924,9.922,0.001,22.119,0.001S44.238,9.923,44.238,22.12    S34.314,44.237,22.119,44.237z M22.119,1.501C10.75,1.501,1.5,10.751,1.5,22.12s9.25,20.619,20.619,20.619    s20.619-9.25,20.619-20.619S33.488,1.501,22.119,1.501z" fill="#546e7a"/>
	</g>
</g>
</svg>`
var cart = [];



for (var i=0; i<addCart.length; i++){	
  addCart[i].addEventListener('click', function(event){
    event.preventDefault();
	var card = event.target.closest('.catalog_cart'); //определим по какому элементу клик
	var titlew = card.querySelector('.catalog_cart__title').innerHTML; // из элемента идем ниже по дереву до catalog_cart__title
	//var price = card.querySelector('.catalog_cart__price_new').innerHTML; - первый способ вытащить price 
	var price = card.dataset.price; // второй способ 
	// добавление элементов в массив
	cart.push({
		title: titlew,
		price
	});
	  createBasket();
	console.log(cart);
  })
}


function createBasket(){
	var basket = [];
	basketList.innerHTML = ''
	for (var j=0; j<cart.length; j++){
	basket.push(createLine(cart[j],j))
	}
    for (var y=0; y<basket.length; y++){
	basketList.appendChild(basket[y])
	}
	// сумма
	var sum = 0; 
	for (var i=0; i<cart.length; i++){
		sum += Number(cart[i].price)
	}
	basketSum.innerHTML = sum;
    console.log(basketSum);
	return basketList;
	
}

		 
function createLine(item, i){ 
	var line = document.createElement('div');
	line.classList.add('catalog_basket__line');
	var basketProd = '<div class="catalog_basket__product">'+ item.title + '</div>'
	var basketPrice = '<div class="catalog_basket__price price">'+ item.price + '</div>'
	line.innerHTML = basketProd + basketPrice
	var close = document.createElement('div');
	close.classList.add('catalog_basket__close');
	close.innerHTML = closeIcon;
	line.appendChild(close);
	close.addEventListener('click', function(e){
	    cart.splice(i,1);
		createBasket();
	})

	return line;
}




//таймер
function timer() {
	var itemSpecial = document.querySelectorAll('.catalog_cart--special');
	console.log(itemSpecial);

	for (var i=0; i < itemSpecial.length; i++ ){
		var time =[];
		var timerItem = itemSpecial[i].querySelectorAll('.timer__item');
		for (var j=0; j<timerItem.length; j++){
			var firstSpan=timerItem[j].querySelector('span:first-child');
			//timer = firstSpan.innerHTML;
			time.push({
				val:firstSpan
			});
		}
		
		for (var key in time){
			var sec = Number(time[3].val.innerHTML);
			var min = Number(time[2].val.innerHTML);
			var hour = Number(time[1].val.innerHTML);
			var day = Number(time[0].val.innerHTML);
		}
		if (sec == 0){
			if(min == 0){
				if (hour ==0){
					if(day == 0){
						itemSpecial[i].classList.add('catalog_cart--disabled');
						itemSpecial[i].classList.remove('catalog_cart--special');
					}
					else {
						day --;
						hour = 23;
						min = 59;
						sec = 59;
						time[0].val.innerHTML = day;
						time[1].val.innerHTML = hour;
						time[2].val.innerHTML = min;
						time[3].val.innerHTML = sec;
					}

				} else {
					hour --;
					min = 59;
					sec = 59;
					time[1].val.innerHTML = hour;
					time[2].val.innerHTML = min;
					time[3].val.innerHTML =sec;
				}

			} else {
				min --;
				sec = 59;
				time[2].val.innerHTML = min;
				time[3].val.innerHTML = sec;

			}
		} else {
			sec -- ;
			time[3].val.innerHTML=sec;
		}
	}
}

setInterval(timer, 1000);