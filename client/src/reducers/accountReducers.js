import {
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  GET_ACCOUNTS,
  ACCOUNTS_LOADING,
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING
} from "../actions/types";
//set inititial state
const inititialState = {
  accounts: [],
  transactions: [],
  accountsLoading: false,
  transactionsLoading: false
}

