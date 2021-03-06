import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import '../styling/modals.style.client.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


function TabContainer(props) {
        return (
            <Typography component="div" style={{ padding: 8 * 3 }}>
                    {props.children}
            </Typography>
        );
}

TabContainer.propTypes = {
        children: PropTypes.node.isRequired,
};

const styles = theme => ({
        root: {
                flexGrow: 1,
                width: '100%',
                backgroundColor: theme.palette.background.paper,
        },
});

class BillsContent extends React.Component {

        state = {
                value: 0,
        };

        handleChange = (event, value) => {
                this.setState({ value });
        };

        render() {
                const { classes } = this.props;
                const { value } = this.state;

                return (

<div className="container">

        <div className={classes.root}>
                <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            textColor="primary"
                            scrollButtons="auto"
                            indicatorColor="primary"
                            centered

                        >

                                <Tab value={0} label="Unpaid Bills" onClick={()=>this.props.getUnpaidBills()} />
                                <Tab value={1}  label="Paid Bills" onClick={()=>this.props.getPaidBills()} />


                        </Tabs>
                </AppBar>
                {value === 0 &&


                        <div  onClick={()=> {this.props.getUnpaidBills();this.setState({ value: 0 });}}>
                <TabContainer >
                        <div className="card-columns" >
                        {
                                this.props.unpaidBills!==undefined ? <div>
                                {

                                        this.props.unpaidBills.map((bill, index) =>

                                            <div className="card text-center" key={index}>
                                                    <div className="card-body">
                                                            <h5 className="card-title">Bill Type: {bill.billType}</h5>
                                                            <p className="card-text">Bill Name: {bill.billName}</p>
                                                            <p className="card-text">Bill Due: {bill.bill_due_date.length>11 ? bill.bill_due_date.slice(0,10): bill.bill_due_date}</p>
                                                            <p className="card-text">Bill Amount: <b>{bill.bill_amount}</b></p>
                                                            <button className="btn bg-dark card-footer"
                                                                    onClick={() => this.props.payBill(bill)}>
                                                                    <b className=" web-dev-white-text">Mark as paid</b>
                                                            </button>
                                                    </div>
                                            </div>
                                        )
                                }</div>:<div></div>

                        }
                        </div>
                </TabContainer>
                        </div>}
                {value === 1 &&
                    <div onClick={()=> {this.props.getPaidBills();this.setState({ value: 1 });}}>
                <TabContainer><div className="card-columns" >
                        {

                                this.props.unpaidBills!==undefined ? <div>
                                        {
                                this.props.paidBills.map((bill,index)  =>

                                    <div className="card text-center" key={index}>
                                            <div className="card-body">
                                                    <h5 className="card-title">Bill Type: {bill.billType}</h5>
                                                    <p className="card-text">Bill Name: {bill.billName}</p>
                                                    <p className="card-text">Bill Amount: <b>{bill.bill_amount}</b></p>
                                            </div>
                                    </div>
                                )
                                        }</div>:<div></div>

                        }
                </div></TabContainer>
                    </div>}


        </div>


</div>
                );
        }
}

BillsContent.propTypes = {
        classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(BillsContent);
