
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import { LanguageContainer, SectionContainer } from './styled'

export default function Language() {
  const [lang, setLang] = useState('En');
  
  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value)
  }

  return (
    <LanguageContainer>
      <Select
        value={lang}
        label="lang"
        onChange={handleChange}
        variant="filled"
      >
        <MenuItem value={'En'}>English</MenuItem>
        <MenuItem value={'Id'}>Indonesia</MenuItem>
      </Select>
    </LanguageContainer>
  )
}
