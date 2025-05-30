import React, { useState, useEffect } from 'react';
import './App.css';

// List of voicenotes (OPUS files) from the Vaki Voicenotes folder
const voicenotes = [
  'Ganja Farm',
  'good to be feel irie.opus',
  'live for faam.opus',
  'It\'s a big days boss.opus',
  'Not no, now.opus',
  'Smoke ganja.opus',
  'Culud Vaks pt.2.opus',
  'I hate xhosa I like english.opus',
  'Going dark.opus',
  'Culud Vaks.opus',
  'You\'ve got a new car.opus',
  'Grateful for status like.opus',
  'Finish room.opus',
  'Tounge Twister.opus',
  'Danko.opus',
  'Tallman owes Vaki.opus',
  'Too strong.opus',
  'Cute goodbye.opus',
  'Vaks on why granny is fainting pt.3.opus',
  'Vaks on why granny is fainting pt.2.opus',
  'Vaks on why granny is fainting.opus',
  'Exctied for R10 IY ganja.opus',
  'It\'s cold my bru man.opus',
  'New song.opus',
  'Vaki going dark.opus',
  'Vaki going deep.opus',
  'You are a fish.opus',
  'I\'m coming boss.opus',
  'Sambies servant.opus',
  'It\'s you!.opus',
  'Lucky Stick.opus',
  'It\'s Cutting.opus',
  'How is Malawi.opus',
  'Where are you my boss.opus',
  'Shorty Steal Plate.opus',
  'YaBABA.opus',
  'Every Tuesday.opus',
  'Granny Spy on Vaks pt.1.opus',
  'Granny Spy on Vaks pt.3.opus',
  'Granny Must let Vaks Sleep.opus',
  'Granny Spy on Vaks pt.2.opus',
  'Granny Spy on Vaks pt.4.opus',
  'Lytie is stout.opus',
  'America!.opus',
  'Listen Up.opus',
  'Confidence to kill mouse.opus',
  'Hey tikolosh.opus',
  'Enjoy your tea party.opus',
  'Vaki going dark pt.2.opus',
  'Vibe with me.opus',
  'Vaki is a cat.opus',
  'Rrrattax.opus',
  'WhatAPP boss.opus',
  'Vaki life update.opus',
  'Clarky\'s Favourite.opus',
  'You forget to buy your cat.opus',
  'Vaki is a cat proof 2.opus',
  'Show me your house.opus'
];

function App() {
  const [favourites, setFavourites] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [loadingVoicenote, setLoadingVoicenote] = useState(null);

  // Load favourites from localStorage on initial render
  useEffect(() => {
    const savedFavourites = localStorage.getItem('iVakiFavourites');
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  // Save favourites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('iVakiFavourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (voicenote) => {
    if (favourites.includes(voicenote)) {
      setFavourites(favourites.filter(fav => fav !== voicenote));
    } else {
      setFavourites([...favourites, voicenote]);
    }
  };

  const playVoicenote = (voicenote) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    setLoadingVoicenote(voicenote);
    
    // Determine file extension
    const extension = voicenote.includes('.opus') ? '.opus' : '.mp3';
    const filename = voicenote.replace('.opus', '').replace('.mp3', '');
    const audio = new Audio(`/Vaki Voicenotes/${filename}${extension}`);
    
    audio.addEventListener('canplaythrough', () => {
      setLoadingVoicenote(null);
      audio.play();
    });

    audio.addEventListener('error', () => {
      setLoadingVoicenote(null);
      console.error('Error loading audio');
    });

    setCurrentAudio(audio);
  };

  const handleVakiFaceHover = () => {
    playVoicenote('3rd dimension.mp3');
  };

  const filteredVoicenotes = showFavourites ? favourites : voicenotes;

  return (
    <div className="App">
      <header className={`App-header ${showFavourites ? 'show-favourites' : ''}`}>
        <img 
          src="/Vaki Voicenotes/vaki-face.png" 
          alt="Vaki Face" 
          onMouseEnter={handleVakiFaceHover}
          className="vaki-face"
        />
        <h1>iVaki</h1>
        <img 
          src="/Vaki Voicenotes/vaki-face.png" 
          alt="Vaki Face" 
          onMouseEnter={handleVakiFaceHover}
          className="vaki-face"
        />
        <button onClick={() => setShowFavourites(!showFavourites)}>
          {showFavourites ? 'Show All' : 'Show Favourites'}
        </button>
      </header>
      <div className="voicenotes-container">
        {filteredVoicenotes.map((voicenote) => (
          <div key={voicenote} className="voicenote-item">
            <button
              className="voicenote-button"
              onClick={() => playVoicenote(voicenote)}
            >
              <img src="/Vaki Voicenotes/button.png" alt="Vaki Face" />
              <div className={`loading-spinner ${loadingVoicenote === voicenote ? 'visible' : ''}`} />
            </button>
            <div className="voicenote-info">
              <span>{voicenote.replace('.opus', '').replace('.mp3', '')}</span>
              <button
                className="favourite-button"
                onClick={() => toggleFavourite(voicenote)}
              >
                {favourites.includes(voicenote) ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
        ))}
      </div>
      {showFavourites && (
        <img 
          src="/Vaki Voicenotes/vaki-dancing.png" 
          alt="Dancing Vaki" 
          className="dancing-vaki"
        />
      )}
    </div>
  );
}

export default App; 