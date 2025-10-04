// Przykładowe dane dla II Mistrzostw Województwa Pomorskiego Szkół Ponadpodstawowych w Strzelectwie
import { Szkola, Zawodnik, Konkurencja, Zgloszenie } from '@/types';

export const mockSzkoly: Szkola[] = [
  {
    id: 'szkola-1',
    nazwa: 'Powiatowy Zespół Szkół w Kłaninie',
    login: 'pzs-klanino',
    haslo: 'haslo123',
    kontakt: {
      email: 'sekretariat@pzs-klanino.pl',
      telefon: '+48 123 456 789',
      opiekun: 'Jan Kowalski'
    }
  },
  {
    id: 'szkola-2',
    nazwa: 'Liceum Ogólnokształcące w Pucku',
    login: 'lo-puck',
    haslo: 'haslo123',
    kontakt: {
      email: 'biuro@lo-puck.pl',
      telefon: '+48 123 456 790',
      opiekun: 'Anna Nowak'
    }
  },
  {
    id: 'szkola-3',
    nazwa: 'Technikum w Wejherowie',
    login: 'technikum-wejherowo',
    haslo: 'haslo123',
    kontakt: {
      email: 'kontakt@technikum-wejherowo.pl',
      telefon: '+48 123 456 791',
      opiekun: 'Piotr Wiśniewski'
    }
  },
  {
    id: 'szkola-4',
    nazwa: 'Zespół Szkół w Łebczu',
    login: 'zs-lebcz',
    haslo: 'haslo123',
    kontakt: {
      email: 'sekretariat@zs-lebcz.pl',
      telefon: '+48 123 456 792',
      opiekun: 'Maria Kowalczyk'
    }
  },
  {
    id: 'szkola-5',
    nazwa: 'Liceum w Somoninie',
    login: 'lo-somonino',
    haslo: 'haslo123',
    kontakt: {
      email: 'biuro@lo-somonino.pl',
      telefon: '+48 123 456 793',
      opiekun: 'Tomasz Lewandowski'
    }
  }
];

export const mockZawodnicy: Zawodnik[] = [
  // Zawodnicy ze szkoły 1 (Kłanino)
  {
    id: 'z-1',
    imie: 'Adam',
    nazwisko: 'Kowalski',
    rokUrodzenia: '2007',
    plec: 'M',
    szkolaId: 'szkola-1',
    numerStartowy: 101
  },
  {
    id: 'z-2',
    imie: 'Anna',
    nazwisko: 'Nowak',
    rokUrodzenia: '2008',
    plec: 'K',
    szkolaId: 'szkola-1',
    numerStartowy: 102
  },
  {
    id: 'z-3',
    imie: 'Piotr',
    nazwisko: 'Wiśniewski',
    rokUrodzenia: '2007',
    plec: 'M',
    szkolaId: 'szkola-1',
    numerStartowy: 103
  },
  {
    id: 'z-4',
    imie: 'Katarzyna',
    nazwisko: 'Wójcik',
    rokUrodzenia: '2008',
    plec: 'K',
    szkolaId: 'szkola-1',
    numerStartowy: 104
  },
  {
    id: 'z-5',
    imie: 'Marcin',
    nazwisko: 'Kowalczyk',
    rokUrodzenia: '2007',
    plec: 'M',
    szkolaId: 'szkola-1',
    numerStartowy: 105
  },
  {
    id: 'z-6',
    imie: 'Magdalena',
    nazwisko: 'Lewandowska',
    rokUrodzenia: '2008',
    plec: 'K',
    szkolaId: 'szkola-1',
    numerStartowy: 106
  },
  // Zawodnicy ze szkoły 2 (Puck)
  {
    id: 'z-7',
    imie: 'Jakub',
    nazwisko: 'Zieliński',
    rokUrodzenia: '2007',
    plec: 'M',
    szkolaId: 'szkola-2',
    numerStartowy: 201
  },
  {
    id: 'z-8',
    imie: 'Monika',
    nazwisko: 'Szymańska',
    rokUrodzenia: '2008',
    plec: 'K',
    szkolaId: 'szkola-2',
    numerStartowy: 202
  },
  {
    id: 'z-9',
    imie: 'Łukasz',
    nazwisko: 'Dąbrowski',
    rokUrodzenia: '2007',
    plec: 'M',
    szkolaId: 'szkola-2',
    numerStartowy: 203
  },
  {
    id: 'z-10',
    imie: 'Agnieszka',
    nazwisko: 'Kozłowska',
    rokUrodzenia: '2008',
    plec: 'K',
    szkolaId: 'szkola-2',
    numerStartowy: 204
  },
  {
    id: 'z-11',
    imie: 'Krzysztof',
    nazwisko: 'Jankowski',
    rokUrodzenia: '2007',
    plec: 'M',
    szkolaId: 'szkola-2',
    numerStartowy: 205
  },
  {
    id: 'z-12',
    imie: 'Natalia',
    nazwisko: 'Mazur',
    rokUrodzenia: '2008',
    plec: 'K',
    szkolaId: 'szkola-2',
    numerStartowy: 206
  }
];

export const mockKonkurencje: Konkurencja[] = [
  {
    id: 'k-1',
    nazwa: 'Strzelectwo',
    opis: '5 strzałów z broni krótkiej + 5 strzałów z broni długiej (pozycja stojąca, 5m). Przed strzelaniem 5 strzałów próbnych.',
    typ: 'strzelectwo',
    aktywna: true
  },
  {
    id: 'k-2',
    nazwa: 'Bieg przełajowy',
    opis: 'Dystans ok. 1000m. Klasyfikacja według miejsca na mecie.',
    typ: 'bieg',
    aktywna: true
  },
  {
    id: 'k-3',
    nazwa: 'Rzut granatem do celu',
    opis: 'Dziewczęta: 15m, chłopcy: 20m. Cel: 3 koła (1m, 2m, 3m). Trafienie: 3/2/1 pkt. 3 rzuty na zawodnika.',
    typ: 'rzut_granatem',
    aktywna: true
  }
];

export const mockZgloszenia: Zgloszenie[] = [
  {
    id: 'zg-1',
    szkolaId: 'szkola-1',
    zawodnicyIds: ['z-1', 'z-2', 'z-3', 'z-4', 'z-5', 'z-6'],
    dataZgloszenia: '2025-09-15T10:00:00Z',
    status: 'submitted'
  },
  {
    id: 'zg-2',
    szkolaId: 'szkola-2',
    zawodnicyIds: ['z-7', 'z-8', 'z-9', 'z-10', 'z-11', 'z-12'],
    dataZgloszenia: '2025-09-16T11:00:00Z',
    status: 'submitted'
  }
];

// Punktacja drużynowa wg miejsca
export const punktacjaMiejsce: { [key: number]: number } = {
  1: 15, 2: 13, 3: 11, 4: 10, 5: 9, 6: 8, 7: 7, 8: 6, 
  9: 5, 10: 4, 11: 3, 12: 2
};
// Miejsca 13 i dalej = 1 pkt

// Dane administratora
export const adminCredentials = {
  login: 'admin',
  haslo: 'admin2025'
};