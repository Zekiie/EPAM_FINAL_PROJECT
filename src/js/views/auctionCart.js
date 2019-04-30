export class AuctionCart {
    async cartView (lot) {
        return document.getElementById('nav').innerHTML += `
        <section class="win-cart">
  <div class="win-cart_left">
    <h2>Your win</h2>
  <div class='win-cart_login'>
    <p>Have an account? Sign in and proceed to payment</p>
    <button class="win-cart_login-btn">
      Sign in
    </button>
  </div>
    <div class="win-lots" id="win-lots">
      <h3 class='win-lots_line'>6 items</h3>
      
    </div>
  </div>
  
  <div class="win-cart_right">
    <h3 class="win-lots_line">Auction Summary</h3>
    <p>Quantity:<span id='quantity'></span></p>
    <p>Estimated Shipping: <span>Free</span></p>
    
    <p>Total Price: <span id="total-price"> $150</span></p>
    <label for="proceed-btn"></label>
    <input type="button" class="proceed-btn" id="summary-proceed" value="Proceed to payment">
  </div>
</section>`
    }
    async lotinCart (lot) {
        return `
        <article class="win-lots_item">
        <img src="https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="lot image">
        <div class="lots-detail">
          <h3>Title</h3>
          <p>Winning Bid: <span>150 USD</span></p>
          <p>Initial price: <span>50 USD</span></p>
          <p>Condition: <span>Used</span></p>
          <a href ="/#" class="">win more</a>
        </div>
      </article>`
    }
}