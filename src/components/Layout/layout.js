import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import CSSLayout from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends Component {

    constructor(props){
        super(props);
        this.state = {
            showSideDrawer : false
        }
    }

    sideDrawerClosedHandler = () =>{
        this.setState({
            showSideDrawer : false
        })
    }

    sideDrawerToggleHandler = () =>{
        this.setState((prevState)=>{
            return {
                showSideDrawer : !this.state.showSideDrawer
            }
        })
    }

    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={CSSLayout.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default layout;