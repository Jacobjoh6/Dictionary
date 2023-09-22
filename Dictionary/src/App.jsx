import React, { useState } from 'react'
import './App.css'

function App() {
  const [word, setWord] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  async function handleSearch() {
    try {

      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const jsonData = await response.json()
      console.log(jsonData);
      setData(jsonData)
      setError(null)
    } catch (err) {
      setError(err.message)
      setData(null)
    }
  }

  return (
    <div>
      <header className='header__container'>
        <h2 className='header__container__h2'>Dictionary</h2>
      </header>
      <main className='main__container'>
        <section className='main__section--over'>
          <input 
            type="text"
            className='main__section--over__input'
            placeholder="Search word"
            onChange={(event) => setWord(event.target.value)}
          />
          <button className='main__section--over__btn' onClick={handleSearch}>Search</button>
        </section>
        <section className='main__section--under'>
          {error && <p>Error: {error}</p>}
          {data && (
            <div className='list__container'>
              {data.map((entry, index) => (
                <div key={index}>
                  <h2>Word: {entry.word}</h2>
                  <p>Phonetic: {entry.phonetic}</p>
                  <h2>Origin: {entry.origin}</h2>
                  <ul className='list__container--audio'>
                    {entry.phonetics.map((phonetic, index) => (
                      <li key={index}>
                        <h4>Text: {phonetic.text}</h4>
                        {phonetic.audio && (
                          <audio controls>
                            <source src={phonetic.audio} type="audio/mpeg" />
                          </audio>
                        )}
                      </li>
                    ))}
                  </ul>
                  <ul className='list__container--meaning'>
                    {data[0].meanings.map((meaning, index) => (
                      <div key={index}>
                        <h3>Part of Speech: {meaning.partOfSpeech}</h3>
                        <h4>Synonyms: {meaning.synonyms && meaning.synonyms.join(', ')}</h4>
                        <h3>Definitions:</h3>
                        <ul className='list__container--definition'>
                          {meaning.definitions.map((definition, index) => (
                            <li key={index}>
                              {definition.definition}
                              {definition.example && (
                                <p>Example: {definition.example}</p>
                              )}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App
