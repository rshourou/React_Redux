import Auxiliary from '../../../../hoc/Auxiliary'
import Button from '../../Button/Button'

const orderSummary= props =>{
    const ingrediantsSummary= Object.keys(props.ingrediants)
    .map(igKey=> {
        return (
            <li><span style={{textTransform:'capitalize'}}>{igKey} </span> : {props.ingrediants[igKey]} </li>
        )
    })

    return(
        <Auxiliary>
            <ul>
                {ingrediantsSummary}
            </ul>
            <p><strong>Total Price:{ props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkout}>CONTINUE</Button>
        </Auxiliary>
    )
}
export default orderSummary
