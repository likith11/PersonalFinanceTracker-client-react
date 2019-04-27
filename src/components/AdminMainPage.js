import React, {Component} from 'react'
import MyContext from './MyContext'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideBarUser from "./SideBarUser";
import UserNavBar from "./UserNavBar";
import UserOptionTabsNav from "./UserOptionTabsNav";
import UserOverViewTabContent from "./UserOverViewTabContent";
import CreditCardModal from "./CreditCardModal";
import AdminSideBar from "./AdminSideBar";
import AdminOverView from "./AdminOverView";
import '../styling/admin.style.client.css'
import AdminInfoPills from "./AdminInfoPills";
import AdminUserListContent from "./AdminUserListContent";

class AdminMainPage extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render() {
        return(

            <div>

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


                                                <AdminOverView/>

                                            </div>



                                        </div>
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
export default AdminMainPage