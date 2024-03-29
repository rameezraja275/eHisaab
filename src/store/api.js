const API = {
  // BASE_URL: "https://ehisaab.pine-technologies.com/api/",
  // BASE_URL: "https://www.pine-technologies.com/ehisaab/v1/api/",
  // BASE_URL: "https://www.pine-technologies.com/ehisaab/v3/api/",

  // BASE_URL: "https://192.168.43.252/bizsolAPI/api/",
  // IMAGE_URL: "https://192.168.43.252/bizsolAPI/",
  // STORE_BASE_URL: "https://stores.ehisaab.com/",

  BASE_URL: 'https://ehisaab.app/ehisaab/api/',
  IMAGE_URL: 'https://ehisaab.app/ehisaab/',
  STORE_BASE_URL: 'https://ehisaab.app/store/',

  SIGNUP_URL: 'user/signup.php',
  LOGIN_URL: 'user/login.php',
  VALIDATE_TOKEN: 'user/token.php',
  CHANGE_PASSWORD: 'user/change_password.php',
  FORGET_PASSWORD: 'user/forgot_password.php',
  CHANGE_PASSWORD_VIA_CODE: 'user/change_password_via_code.php',

  PRODUCT_GET_URL: 'product/get.php',
  PRODUCT_CREATE_URL: 'product/create.php',
  PRODUCT_MODIFY_URL: 'product/modify.php',
  PRODUCT_DELETE_URL: 'product/delete.php',
  PRODUCT_STOCK_GET_URL: 'stock/get.php',

  CUSTOMER_CREATE_URL: 'customer/create.php',
  CUSTOMER_MODIFY_URL: 'customer/modify.php',
  CUSTOMER_DELETE_URL: 'customer/delete.php',
  CUSTOMER_GET_URL: 'customer/get.php',
  CUSTOMER_GET_LEDGER_URL: 'customer/get_ledger.php',

  SUPPLIER_CREATE_URL: 'supplier/create.php',
  SUPPLIER_MODIFY_URL: 'supplier/modify.php',
  SUPPLIER_DELETE_URL: 'supplier/delete.php',
  SUPPLIER_GET_URL: 'supplier/get.php',
  SUPPLIER_GET_LEDGER_URL: 'supplier/get_ledger.php',

  EXPENSE_CREATE_URL: 'expense/create.php',
  EXPENSE_MODIFY_URL: 'expense/modify.php',
  EXPENSE_DELETE_URL: 'expense/delete.php',
  EXPENSE_GET_CATEGORIES_URL: 'expense/get.php',

  EXPENSE_GET_TRANSACTION: 'expense/get_transaction.php',
  EXPENSE_CREATE_TRANSACTION: 'expense/create_transaction.php',
  EXPENSE_MODIFY_TRANSACTION: 'expense/modify_transaction.php',
  EXPENSE_DELETE_TRANSACTION: 'expense/delete_transaction.php',

  PURCHASE_CREATE_URL: 'purchase/create.php',
  PURCHASE_MODIFY_URL: 'purchase/modify.php',
  PURCHASE_DELETE_URL: 'purchase/delete.php',
  PURCHASE_GET_URL: 'purchase/get.php',

  SALE_CREATE_URL: 'sale/create.php',
  SALE_MODIFY_URL: 'sale/modify.php',
  SALE_DELETE_URL: 'sale/delete.php',
  SALE_GET_URL: 'sale/get.php',

  PAYMENT_GET_URL: 'supplier/get_payment.php',
  PAYMENT_CREATE_URL: 'supplier/create_payment.php',
  PAYMENT_MODIFY_URL: 'supplier/modify_payment.php',
  PAYMENT_DELETE_URL: 'supplier/delete_payment.php',

  RECEIPT_GET_URL: 'customer/get_receipt.php',
  RECEIPT_CREATE_URL: 'customer/create_receipt.php',
  RECEIPT_MODIFY_URL: 'customer/modify_receipt.php',
  RECEIPT_DELETE_URL: 'customer/delete_receipt.php',

  EMPLOYEE_CREATE_URL: 'employee/create.php',
  EMPLOYEE_MODIFY_URL: 'employee/modify.php',
  EMPLOYEE_DELETE_URL: 'employee/delete.php',
  EMPLOYEE_GET_URL: 'employee/get.php',

  EMPLOYEE_GET_LEDGER_URL: 'employee/get_ledger.php',
  EMPLOYEE_CREATE_LEDGER_URL: 'employee/create_ledger.php',
  EMPLOYEE_MODIFY_LEDGER_URL: 'employee/modify_ledger.php',
  EMPLOYEE_DELETE_LEDGER_URL: 'employee/delete_ledger.php',

  BUSINESS_MODIFY_URL: 'business/modify.php',
  BUSINESS_GET_CATEGORIES: 'business/get_category.php',

  EMPLOYEE_SALARIES_PROCESS: 'employee/salary_process.php',
  VERIFY_USER: 'user/verify.php',
  RESEND_CODE: 'user/resend_code.php',

  LOGOUT: 'user/logout.php',

  ADD_USERS: 'user/salesman_create.php',
  GET_USERS: 'user/salesman_get.php',
  MODIFY_USERS: 'user/salesman_modify.php',

  GET_OWNER: 'user/profile_get.php',
  MODIFY_OWNER: 'user/profile_modify.php',

  SALE_REPORT: 'report/sale_summary.php',
  PURCHASE_REPORT: 'report/purchase_summary.php',
  PURCHASE_DETAILS: 'report/purchase_detail.php',
  SALE_DETAILS: 'report/sale_detail.php',
  EXPENSE_REPORT: 'report/expense_summary.php',
  EMPLOYEE_REPORT: 'report/employee_ledger_summary.php',
  PROFIT_LOSS: 'report/profit_loss.php',
  DAYBOOK: 'report/daybook.php',
  CASHBOOK: 'report/cashbook.php',

  GET_NONINVENTORYITEMS: 'product/get_noninventory_product.php',

  ADD_CUSTOMER_LOAN: 'customer/create_loan.php',
  CUSTOMER_LOAN_MODIFY_URL: 'customer/modify_loan.php',
  LOAN_DELETE_URL: 'customer/delete_loan.php',

  ADD_BANK: 'bank/create.php',
  UPDATE_BANK: 'bank/modify.php',
  GET_BANK: 'bank/get.php',
  DELETE_BANK: 'bank/delete.php',

  ADD_BANK_TRANSACTION: 'bank/create_transaction.php',
  UPDATE_BANK_TRANSACTION: 'bank/modify_transaction.php',
  GET_BANK_TRANSACTION: 'bank/get_transaction.php',
  DELETE_BANK_TRANSACTION: 'bank/delete_transaction.php',

  STORE_PRODUCT_GET_URL: 'store/get_products.php',
  STORE_ADD_PRODUCTS: 'store/add_products.php',

  ORDER_GET: 'order/get.php',
  ORDER_DETAILS_GET: 'order/getDetails.php',
  ORDER_MODIFY_URL: 'order/modify.php',

  TOP_PRODUCTS: 'statistics/top_products.php',
  TOTAL_BANK_BALANCE: 'statistics/total_bank_balance.php',
  TOTAL_PAYABLE: 'statistics/total_payable_amount.php',
  TOTAL_RECEIVEABLE: 'statistics/total_receiveable_amount.php',

  GET_UNREAD_ORDER_COUNT: "order/get_unread_orders.php"
};

export default API;
