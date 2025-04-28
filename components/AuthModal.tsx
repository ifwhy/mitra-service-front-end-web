import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TabAuth } from "./TabAuth";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

export function AuthDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="font-bold w-20 xs:w-24 sm:w-44 md:w-max text-sm xs:text-base md:text-lg bg-amber-500 hover:bg-amber-600 transition-all duration-300 ease-in-out text-white dark:bg-amber-500 dark:hover:bg-amber-600"
        >
          Servis
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] z-[1000] w-full flex items-center flex-col justify-center h-min">
        <DialogTitle></DialogTitle>
        <TabAuth />
      </DialogContent>
    </Dialog>
  );
}
