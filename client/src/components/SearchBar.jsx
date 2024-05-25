import { Grid } from '@mui/material'
import React from 'react'

export default function SearchBar({onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm.toLowerCase());
  };
  return (
    <
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </Grid>
        <Grid item>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Grid>

      </Grid>
    </>
  )
}
