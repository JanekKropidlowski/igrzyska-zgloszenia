import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { LogOut, Users, Trophy, Save, Eye, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mockWojewodztwa, mockKonkurencje, mockZawodnicy, mockZgloszenia } from '@/data/mockData';
import { Wojewodztwo, Konkurencja, Zawodnik, Zgloszenie } from '@/types';

export default function WojewodztwaPanel() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('zgloszenia');
  const [selectedZawodnicy, setSelectedZawodnicy] = useState<{[key: string]: string[]}>({});
  const [saveMessage, setSaveMessage] = useState('');

  // Pobierz dane dla zalogowanego województwa
  const wojewodztwo = mockWojewodztwa.find(w => w.id === user?.wojewodztwoId);
  const zawodnicy = mockZawodnicy.filter(z => z.wojewodztwoId === user?.wojewodztwoId);
  const zgloszenia = mockZgloszenia.filter(z => z.wojewodztwoId === user?.wojewodztwoId);
  const konkurencje = mockKonkurencje.filter(k => k.aktywna);

  const handleZawodnikSelect = (konkurencjaId: string, zawodnikId: string, checked: boolean) => {
    setSelectedZawodnicy(prev => {
      const current = prev[konkurencjaId] || [];
      
      if (checked) {
        // Dodaj zawodnika, ale tylko jeśli nie ma już 3
        if (current.length < 3) {
          return {
            ...prev,
            [konkurencjaId]: [...current, zawodnikId]
          };
        }
        return prev;
      } else {
        // Usuń zawodnika
        return {
          ...prev,
          [konkurencjaId]: current.filter(id => id !== zawodnikId)
        };
      }
    });
  };

  const saveZgloszenia = () => {
    // Symulacja zapisywania
    setSaveMessage('Zgłoszenia zostały zapisane pomyślnie!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const getZgloszenieForKonkurencja = (konkurencjaId: string) => {
    return zgloszenia.find(z => z.konkurencjaId === konkurencjaId);
  };

  const isZawodnikSelected = (konkurencjaId: string, zawodnikId: string) => {
    const selected = selectedZawodnicy[konkurencjaId] || [];
    return selected.includes(zawodnikId);
  };

  const getSelectedCount = (konkurencjaId: string) => {
    return (selectedZawodnicy[konkurencjaId] || []).length;
  };

  if (!wojewodztwo) {
    return <div>Błąd: Nie znaleziono danych województwa</div>;
  }

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
                <h1 className="text-xl font-bold">Panel Województwa</h1>
                <p className="text-sm text-muted-foreground">{wojewodztwo.nazwa}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{wojewodztwo.nazwa}</p>
                <p className="text-sm text-muted-foreground">{zawodnicy.length} zawodników</p>
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
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="zgloszenia">Zgłoszenia</TabsTrigger>
            <TabsTrigger value="zawodnicy">Zawodnicy</TabsTrigger>
            <TabsTrigger value="przegladaj">Przegląd</TabsTrigger>
          </TabsList>

          {/* Zgłoszenia Tab */}
          <TabsContent value="zgloszenia" className="space-y-6">
            {saveMessage && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{saveMessage}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Zgłoszenia do konkurencji</h2>
                <p className="text-muted-foreground">Wybierz 3 zawodników dla każdej konkurencji</p>
              </div>
              <Button variant="lzs" onClick={saveZgloszenia}>
                <Save className="w-4 h-4" />
                Zapisz zgłoszenia
              </Button>
            </div>

            <div className="grid gap-6">
              {konkurencje.map((konkurencja) => {
                const selectedCount = getSelectedCount(konkurencja.id);
                const isComplete = selectedCount === 3;
                
                return (
                  <Card key={konkurencja.id} className={isComplete ? 'border-primary/50' : ''}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {konkurencja.nazwa}
                            {isComplete && <Badge variant="default">Kompletne</Badge>}
                          </CardTitle>
                          <CardDescription>
                            {konkurencja.opis}
                            {konkurencja.wymagania && ` • ${konkurencja.wymagania}`}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <Badge variant={selectedCount === 3 ? "default" : "outline"}>
                            {selectedCount}/3
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm font-medium">Wybierz zawodników:</p>
                        <div className="grid gap-2">
                          {zawodnicy.map((zawodnik) => {
                            const isSelected = isZawodnikSelected(konkurencja.id, zawodnik.id);
                            const canSelect = selectedCount < 3 || isSelected;
                            
                            return (
                              <div 
                                key={zawodnik.id} 
                                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                                  isSelected ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'
                                } ${!canSelect ? 'opacity-50' : ''}`}
                              >
                                <Checkbox
                                  id={`${konkurencja.id}-${zawodnik.id}`}
                                  checked={isSelected}
                                  disabled={!canSelect}
                                  onCheckedChange={(checked) => 
                                    handleZawodnikSelect(konkurencja.id, zawodnik.id, checked as boolean)
                                  }
                                />
                                <label 
                                  htmlFor={`${konkurencja.id}-${zawodnik.id}`}
                                  className="flex-1 cursor-pointer"
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="font-medium">{zawodnik.imie} {zawodnik.nazwisko}</p>
                                      <p className="text-sm text-muted-foreground">
                                        {zawodnik.plec === 'M' ? 'Mężczyzna' : 'Kobieta'} • {zawodnik.telefon}
                                      </p>
                                    </div>
                                    {isSelected && (
                                      <Badge variant="default" className="ml-2">Wybrany</Badge>
                                    )}
                                  </div>
                                </label>
                              </div>
                            );
                          })}
                        </div>
                        
                        {selectedCount < 3 && (
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Musisz wybrać dokładnie 3 zawodników dla tej konkurencji.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Zawodnicy Tab */}
          <TabsContent value="zawodnicy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lista zawodników - {wojewodztwo.nazwa}</CardTitle>
                <CardDescription>
                  Wszyscy zarejestrowani zawodnicy z Twojego województwa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {zawodnicy.map((zawodnik) => (
                    <div key={zawodnik.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{zawodnik.imie} {zawodnik.nazwisko}</p>
                        <p className="text-sm text-muted-foreground">
                          {zawodnik.plec === 'M' ? 'Mężczyzna' : 'Kobieta'} • PESEL: {zawodnik.pesel}
                        </p>
                        <p className="text-sm text-muted-foreground">Telefon: {zawodnik.telefon}</p>
                      </div>
                      <Badge variant="outline">
                        {zawodnik.plec === 'M' ? 'Mężczyzna' : 'Kobieta'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Przegląd Tab */}
          <TabsContent value="przegladaj" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Przegląd zgłoszeń</CardTitle>
                <CardDescription>Podsumowanie wszystkich Twoich zgłoszeń</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {konkurencje.map((konkurencja) => {
                    const selectedCount = getSelectedCount(konkurencja.id);
                    const selectedIds = selectedZawodnicy[konkurencja.id] || [];
                    const selectedZawodnicyList = zawodnicy.filter(z => selectedIds.includes(z.id));
                    
                    return (
                      <div key={konkurencja.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{konkurencja.nazwa}</h3>
                          <Badge variant={selectedCount === 3 ? "default" : "outline"}>
                            {selectedCount}/3 zawodników
                          </Badge>
                        </div>
                        
                        {selectedZawodnicyList.length > 0 ? (
                          <div className="space-y-2">
                            {selectedZawodnicyList.map((zawodnik, index) => (
                              <div key={zawodnik.id} className="text-sm">
                                {index + 1}. {zawodnik.imie} {zawodnik.nazwisko} ({zawodnik.plec === 'M' ? 'M' : 'K'})
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Nie wybrano zawodników</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Podsumowanie:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Konkurencje z kompletnymi zgłoszeniami:</span>
                      <p className="font-medium">
                        {konkurencje.filter(k => getSelectedCount(k.id) === 3).length} / {konkurencje.length}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Łączna liczba zgłoszeń:</span>
                      <p className="font-medium">
                        {konkurencje.reduce((sum, k) => sum + getSelectedCount(k.id), 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}