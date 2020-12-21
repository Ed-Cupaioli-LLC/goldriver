$(function(){

    //Age Gate
  if (Cookies.get('vl-age') !== 'over 21') {
    $('#prompt-overlay').addClass('active');
    $('.close-prompt').addClass('hidden');
  } 
  $('.age-gate .btn').click(function() {
    if ($(this).attr('href').indexOf('#yes') > -1) {
      Cookies.set('vl-age', 'over 21', { expires: 365 });
      $('#prompt-overlay').removeClass('active');
      $('.close-prompt').removeClass('hidden');
    } else {
      window.location = "https://estreet.co";
    }
  });

//hamburger dropdown menu
    $(".hamburger").click(function() {
        var val = $(this).attr('id');
        if (val == 0) {
            $('body,html').css('position','fixed');
            $("ul").hide();
            $(this).attr('id', '1');
        } else {
            $("ul").show();
            
            $('body,html').css('position','fixed');
            $(this).attr('id', '0');
        }

    });

    $(".exit").click(function() {
      var val = $(this).attr('id');
      if (val == 1) {
        $('body,html').css('position','unset');
          $("ul").hide();
          $(this).attr('id', '1');
          $('.button').attr('id', '1');
      } 

  });

  // Add to Cart conversion 
  document.addEventListener('snipcart.ready', () => {
    Snipcart.events.on('item.added', (cartItem) => {
      fbq('track', 'AddToCart');
    }); 
    Snipcart.events.on('cart.confirmed', (cartConfirmResponse) => {
      var orderValue = cartConfirmResponse.total.toFixed(2);
     fbq('track','Purchase', {currency: 'USD', value: orderValue })
    });

    Snipcart.events.on('item.added', (cartItem) => {
    console.log('added-item:' + cartItem);
    itemAdded(cartItem)
    });
    Snipcart.events.on('item.removed', (cartItem) => {
    itemRemoved(cartItem)
    console.log('item-removed:' + cartItem);
   });

 Snipcart.events.on('cart.confirmed', (cart) => {
  orderCompleted(cart)
  //ecommerce recording 
    cart.items.items.map(function (item) {
      dataLayer.push( {
          event: 'Ecommerce',
          transactionId: item.id,
          transactionTotal: item.totalPrice,
          name: item.name,
          sku: item.name,
          price: item.price,
          quantity: item.quantity,
        
      });
  })
});

});
 
function createProductsFromItems (items) {
  return items.map(function (item) {
      return {
          name: item.name,
          description: item.description,
          id: item.id,
          price: item.price,
          quantity: item.quantity
      };
  });
}
function productsCheckout  (items) {
  return items.items.map(function (item) {
      return {
          name: item.name,
          description: item.description,
          id: item.id,
          price: item.price,
          quantity: item.quantity
      };
  });
}

function itemAdded(item){
  dataLayer.push({
      event: 'snipcartEvent',
      eventCategory: 'Add To Cart',
      eventAction: 'Add To Cart',
      eventLabel: item.name,
      eventValue: item.price,
      ecommerce: {
          currencyCode: 'USD',
          add: {
              products: createProductsFromItems([item])
          }
      }
  });
}

function itemRemoved(item){
  dataLayer.push({
      event: 'snipcartEvent',
      eventCategory: 'Cart Update',
      eventAction: 'Item Removed From Cart',
      eventLabel: item.name,
      eventValue: item.price,
      ecommerce: {
          currencyCode: 'USD',
          remove: {
              products: createProductsFromItems([item])
          }
      }
  });
}


function orderCompleted(order){
  dataLayer.push({
      event: 'snipcartEvent',
      eventCategory: 'Order Update',
      eventAction: 'New Order Completed',
      ecommerce: {
          currencyCode: order.currency,
          purchase: {
              actionField: {
                  id: order.token,
                  affiliation: 'Website',
                  revenue: order.total,
                  tax: order.taxesTotal,
                  invoiceNumber: order.invoiceNumber
              },
              products: productsCheckout(order.items),
              userId: order.invoiceNumber
          }
      }
  });
}


  
  
});


