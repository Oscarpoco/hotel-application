import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Grid,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  searchContainer: {
    width: '100%',
    margin: "0 auto",
    padding: "2em 0",
    textAlign: "center",
    background: "inherit",
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    alignItems: 'center'
  },
  inputField: {
    marginBottom: "1.5em",
  },
  priceField: {
    width: "100%",
  },
  searchButton: {
    background: "#1877f2",
    color: "#fff",
    "&:hover": {
      background: "#155bb5",
    },
  },
});

const SearchHotels = () => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("all");

  // Handle change in input fields
  const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handleAvailabilityChange = (e) => setAvailability(e.target.value);

  // Handle search button click
  const handleSearch = () => {
    console.log("Search for:", searchQuery, minPrice, maxPrice, availability);
  };

  return (
    <Box className={classes.searchContainer}>
      <Typography variant="h4" component="h2" gutterBottom>
        Find Your Perfect Stay
      </Typography>

      <TextField
        label="Search by location, hotel name, etc."
        variant="outlined"
        fullWidth
        className={classes.inputField}
        value={searchQuery}
        onChange={handleSearchQueryChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Min Price (ZAR)"
            type="number"
            variant="outlined"
            className={classes.priceField}
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Max Price (ZAR)"
            type="number"
            variant="outlined"
            className={classes.priceField}
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </Grid>
      </Grid>

      <TextField
        select
        label="Availability"
        fullWidth
        variant="outlined"
        value={availability}
        onChange={handleAvailabilityChange}
        className={classes.inputField}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="available">Available</MenuItem>
        <MenuItem value="unavailable">Unavailable</MenuItem>
      </TextField>

      <Button
        className={classes.searchButton}
        variant="contained"
        size="large"
        onClick={handleSearch}
      >
        Search Hotels
      </Button>
    </Box>
  );
};

export default SearchHotels;
