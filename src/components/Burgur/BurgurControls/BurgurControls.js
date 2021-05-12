import classes from './BurgurControls.module.css'
import BuildControl from './BuildControl/BuildControl' 

const Controls=[
    {label:"Bacon", type:'bacon'},
    {label:"Cheese", type:'cheese'},
    {label:"Meat", type:'meat'},
    {label:"Salad", type:'salad'},
    
];

const burgurControls=props=>{
    // let ctrls= Object.keys(props.ingrediants).map(igKey=>{
    //     return <BuildControl label={igKey} />
    // })
    return(
        <div className={classes.BuildControl}>
            {Object.keys(props.ingrediants).map(ctrl=> <BuildControl 
            key={ctrl} 
            label={ctrl} 
            price={props.igPrice[ctrl]}
            added={()=>props.addItemHandler(ctrl)} 
            reduced={()=>props.reduceItemHandler(ctrl)}
            disabled={props.disabledArray[ctrl]}/>)}
            <p style={({textAlign: 'center', fontStyle: 'oblique'})}>Current Price:${props.totalPrice}</p>
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.orderNow}>{props.isAuth? 'Order Now' : 'Sign up to Order'}</button>
        </div>
    )

}

export default burgurControls