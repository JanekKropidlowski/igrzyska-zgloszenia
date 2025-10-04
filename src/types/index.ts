// Typy danych dla II Mistrzostw Województwa Pomorskiego Szkół Ponadpodstawowych w Strzelectwie

export interface Szkola {
  id: string;
  nazwa: string;
  login: string;
  haslo: string;
  kontakt?: {
    email?: string;
    telefon?: string;
    opiekun?: string;
  };
}

export interface Zawodnik {
  id: string;
  imie: string;
  nazwisko: string;
  rokUrodzenia: string;
  plec: 'K' | 'M';
  szkolaId: string;
  numerStartowy?: number;
}

export interface Konkurencja {
  id: string;
  nazwa: string;
  opis: string;
  typ: 'strzelectwo' | 'bieg' | 'rzut_granatem';
  aktywna: boolean;
}

export interface WynikStrzelectwo {
  id: string;
  zawodnikId: string;
  bronKrotka: number[]; // 5 strzałów
  bronDluga: number[]; // 5 strzałów
  suma: number;
  miejsce?: number;
  punktyDruzyna?: number;
}

export interface WynikBieg {
  id: string;
  zawodnikId: string;
  czas?: string;
  miejsce: number;
}

export interface WynikRzutGranatem {
  id: string;
  zawodnikId: string;
  rzuty: number[]; // 3 rzuty (punkty: 0, 1, 2, 3)
  pomiarOdSrodka?: number[]; // w cm, przy remisie
  suma: number;
  miejsce?: number;
  punktyDruzyna?: number;
}

export interface Zgloszenie {
  id: string;
  szkolaId: string;
  zawodnicyIds: string[]; // dokładnie 6 (3K + 3M)
  dataZgloszenia: string;
  status: 'draft' | 'submitted' | 'confirmed';
  uwagi?: string;
}

export interface AuthUser {
  id: string;
  role: 'szkola' | 'admin';
  szkolaId?: string;
  nazwa: string;
}

// Typy dla widoków
export interface ZgloszenieDetailed extends Zgloszenie {
  szkola: Szkola;
  zawodnicy: Zawodnik[];
}

export interface KlasyfikacjaDruzyna {
  szkola: Szkola;
  zawodnicy: Zawodnik[];
  punktyLacznie: number;
  wyniki: {
    strzelectwo: WynikStrzelectwo[];
    bieg: WynikBieg[];
    rzutGranatem: WynikRzutGranatem[];
  };
}