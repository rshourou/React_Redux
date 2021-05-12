import React, {Component} from 'react'
import Auxiliary from '../Auxiliary'
import Modal from '../../components/UI/Modal/Modal'


const WithErrorHandler=(Wrappedcomponent, axios)=> {
    return ( 
        class extends Component{
        state={ error:null}
        componentWillMount( ){
            this.requestInterseptor=axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req
            });
            
            this.responseInterseptor=axios.interceptors.response.use(response=>response, error=> {
                this.setState({error:error})
                    return error.message
                })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterseptor)
            axios.interceptors.response.eject(this.responseInterseptor)
        }
        render(){    
            return(
                <Auxiliary>
                    <Modal show={this.state.error} hide={()=> this.setState({error:null})}>
                    {this.state.error?this.state.error.message:null}
                    </Modal>
                    <Wrappedcomponent {...this.props}/>
                </Auxiliary>
            )
    }   
    })
}

export default WithErrorHandler