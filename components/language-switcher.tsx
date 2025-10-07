"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState('en')
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (document.getElementById('google-translate-script')) {
      return
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      )
      setInitialized(true)
    }

    document.body.appendChild(script)

    const style = document.createElement('style')
    style.innerHTML = `
      .goog-te-banner-frame { display: none !important; }
      .goog-te-combo { display: none !important; }
      body { top: 0 !important; }
      .skiptranslate { display: none !important; }
    `
    document.head.appendChild(style)
  }, [])

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en'
    setCurrentLang(newLang)
    
    setTimeout(() => {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement
      if (selectElement) {
        selectElement.value = newLang
        selectElement.dispatchEvent(new Event('change', { bubbles: true }))
      }
    }, 100)
  }

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="flex items-center gap-2"
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang === 'en' ? 'हिंदी' : 'English'}</span>
      </Button>
    </>
  )
}
