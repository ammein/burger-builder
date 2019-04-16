import React from 'react';
import Aux from '../../hoc/Auxiliary';
import CSSLayout from './Layout.css';

const layout = (props) => {
    return (
        <Aux>
            <div>Toolbar , Side , Backdrop</div>
            <main className={CSSLayout.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default layout;