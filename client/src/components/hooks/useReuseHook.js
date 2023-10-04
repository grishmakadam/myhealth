import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const useReuseHook = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orders = useSelector(state => state.orders)
    const cart = useSelector(state => state.cart)
    const snackbar = useSelector(state => state.snackbar)
    const user=useSelector(state=>state.user)
  return  {dispatch,navigate,orders,cart,snackbar,user}
}

export default useReuseHook