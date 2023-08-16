import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom"
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
export default function Market(props) {
  
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: props.total
            }
          }
        ]
      });
    };
  
    const onApprove = (data, actions) => {
        return actions.order.capture(handlePay());
      };
    
      function handlePay() {
        console.log("el pago ha sido exitoso ");
        window.location.href = "http://localhost:5173/";
      }

    return (
      <div className="flex justify-center">
        <div className="App h-50vh w-[50vw] bg-white my-[1rem] rounded-2xl">
          <h1 ><b>Total ${props.total}</b></h1>
          <br />
          <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </div>
      </div>
    );
  }