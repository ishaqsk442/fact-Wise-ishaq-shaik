import './index.css'
import { GoDash } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
// import { RiDeleteBin6Line } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";
import { useReducer} from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";

import Confirm from '../Confirm';

function reducer(state, action) {
    switch (action.type) {
        case 'change_name': {
            return {
                ...state,
                Name: action.editedName
            };
        }
        case 'change_age':{
            return {
                ...state,age:action.editedAge
            }
        }
        case 'change_gender':{
            return {
                ...state,Gender:action.editedGender
            }
        }
            case 'change_country':{
            return {
                ...state,Country:action.editedCountry
            }
        }
        case 'change_description':{
            return {
                ...state,Description:action.editedDescription
            }
        }
        
            default: {
      throw Error('Unknown action: ' + action.type);
    }
    }
}
    




const UserCard = (props) => {

    const { details } = props
    const {changeOpenInData,onchangeEditData,editOn,onchangeSubmitData,onRemoveItem } = props
    const { fullName, id, dob, gender, description, picture, isEditing, isOpen, country } = details

    const [state, dispatch] = useReducer(reducer, { age:dob,Name: fullName, Gender: gender, Description: description, Country: country })



    
    



    
    

    const showHideList = () => {
        
        changeOpenInData(id)
        
}

    

    const onChangeEdit = (event) => {
        event.preventDefault()
        onchangeEditData(id)
    }

    const onSubmit = (event) => {

        event.preventDefault()
        
        onchangeSubmitData(id,state.Name,state.Gender,state.Description,state.Country,state.age)

        
    }
    const onCancel = () => {
        
        
       



        onchangeEditData(id)
    }

    let x = editOn===true && isEditing===false ? ()=>{} : showHideList
    
    let openBottom = isOpen ? "show" : "hide";

   

    const changeName = (event) => {
        let x= event.target.value
       if ((isNaN(x))) {
            dispatch({type:"change_name",editedName:event.target.value})
        } else {
            dispatch({type:"change_name",editedName:""})
        }
    }
    const changeAge = (event) => {

       
        dispatch({type:"change_age",editedAge:event.target.value})
        
        
        
    }
    
     const changeGender = (event) => {
    dispatch({type:"change_gender",editedGender:event.target.value})
    }
    
    const changeCountry = (event) => {

        let x = event.target.value
        if (isNaN(x)) {
            dispatch({type:"change_country",editedCountry:event.target.value})
        } else {
            dispatch({type:"change_country",editedCountry:""})
        }
        
      
    }
    

    
    const changeDescription = (event) => {
    dispatch({type:"change_description",editedDescription:event.target.value})
}

   
    



    
    return (
        <li className='li' key={id} id={id}  >
            <form onSubmit={onSubmit}>


           
            <div className='top-details'>
                <div className='profile-name'>

               
                <img className="pic" src={picture} alt={id} />
                {isEditing ? <input required type="text" placeholder='Change name' className='editable-input' onChange={changeName} value={state.Name}/> : <h1>{fullName}</h1>}
                 </div>
                {isOpen ? <GoDash className="sign" onClick={x} /> : <FaPlus className="sign" onClick={x} />}
            </div>


            <div className={` ${openBottom} bottom-cont `}>
            <div className='age-gender-country'>
                <div className='age-cont'>
                    <label htmlFor="age">Age</label>
                        {isEditing && dob > 18 ? <input required onChange={changeAge} type="number" id="age" /> : <p>{dob} Years</p>}
                </div>
                <div className='gender-cont'>
                        <label>Gender</label>
                        {isEditing ?
                            <select className='gender-change' placeholder='Choose Gender' onChange={changeGender}>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Trangender</option>
                                <option>Rather not Say</option>
                                <option>Other</option>
                            </select> : <p>{gender}</p>}
                </div>
                <div className='country-cont'>
                    <label>Country</label>
                        {isEditing ? <input required type="text" value={state.Country} placeholder='Change Country' onChange={changeCountry}  /> : <p >{country}</p>}
                </div>
                </div>
                

            <div className='description-cont'>
                    <label>Description</label>
                    {isEditing ? <textarea required placeholder='Change description' className='text-area' onChange={changeDescription} rows="4" cols="60"></textarea> : <p >{description}</p>}
                </div>
                <div className='edit-delete-cont'>

                    {editOn ? <button className='button'><FaRegCircleXmark className=' cross edit-delete' onClick={onCancel} /> </button>: <Confirm className='edit-delete' id={id} onRemoveItem={onRemoveItem} />}
                    {editOn ? <button className='button' type="submit"><IoIosCheckmarkCircleOutline className=' check edit-delete'  /> </button>: <button className='button' type="button"><TiPencil className=' pencil edit-delete' onClick={onChangeEdit} /></button>}
                    
                    

            </div>
            </div>
            
             </form>
        </li>
    )
}

export default UserCard