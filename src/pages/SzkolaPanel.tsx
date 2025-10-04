import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockSzkoly, mockZawodnicy, mockZgloszenia, mockKonkurencje } from '@/data/mockData';
import { Zawodnik } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LogOut, Target, Users, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';

export default function SzkolaPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const szkola = mockSzkoly.find(s => s.id === user?.szkolaId);
  const zawodnicy = mockZawodnicy.filter(z => z.szkolaId === user?.szkolaId);
  const zgloszenie = mockZgloszenia.find(z => z.szkolaId === user?.szkolaId);

  const zgloszenizawodnicy: Zawodnik[] = zgloszenie 
    ? zawodnicy.filter(z => zgloszenie.zawodnicyIds.includes(z.id))
    : [];

  const dziewczeta = zgloszenizawodnicy.filter(z => z.plec === 'K');
  const chlopcy = zgloszenizawodnicy.filter(z => z.plec === 'M');

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.info('Wylogowano');
  };

  if (!szkola) {
    return <div>Nie znaleziono szkoły</div>;
  }

  const isComplete = dziewczeta.length === 3 && chlopcy.length === 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{szkola.nazwa}</h1>
            <p className="text-muted-foreground">Panel zgłoszeniowy szkoły</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Wyloguj
          </Button>
        </div>

        {/* Info card */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Informacje o zawodach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>Data:</strong> 10 października 2025, godz. 10:00</p>
            <p><strong>Miejsce:</strong> Powiatowy Zespół Szkół w Kłaninie, ul. Szkolna 4, 84-107 Kłanino</p>
            <p><strong>Termin zgłoszeń:</strong> do 3 października 2025</p>
            <p><strong>Skład drużyny:</strong> 6 zawodników (3 dziewczęta + 3 chłopców)</p>
            <p><strong>Konkurencje:</strong> Strzelectwo, Bieg przełajowy (1000m), Rzut granatem do celu</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Status zgłoszenia */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Status zgłoszenia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {zgloszenie ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <Badge variant={zgloszenie.status === 'submitted' ? 'default' : 'secondary'}>
                      {zgloszenie.status === 'submitted' ? 'Zgłoszono' : 
                       zgloszenie.status === 'confirmed' ? 'Potwierdzone' : 'Wersja robocza'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data zgłoszenia:</span>
                    <span className="text-sm">{new Date(zgloszenie.dataZgloszenia).toLocaleDateString('pl-PL')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Kompletność drużyny:</span>
                    <Badge variant={isComplete ? 'default' : 'destructive'}>
                      {isComplete ? 'Kompletna' : 'Niekompletna'}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Brak zgłoszenia</p>
              )}
            </CardContent>
          </Card>

          {/* Kontakt */}
          <Card>
            <CardHeader>
              <CardTitle>Dane kontaktowe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Opiekun:</strong> {szkola.kontakt?.opiekun || 'Nie podano'}</p>
              <p><strong>Email:</strong> {szkola.kontakt?.email || 'Nie podano'}</p>
              <p><strong>Telefon:</strong> {szkola.kontakt?.telefon || 'Nie podano'}</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista zawodników */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Zgłoszeni zawodnicy
            </CardTitle>
            <CardDescription>
              Drużyna musi składać się z 3 dziewcząt i 3 chłopców
            </CardDescription>
          </CardHeader>
          <CardContent>
            {zgloszenizawodnicy.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">Brak zgłoszonych zawodników</p>
            ) : (
              <>
                <div className="mb-4 flex gap-4">
                  <Badge variant="outline">Dziewczęta: {dziewczeta.length}/3</Badge>
                  <Badge variant="outline">Chłopcy: {chlopcy.length}/3</Badge>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nr startowy</TableHead>
                        <TableHead>Imię i nazwisko</TableHead>
                        <TableHead>Rok urodzenia</TableHead>
                        <TableHead>Płeć</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {zgloszenizawodnicy.map((zawodnik) => (
                        <TableRow key={zawodnik.id}>
                          <TableCell className="font-medium">{zawodnik.numerStartowy}</TableCell>
                          <TableCell>{zawodnik.imie} {zawodnik.nazwisko}</TableCell>
                          <TableCell>{zawodnik.rokUrodzenia}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {zawodnik.plec === 'K' ? 'Dziewczyna' : 'Chłopiec'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Konkurencje */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Konkurencje</CardTitle>
            <CardDescription>Wszyscy zawodnicy biorą udział we wszystkich konkurencjach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockKonkurencje.map((konkurencja) => (
                <div key={konkurencja.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-1">{konkurencja.nazwa}</h3>
                  <p className="text-sm text-muted-foreground">{konkurencja.opis}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
