import * as countryRegionData from 'country-region-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface CountrySelectProps {
    name?: string;
    ref?: any;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}
  
export function CountrySelect(props: CountrySelectProps) {
    return (
      <Select disabled={props.disabled} onValueChange={props.onChange} name={props.name}>
        <SelectTrigger className={props.className}>
          <SelectValue placeholder={props.placeholder ? props.placeholder : "Select a country"}/>
        </SelectTrigger>
        <SelectContent className="bg-popover w-full">
            {
                countryRegionData.countryTuples.map((c) => (
                    <SelectItem key={c[1]} value={c[1]} className="max-w-full truncate text-left">
                        {c[0]}
                    </SelectItem>
                ))
            }
        </SelectContent>
      </Select>
    );
}

interface StateSelectProps {
    country?: string;
    name?: string;
    ref?: any;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function StateSelect(props: StateSelectProps) {
    let countryData = null;
    let regions: countryRegionData.Region[] = [];


    if (props.country) {
        countryData = countryRegionData.allCountries.find((c) => c[1] == props.country);
        regions = countryData ? countryData[2] : [];
    }

    return (
      <Select disabled={props.disabled} onValueChange={props.onChange} name={props.name}>
        <SelectTrigger className={props.className}>
          <SelectValue placeholder={props.placeholder ? props.placeholder : "Select a state"}/>
        </SelectTrigger>
        <SelectContent className="bg-background">
            {
                regions.map((r) => (
                    <SelectItem key={r[1]} value={r[1]}>
                        {r[0]}
                    </SelectItem>
                ))
            }
        </SelectContent>
      </Select>
    );
}
  
  