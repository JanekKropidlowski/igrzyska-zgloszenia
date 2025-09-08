import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trophy, Users, Calendar, MapPin } from 'lucide-react';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!login || !haslo) {
      setError('Proszę wprowadzić login i hasło');
      setIsLoading(false);
      return;
    }

    const success = authLogin(login, haslo);
    if (!success) {
      setError('Nieprawidłowy login lub hasło');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-lzs-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Hero Section */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Trophy className="w-4 h-4" />
                IV Ogólnopolskie Igrzyska LZS
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                System<br />
                <span className="text-transparent bg-clip-text lzs-gradient-primary">
                  Zgłoszeń
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl">
                "Aktywna Wieś" - Zarządzaj zgłoszeniami zawodników do konkurencji w łatwy i przejrzysty sposób
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">12-14 września</div>
                  <div className="text-sm text-muted-foreground">2025</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Powiat Pucki</div>
                  <div className="text-sm text-muted-foreground">Pomorskie</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">16 województw</div>
                  <div className="text-sm text-muted-foreground">Ekipy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md lzs-shadow-primary border-primary/10">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Logowanie</CardTitle>
                <CardDescription>
                  Wprowadź dane swojego województwa lub dane administratora
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login">Login</Label>
                    <Input
                      id="login"
                      type="text"
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      placeholder="np. malopolskie lub admin"
                      required
                      className="h-11"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="haslo">Hasło</Label>
                    <Input
                      id="haslo"
                      type="password"
                      value={haslo}
                      onChange={(e) => setHaslo(e.target.value)}
                      placeholder="Wprowadź hasło"
                      required
                      className="h-11"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-11"
                    variant="lzs"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-center text-sm text-muted-foreground">
                    <p className="mb-2">Dane testowe:</p>
                    <div className="space-y-1">
                      <p><strong>Admin:</strong> admin / admin2025</p>
                      <p><strong>Województwo:</strong> malopolskie / haslo123</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}