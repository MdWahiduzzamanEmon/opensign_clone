import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const CRadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  disabledOptions = [],
  row = false,
}) => {
  return (
    <FormControl>
      <FormLabel
        component="legend"
        color="secondary"
        sx={{
          fontWeight: 'bold',
        }}
        id={`${name}-label`}
      >
        {label}
      </FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
        color="secondary"
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio color="secondary" />}
            label={option.label}
            disabled={disabledOptions.includes(option.value)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CRadioGroup;
