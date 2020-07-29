import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  persistReducer,
  persistStore,
  persistCombineReducers,
} from "redux-persist";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import customerReducer from "./reducers/customerReducer";
import commonReducer from "./reducers/commonReducer";
import supplierReducer from "./reducers/supplierReducer";
import expenseReducer from "./reducers/expenseReducer";
import purchaseReducer from "./reducers/purchaseReducer";
import saleReducer from "./reducers/saleReducer";
import bussinessReducer from "./reducers/businessReducer";
import paymentReducer from "./reducers/paymentReducer";
import receiptReducer from "./reducers/receiptReducer";
import employeeReducer from "./reducers/employeeReducer";
import reportsReducer from "./reducers/reportsReducer";
import { AsyncStorage } from "react-native";
import createSecureStorage from "../utils/secureStorage";

const configureStore = () => {
  const secureStorage = createSecureStorage();

  const securePersistConfig = {
    key: "secure",
    storage: secureStorage,
  };

  const mainPersistConfig = {
    key: "main",
    storage: AsyncStorage,
  };

  const rootReducer = combineReducers({
    user: persistReducer(securePersistConfig, userReducer),
    product: productReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    common: commonReducer,
    expense: expenseReducer,
    purchase: purchaseReducer,
    sale: saleReducer,
    bussiness: persistReducer(mainPersistConfig, bussinessReducer),
    payment: paymentReducer,
    receipt: receiptReducer,
    employee: employeeReducer,
    reports: reportsReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(thunk));

  const persistedStore = persistStore(store);

  return { persistedStore, store };
};

export default configureStore;
