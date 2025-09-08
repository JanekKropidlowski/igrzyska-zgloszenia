// Przykładowe dane dla systemu zgłoszeń LZS
import { Wojewodztwo, Zawodnik, Konkurencja, Zgloszenie } from '@/types';

export const mockWojewodztwa: Wojewodztwo[] = [
  {
    id: 'woj-1',
    nazwa: 'Małopolskie',
    login: 'malopolskie',
    haslo: 'haslo123',
    kontakt: {
      email: 'malopolskie@lzs.pl',
      telefon: '+48 123 456 789',
      przedstawiciel: 'Jan Kowalski'
    }
  },
  {
    id: 'woj-2',
    nazwa: 'Pomorskie',
    login: 'pomorskie',
    haslo: 'haslo123',
    kontakt: {
      email: 'pomorskie@lzs.pl',
      telefon: '+48 123 456 790',
      przedstawiciel: 'Anna Nowak'
    }
  },
  {
    id: 'woj-3',
    nazwa: 'Śląskie',
    login: 'slaskie',
    haslo: 'haslo123',
    kontakt: {
      email: 'slaskie@lzs.pl',
      telefon: '+48 123 456 791',
      przedstawiciel: 'Piotr Wiśniewski'
    }
  },
  {
    id: 'woj-4',
    nazwa: 'Mazowieckie',
    login: 'mazowieckie',
    haslo: 'haslo123',
    kontakt: {
      email: 'mazowieckie@lzs.pl',
      telefon: '+48 123 456 792',
      przedstawiciel: 'Maria Kowalczyk'
    }
  },
  {
    id: 'woj-5',
    nazwa: 'Wielkopolskie',
    login: 'wielkopolskie',
    haslo: 'haslo123',
    kontakt: {
      email: 'wielkopolskie@lzs.pl',
      telefon: '+48 123 456 793',
      przedstawiciel: 'Tomasz Lewandowski'
    }
  },
  // Dodaj pozostałe województwa...
  {
    id: 'woj-6',
    nazwa: 'Dolnośląskie',
    login: 'dolnoslaskie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-7',
    nazwa: 'Kujawsko-Pomorskie',
    login: 'kujawsko-pomorskie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-8',
    nazwa: 'Lubelskie',
    login: 'lubelskie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-9',
    nazwa: 'Lubuskie',
    login: 'lubuskie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-10',
    nazwa: 'Łódzkie',
    login: 'lodzkie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-11',
    nazwa: 'Opolskie',
    login: 'opolskie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-12',
    nazwa: 'Podkarpackie',
    login: 'podkarpackie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-13',
    nazwa: 'Podlaskie',
    login: 'podlaskie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-14',
    nazwa: 'Świętokrzyskie',
    login: 'swietokrzyskie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-15',
    nazwa: 'Warmińsko-Mazurskie',
    login: 'warminsko-mazurskie',
    haslo: 'haslo123'
  },
  {
    id: 'woj-16',
    nazwa: 'Zachodniopomorskie',
    login: 'zachodniopomorskie',
    haslo: 'haslo123'
  }
];

export const mockZawodnicy: Zawodnik[] = [
  // Zawodnicy z Małopolskiego
  {
    id: 'z-1',
    imie: 'Adam',
    nazwisko: 'Kowalski',
    pesel: '90010112345',
    plec: 'M',
    telefon: '+48 500 100 200',
    wojewodztwoId: 'woj-1'
  },
  {
    id: 'z-2',
    imie: 'Anna',
    nazwisko: 'Nowak',
    pesel: '85030298765',
    plec: 'K',
    telefon: '+48 500 100 201',
    wojewodztwoId: 'woj-1'
  },
  {
    id: 'z-3',
    imie: 'Piotr',
    nazwisko: 'Wiśniewski',
    pesel: '88120556789',
    plec: 'M',
    telefon: '+48 500 100 202',
    wojewodztwoId: 'woj-1'
  },
  {
    id: 'z-4',
    imie: 'Katarzyna',
    nazwisko: 'Wójcik',
    pesel: '92050743210',
    plec: 'K',
    telefon: '+48 500 100 203',
    wojewodztwoId: 'woj-1'
  },
  {
    id: 'z-5',
    imie: 'Marcin',
    nazwisko: 'Kowalczyk',
    pesel: '87081265432',
    plec: 'M',
    telefon: '+48 500 100 204',
    wojewodztwoId: 'woj-1'
  },
  // Zawodnicy z Pomorskiego
  {
    id: 'z-6',
    imie: 'Magdalena',
    nazwisko: 'Lewandowska',
    pesel: '91070923456',
    plec: 'K',
    telefon: '+48 500 200 100',
    wojewodztwoId: 'woj-2'
  },
  {
    id: 'z-7',
    imie: 'Jakub',
    nazwisko: 'Zieliński',
    pesel: '89110834567',
    plec: 'M',
    telefon: '+48 500 200 101',
    wojewodztwoId: 'woj-2'
  },
  {
    id: 'z-8',
    imie: 'Monika',
    nazwisko: 'Szymańska',
    pesel: '86040145678',
    plec: 'K',
    telefon: '+48 500 200 102',
    wojewodztwoId: 'woj-2'
  },
  {
    id: 'z-9',
    imie: 'Łukasz',
    nazwisko: 'Dąbrowski',
    pesel: '93060267890',
    plec: 'M',
    telefon: '+48 500 200 103',
    wojewodztwoId: 'woj-2'
  },
  {
    id: 'z-10',
    imie: 'Agnieszka',
    nazwisko: 'Kozłowska',
    pesel: '84120378901',
    plec: 'K',
    telefon: '+48 500 200 104',
    wojewodztwoId: 'woj-2'
  }
];

export const mockKonkurencje: Konkurencja[] = [
  {
    id: 'k-1',
    nazwa: 'Siatkówka plażowa',
    opis: 'Turniej siatkówki plażowej dla drużyn mieszanych',
    kategoria: 'sportowa',
    maksymalnaLiczbaBiorczych: 3,
    wymagania: 'Minimum jedna kobieta w drużynie',
    aktywna: true
  },
  {
    id: 'k-2',
    nazwa: 'Biegi przełajowe',
    opis: 'Bieg indywidualny na dystansie 5km',
    kategoria: 'sportowa',
    maksymalnaLiczbaBiorczych: 3,
    wymagania: 'Wiek minimum 18 lat',
    aktywna: true
  },
  {
    id: 'k-3',
    nazwa: 'Konkurs kulinarny',
    opis: 'Przygotowanie tradycyjnej potrawy regionalnej',
    kategoria: 'kulturalna',
    maksymalnaLiczbaBiorczych: 3,
    wymagania: 'Przyniesienie własnych składników',
    aktywna: true
  },
  {
    id: 'k-4',
    nazwa: 'Quiz wiedzy o regionie',
    opis: 'Konkurs wiedzy o tradycjach i historii regionu',
    kategoria: 'edukacyjna',
    maksymalnaLiczbaBiorczych: 3,
    wymagania: 'Znajomość historii i kultury swojego województwa',
    aktywna: true
  },
  {
    id: 'k-5',
    nazwa: 'Tenis stołowy',
    opis: 'Turniej tenisa stołowego - gra pojedyncza',
    kategoria: 'sportowa',
    maksymalnaLiczbaBiorczych: 3,
    wymagania: 'Własna rakietka',
    aktywna: true
  },
  {
    id: 'k-6',
    nazwa: 'Występ artystyczny',
    opis: 'Prezentacja tańca lub pieśni ludowej',
    kategoria: 'kulturalna',
    maksymalnaLiczbaBiorczych: 3,
    wymagania: 'Czas wystąpienia maksymalnie 5 minut',
    aktywna: true
  },
  {
    id: 'k-7',
    nazwa: 'Szachy',
    opis: 'Turniej szachowy - rozgrywki indywidualne',
    kategoria: 'edukacyjna',
    maksymalnaLiczbaBiorczych: 3,
    wymagania: 'Znajomość zasad gry',
    aktywna: true
  },
  {
    id: 'k-8',
    nazwa: 'Rzut podkową',
    opis: 'Tradycyjna gra w rzucanie podkową do celu',
    kategoria: 'sportowa',
    maksymalnaLiczbaBiorczych: 3,
    wymagania: 'Brak przeciwwskazań zdrowotnych',
    aktywna: true
  }
];

export const mockZgloszenia: Zgloszenie[] = [
  {
    id: 'zg-1',
    wojewodztwoId: 'woj-1',
    konkurencjaId: 'k-1',
    zawodnicyIds: ['z-1', 'z-2', 'z-3'],
    dataZgloszenia: '2025-01-10T10:00:00Z',
    status: 'submitted'
  },
  {
    id: 'zg-2',
    wojewodztwoId: 'woj-2',
    konkurencjaId: 'k-1',
    zawodnicyIds: ['z-6', 'z-7', 'z-8'],
    dataZgloszenia: '2025-01-10T11:00:00Z',
    status: 'submitted'
  }
];

// Dane administratora
export const adminCredentials = {
  login: 'admin',
  haslo: 'admin2025'
};