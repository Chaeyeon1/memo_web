import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'
import {useNavigate} from 'react-router-dom'

export default function Auth(SpecificComponent, option, adminRoute = null){

    //null => 모두, true => 로그인한 유저만, false => 로그인한 유저제외

    function AuthenticationCheck(){
        const dispatch = useDispatch()
        const navigate = useNavigate()

        useEffect(() => {
        
            dispatch(auth()).then(response => {
                //console.log(response)

                //로그인하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/')
                    }
                } 
                else {
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate('/main')
                    } 
                    else {
                        if(option === false) {
                            navigate('/main')
                        }
                    }
                }
            })
            
        }, [dispatch,navigate])

        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}