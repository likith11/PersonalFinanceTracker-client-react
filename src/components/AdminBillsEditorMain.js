import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Map from "./Map";
import PropertyService from "../service/properties.service.client";
import MyContext from "./MyContext";
import mapStyle from '../styling/mapStyle'
import UniversalService from "../service/universal.service.client";
import AdminUserService from "../service/admin.service.client";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import AdminUserListContent from "./AdminUserListContent";
import AdminSideBar from "./AdminSideBar";
import UserNavBar from "./UserNavBar";
import AdminInfoPills from "./AdminInfoPills";
import ProductApplicationContent from "./ProductApplicationContent";
import ProductManagementContent from "./ProductManagementContent";
import AdminBillsContent from "./AdminBillsContent";


class AdminBillsEditorMain extends Component {
    constructor(props){

        super(props);
        this.state = {
                userId: props.match.params.id
        }
    }

    componentDidMount() {
        console.log("Params parent", this.props.match.params.id)

    }


    render(){
        return(
            <MyContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div className="wrapper bg-dark">
                            <AdminSideBar/>
                            <div id="content" className={` ${context.state.sidebarAct  ? 'active' : ''} `}>
                                <UserNavBar
                                    sidebarCollapse={context.sidebarCollapse}/>

                                <div className="container">


                                    <div className="container ">

                                        <h2 className="web-dev-text-center mb-2"> Overview </h2>


                                        <AdminInfoPills/>

                                        <div className="row card mt-4">


                                            <AdminBillsContent
                                                userId={this.state.userId}
                                            />

                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>



                    </React.Fragment>
                )}
            </MyContext.Consumer>
        )
    }

}

AdminBillsEditorMain.contextType = MyContext;
export default AdminBillsEditorMain