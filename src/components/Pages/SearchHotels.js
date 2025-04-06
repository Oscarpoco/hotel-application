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
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.8)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff",
    },
    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    "& .MuiSelect-icon": {
      color: "rgba(255, 255, 255, 0.7)",
    },
  },
  priceField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255, 255, 255, 0.5)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255, 255, 255, 0.8)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.7)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-input": {
      color: "#fff",
    },
  },
  searchButton: {
    background: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    borderRadius: "12px",
    borderColor: "#fff",
    border: "1px solid",
    backdropFilter: "blur(10px)",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.3)",
      borderColor: "#fff",
    },
  },

  title: {
    color: "#fff",
    marginBottom: "1.5em",
    fontWeight: 600,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
  },
});

const SearchHotels = ({ onSearch }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [availability, setAvailability] = useState("all");

  const handleSearch = () => {
    onSearch({ searchQuery, minPrice, maxPrice, availability });
  };

  return (
    <Box className={classes.searchContainer}>
      <Typography variant="h4" component="h2" gutterBottom className={classes.title}>
        Find Your Perfect Stay
      </Typography>

      <TextField
        label="Search by location, hotel name, etc."
        placeholder="Search by location (Johannesburg only), hotel name, etc."
        variant="outlined"
        fullWidth
        className={classes.inputField}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Min Price (ZAR)"
            type="number"
            variant="outlined"
            className={classes.priceField}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Max Price (ZAR)"
            type="number"
            variant="outlined"
            className={classes.priceField}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Grid>
      </Grid>

      <TextField
        select
        label="Availability"
        fullWidth
        variant="outlined"
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
        className={classes.inputField}
      >
        <MenuItem value="all" className={classes.menuItem}>All</MenuItem>
        <MenuItem value="available" className={classes.menuItem}>Available</MenuItem>
        <MenuItem value="booked" className={classes.menuItem}>Booked</MenuItem>
      </TextField>

      <Button
        className={classes.searchButton}
        variant="outlined"
        size="large"
        onClick={handleSearch}
      >
        Search Hotels
      </Button>
    </Box>
  );
};

export default SearchHotels;