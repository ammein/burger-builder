import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
    return(
        <div className={classes.Logo} style={[{
            height: props.height
        }, props.AddStyle].reduce((sum, el) => {
            return Object.assign(sum, el)
        }, {})}>
            <img src={burgerLogo} alt="Logo"/>
        </div>
    );
}
export default logo;