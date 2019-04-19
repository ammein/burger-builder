import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
            ingredients : null,
            totalPrice : 4,
            purchasable: false,
            purchasing : false,
            loading : false,
            error : false
        }
    }

    componentDidMount(){
        axios.get("/ingredients.json")
            .then((res)=>{
                this.setState({ingredients : res.data})
            })
            .catch((err)=>{
                this.setState({error : true})
                console.log(err);
            })
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
        this.setState({loading : true})
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : "Amin",
                address : {
                    street : "Teststreet 1",
                    zipCode : "123456",
                    country : "Malaysia"
                },
                email : "test@test.com"
            },
            deliveryMethod : "fastest"
        }
        axios.post('/orders.json',order)
            .then(res => {
                // set `loading` & `purchasing` to false
                this.setState({
                    loading : false,
                    purchasing : false
                })
            })
            .catch(err => {
                // set `loading` & `purchasing` to false
                this.setState({
                    loading: false,
                    purchasing : false
                })
            })
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

        // Set OrderSummary to use the spinner
        let orderSummary = null;

        // Set burger to spinner
        let burger = (this.state.error) ? <p>Ingredients Cannot Be Loaded</p> : <Spinner />

        // If ingredients available
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    {/* Must .bind(this) for this.state to work on component */}
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler.bind(this)}
                        ingredientRemoved={this.removeIngredientHandler.bind(this)}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler.bind(this)} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinue}
                price={this.state.totalPrice} />;
        }

        // Below burger because this spinner will be function after real
        // order summary appears
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder , axios);