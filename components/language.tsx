
import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useRouter } from 'next/router';
import { useState } from 'react';
import {  LocaleDetail } from '../utils/consts';
import { LanguageContainer } from './styled'

export default function Language() {
  const router = useRouter()
  const { locales, locale: activeLocale } = router;
  const [lang, setLang] = useState(activeLocale);
  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value)
    router.push(router.asPath, router.asPath, { locale: event.target.value });
  }

  return (
    <LanguageContainer>
      <Select
        value={lang}
        label="lang"
        onChange={handleChange}
        variant="filled"
        sx={{
          '.MuiFilledInput-input': {
            paddingTop: '4px',
            paddingBottom: '4px',
            color: '#7B8082'
          },
          '.MuiSelect-icon' : {
            color: '#7B8082'
          },
          '.MuiSelect' : {
            borderRadius: '4px'
          },
          '.MuiSelect-select.MuiSelect-filled' : {
            display: 'flex',
            alignItems: 'center'
          },
          '.MuiSelect-select.MuiSelect-filled:before' : {
            content: `url('/language.svg')`,
            paddingRight: '8px',
            paddingTop: '4px'
          }
        }}
      >
        {(locales || []).map((locale) => {
          return (
            <MenuItem value={locale} key={`locale-${locale}`}>
              {LocaleDetail[locale]}
            </MenuItem>
          )
        })}
      </Select>
    </LanguageContainer>
  )
}
