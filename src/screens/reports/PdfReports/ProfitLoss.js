import React, { useEffect, useState } from "react";
import { BackHandler } from "react-native";
import PDF from "../../../Components/PDF"
import { connect } from "react-redux";
import { FormatPrice, FormatDate } from "../../../utils/helper";
import { resetCart } from "../../../store/actions/sale";
import constants from "../../../utils/constants";
import Loader from "../../../Components/Loader";

const Bill = (props) => {

    const { profitNlossStatement, bussiness, navigation } = props
    const { date } = navigation.state.params
    const {
        sale,
        costing,
        expense,
        gross_profit,
        net_profit,
        expense_sale_discount,
        receipt
    } = profitNlossStatement

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
            <div><h4 class="title"> Profit Loss Statement </h4>
            <strong>${ date}</strong></div> </div> 
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
                    </div>
                    <hr class="mb-25"/>
                    <table class="mb-20 "> 
                        <tr> 
                            <th>Description</th> 
                            <th>Amount</th> 
                        </tr>

                        <tr> 
                            <th>Sale</th> 
                            <th> ${FormatPrice(sale)}</th> 
                              
                        </tr>

                        <tr> 
                            <th>Cost of Goods</th> 
                            <th>${FormatPrice(costing)}</th> 
                              
                        </tr>

                        <tr> 
                            <th>Gross Profit</th> 
                            <th>${ gross_profit < 0 ? "(" : ""} ${FormatPrice(gross_profit)}   ${gross_profit < 0 ? ")" : ""}</th> 
                              
                        </tr>

                        <tr> 
                            <th>Expenses</th> 
                             
                            <th>  ${FormatPrice(expense)} </th>  
                        </tr>

                        <tr> 
                            <th>Sale Discount</th> 
                             
                            <th>${FormatPrice(expense_sale_discount)}</th>  
                        </tr>
                   
                        <tr> 
                            <th>Receipt</th> 
                            <th>${ FormatPrice( receipt ) } </th>  
                        </tr>

                        <tr> 
                            <th>Net Profit</th> 
                            <th>${ net_profit < 0 ? "(" : ""} ${FormatPrice(net_profit)}   ${net_profit < 0 ? ")" : ""} </th>  
                        </tr>

                </table>
                
        
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
    const { reports, bussiness, common } = props;
    return {
        profitNlossStatement: reports.profitNlossStatement,
        bussiness: bussiness.bussiness,
        loading: common.loading,
    };
};

export default connect(mapStateToProps, { resetCart })(Bill);
