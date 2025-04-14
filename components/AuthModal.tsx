import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RainbowButton } from "./magicui/rainbow-button";
import { TabAuth } from "./TabAuth";

export function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <RainbowButton className="font-bold w-20 xs:w-24 sm:w-44 md:w-max text-sm xs:text-base md:text-lg">
          Servis
        </RainbowButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] w-full flex items-center flex-col justify-center">
        <TabAuth />
      </DialogContent>
    </Dialog>
  );
}
