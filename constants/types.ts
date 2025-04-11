import { IconType } from "react-icons";

export interface ClassName {
  className?: string;
}

export interface TopBarIconType {
  href: string;
  Icon: React.ReactElement;
}

export interface TopBarIconReactIcon {
  id: string;
  href: string;
  Icon: IconType;
}
