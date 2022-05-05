// import logo from './logo.svg';
import React from 'react';
import './App.css';
import contacts from "./contacts.json";

let wonEmmy = '🏆'
let wonOscar = '🏆'


const firstFive = contacts.slice(0, 5);
let theRest = contacts.slice(5);

function App() {

  const [addContact, setAddContact] = React.useState(firstFive)
  const [remainingCelebs, setRemainingCelebs] = React.useState(theRest);

  function randomContact() {
    if (remainingCelebs.length > 0) {
      let randomNum = Math.floor(Math.random() * remainingCelebs.length);
      //This pulls a random celebrity from remainingCelebs
      let randomCeleb = remainingCelebs[randomNum];

      //add a new celeb to our contacts list
      setAddContact(addContact.concat(randomCeleb));

      //remove that celebrity from the non-used array
      let filteredArr = remainingCelebs.filter((celeb) => {
        return celeb.id !== randomCeleb.id;
      });

      //set the remaining celebs
      setRemainingCelebs(filteredArr);
    }
  }

  const sortByName = (n) => {
    const sortedNames = n.sort((a,b) => {
      if(a.name > b.name) {
        return 1;
      } else if (a.name < b.name){
        return -1;
      } else{
        return 0;
      }
    });
    return setAddContact([...sortedNames]);
  }

  const sortByPopularity = (p) =>{
    const sortedPopular = p.sort((a,b) =>{
      if(a.popularity < b.popularity) {
        return 1;
      } else if(b.popularity < a.popularity) {
      return -1;
      } else {
        return 0;
      }
    });
    return setAddContact([...sortedPopular])
  }

  function removeContact(contactToRemove){
    let filteredArr = addContact.filter(function(singleContact){
        return contactToRemove !== singleContact;
    });
    setAddContact(filteredArr);
}



  return (

    <div className="App">
     <h1>Iron Contacts</h1>
     <button onClick={() => randomContact(addContact)}>Add Random Contact</button>
     <button onClick={() => sortByName(addContact)}>Sort By Name</button>
     <button onClick={() => sortByPopularity(addContact)}>Sort By Popularity</button>
    <table style={{margin: "auto"}}>
    <th>
    <h1>Picture</h1>
    </th>
    <th>
    <h1>Name</h1>
    </th>
    <th>
    <h1>Popularity &nbsp; </h1>
    </th>
    <th>
    <h1>Won Oscar &nbsp; </h1>
    </th>
    <th>
    <h1>Won Emmy &nbsp; </h1>
    </th>
    <th>
    <h1>Actions</h1>
    </th>
    <tbody>
      {addContact.map((contact) => {
        return (
          <tr key={contact.id}>
          <td>
            <img src={contact.pictureUrl} width= "100"/>
          </td>
          <td>
            <h3>{contact.name}</h3>
          </td>
          <td>
            <h3>{contact.popularity}</h3>
          </td>
          <td>
            <h3>{contact.wonOscar && "🏆"}</h3>
          </td>
          <td>
            <h3>{contact.wonEmmy && "🏆"}</h3>
          </td>
          <td>
            <button onClick={() => removeContact(contact)}>Delete</button>
          </td>
          </tr>
        );
      })}
    </tbody>

    </table>
    </div>
  );
}

export default App;
