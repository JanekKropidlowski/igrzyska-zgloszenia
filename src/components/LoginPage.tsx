import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const success = authLogin(login, haslo);
      if (success) {
        toast.success('Zalogowano pomyślnie');
        navigate('/');
      } else {
        toast.error('Nieprawidłowy login lub hasło');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">II Mistrzostwa Pomorskie</CardTitle>
            <CardDescription className="text-base mt-2">
              Szkół Ponadpodstawowych w Strzelectwie
            </CardDescription>
            <p className="text-sm text-muted-foreground mt-1">
              10 października 2025 • Kłanino
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Login szkoły</Label>
              <Input
                id="login"
                type="text"
                placeholder="np. pzs-klanino"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="haslo">Hasło</Label>
              <Input
                id="haslo"
                type="password"
                value={haslo}
                onChange={(e) => setHaslo(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>Dane testowe:</p>
            <p className="mt-1">Admin: <code className="text-xs bg-muted px-1 py-0.5 rounded">admin / admin2025</code></p>
            <p className="mt-1">Szkoła: <code className="text-xs bg-muted px-1 py-0.5 rounded">pzs-klanino / haslo123</code></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
