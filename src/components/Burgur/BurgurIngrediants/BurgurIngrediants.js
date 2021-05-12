import React from 'react'
import classes from './BurgurIngrediants.module.css'
import PropTypes from 'props-type'

const burgurIngrediants=props=>{
    let ingrediants=null;

    switch(props.type){
        case('bread-bottom'):
        ingrediants= (<div className={classes.BreadBottom}></div>)
        break;
        
        case('bread-top'):
        ingrediants=(<div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
        </div>)
        break;

        case('meat'):
        ingrediants=(<div className={classes.Meat}></div>)
        break;

        case('cheese'):
        ingrediants=<div className={classes.Cheese}></div>
        break;

        case('salad'):
        ingrediants=<div className={classes.Salad}></div>
        break;

        case('bacon'):
        ingrediants=<div className={classes.Bacon}></div>
        break;
        default:
            ingrediants=null
    }

    return ingrediants;
}
// burgurIngrediants.propTypes={
//     type : PropTypes.string.isRequired
// }
export default burgurIngrediants;