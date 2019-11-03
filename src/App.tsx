import React, { useState } from "react";
import "./App.css";
import { fruits } from "./constants";


const App: React.FC = () => {
  const [inputWord, setInputWord] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestion] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const selectSuggestion = (index: number) => {
    setInputWord(suggestions[index]);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newInput = event.currentTarget.value;
    setInputWord(newInput);

    setActiveSuggestion(-1);
    if (newInput) {
      setSuggestions(
        fruits.filter(fruit =>
          fruit.toLowerCase().includes(newInput.toLowerCase())
        )
      );
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //If user presses the down key
    if (event.keyCode === 40) {
      //Already reach the end of auto-complete suggestion
      if (activeSuggestionIndex === suggestions.length - 1) {
        return;
      }
      setActiveSuggestion(prevState => prevState + 1);
    }
    //if user presses the up key
    else if (event.keyCode === 38) {
      if (activeSuggestionIndex === -1) {
        return;
      }
      setActiveSuggestion(prevState => prevState - 1);
    }
    //if user presses the enter key
    else if (
      event.keyCode === 13 
    ) {
      if(activeSuggestionIndex >= 0) selectSuggestion(activeSuggestionIndex);
      else alert(`Successfully Submit ${inputWord}`);
    }
  };

  const onMouseOverSuggestion = (index: number) => {
    return (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      setActiveSuggestion(index);
    };
  };

  const onClick = (index: number) => {
    return (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      selectSuggestion(index);
    };
  };

  const onSubmitButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    alert(`Successfully Submit ${inputWord}`);  
  };

  const suggestionList = (
    <ul className="suggestions">
      {suggestions.map((suggestion, index) => {
        let className;
        // Flag the active suggestion with a class
        if (index === activeSuggestionIndex) {
          className = "suggestion-active";
        }

        let matchIndex = suggestion.toLowerCase().indexOf(inputWord.toLowerCase());
        return (
          <li
            className={className}
            key={suggestion}
            onMouseOver={onMouseOverSuggestion(index)}
            onClick={onClick(index)}
          >
            {suggestion.slice(0, matchIndex)}
            <strong>{suggestion.slice(matchIndex, matchIndex+inputWord.length)}</strong>
            {suggestion.slice(matchIndex+inputWord.length)}
          </li>
        );
      })}
    </ul>
  );

  return (
   <div className="base">
     <div className="form-filed">
        <input
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={inputWord}
        />
        {showSuggestions && suggestionList}
      </div>

      <button className='submit-button' onClick={onSubmitButtonClick}>Submit</button>
    </div>
  );
};

export default App;
