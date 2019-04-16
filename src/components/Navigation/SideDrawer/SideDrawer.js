import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer , classes.Open];
    }

    return(
        <Aux>
            <Backdrop 
                show={props.open} 
                clicked={props.closed}/>
            <div className={attachedClasses.join(" ")}>
                <Logo height="11%" AddStyle={{
                    marginTop : "32px"
                }}/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}
export default sideDrawer;