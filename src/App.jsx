import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const apiKey = "fd5e12522935425197fc964d95235df6";
const apiUrl = "https://www.bungie.net/Platform/";
const imgPath = "https://www.bungie.net";


//function to get bungie id from user-input text
//bungieName is the name given by the user which is then split by "#" and made into an array
async function getBungieId(bungieName) {

  // document.getElementById("loader").style.display = "block";
  // document.getElementById("error-message").style.display = "none";
  // document.getElementById("main-div").style.display = "none";
  // document.getElementById("player-name").innerHTML = bungieName;

  // let nameArray = bungieName.split("#");
  // let body = { "displayName": nameArray[0], "displayNameCode": nameArray[1] };

  //searches the bungie API using a POST request with the bungie name and 4 digit number passed into the body of the post request.
  try {
    // const response = await fetch(`${apiUrl}/Destiny2/SearchDestinyPlayerByBungieName/all/`, {
    //   headers: { 'X-API-Key': apiKey },
    //   method: 'POST',
    //   body: JSON.stringify(body),
    // });
    const response = await fetch(`${apiUrl}User/Search/GlobalName/0/`, {
      headers: { 'X-API-Key': apiKey },
      method: 'POST',
      body: JSON.stringify({ "displayNamePrefix": bungieName }),
    })
    const data = await response.json();
    // let membershipId = await data.Response[0].membershipId;
    // let membershipType = await data.Response[0].membershipType;
    // getCharacterEquipment(membershipType, membershipId);
    console.log(await data.Response.searchResults);
    searchResults(await data.Response.searchResults);
  } catch (error) {
    errorMessage(error);
  }
}

//get character equipment information and character information using membership id and type
async function getCharacterEquipment(membershipType, membershipId) {
  try {
    const response = await fetch(`${apiUrl}/Destiny2/${membershipType}/Profile/${membershipId}/?components=Characters,CharacterEquipment`, {
      headers: { 'X-API-Key': apiKey }
    });
    const data = await response.json();
    displayItems(recentlyPlayed(data.Response.characters.data), data.Response.characterEquipment.data)
  } catch (error) {
    errorMessage(error);
  }

}

//takes the entityId and asks the api for information on the entity
//returns the data of one specific item
async function getEntityDefinition(entityId) {
  try {
    const response = await fetch(`${apiUrl}/Destiny2/Manifest/DestinyInventoryItemDefinition/${entityId}/`, {
      headers: { 'X-API-Key': apiKey }
    });
    const data = await response.json();
    return (data.Response);
  } catch (error) {
    errorMessage(error);
  }
}

//takes the object that contains all the characters and parses through it to find the most recently played character
//returns the id of the most recent character
function recentlyPlayed(characterList) {
  let recentDate = new Date(characterList[Object.keys(characterList)[0]].dateLastPlayed);
  let recentCharacter = characterList[Object.keys(characterList)[0]].characterId;
  for (const character in characterList) {
    let newDate = new Date(characterList[character].dateLastPlayed);
    let newCharacter = characterList[character].characterId;
    if (recentDate.getTime() < newDate.getTime()) {
      recentCharacter = newCharacter;
      recentDate = newDate;
    }
  }
  //puts the player emblem into the document
  document.getElementById("player-emblem-long").src = `${imgPath}${characterList[recentCharacter].emblemBackgroundPath}`
  return recentCharacter;
}

//takes the character id of one specific character and a object containing a list of items on all the characters
//takes the equipment and displays it in the HTML
async function displayItems(characterId, characterItems) {
  const elements = document.getElementsByClassName("item");
  for (const itemIndex in characterItems[characterId].items) {
    let entityId = characterItems[characterId].items[itemIndex].itemHash;
    let itemInfo = await getEntityDefinition(entityId);
    if (elements.item(itemIndex) != null) {
      elements.item(itemIndex).getElementsByTagName("p")[0].innerHTML = itemInfo.displayProperties.name;
      elements.item(itemIndex).getElementsByTagName("img")[0].src = `${imgPath}${itemInfo.displayProperties.icon}`;
      elements.item(itemIndex).getElementsByTagName("img")[1].src = `${imgPath}${itemInfo.iconWatermark}`;
    }
  }
  document.getElementById("main-div").style.display = "grid";
  document.getElementById("loader").style.display = "none";
}

function errorMessage(message) {
  console.log(message);
  document.getElementById("error-message").style.display = "block";
  document.getElementById("loader").style.display = "none";
}

function searchResults(searchArray) {
  let i = 0;
  console.log("these are search results")
  while (i < 5 && i < searchArray.length) {
    console.log(searchArray[i]);
    i += 1;
  }

}

function App() {
  const [bungieName, setBungieName] = useState("");

  //handels submission of the form, stops from refreshing the page and sets the variable to what is in the input field.
  function handleForm() {
    event.preventDefault();
    setBungieName(bungieName);
    console.log(bungieName);
    getBungieId(bungieName);
  }



  return (
    <>
      <form id="bungieIdForm" onSubmit={() => handleForm()}>
        <label for="nameInput">Enter a Bungie Id</label>
        <input type="text" name="nameInput" id="nameInput" placeholder="ex. name#1234" value={bungieName} onChange={(event) => setBungieName(event.target.value)} required />
        <button>Search</button>
      </form>
      {/* <div className={props.shouldHide ? 'hidden' : undefined} >
        </div> */}
    </>
  )
}

export default App
