import classes from './Burgur.module.css'
import BurgurIngrediants from './BurgurIngrediants/BurgurIngrediants'
const burgur= props=>{

    let TransformedIngrediants= Object.keys(props.ingrediants)
    .map(igKey=>{
         return  [...Array(props.ingrediants[igKey])]
            .map((length,i)=>{
                return <BurgurIngrediants key={igKey + i} type={igKey} />        
            })
        })
    TransformedIngrediants=TransformedIngrediants.reduce((prevArr,currArr)=>{
        return prevArr.concat(currArr)
    },[])
    if(TransformedIngrediants.length===0){
        TransformedIngrediants= <p>Please start adding ingrediants</p>
    }
    console.log(TransformedIngrediants)
    return(
    <div className={classes.Burgur}>
        <BurgurIngrediants type="bread-top" />
        {TransformedIngrediants}
        <BurgurIngrediants type="bread-bottom" />
    </div>)

}
export default burgur