import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import PDF from "../../Components/PDF";
import { connect } from "react-redux";
import { FormatPrice, FormatDate } from "../../utils/helper";
import { resetCart } from "../../store/actions/sale";
import constants from "../../utils/constants";
import Loader from "../../Components/Loader";

const Bill = (props) => {
  const { saleDetails, bussiness, customers, navigation, language } = props;
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
  }, [saleData, customers]);

  // <span> ${FormatPrice(previousBalance)} </span>

  const duplicate = props.navigation.state.params.duplicate;

  const totalAmount = cartStatus.totalPrice - discount;
  const remainingAmount = saleData.paid_amount - totalAmount;
  let currentBalance = customer && customer.current_balance;
  const previousBalance = saleData.previousBalance && saleData.previousBalance;

  const resetCartnNaviagte = () => {
    // const page = saleData.sale_id ? "ListTransactions" : "List"
    navigation.navigate("List");
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

  const BillHTML = `<html lang="en"> <head> <meta charset="UTF-8">
    <style> body { font-family: "Noto Sans", sans-serif; font-size: 10px; display: flex; justify-content: center; }
        .page {  width: 100%; height: 24.0cm; }
        .flex-sb{ display: flex; justify-content: space-between; } .title{ font-size: 15px; margin: 0; align-self: center; }
        .mb-20{ margin-bottom: 20px; } .mb-25{ margin-bottom: 25px; } .comapnyname{ font-size: 15px; } p{ margin: 0px } table{ width: 100%; }
        table, th, td { border: 1px solid black; border-collapse: collapse; } th, td { font-size: 10px; padding: 5px; text-align: left; } 
        .flex-fe{ display: flex; justify-content: space-between; }
        .flex{ display: flex; } span{ font-size: 10px; } .flex{ display: flex} .flex1{ flex: 1 } .width40{ width: 40%} .mb-5{ margin-bottom: 5px; }
        .footer{ position: relative; bottom: 0;left: 0;ri ght: 0; display:flex; justify-content: space-between; }
        </style> </head> <body>
             <div class="page"> 
            <div class="flex-sb header mb-20"> 
            ${
    bussiness.logo
      ? `<img src="data:image/png;base64,${bussiness.logo}" width=100 height=100 />`
      : `<div></div>`
    } 
            <div><h4 class="title"> Sale Invoice </h4>
            <strong>Invoice # ${saleData.invoice_id} </strong></div> </div> 
            <hr class="mb-20"/>
            <div class="flex-sb mb-20"> <div>
                    <p class="comapnyname"> ${
    bussiness.name ? bussiness.name : ""
    } </p> <p> Address: ${
    bussiness.address ? bussiness.address : ""
    } </p>
                    <p> Phone: ${
    bussiness.phone ? bussiness.phone : ""
    } </p></div> 
                    <div> <p> Date: ${saleData.date.toDateString()} </p> <p> Customer: ${
    customer ? customer.customer_name : ""
    }  </p>
                    <p> Address: ${
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
                <p> This is Computer Generated Invoice No Signature Required. </p>
                </div>
                <div class="width40"> 
                    <div class="flex mb-5">
                        <span class="flex1"> Amount : </span> 
                        <span> ${FormatPrice(cartStatus.totalPrice)} </span> 
                    </div>
                   
                    <div class="flex mb-5">
                        <span class="flex1"> Discount :  </span> 
                        <span> ${
    discount ? FormatPrice(discount) : "0 Rs"
    } </span> 
                    </div> 
                    <div class="flex mb-5">
                        <span class="flex1"> Total Amount :  </span>
                        <span> ${FormatPrice(totalAmount)} </span> 
                    </div>
                    <div class="flex mb-5">
                        <span class="flex1"> Received Amount :  </span>
                        <span> ${FormatPrice(saleData.paid_amount)} </span> 
                    </div>

                    <div class="flex mb-5">
                        <span class="flex1"> Remaining Amount :  </span>

                        <span> ${
    remainingAmount < 0 ? "(" : ""
    }  ${FormatPrice(remainingAmount)} ${
    remainingAmount < 0 ? ")" : ""
    } </span>
                    </div>
                    ${
    !duplicate
      ? `<div class="flex mb-5">
                        <span class="flex1"> Previous Balance :  </span>
                        <span> <strong> ${
      previousBalance > 0 ? "(" : ""
      }  ${FormatPrice(previousBalance)} ${
      previousBalance > 0 ? ")" : ""
      }</strong>  </span>
                    </div>`
      : ""
    }

                    <hr />
                    <div class="flex mb-5">
                        <span class="flex1"> <strong>Current Balance : </strong>  </span>
                        <span> <strong> ${
    currentBalance > 0 ? "(" : ""
    }  ${FormatPrice(currentBalance)} ${
    currentBalance > 0 ? ")" : ""
    }</strong>  </span>
                    </div>
                </div>    
            </div>
            <hr class="mb-20"/>
            <div class="footer"> 
                <p> Powered By ${constants.APP_NAME} </p>
                <p> ${constants.EHISAAB_URL} </p>
                <p> Product By ${constants.POWERED_BY} </p>
            </div>
        </div>
    </body></html>`;

  return (<React.Fragment>{props.loading.status ?
    <Loader size={10} /> :
    <PDF html={BillHTML} />}
  </React.Fragment>);
};

const mapStateToProps = (props) => {
  const { sale, customer, bussiness, common } = props;
  return {
    saleDetails: sale,
    bussiness: bussiness.bussiness,
    customers: customer.customers,
    language: common.language,
    loading: common.loading
  };
};

export default connect(mapStateToProps, { resetCart })(Bill);
