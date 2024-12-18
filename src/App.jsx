import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const apiKey = "fd5e12522935425197fc964d95235df6";
const apiUrl = "https://www.bungie.net/Platform/";
const imgPath = "https://www.bungie.net";


let staticCharacters = {
  "2305843009265520769": {
    "membershipId": "4611686018443871540",
    "membershipType": 1,
    "characterId": "2305843009265520769",
    "dateLastPlayed": "2024-11-29T19:49:55Z",
    "minutesPlayedThisSession": "1",
    "minutesPlayedTotal": "10418",
    "light": 2020,
    "stats": {
      "144602215": 50,
      "392767087": 100,
      "1735777505": 91,
      "1935470627": 2020,
      "1943323491": 52,
      "2996146975": 22,
      "4244567218": 51
    },
    "raceHash": 3887404748,
    "genderHash": 3111576190,
    "classHash": 3655393761,
    "raceType": 0,
    "classType": 0,
    "genderType": 0,
    "emblemPath": "/common/destiny2_content/icons/cb105a020b9c5c315c59b2b1df3885d6.jpg",
    "emblemBackgroundPath": "/common/destiny2_content/icons/724358bfba10e751c7e7dc2e2dd3b204.jpg",
    "emblemHash": 3953403248,
    "emblemColor": {
      "red": 1,
      "green": 0,
      "blue": 1,
      "alpha": 255
    },
    "levelProgression": {
      "progressionHash": 1716568313,
      "dailyProgress": 0,
      "dailyLimit": 0,
      "weeklyProgress": 0,
      "weeklyLimit": 0,
      "currentProgress": 0,
      "level": 50,
      "levelCap": 50,
      "stepIndex": 50,
      "progressToNextLevel": 0,
      "nextLevelAt": 0
    },
    "baseCharacterLevel": 50,
    "percentToNextLevel": 0,
    "titleRecordHash": 3464275895
  },
  "2305843009265520954": {
    "membershipId": "4611686018443871540",
    "membershipType": 1,
    "characterId": "2305843009265520954",
    "dateLastPlayed": "2024-11-29T20:32:27Z",
    "minutesPlayedThisSession": "32",
    "minutesPlayedTotal": "153095",
    "light": 2018,
    "stats": {
      "144602215": 62,
      "392767087": 91,
      "1735777505": 101,
      "1935470627": 2018,
      "1943323491": 90,
      "2996146975": 29,
      "4244567218": 30
    },
    "raceHash": 898834093,
    "genderHash": 2204441813,
    "classHash": 2271682572,
    "raceType": 2,
    "classType": 2,
    "genderType": 1,
    "emblemPath": "/common/destiny2_content/icons/d0d8a24c8a8143747adb192caaa43a5f.jpg",
    "emblemBackgroundPath": "/common/destiny2_content/icons/0104edbc63c03be30602d9b57d77b8be.jpg",
    "emblemHash": 383734238,
    "emblemColor": {
      "red": 18,
      "green": 0,
      "blue": 0,
      "alpha": 255
    },
    "levelProgression": {
      "progressionHash": 1716568313,
      "dailyProgress": 0,
      "dailyLimit": 0,
      "weeklyProgress": 0,
      "weeklyLimit": 0,
      "currentProgress": 0,
      "level": 50,
      "levelCap": 50,
      "stepIndex": 50,
      "progressToNextLevel": 0,
      "nextLevelAt": 0
    },
    "baseCharacterLevel": 50,
    "percentToNextLevel": 0,
    "titleRecordHash": 3464275895
  },
  "2305843009289646835": {
    "membershipId": "4611686018443871540",
    "membershipType": 1,
    "characterId": "2305843009289646835",
    "dateLastPlayed": "2024-11-17T03:33:25Z",
    "minutesPlayedThisSession": "4",
    "minutesPlayedTotal": "20676",
    "light": 2017,
    "stats": {
      "144602215": 64,
      "392767087": 104,
      "1735777505": 84,
      "1935470627": 2017,
      "1943323491": 18,
      "2996146975": 90,
      "4244567218": 32
    },
    "raceHash": 2803282938,
    "genderHash": 3111576190,
    "classHash": 671679327,
    "raceType": 1,
    "classType": 1,
    "genderType": 0,
    "emblemPath": "/common/destiny2_content/icons/f487163bdfc52e126e86b35e7c4a05b0.jpg",
    "emblemBackgroundPath": "/common/destiny2_content/icons/f97acbe1ff747a86946f98272d4397c9.jpg",
    "emblemHash": 908153539,
    "emblemColor": {
      "red": 2,
      "green": 9,
      "blue": 20,
      "alpha": 255
    },
    "levelProgression": {
      "progressionHash": 1716568313,
      "dailyProgress": 0,
      "dailyLimit": 0,
      "weeklyProgress": 0,
      "weeklyLimit": 0,
      "currentProgress": 0,
      "level": 50,
      "levelCap": 50,
      "stepIndex": 50,
      "progressToNextLevel": 0,
      "nextLevelAt": 0
    },
    "baseCharacterLevel": 50,
    "percentToNextLevel": 0,
    "titleRecordHash": 1089543274
  }
}


//function to get bungie id from user-input text
//bungieName is the name given by the user which is then split by "#" and made into an array
async function getBungieId(bungieName) {
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
    return searchResults(await data.Response.searchResults);
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
    // displayItems(recentlyPlayed(data.Response.characters.data), data.Response.characterEquipment.data)
    return (data.Response.characterEquipment.data)
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
    return (await data.Response);
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
  //returns id of recent character
  return recentCharacter;
}

function errorMessage(message) {
  console.log(message);
  // document.getElementById("error-message").style.display = "block";
  // document.getElementById("loader").style.display = "none";
}

function searchResults(searchArray) {
  let i = 0;
  console.log("these are search results")
  while (i < 5 && i < searchArray.length) {
    console.log(searchArray[i]);
    i += 1;
  }
}

function CharacterItems(props) {

  // useEffect(() => {
  //   for (let i = 0; i <= 7; i++) {
  //     async function getEntityInformation() {
  //       try {
  //         const response = await fetch(`${apiUrl}/Destiny2/Manifest/DestinyInventoryItemDefinition/${props.items[props.character].items[i].itemHash}/`, {
  //           headers: { 'X-API-Key': apiKey }
  //         });
  //         const data = await response.json();
  //         setItems(items => [...items, <p>{data.Response.displayProperties.name} hello {i}</p>])
  //         // setItems([...items, <p>{data.Response.displayProperties.name} hello {i}</p>]);
  //       } catch (error) {
  //         errorMessage(error);
  //       }
  //       // let info = await getEntityDefinition(props.items[props.character].items[i].itemHash);
  //       // setItems(previousState => { return [...previousState, <p>{info.displayProperties.name} hello {i}</p>] });
  //     }
  //     getEntityInformation();
  //     // console.log(items);
  //   }
  // }, [props.name]);

  // return (
  //   <div className={props.hidden ? "hidden" : ""}>{items}</div>
  // )
}



function Characters(props) {
  let characterList = [];
  for (const individual in staticCharacters) {
    if (props.active === individual) {
      characterList = [characterList, <CharacterItems key={individual} items={props.items} hidden={false} character={individual} name={props.name} />]
    } else {
      characterList = [characterList, <CharacterItems key={individual} items={props.items} hidden={true} character={individual} name={props.name} />]
    }
  }
  return <div>{characterList}</div>
}

function SearchPrint(props) {
  useEffect(() => {
    const searchDelay = setTimeout(() => {
      return (getBungieId(props.results));
    }, 1500)

    return () => clearTimeout(searchDelay)
  }, [props.results])


  return (
    <div>
      <p>Search Results {props.results}</p>
    </div>
  )
}

async function getCharacterItems() {
  try {
    const response = await fetch(`${apiUrl}/Destiny2/${staticCharacters[Object.keys(staticCharacters)[0]].membershipType}/Profile/${staticCharacters[Object.keys(staticCharacters)[0]].membershipId}/?components=Characters,CharacterEquipment`, {
      headers: { 'X-API-Key': apiKey }
    });
    const data = await response.json();
    // displayItems(recentlyPlayed(data.Response.characters.data), data.Response.characterEquipment.data)
    let characterItems = await data.Response.characterEquipment.data;
    return await getIndividualItems(await characterItems);
  } catch (error) {
    errorMessage(error);
  }
}

async function getIndividualItems(items) {
  let itemsList = []
  for (let i = 0; i <= 7; i++) {
    try {
      const response = await fetch(`${apiUrl}/Destiny2/Manifest/DestinyInventoryItemDefinition/${items[Object.keys(items)[0]].items[i].itemHash}/`, {
        headers: { 'X-API-Key': apiKey }
      });
      const data = await response.json();
      itemsList = [...itemsList, <p>{await data.Response.displayProperties.name} hello {i}</p>];
      // console.log(itemsList);
    } catch (error) {
      errorMessage(error);
    }
  }
  return itemsList;
}

function CharacterEquipment(props) {
  console.log(props.items);
  return (
    // <div>Hello</div>
    <div>{props.items}</div>
  )
}



function App() {
  const [bungieName, setBungieName] = useState("");
  const [search, setSearch] = useState("");
  const [activeCharacter, setActiveCharacter] = useState("");
  const [characterItems, setCharacterItems] = useState([]);
  const [items, setItems] = useState([]);




  function CharacterEmblems(props) {
    let characterList = []
    for (const individual in staticCharacters) {
      if (props.active === individual) {
        characterList = [characterList, <img key={individual} className="active" src={`${imgPath}${staticCharacters[individual].emblemBackgroundPath}`} />]
      } else {
        characterList = [characterList, <img key={individual} src={`${imgPath}${staticCharacters[individual].emblemBackgroundPath}`} onClick={() => { setActiveCharacter(individual) }} />]
      }
    }
    return <div>{characterList}</div>
  }

  //only runs on the first go to select the active character as the one who is most recently played
  useEffect(() => {
    setActiveCharacter(recentlyPlayed(staticCharacters));

    (async () => {
      const fillerName = await getCharacterItems(characterItems);
      setCharacterItems(fillerName);
    })();

    console.log(characterItems);

    return () => {};
  }, [bungieName])


  //handels submission of the form, stops from refreshing the page and sets the variable to what is in the input field.
  function handleForm() {
    event.preventDefault();
    setBungieName(search);
  }


  return (
    <>
      <form id="bungieIdForm" onSubmit={() => handleForm()}>
        <label for="nameInput">Enter a Bungie Id</label>
        <input type="text" name="nameInput" id="nameInput" placeholder="ex. name#1234" value={search} onChange={(event) => {
          setSearch(event.target.value);
        }} required />
        <button>Search</button>
      </form>
      <SearchPrint results={search} />

      <CharacterEmblems active={activeCharacter} />
      <Characters active={activeCharacter} items={characterItems} name={bungieName} />
      <CharacterEquipment items={characterItems} />
    </>
  )
}

export default App
