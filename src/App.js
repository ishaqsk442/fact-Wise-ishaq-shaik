import './App.css';

import { Component } from 'react';
import userData from './data';
import UserCard from './components/UserCard'
import { CiSearch } from "react-icons/ci";
// console.log(userData)


function calculateAge(dob){
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
    }

const formatedData = (e) => {

    let x = {
      fullName: e.first +" "+  e.last,
      dob: calculateAge(e.dob),
      id: e.id,
      gender: e.gender,
      email: e.email,
      picture: e.picture,
      country: e.country,
      description: e.description,
      isEditing: false,
      isOpen:false

    }
    let y = {...x,isOpen:false,isEditing:false}
    return y
  }


const dt = userData.map(e=> formatedData(e))
console.log("kkkkkkkkk", dt)
    

class App extends Component {
  state = { data: dt, InputSearch: "", editOn: false }
  
  changeInput = (event) => {
    this.setState({ InputSearch: event.target.value })
  }
  onChangeEdit = () => {
    this.setState(prev => ({ isEditing: !prev.isEditing }))
  }
  onChangeOpen = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }))
  }

  onchangeEditData = (id) => {
    

    const { data } = this.state
    const item = data.find(e => e.id === id)
    console.log(item)

    if (item.isEditing === false) {
      this.setState(prev => ({
        data: prev.data.map(each => {
          if (id === each.id) {
            return { ...each, isEditing: true }
          } else {
            return { ...each, isEditing: false }
          }
        }), editOn: true
      }))
    }
    else {
      this.setState(prev => ({
        data: prev.data.map(each => {
          if (id === each.id) {
            return { ...each, isEditing: false }
          } else {
            return { ...each, isEditing: false }
          }
        }), editOn: false
      }))
    }
  }


  onchangeSubmitData = (id, name, gender, description, country,age) => {
    

    const { data } = this.state
    const item = data.find(e => e.id === id)
    console.log(item)

    if (item.isEditing === true) {
      this.setState(prev => ({
        data: prev.data.map(each => {
          if (id === each.id) {
            return { ...each,dob:age,id: id, fullName: name, gender: gender, country: country, description: description, isEditing: false }
          } else {
            return { ...each, isEditing: false }
          }
        }), editOn: false
      }))
    }
    else {
      this.setState(prev => ({
        data: prev.data.map(each => {
          if (id === each.id) {
            return { ...each, isEditing: false }
          } else {
            return { ...each, isEditing: false }
          }
        }), editOn: false
      }))
    }
    
  }
    

    changeOpenInData = (id) => {
      const { data } = this.state

      console.log(id)
    
      const item = data.find(e => e.id === id)
      console.log(item)
    
      if (item.isOpen === false) {
        this.setState(prev => ({
          data: prev.data.map(each => {
            if (id === each.id) {
              return { ...each, isOpen: true }
            } else {
              return { ...each, isOpen: false }
            }
          })
        }))
      }
      else {

        this.setState(prev => ({
          data: prev.data.map(each => {
            if (id === each.id) {
              return { ...each, isOpen: false }
            } else {
              return { ...each, isOpen: false }
            }
          })
        }))
      
      }
    }
  
  onRemoveItem = (id) => {
    const {data} =this.state
    let x = data.filter(each=> each.id !==id)
    this.setState({data:x})
  }
  


  render() {
    const { data ,InputSearch,editOn} = this.state
    
  // const dt = data.map(e=> this.formatedData(e))
  //   console.log("kkkkkkkkk",dt)
    const searchedData = data.filter((e) => e.fullName.toLowerCase().includes(InputSearch.toLowerCase()))
    // console.log(searchedData)


 
    return (
      
     
      <div className="App">
        
        
        <div className='search-cont'>
          <CiSearch className='icon' />
          <input className='search' type='search' placeholder='Search User' onChange={this.changeInput} />
        </div>
     

       <ul className='list-cont'>

          {searchedData.map(e => (
            <UserCard key={e.id} details={e} onRemoveItem={this.onRemoveItem} onchangeSubmitData={this.onchangeSubmitData} editOn={editOn} changeOpenInData={this.changeOpenInData} onchangeEditData={this.onchangeEditData} />
          
        ))}
          </ul>
          
      </div>
        
     
    )
  }
}

export default App;
