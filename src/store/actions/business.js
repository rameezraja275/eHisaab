import axios from "axios";
import ACTION from "../types";
import { AsyncStorage } from "react-native";
import API from "../api";
import { ShowFlash } from "../../utils/helper";
import { navigate } from "../../utils/navigationRef";

export function businessModify(body) {
  return async (dispatch, getState) => {
    const headers = {
      "Content-Type": "application/json",
    };


    const store = getState();
    const token = store.user.token;
    const language = store.common.language;

    const data = {
      token,
      name: body.name,
      phone: body.phone,
      address: body.address,
      logo: body.logo,
      id: body.id,
      opening_cash: body.opening_cash,
      narration: body.narration,
      storeName: body.storeName
    };

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    console.log(`${API.BASE_URL}${API.BUSINESS_MODIFY_URL}`)

    axios
      .post(`${API.BASE_URL}${API.BUSINESS_MODIFY_URL}`, data, { headers })
      .then(async (res) => {
        // await AsyncStorage.setItem('bussiness', JSON.stringify(data))
        // const business = JSON.parse( await AsyncStorage.getItem('bussiness') )

        const business = data;

        business &&
          dispatch({
            type: ACTION.BUSINESS_GET_SUCCESS,
            payload: business,
          });

        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });

        ShowFlash("UPDATE_SUCCESS", "success", language);
        setTimeout(() => navigate("Business"), 2000);
      })
      .catch((err) => {

        if (err.response) {
          ShowFlash(err.response.data.message, "danger", language);
        } else {
          ShowFlash("SERVER_ERROR", "danger", language);
        }
        dispatch({
          payload: {
            status: false,
            type: "add",
          },
          type: ACTION.LOADING,
        });
      });
  };
}

// export function businessGet(body) {
//   return dispatch => {
//     const headers = {
//       "Content-Type": "application/json"
//     };
//     const {token,businessId} = body;
//     axios
//       .get(`${API.BASE_URL}${API.BUSINESS_GET_URL}?token=${token}&business_id=${businessId}`, { headers })
//       .then(res => {
//           dispatch({
//               payload: res.data,
//               type: ACTION.BUSINESS_GET_SUCCESS
//           })
//       })
//       .catch(err => {
//         if(err.response){
//           ShowFlash( err.response.data.message ,"danger");
//           }else{
//           ShowFlash( "Uh Oh, Something Went Wrong" ,"danger");
//          }
//          dispatch({
//           payload: {
//             status: false,
//             type: "add"
//           },
//           type: ACTION.LOADING
//         })
//       });
//   };
// }
