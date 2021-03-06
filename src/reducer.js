export const initialState={
    basket:[],
    user:null,
};

const reducer=(state,action)=>{
    
    switch(action.type){
        case 'ADD_TO_BASKET':
            return{
                ...state,
                basket:[...state.basket,action.item]
            };
        case 'REMOVE_FROM_BASKET':
            const index=state.basket.findIndex((item)=>item.id===action.id);
            let newBasket=[...state.basket];
            newBasket.splice(index,1);
            

            return{
                ...state,
                basket:newBasket
            }
        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }
        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[]
            }
        default:
            return state;
    }
};
export default reducer;