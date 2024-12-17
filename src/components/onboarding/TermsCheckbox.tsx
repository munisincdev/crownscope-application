import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PrivacyPolicy } from "../policy/PrivacyPolicy";

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const TermsCheckbox = ({ checked, onCheckedChange }: TermsCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
      />
      <label htmlFor="terms" className="text-sm font-medium inline-flex items-center">
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