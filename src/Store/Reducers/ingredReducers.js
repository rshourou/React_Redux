import * as actionTypes from '../actionTypes'

const initialState={
    ingredients: null,
    totalPrice: 4,
    purchasable: false, 
    error:false,
    building:true}

const reducer=(state=initialState, action)=>{ 
    const INGREDIANT_PRICE={
        cheese : 0.5,
        meat:2,
        salad:1,
        bacon:1
    }
 
    switch(action.type){
        case actionTypes.LOAD_DATA:
            return {...state, totalPrice:4, ingredients: action.ingredients, error:false, building: true}

        case actionTypes.LOAD_DATA_FAILED:
            return {...state, error:true, building: true}
            
        case actionTypes.ADD_INGREDIENTS:         
            return {...state, 
                ingredients: {...state.ingredients, [action.item]: state.ingredients[action.item]+ 1}, 
                totalPrice: state.totalPrice+ INGREDIANT_PRICE[action.item],
                building:false
                }

        case actionTypes.REMOVE_INGREDIENCE:
            return {...state, 
                ingredients: {...state.ingredients,
                    [action.item]: state.ingredients[action.item]- 1}, 
                totalPrice: state.totalPrice- INGREDIANT_PRICE[action.item],
                building: false
                }

        case actionTypes.UPDATE_PURCHASABLE:
            const sum=Object.keys(state.ingredients)
                .map(igKey=>state.ingredients[igKey])
                .reduce((sum,el)=>{return sum+el},0)
                return {...state, purchasable : sum>0}            
        default : return state              
    }
    
}
export default reducer