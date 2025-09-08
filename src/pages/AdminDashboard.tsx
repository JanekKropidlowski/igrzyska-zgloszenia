import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LogOut, Users, Trophy, FileText, Download, Eye } from 'lucide-react';
import { mockWojewodztwa, mockKonkurencje, mockZawodnicy, mockZgloszenia } from '@/data/mockData';
import { Wojewodztwo, Konkurencja, Zawodnik, Zgloszenie } from '@/types';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const getZawodnicyForWojewodztwo = (wojewodztwoId: string): Zawodnik[] => {
    return mockZawodnicy.filter(z => z.wojewodztwoId === wojewodztwoId);
  };

  const getZgloszeniaForKonkurencja = (konkurencjaId: string) => {
    return mockZgloszenia.filter(z => z.konkurencjaId === konkurencjaId);
  };

  const getStatsData = () => {
    const totalWojewodztwa = mockWojewodztwa.length;
    const totalKonkurencje = mockKonkurencje.filter(k => k.aktywna).length;
    const totalZawodnicy = mockZawodnicy.length;
    const totalZgloszenia = mockZgloszenia.length;

    return { totalWojewodztwa, totalKonkurencje, totalZawodnicy, totalZgloszenia };
  };

  const stats = getStatsData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Panel Administratora</h1>
                <p className="text-sm text-muted-foreground">IV Ogólnopolskie Igrzyska LZS "Aktywna Wieś"</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user?.nazwa}</p>
                <p className="text-sm text-muted-foreground">Administrator</p>
              </div>
              <Button variant="outline" onClick={logout} size="sm">
                <LogOut className="w-4 h-4" />
                Wyloguj
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Przegląd</TabsTrigger>
            <TabsTrigger value="wojewodztwa">Województwa</TabsTrigger>
            <TabsTrigger value="konkurencje">Konkurencje</TabsTrigger>
            <TabsTrigger value="raporty">Raporty</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Województwa</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalWojewodztwa}</div>
                  <p className="text-xs text-muted-foreground">ekip biorących udział</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Konkurencje</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalKonkurencje}</div>
                  <p className="text-xs text-muted-foreground">aktywnych konkurencji</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Zawodnicy</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalZawodnicy}</div>
                  <p className="text-xs text-muted-foreground">zarejestrowanych zawodników</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Zgłoszenia</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalZgloszenia}</div>
                  <p className="text-xs text-muted-foreground">złożonych zgłoszeń</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ostatnie zgłoszenia</CardTitle>
                <CardDescription>Przegląd najnowszych zgłoszeń od województw</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockZgloszenia.slice(-5).map((zgloszenie) => {
                    const wojewodztwo = mockWojewodztwa.find(w => w.id === zgloszenie.wojewodztwoId);
                    const konkurencja = mockKonkurencje.find(k => k.id === zgloszenie.konkurencjaId);
                    return (
                      <div key={zgloszenie.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{wojewodztwo?.nazwa}</p>
                          <p className="text-sm text-muted-foreground">{konkurencja?.nazwa}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={zgloszenie.status === 'submitted' ? 'default' : 'secondary'}>
                            {zgloszenie.status === 'submitted' ? 'Złożone' : 'Szkic'}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            {zgloszenie.zawodnicyIds.length}/3 zawodników
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Województwa Tab */}
          <TabsContent value="wojewodztwa" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista województw</CardTitle>
                <CardDescription>Przegląd wszystkich województw biorących udział w Igrzyskach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockWojewodztwa.map((wojewodztwo) => {
                    const zawodnicy = getZawodnicyForWojewodztwo(wojewodztwo.id);
                    const zgloszenia = mockZgloszenia.filter(z => z.wojewodztwoId === wojewodztwo.id);
                    
                    return (
                      <Card key={wojewodztwo.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{wojewodztwo.nazwa}</CardTitle>
                          <CardDescription>Login: {wojewodztwo.login}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Zawodnicy:</span>
                            <span className="font-medium">{zawodnicy.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Zgłoszenia:</span>
                            <span className="font-medium">{zgloszenia.length}</span>
                          </div>
                          {wojewodztwo.kontakt?.przedstawiciel && (
                            <div className="text-sm text-muted-foreground pt-2 border-t">
                              Przedstawiciel: {wojewodztwo.kontakt.przedstawiciel}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Konkurencje Tab */}
          <TabsContent value="konkurencje" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista konkurencji</CardTitle>
                <CardDescription>Przegląd wszystkich konkurencji z liczbą zgłoszeń</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockKonkurencje.map((konkurencja) => {
                    const zgloszenia = getZgloszeniaForKonkurencja(konkurencja.id);
                    
                    return (
                      <div key={konkurencja.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{konkurencja.nazwa}</h3>
                            <Badge variant="outline">{konkurencja.kategoria}</Badge>
                            {!konkurencja.aktywna && <Badge variant="secondary">Nieaktywna</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{konkurencja.opis}</p>
                          {konkurencja.wymagania && (
                            <p className="text-xs text-muted-foreground">Wymagania: {konkurencja.wymagania}</p>
                          )}
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-medium">{zgloszenia.length} zgłoszeń</p>
                          <p className="text-sm text-muted-foreground">
                            {zgloszenia.length * 3} zawodników max
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Raporty Tab */}
          <TabsContent value="raporty" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generowanie raportów</CardTitle>
                <CardDescription>Eksportuj listy startowe i karty dla sędziów</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="lzs" className="h-20 flex-col gap-2">
                    <Download className="w-6 h-6" />
                    Pobierz listy startowe
                    <span className="text-xs opacity-90">PDF ze wszystkimi konkurencjami</span>
                  </Button>
                  
                  <Button variant="lzs-outline" className="h-20 flex-col gap-2">
                    <FileText className="w-6 h-6" />
                    Generuj karty dla sędziów
                    <span className="text-xs opacity-90">Karty indywidualne z QR kodami</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Eye className="w-6 h-6" />
                    Podgląd zgłoszeń
                    <span className="text-xs text-muted-foreground">Sprawdź kompletność danych</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Users className="w-6 h-6" />
                    Lista wszystkich zawodników
                    <span className="text-xs text-muted-foreground">Eksport do Excel/CSV</span>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Informacje o eksporcie:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Listy startowe zawierają: konkurencja, województwo, zawodnicy</li>
                    <li>• Karty dla sędziów: osobne karty z QR kodami dla każdego zawodnika</li>
                    <li>• Wszystkie pliki są generowane w formacie PDF</li>
                    <li>• Eksport można pobrać natychmiast po wygenerowaniu</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}