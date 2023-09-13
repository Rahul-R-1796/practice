import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BaseApp from "../BaseApp/baseApp";
import { AppState } from "../Context/AppProvider";
import { Form } from "react-bootstrap";

export default function Payment() {
  const navigate = useNavigate();
  const {
    totalCartPrice,
    setCartProductId,
    setProductCount,
    setTotalCartPrice,
  } = AppState();
  const deleteAllCartData = async () => {
    const userId = localStorage.getItem("cUserId");
    console.log("payment userId", userId);
    const response = await fetch(
      `https://ecommerce-8rwm.onrender.com/cart/delete/all/${userId}`,
      { method: "DELETE" }
    );
    const cartDatas = await response.json();
    setCartProductId([]);
    setProductCount(0);
    setTotalCartPrice(0);
  };

  const handleSubmit = () => {
    if (totalCartPrice == 0) {
      alert("Please Enter Amount");
    } else {
      var options = {
        key: "rzp_test_YlA4Pzq8VlAQ8L",
        key_secret: "xUALEiY9uqax09KYEabyeTGy",
        amount: totalCartPrice * 100,
        currency: "INR",
        name: "E Commerce",
        description: "Product Purchase",
        handler: function (response) {
          navigate("/home");
          toast.success(
            `your Payment is Completed Successfully, Your tranction Id ${response.razorpay_payment_id}`
          );
          alert(`Your Payment Id ${response.razorpay_payment_id}`);
          deleteAllCartData();
        },
        prefill: {
          name: "jayasuriya",
          email: "jayasuriya@gmail.com",
          contact: "7384945834",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  };
  return (
    <BaseApp>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <Form>
              <Form.Group controlId="addressLine1" className="pt-3">
                <Form.Control type="text" placeholder="Enter address line 1" />
              </Form.Group>

              <Form.Group controlId="addressLine2" className="pt-3">
                <Form.Control type="text" placeholder="Enter address line 2" />
              </Form.Group>

              <Form.Group controlId="city" className="pt-3">
                <Form.Control type="text" placeholder="Enter city" />
              </Form.Group>

              <Form.Group controlId="state" className="pt-3">
                <Form.Control type="text" placeholder="Enter state" />
              </Form.Group>

              <Form.Group controlId="postalCode" className="pt-3">
                <Form.Control type="text" placeholder="Enter postal code" />
              </Form.Group>

              <Form.Group controlId="country" className="pt-3">
                <Form.Control type="text" placeholder="Enter country" />
              </Form.Group>
              <button className="pay-btn" onClick={() => handleSubmit()}>
                Pay
              </button>
            </Form>
          </div>
        </div>
      </div>
    </BaseApp>
  );
}
