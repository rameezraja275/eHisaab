import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import PDF from "../../Components/PDF";
import { connect } from "react-redux";
import { FormatPrice, FormatDate } from "../../utils/helper";
import { resetCart } from "../../store/actions/sale";

import constants from "../../utils/constants";

const Quotation = (props) => {
  const { saleDetails, bussiness, customers, navigation } = props;
  const { saleCart, cartStatus, discount, saleData } = saleDetails;
  const [customer, setCusomer] = useState(null);

  useEffect(() => {
    if (saleData.customer_id) {
      const customer = customers.find(
        (item) => item.id == saleData.customer_id
      );
      setCusomer(customer);
    }
    props.navigation.setParams({
      resetSaleCart: resetCartnNaviagte,
    });
  }, [saleData]);

  const totalAmount = cartStatus.totalPrice - discount;

  const resetCartnNaviagte = () => {
    const page = saleData.sale_id ? "ListTransactions" : "List";
    navigation.navigate(page);
    props.resetCart();
  };

  let htmlTable = "";
  for (let i = 0; i < saleCart.length; i++) {
    const item = saleCart[i];
    htmlTable += `<tr>
        <td width="5%"> ${i + 1} </td>
        <td width="5%"> ${item.qty} </td>
        <td width="40%"> ${item.product_name} </td>
        <td width="20%"> ${FormatPrice(item.product_sale_price)} </td>
        <td width="20%"> ${FormatPrice(
      item.product_sale_price * item.qty
    )} </td></tr>`;
  }

  const QuotationHTML = `<html lang="en"> <head> <meta charset="UTF-8">
    <style> body { font-family: "Noto Sans", sans-serif; font-size: 10px; display: flex; justify-content: center; }
        .page {  width: 100%; height: 24.0cm; }
        .flex-sb{ display: flex; justify-content: space-between; } .title{ font-size: 15px; margin-top: 0; align-self: center; }
        .mb-20{ margin-bottom: 20px; } .mb-25{ margin-bottom: 25px; } .comapnyname{ font-size: 15px; } p{ margin: 0px } table{ width: 100%; }
        table, th, td { border: 1px solid black; border-collapse: collapse; } th, td { font-size: 10px; padding: 5px; text-align: left; } 
        .flex-fe{ display: flex; justify-content: space-between; }
        .flex{ display: flex; } span{ font-size: 10px; } .flex{ display: flex} .flex1{ flex: 1 } .width20{ width: 20%} .mb-5{ margin-bottom: 5px; }
        .footer{ position: relative; bottom: 0;left: 0;ri ght: 0; display:flex; justify-content: space-between; }
        </style> </head> <body>
             <div class="page"> 
            <div class="flex-sb header mb-20"> 
            ${
    bussiness.logo
      ? `<img src="data:image/png;base64,${bussiness.logo}" width=100 height=100 />`
      : `<div></div>`
    } 
    } <h4 class="title"> Quotation </h4> </div> 
            <hr class="mb-20"/>
            <div class="flex-sb mb-20"> <div>
                    <p class="comapnyname"> ${
    bussiness.name ? bussiness.name : ""
    } </p> <p> Adress: ${
    bussiness.address ? bussiness.address : ""
    } </p>
                    <p> Phone: ${
    bussiness.phone ? bussiness.phone : ""
    } </p></div> 
                    <div> <p> Date: ${saleData.date.toDateString()} </p> <p> Customer: ${
    customer ? customer.customer_name : ""
    }  </p>
                    <p> Adress: ${
    customer ? customer.customer_address : ""
    }  </p>
                    <p> Phone: ${
    customer ? customer.customer_phone : ""
    } </p> </div> </div>
                    <hr class="mb-25"/>
                    <table class="mb-20 "> <tr> <th>S#</th> <th>Qty</th> <th>Description</th> <th>Unit Price</th> <th>Total</th> </tr>
                    ${htmlTable}
                </table>
            <div class="flex-fe mb-20"> 
                <div style="display: flex; align-items: center;">
                <p> This is Computer Generated Quotation No Signature Required. </p>
                </div>
                <div class="width20"> 
                    <div class="flex mb-5">
                        <span class="flex1"> Amount : </span> 
                        <span> ${FormatPrice(cartStatus.totalPrice)} </span> 
                    </div>
                </div>    
            </div>
            <hr class="mb-20"/>
            <div class="footer"> 
                <p> Powered By ${constants.APP_NAME} </p>
                <p> ${constants.OFFICE_ADDRESS} </p>
                <p> ${constants.CUSTOMER_CARE_NUMBER} </p>
                <p> Product By ${constants.POWERED_BY} </p>
            </div>
        </div>
    </body></html>`;

  return (
    <PDF
      navigation={navigation}
      html={QuotationHTML}
      resetCartnNaviagte={resetCartnNaviagte}
    />
  );
};

const mapStateToProps = (props) => {
  const { sale, customer, bussiness } = props;
  return {
    saleDetails: sale,
    bussiness: bussiness.bussiness,
    customers: customer.customers,
  };
};

export default connect(mapStateToProps, { resetCart })(Quotation);
