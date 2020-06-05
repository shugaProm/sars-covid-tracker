import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";

import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  // fetchedCountries reps the state value and setFetchedCountries reps the value set to be the new state with setState
  const [fetchedCountries, setFetchedCountries] = useState([]);
  useEffect(() => {
    // set an async fxn where we can await the countries while they are being fetched, we are going to set them to the state
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setFetchedCountries]);
  // the second parameter is going make the useEffect not run endlessly. The useEffect will run only when setFetchedCountries change
  // fetchedCountries are now present in the state
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="global">Global</option>
        {fetchedCountries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
