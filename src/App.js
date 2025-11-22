import React, { Component } from "react";
import Hotels from "./Hotels";
import Filters from "./Filters";
import { useTheme } from "./theme/useTheme.js";

// Functional wrapper to provide theme to class component
function ThemedAppWrapper() {
  const { darkMode, toggleDarkMode } = useTheme();
  return <AppWithTheme darkMode={darkMode} toggleTheme={toggleDarkMode} />;
}

class AppWithTheme extends Component {
  state = { selectedFilters: [] };

  toggleFilter = (clickedFilterKey) => {
    const { selectedFilters } = this.state;
    const alreadySelected = selectedFilters.includes(clickedFilterKey);
    const newFilters = alreadySelected
      ? selectedFilters.filter((f) => f !== clickedFilterKey)
      : selectedFilters.concat(clickedFilterKey);
    this.setState({ selectedFilters: newFilters });
  };

  render() {
    const { darkMode, toggleTheme } = this.props;
    const { selectedFilters } = this.state;

    return (
      <div
        style={{
          padding: "2rem",
          minHeight: "100vh",
          background: darkMode ? "#0a0f1a" : "#f5f5f5",
          color: darkMode ? "#cdd9e5" : "#222",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        {/* Fixed dark/light toggle button */}
        <button
          onClick={toggleTheme}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 999,
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            background: darkMode ? "#222" : "#ccc",
            color: darkMode ? "#fff" : "#000",
            transition: "all 0.3s ease",
          }}
        >
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>

        <h1>Hotel Finder</h1>
        <Filters
          selectedFilters={selectedFilters}
          toggleFilter={this.toggleFilter}
          darkMode={darkMode}
        />
        <Hotels selectedFilters={selectedFilters} darkMode={darkMode} />
      </div>
    );
  }
}

export default ThemedAppWrapper;
