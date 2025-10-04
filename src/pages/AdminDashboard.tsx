import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockSzkoly, mockZawodnicy, mockZgloszenia, mockKonkurencje, punktacjaMiejsce } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, School, Users, Trophy, Target, FileDown } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.info('Wylogowano');
  };

  const handleGeneratePDF = () => {
    toast.info('Generowanie PDF - funkcja w przygotowaniu');
  };

  const zgloszeniaDetailed = mockZgloszenia.map(zgl => {
    const szkola = mockSzkoly.find(s => s.id === zgl.szkolaId);
    const zawodnicy = mockZawodnicy.filter(z => zgl.zawodnicyIds.includes(z.id));
    return { ...zgl, szkola, zawodnicy };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel Administratora</h1>
            <p className="text-muted-foreground">II Mistrzostwa Pomorskie w Strzelectwie • 10.10.2025</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleGeneratePDF}>
              <FileDown className="mr-2 h-4 w-4" />
              Generuj PDF
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Wyloguj
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Zgłoszone szkoły</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">{zgloszeniaDetailed.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Zawodnicy łącznie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">
                  {zgloszeniaDetailed.reduce((sum, z) => sum + z.zawodnicy.length, 0)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Konkurencje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">{mockKonkurencje.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Drużyny kompletne</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">
                  {zgloszeniaDetailed.filter(z => {
                    const dziewczeta = z.zawodnicy.filter(zaw => zaw.plec === 'K').length;
                    const chlopcy = z.zawodnicy.filter(zaw => zaw.plec === 'M').length;
                    return dziewczeta === 3 && chlopcy === 3;
                  }).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="zgloszenia" className="space-y-4">
          <TabsList>
            <TabsTrigger value="zgloszenia">Zgłoszenia</TabsTrigger>
            <TabsTrigger value="szkoly">Szkoły</TabsTrigger>
            <TabsTrigger value="konkurencje">Konkurencje</TabsTrigger>
            <TabsTrigger value="punktacja">System punktacji</TabsTrigger>
          </TabsList>

          <TabsContent value="zgloszenia">
            <Card>
              <CardHeader>
                <CardTitle>Lista zgłoszeń</CardTitle>
                <CardDescription>Wszystkie zgłoszone szkoły i ich drużyny</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Szkoła</TableHead>
                        <TableHead>Zawodnicy</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data zgłoszenia</TableHead>
                        <TableHead>Opiekun</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {zgloszeniaDetailed.map((zgl) => {
                        const dziewczeta = zgl.zawodnicy.filter(z => z.plec === 'K').length;
                        const chlopcy = zgl.zawodnicy.filter(z => z.plec === 'M').length;
                        const isComplete = dziewczeta === 3 && chlopcy === 3;
                        
                        return (
                          <TableRow key={zgl.id}>
                            <TableCell className="font-medium">{zgl.szkola?.nazwa}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Badge variant="outline">{dziewczeta}K</Badge>
                                <Badge variant="outline">{chlopcy}M</Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={isComplete ? 'default' : 'destructive'}>
                                {isComplete ? 'Kompletna' : 'Niekompletna'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm">
                              {new Date(zgl.dataZgloszenia).toLocaleDateString('pl-PL')}
                            </TableCell>
                            <TableCell className="text-sm">{zgl.szkola?.kontakt?.opiekun || '-'}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="szkoly">
            <Card>
              <CardHeader>
                <CardTitle>Baza szkół</CardTitle>
                <CardDescription>Wszystkie szkoły w systemie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nazwa szkoły</TableHead>
                        <TableHead>Login</TableHead>
                        <TableHead>Opiekun</TableHead>
                        <TableHead>Kontakt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSzkoly.map((szkola) => (
                        <TableRow key={szkola.id}>
                          <TableCell className="font-medium">{szkola.nazwa}</TableCell>
                          <TableCell><code className="text-xs">{szkola.login}</code></TableCell>
                          <TableCell>{szkola.kontakt?.opiekun || '-'}</TableCell>
                          <TableCell className="text-sm">
                            {szkola.kontakt?.email && <div>{szkola.kontakt.email}</div>}
                            {szkola.kontakt?.telefon && <div>{szkola.kontakt.telefon}</div>}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="konkurencje">
            <Card>
              <CardHeader>
                <CardTitle>Konkurencje</CardTitle>
                <CardDescription>Lista wszystkich konkurencji w zawodach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockKonkurencje.map((konkurencja) => (
                    <div key={konkurencja.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg">{konkurencja.nazwa}</h3>
                        <Badge>{konkurencja.typ}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{konkurencja.opis}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="punktacja">
            <Card>
              <CardHeader>
                <CardTitle>System punktacji drużynowej</CardTitle>
                <CardDescription>Punkty przydzielane za miejsce w konkurencji</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Miejsce</TableHead>
                        <TableHead>Punkty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(punktacjaMiejsce).map(([miejsce, punkty]) => (
                        <TableRow key={miejsce}>
                          <TableCell className="font-medium">{miejsce}</TableCell>
                          <TableCell>{punkty}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-medium">13+</TableCell>
                        <TableCell>1</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
                  <p className="font-semibold mb-2">Zasady klasyfikacji drużynowej:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Drużyna składa się z 6 zawodników (3 dziewczęta + 3 chłopców)</li>
                    <li>W każdej konkurencji zawodnicy otrzymują punkty zgodnie z zajętym miejscem</li>
                    <li>Ostateczny wynik szkoły = suma punktów wszystkich 6 zawodników ze wszystkich konkurencji</li>
                    <li>Miejsca 13 i dalej otrzymują po 1 punkcie</li>
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
