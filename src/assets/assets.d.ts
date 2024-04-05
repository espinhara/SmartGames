declare module "*.png";

declare module "*.jpg";

declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";

    export const content: React.FunctionComponent<SvgProps>;
}
