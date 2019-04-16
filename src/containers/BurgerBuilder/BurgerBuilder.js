import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component{

    constructor(props){
        super(props);
        this.state = {
            ingredients : {
                salad : 0,
                bacon : 0,
                cheese : 0,
                meat : 0
            },
            totalPrice : 4,
            purchasable: false,
            purchasing : false
        }
    }

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum , el)=>{
                return sum + el;
            }, 0);

        this.setState({purchasable : sum > 0});
    }


    // type -> "salad" , "meat" & etc ...
    addIngredientHandler(type){
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice , ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler(type){
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0){
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
            this.updatePurchaseState(updatedIngredients);
        }else{
            return;
        }
    }

    // Must use .bind(this) to use this.setState
    // Because the method here is using Class-Based JS
    purchaseHandler(){
        this.setState({
            purchasing : true
        })
    }

    // This will not require .bind(this) because its ES6 method function => {}
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinue = () =>{
        alert("You Continue !");
    }

    render(){
        // Make Disable Button (Immutable JS)
        const disabledInfo = {
            ...this.state.ingredients
        };

        // Will return true or false for the copied object. Not our state object
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        // {salad : true , meat : false , ...}

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinue}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                {/* Must .bind(this) for this.state to work on component */}
                <BuildControls
                    ingredientAdded={this.addIngredientHandler.bind(this)}
                    ingredientRemoved={this.removeIngredientHandler.bind(this)}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler.bind(this)}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;