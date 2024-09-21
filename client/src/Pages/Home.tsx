import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../CSS/main.css';
import User from '../Base/User';  // Assuming User.loadLocal() loads user data from local storage or backend.

interface Character {
  id: number;
  userId: number;
  name: string;
  race: string;
  classType: string;
  level: number;
  alignment: string;
  hitPoints: number;
  armorClass: number;
  speed: number;
  proficiencyBonus: number;
}

interface Users {
  userid: number;
  username: string;
}

// Character images (assuming these are in the public folder)
const characterImages: Record<string, string> = {
  humanMale: process.env.PUBLIC_URL + '/humanmale.jpg',
  humanFemale: process.env.PUBLIC_URL + '/humanfemale.jpg',
  elfMale: process.env.PUBLIC_URL + '/elfmale.jpg',
  elfFemale: process.env.PUBLIC_URL + '/elffemale.jpg',
  dwarfMale: process.env.PUBLIC_URL + '/dwarfMale.jpg',
  dwarfFemale: process.env.PUBLIC_URL + '/dwarffemale.jpg',
};

function Home() {
  const [userData, setUserData] = useState<Users | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const navigate = useNavigate();

  // Fetch user data when the component mounts
  useEffect(() => {
    async function fetchUser() {
      try {
        const userUrl = User.loadLocal();
        if (userUrl) {
          const response = await axios.get(userUrl);
          console.log('User data:', response.data);
          setUserData(response.data);  // Set user data when available
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUser();
  }, []);

  // Fetch character data once the user data is available
  useEffect(() => {
    async function fetchCharacter() {
      if (userData && userData.userid) {
        try {
          const response = await axios.get(`http://localhost:8080/characters/user/${userData.userid}`);
          console.log(`http://localhost:8080/characters/user/${userData.userid}`);
          console.log('Character data:', response.data);
          if (response.data) {
            setCharacter(response.data);
          }
        } catch (error) {
          console.error('Error fetching character data:', error);
        }
      }
    }

    // Only fetch character if user data exists
    if (userData) {
      fetchCharacter();
    }
  }, [userData]);

  function createCharacter() {
    navigate('/create-character');  // Navigate to character creation page
  }

  function getImage(): string | null {
    if (!character) return null;
    const key = `${character.race}`;  // Use race directly as key since it includes gender
    return characterImages[key as keyof typeof characterImages] || null;
  }

  return (
    <div className="home">
      <div className="inner-container">
        <button onClick={createCharacter} style={{ marginBottom: '20px' }}>
          Create Character
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="character-image">
            {character ? (
              <img
                src={getImage() || ''}
                alt={character.name}
                className="character-image"
              />
            ) : (
              <div className="character-image">
                No Character
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>Info</h3>
            {character ? (
              <div>
                <p>Name: {character.name}</p>
                <p>Race: {character.race}</p>
                <p>Class: {character.classType}</p>
                <p>Level: {character.level}</p>
                <p>Alignment: {character.alignment}</p>
                <p>Hit Points: {character.hitPoints}</p>
                <p>Armor Class: {character.armorClass}</p>
                <p>Speed: {character.speed}</p>
                <p>Proficiency Bonus: {character.proficiencyBonus}</p>
              </div>
            ) : (
              <div>
                <p>No character created yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
