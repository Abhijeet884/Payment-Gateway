const express = require("express");
const Razorpay = require("razorpay");
const axios =  require("axios");

const app = express();

var razorpay = new Razorpay({
  key_id: 'rzp_test_TVIPIMFAX9NqEW',
  key_secret: 'uWSV1uelLeR8TnesRTo486Sv',
});

app.set('views', 'view');
app.set("view-engine",'ejs');

app.use(express.urlencoded({extended: false}));

app.get("/",function(req, res){
  res.render("razorpay.ejs");
});

    app.post("/order",function(req, res){
          var options = {
          amount: "50000",
          currency: "INR",
      };

      razorpay.orders.create(options, function(err, order){
        console.log(order);
        res.json(order);
      });
});

app.post("/is-order-complete", function(req,res){
      razorpay.payments.fetch(req.body.razorpay_payment_id).then (function(paymentDocument){
            if(paymentDocument.status == "captured"){
              res.send("Payment Successfully completed");
            }
        else{
            res.redirect("/");
        }
});

  });


app.listen(5000, function(){
  console.log("server runnning");
});
