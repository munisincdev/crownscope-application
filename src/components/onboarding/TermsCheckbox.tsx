import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PrivacyPolicy } from "../policy/PrivacyPolicy";

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const TermsCheckbox = ({ checked, onCheckedChange }: TermsCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-secondary hover:text-secondary-light underline">
                terms and conditions
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <PrivacyPolicy />
            </DialogContent>
          </Dialog>
        </label>
      </div>
    </div>
  );
};