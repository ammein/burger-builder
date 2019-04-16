import React from 'react';
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';


const burger = (props) => {

    // Transform object/dictionary to an array for .map()
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            // Array() that creates an empty array
            // If you use [...Array(2)] will create two undefined array [undefined , undefined]
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
                // This will just return an index for us to use
                return <BurgerIngredients key={igKey + i} type={igKey}/>
            });
        })
        .reduce((arr , el)=>{
            // arr will be an initialValue
            // el will be an element
            // el -> [{cheese1} , {cheese2}]
            return arr.concat(el);
        } , [] /* This is initialValue **/);

        console.log(transformedIngredients)

    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}
export default burger;