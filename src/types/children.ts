/* ESSE ARQUIVO CONTÉM O MODELO DE TIPOS 'ChildrenProps' */

import { ReactChild, ReactChildren } from "react";

export default interface ChildrenProps {
    children: ReactChildren | ReactChild | any;
}
