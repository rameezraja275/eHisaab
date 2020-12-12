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
      store_name: body.store_name,
      category_id: body.category_id
    };

    dispatch({
      payload: {
        status: true,
        type: "add",
      },
      type: ACTION.LOADING,
    });

    axios
      .post(`${API.BASE_URL}${API.BUSINESS_MODIFY_URL}`, data, { headers })
      .then(async (res) => {
        console.log(res)
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
        console.log(err)

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

// export function getBusinessCategories() {
//   return dispatch => {
//     const headers = {
//       "Content-Type": "application/json"
//     };

//     const token = store.user.token;

//     axios
//       .get(`${API.BASE_URL}${API.BUSINESS_GET_CATEGORIES}?token=${token}`, { headers })
//       .then(res => {
//         dispatch({
//           payload: res.data,
//           type: ACTION.BUSINESS_GET_CATEGORIES
//         })
//       })
//       .catch(err => {
//         if (err.response) {
//           ShowFlash(err.response.data.message, "danger");
//         } else {
//           ShowFlash("Uh Oh, Something Went Wrong", "danger");
//         }
//         dispatch({
//           payload: {
//             status: false,
//             type: "add"
//           },
//           type: ACTION.LOADING
//         })
//       });
//   };
// }
