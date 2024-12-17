import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PrivacyPolicy } from "../policy/PrivacyPolicy";

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const TermsCheckbox = ({ checked, onCheckedChange }: TermsCheckboxProps) => {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
        className="mt-1"
      />
      <label htmlFor="terms" className="text-sm font-medium">
        I agree to Crownscope's{" "}
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-secondary hover:text-secondary-light underline inline ml-1">
              terms and conditions
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <PrivacyPolicy />
          </DialogContent>
        </Dialog>
      </label>
    </div>
  );
};