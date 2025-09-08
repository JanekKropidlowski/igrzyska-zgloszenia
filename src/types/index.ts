// Typy danych dla systemu zgłoszeń LZS

export interface Wojewodztwo {
  id: string;
  nazwa: string;
  login: string;
  haslo: string;
  kontakt?: {
    email?: string;
    telefon?: string;
    przedstawiciel?: string;
  };
}

export interface Zawodnik {
  id: string;
  imie: string;
  nazwisko: string;
  pesel: string;
  plec: 'M' | 'K';
  telefon: string;
  wojewodztwoId: string;
  dataUrodzenia?: string;
  uwagi?: string;
}

export interface Konkurencja {
  id: string;
  nazwa: string;
  opis: string;
  kategoria: 'sportowa' | 'kulturalna' | 'edukacyjna';
  maksymalnaLiczbaBiorczych: number; // domyślnie 3
  wymagania?: string;
  aktywna: boolean;
}

export interface Zgloszenie {
  id: string;
  wojewodztwoId: string;
  konkurencjaId: string;
  zawodnicyIds: string[]; // maksymalnie 3
  dataZgloszenia: string;
  status: 'draft' | 'submitted' | 'confirmed';
  uwagi?: string;
}

export interface AuthUser {
  id: string;
  role: 'wojewodztwo' | 'admin';
  wojewodztwoId?: string;
  nazwa: string;
}

// Typy dla widoków
export interface ZgloszenieDetailed extends Zgloszenie {
  wojewodztwo: Wojewodztwo;
  konkurencja: Konkurencja;
  zawodnicy: Zawodnik[];
}

export interface KonkurencjaStats {
  konkurencja: Konkurencja;
  liczbaZgloszen: number;
  zgloszenieDetailedList: ZgloszenieDetailed[];
}