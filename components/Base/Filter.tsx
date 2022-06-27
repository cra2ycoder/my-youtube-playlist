import { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface IFilterProps {
  label: string
  list: string[]
  shouldDisable?: boolean
  onFilterChange?: (val: string, label?: string) => void
}

function Filter(props: IFilterProps) {
  const [activeFilter, setActiveFilter] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    let val = event.target.value as string
    setActiveFilter(val)
    props?.onFilterChange(val, props?.label)
  }

  return (
    <Box
      sx={{
        minWidth: 120,
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
        opacity: props?.shouldDisable ? 0.4 : 1,
        pointerEvents: props?.shouldDisable ? 'none' : 'auto',
      }}
    >
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120, width: '220px' }}
      >
        <InputLabel id="demo-simple-select-label">
          {props?.label || ''}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeFilter}
          label={props?.label || ''}
          onChange={handleChange}
        >
          {props?.list?.map((x, idx) => (
            <MenuItem key={`menu-item-${idx}`} value={x}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export { Filter }
export default Filter
