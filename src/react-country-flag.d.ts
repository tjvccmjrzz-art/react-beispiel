declare module "react-country-flag" {
  import { ComponentType, CSSProperties, HTMLAttributes } from "react";

  export interface ReactCountryFlagProps extends HTMLAttributes<HTMLElement> {
    countryCode: string;
    svg?: boolean;
    style?: CSSProperties;
    title?: string;
    className?: string;
  }

  const ReactCountryFlag: ComponentType<ReactCountryFlagProps>;
  export default ReactCountryFlag;
}
