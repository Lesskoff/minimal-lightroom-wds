import React, { useState } from "react";
import "./App.css";
import SidebarItem from "./SidebarItem";
import Slider from "./Slider";
import { DEFAULT_OPTIONS } from "./filterOptions";

function App() {
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const selectedOption = options[selectedOptionIndex];

  const imageURL =
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1932&q=80";

  const handleSliderChange = ({ target }) => {
    setOptions((preventOptions) => {
      return preventOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: target.value };
      });
    });
  };

  const getImageStyle = () => {
    const filters = options.map(
      (option) => `${option.property}(${option.value}${option.unit})`
    );

    return {
      backgroundImage: `url(${imageURL})`,
      filter: filters.join(" "),
    };
  };

  console.log(getImageStyle());

  return (
    <div className="app">
      <div className="app__mainImage" style={getImageStyle()} />
      <div className="app__sidebar">
        {options.map((option, index) => (
          <SidebarItem
            key={index}
            name={option.name}
            active={index === selectedOptionIndex}
            handleClick={() => setSelectedOptionIndex(index)}
          />
        ))}
      </div>
      <div className="app__slider">
        <Slider
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </div>
    </div>
  );
}

export default App;
