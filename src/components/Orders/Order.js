
import './Order.css'

const Order=props=>{

    // let TransformedIngrediants= Object.keys(props.ingrediants)
    // .map(igKey=> <span style={{textTransform:'capitalize'}}>{igKey} ({props.ingrediants[igKey]})</span>)
    
   
    let TransformedIngrediants=[]
    for(let key in props.ingrediants){
        TransformedIngrediants.push({name: key , amount: props.ingrediants[key]})
    }
    let ingrediantsOutput= TransformedIngrediants.map(ig=>
        { return (<span style={{textTransform:'capitalize', display:'inline-block', margin:'0 8px', border:'1px solid'}}>
                    {ig.name}({ig.amount})
                    </span>)})
    return(
        <div className='Order'>
            <p>ingrediants: {ingrediantsOutput}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    )
}
export default Order