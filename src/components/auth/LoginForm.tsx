import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, KeyRound } from "lucide-react";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isPINMode: boolean;
  setIsPINMode: (isPINMode: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handlePasswordReset: (e: React.MouseEvent) => Promise<void>;
}

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isPINMode,
  setIsPINMode,
  handleSubmit,
  handlePasswordReset,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!isPINMode && (
        <>
          <div className="space-y-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-200"
              required
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-200"
              required
            />
          </div>
        </>
      )}
      
      {isPINMode && (
        <div className="space-y-3">
          <Label htmlFor="pin">Enter PIN</Label>
          <Input
            id="pin"
            type="password"
            maxLength={6}
            pattern="[0-9]*"
            inputMode="numeric"
            placeholder="Enter 6-digit PIN"
            className="text-center text-2xl tracking-widest border-gray-200"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      )}

      <div className="space-y-3 pt-2">
        <Button 
          type="submit" 
          className="w-full bg-secondary hover:bg-secondary-light text-white font-medium"
        >
          Sign in
        </Button>

        <Button
          type="button"
          variant="link"
          className="w-full text-secondary hover:text-secondary-light"
          onClick={handlePasswordReset}
        >
          Forgot password?
        </Button>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsPINMode(!isPINMode)}
        className="w-full mt-4 text-primary hover:bg-primary/10"
      >
        {isPINMode ? (
          <>
            <Lock className="w-4 h-4 mr-3" />
            Use Password
          </>
        ) : (
          <>
            <KeyRound className="w-4 h-4 mr-3" />
            Use PIN
          </>
        )}
      </Button>
    </form>
  );
};