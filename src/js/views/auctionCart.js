import {CartStorage} from "../modules/lotsCatalog";
import {RegisterForm} from "../modules/registration";

const storage = new CartStorage();
const register = new RegisterForm();
const query = (selector) => [...document.querySelectorAll(selector)];
let cart = [];

export class AuctionCart {
    async cartView(cart) {
        document.getElementById('root').innerHTML = `
        <section class="win-cart">
  <div class="win-cart_left">
    <h2>Lots sold</h2>
  <div class='win-cart_login'>
    <p>Have an account? Sign in and proceed to payment</p>
    <button class="win-cart_login-btn" id="sign-in">
      Sign in
    </button>
  </div>
    <div class="win-lots" id="win-lots">
      <h3 class='win-lots_line quant'></h3>
      <div id="all-lots">
      
      </div>
    </div>
  </div>
  
  <div class="win-cart_right">
    <h3 class="win-lots_line">Auction Summary</h3>
    <p>Quantity:<span id='quantity' class="quant"></span></p>
    <p>Estimated Shipping: <span>Free</span></p>
    
    <p>Total Sum: <span id="total-price"></span></p>
    <label for="proceed-btn"></label>
    <input type="button" class="proceed-btn" id="summary-proceed" value="Proceed to payment">
  </div>
</section>`


    }
    async signIn () {
        const signup = document.querySelector(".signup-classic");
        document.getElementById("close-signup").addEventListener('click', () => signup.style.display = 'none');
        document.getElementById("sign-in").addEventListener("click", () => signup.style.display = 'block');

    }

    async lotinCart(lot) {
        return `
        <article class="win-lots_item">
        <img src="${lots.image}" alt="lot image">
        <div class="lots-detail">
          <h3>Title</h3>
          <p>Winning Bid: <span>${lot.price} USD</span></p>
          <p>Initial price: <span>${lot.start_price} USD</span></p>
          <p>Condition: <span>${lot.condition}</span></p>
          <a href ="/#" class="">win more</a>
        </div>
      </article>`
    }

    async displyItemsInCart() {
        const menuBtn = document.querySelector(".main-menu_login");
        const cart = document.querySelector(".win-cart");

        menuBtn.addEventListener('focus', () => cart.style.display = "block");
    }
}
export class AddToCart {
    async inCart(obj) {
        const quant = query(".cart-items");
        cart = [...obj.filter(item => {
            if (item.status === "sold" && item.price !== undefined && +item.price !== +item.start_price) {
                return item;
            }
                })];
        storage.saveCart(cart);
        if (cart.length !== 0) {
            quant.map(el => {
                el.style.visibility = "visible";
                el.innerText = cart.length;
            })
        }
    }

    setCartValues(cart) {
        const cartItems = query('.cart-items');
        const cartQuant = query('.quant');
        const totalSum = document.getElementById('total-price');
        let tempTotal = 0;
        let amount = cart.length;
        cart.map((item, i) => {
            tempTotal += +item.price;
        });
        totalSum.innerText = parseFloat(tempTotal.toFixed(2)) + " USD";
        cartItems.innerText = amount;
        cartQuant.forEach(el => el.innerText = amount + ' items');
    }

    addCartItem(cart) {
        const cartItemContainer = document.getElementById('all-lots');
        cartItemContainer.innerHTML = cart.map(el => {
            return `
        <article class="win-lots_item">
        <img src="${el.image}" alt="lot image">
        <div class="lots-detail">
          <h3>${el.title} </h3>
          <p>Winning Bid: <span>${el.price} USD</span></p>
          <p>Initial price: <span>${el.start_price} USD</span></p>
          <p>Condition: <span>${el.condition}</span></p>
          <a href ="/#" class="">win more</a>
        </div>
      </article>`
        }).join('')
    }
    checkSignin (obj) {
        let user = JSON.parse(localStorage.getItem('user'));
        const signin = document.querySelector(".win-cart_login");
        const menuLogIn = document.querySelector(".login");
        const cartLogIn = document.querySelector(".win-cart_left h2");
        if(user) {
            signin.style.display = 'none';
            menuLogIn.innerText = 'Your Win';
            cartLogIn.innerText = 'Your Win';
            let userCart = obj.filter( el => el.email_bid === user.email);
                this.inCart(userCart);
        }
    }
}

