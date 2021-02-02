import React from 'react'
import './Addmemorial.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {mapclick} from '../../../../_actions/dial_actions';
import { useDispatch,useSelector } from "react-redux";
function Addmemorial({a}) {
    const dispatch = useDispatch();
    const user = useSelector(state=> state.map)
    
    function handleClose(){
      /*  this.setState({
            file:null,
            category:'',
            title:'',
            text:'',
            wedo:'',
            kungdo:'',
            fileName:'',
            fruit:'',
            opencontrol:false
        })
*/ dispatch(mapclick(false));
        
    }
        return (
            <Dialog open={user.isShow} onClose={handleClose}>
            <DialogTitle>기록추가</DialogTitle>
            {a}
            <DialogContent>
            <TextField label="title" type="text" name="title" /><br/>
            <TextField label="text" type="text" name="text" /><br/>
            <TextField label="위도" type="text" name="wedo" /><br/>
            <TextField label="경도" type="text" name="kungdo" /><br/>
            </DialogContent>
            <DialogActions>
                <Button variant ="contained" color ="primary" > 추가 </Button>
                <Button variant ="outlined" color ="primary" onClick={handleClose}> 닫기 </Button>
                </DialogActions>
             </Dialog> 
    )
}

export default Addmemorial



