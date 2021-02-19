import React, { useEffect, useState } from 'react'
import './Addmemorial.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {mapclick} from '../../../../_actions/dial_actions';
import { useDispatch,useSelector } from "react-redux";
import axios from 'axios';



const CategoryOption = [
    {value: 0, label: "카테고리"}, //이런형식으로 select써야함
    {value: 1, label: "데이트"},
    {value: 2, label: "맛집"},
    {value: 3, label: "여행"},
    {value: 4, label: "업무"},
]

function Addmemorial({wedo, kungdo,refreshFunction}) {
    
    const dispatch = useDispatch();
    const dial = useSelector(state=> state.map)
    const user = useSelector(state=> state.user);
    
    const [file, setfile] = useState(null);
    const [category, setcategory] = useState("");
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    
    
    const onCategoryChange= (e) =>{
        setcategory(e.currentTarget.value);
    }

    const titleChange = (e)=>{
        settitle(e.currentTarget.value);
    }

    const descriptionChange = (e)=>{
        setdescription(e.currentTarget.value);
    }
    

    const handleFileChange1 = (e)=>{
        setfile(e.target.files[0]);
        
    }
    

    const handleFormSubmit = async (e)=>{
                                //새로고침 안되게 막아줌 //only javascipt로 쓸때 Form형식으로 보낼때는 FormData()안써도됨 이미 Form형식이니까
                                //but Form형식 안쓸거면 FormData()써서 Form형식 써줘야함
                                //파일이랑 섞어서 보낼땐 이런식으로 ㄱㄱ
        const formData = new FormData();
        formData.append('writer', user.userData._id)
        formData.append('file',file);
        formData.append('category',category)
        formData.append('title',title)
        formData.append('description',description)
        formData.append('wedo',wedo)
        formData.append('kungdo',kungdo)
    const config = { //파일데이터를 보낼때 필요
            header : { 'content-type ': 'multipart/form-data'}
        }
        await axios.post('/api/memo/upload', formData,config)
        .then(response => {
            if(response.data.success){//서버로부터의 res.json({...})정보는 client에서 response.data로 조회가능함
                refreshFunction(response.data.memo);
                dispatch(mapclick(false));
            }else{
                alert('비디오 업로드 실패')
            }
        })
    }

    function handleClose(){
        dispatch(mapclick(false)); 
    }
        return (
        
            <Dialog open={dial.isShow} onClose={handleClose}>
            <DialogTitle>기록추가</DialogTitle>
            <DialogContent>
                기록파일: <input type = "file"   onChange={handleFileChange1}/>
                카테고리:    <select onChange={onCategoryChange}>
                                {CategoryOption.map((item, index)=>(
                                <option key={index} valu={item.value}>{item.label}</option>
                                ))}
                            </select>
            <TextField label="title" type="text" name="title" value={title} onChange={titleChange}/><br/>
            <TextField label="description" type="text" name="description" value={description} onChange={descriptionChange}/><br/>
            </DialogContent>
            <DialogActions>
                <Button variant ="contained" color ="primary" onClick={handleFormSubmit} > 추가 </Button>
                <Button variant ="outlined" color ="primary" onClick={handleClose}> 닫기 </Button>
                </DialogActions>
             </Dialog> 
           
            
    )
}

export default Addmemorial



