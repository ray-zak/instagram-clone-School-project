import React, {useState, useEffect} from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';

const SearchBarComponent = ({token}) => {
    const tokenData = jwt_decode(token)
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        axios.get("http://localhost:5000/users/")
            .then(response => {
                setData(response.data);
            })
    }, [])
    function redirectTo(id){
        if (id === tokenData.id){
            window.location.href = ("http://localhost:3000/profile/")}
        else{
        window.location.href = ("http://localhost:3000/otherprofile/" + id)}
    }
    return (
        <div>
            <input type='text' placeholder='Search' onChange={event => {setSearchTerm(event.target.value)}}></input>
            {data.filter((val => {
                if (searchTerm === ""){
                    return null
                }else if (val.username.toLowerCase().includes(searchTerm.toLowerCase())){
                    return val
                }
            })).map((val, key)=>{
                return <div className='user' key={key}>
                    <button className='btn profile-edit-btn' onClick={() => redirectTo(val._id)}  style={{color: 'white', fontFamily:'Arial', margin: '5px', fontSize: '10px',}}> {val.username}</button>
                </div>

            })}
        </div>
    );
};

export default SearchBarComponent;