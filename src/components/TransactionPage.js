import React, {Component} from 'react';
import MyContext from "./MyContext";
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import TransactionTabContent from "./TransactionTabContent";
import TransactionClientServiceClient from '../service/transaction.service.client'
import Register from "./Register";
import AdminUserService from "../service/admin.service.client";
import {withRouter} from "react-router";

class TransactionPage  extends Component{

    constructor(props) {
        super(props);
        this.transactionService = new TransactionClientServiceClient();
        this.adminService = new AdminUserService();
        this.state ={
            selectedSort: 'ALL',
            updateFlag: false,
            addFlag: false,
            category: undefined,
            payment_type: undefined,
            date_of_transaction: undefined,
            payment_source: undefined,
            amount: undefined,
            updateId: undefined,
            transactions: []
        }
    }

    componentDidMount() {
        this.adminService.findCurrentLoggedInUser()
            .then(user => {
                if (user === undefined) {
                    this.props.history.push('/login')
                }
            });

            this.transactionService.findAllTransactions()
                .then(transactions => {console.log("Transactions did mount", transactions);
                this.setState({
                    transactions: transactions
                })


                this.context.setTransactions(transactions)})
    }

    addTransaction = ()=>
        this.transactionService.createTransaction(this.state)
            .then(transaction => {console.log(transaction);
                let newTransactions = this.state.transactions;
                newTransactions.push(transaction);
            this.setState({
                transactions: newTransactions
            })

            //this.context.pushTransaction(transaction);
            });

    deleteTransaction =(transactionId) =>
        this.transactionService.deleteTransaction(transactionId)
            .then(response =>{
                let stateTransactions = this.state.transactions;
                let delTransactions = stateTransactions.filter(transaction => transaction._id !== transactionId)

                this.setState({
                    transactions: delTransactions
                })


                //this.context.deleteTransaction(transactionId)
                });

    updateTransaction = () => {
        let updatetransaction = {
            _id: this.state.updateId,
            category: this.state.category,
            amount: this.state.amount,
            date_of_transaction: this.state.date_of_transaction,
            payment_source: this.state.payment_source,
            payment_type: this.state.payment_type

        }

        this.transactionService.updateTransaction(updatetransaction)
            .then(transaction =>{
                let stateTransactions = this.state.transactions;
                let updatedTransactions = stateTransactions.map(transaction =>
                    transaction._id === updatetransaction._id ? updatetransaction : transaction)

                this.setState({
                    transactions: updatedTransactions
                })

               // this.context.updateTransaction(updatetransaction)
            }

                )
    }

    getAllTransactions = () =>
        this.transactionService.findAllTransactions()
            .then(transactions =>{

                this.setState({
                    transactions: transactions
                })

                this.context.setTransactions(transactions)})

    getLastWeekTransaction = () =>
        this.transactionService.findAllTransactionWeek()
            .then(transactions =>{
                this.setState({
                    transactions: transactions
                })
                this.context.setTransactions(transactions)})

    getLastMonthTransaction = () =>
        this.transactionService.findAllTransactionMonth()
            .then(transactions =>{
                this.setState({
                    transactions: transactions
                })

                this.context.setTransactions(transactions)})

    setUpdateId = (transaction)=>
        this.setState({
            updateId: transaction._id,
            category: transaction.category,
            payment_type: transaction.payment_type,
            date_of_transaction: transaction.date_of_transaction,
            payment_source: transaction.payment_source,
            amount: transaction.amount,

        })

    toggleUpdate =() =>
        this.setState({
            updateFlag: !this.state.updateFlag
        })

    toggleAdd =() =>
        this.setState({
            addFlag: !this.state.addFlag
        })

    categoryChanged =(event)=>
        this.setState({
            category: event.target.value
        });
    paymentTypeChanged =(event)=>
        this.setState({
            payment_type: event.target.value
        });
    dateChanged =(event)=>
        this.setState({
            date_of_transaction: event.target.value
        });
    paymentSourceChanged =(event)=>
        this.setState({
            payment_source: event.target.value
        });
    amountChanged =(event)=>
        this.setState({
            amount: event.target.value
        });

    setSelectedBtn = (btn) =>{
        this.setState({
            selectedSort: btn
        })
    }




    render() {

        return(

            <div>
                <MyContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            <div className="wrapper">
                                <SideBarUser/>
                                <div id="content" className={` ${context.state.sidebarAct  ? 'active' : ''} `}>
                                    <UserNavBar
                                        sidebarCollapse={context.sidebarCollapse}/>
                                    <div className="ml-5">
                                        <UserOptionTabsNav/></div>
                                    <div className="container">
                                        <br/><br/> <br/>
                                        <TransactionTabContent
                                            categoryChanged ={this.categoryChanged}
                                            paymentTypeChanged = {this.paymentTypeChanged}
                                            dateChanged ={this.dateChanged}
                                            paymentSourceChanged ={this.paymentSourceChanged}
                                            amountChanged ={this.amountChanged}
                                            toggleUpdate ={this.toggleUpdate}
                                            toggleAdd ={this.toggleAdd}
                                            updateFlag ={this.state.updateFlag}
                                            addFlag = {this.state.addFlag}
                                            addTransaction ={this.addTransaction}
                                            deleteTransaction ={this.deleteTransaction}
                                            updateTransaction ={this.updateTransaction}
                                            setUpdateId ={this.setUpdateId}
                                            updateId = {this.state.updateId}
                                            getLastWeekTransaction = {this.getLastWeekTransaction}
                                            getLastMonthTransaction ={this.getLastMonthTransaction}
                                            getAllTransactions = {this.getAllTransactions}
                                            amount ={this.state.amount}
                                            category = {this.state.category}
                                            payment_type ={this.state.payment_type}
                                            date_of_transaction = {this.state.date_of_transaction}
                                            selectedSort ={this.state.selectedSort}
                                            setSelectedBtn ={this.setSelectedBtn}
                                            transactionsContext = {this.props.context.transactions}
                                            transactions = {this.state.transactions}
                                        />
                                    </div>
                                </div>
                            </div>


                        </React.Fragment>
                    )}
                </MyContext.Consumer>
            </div>
        )
    }


}

TransactionPage.contextType = MyContext;
export default withRouter((props) => (
    <MyContext.Consumer>
        {(context) => <TransactionPage {...props} context={context}/>}
    </MyContext.Consumer>
))


