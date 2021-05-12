import classes from './Backdrop.module.css'

const backdrop=props=>{
    return(
    props.show ? <div onClick={props.canceled} className={classes.Backdrop}> </div> :null
    )
}

export default backdrop