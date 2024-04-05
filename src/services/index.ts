/* ESTE É O ARQUIVO QUE CONTÉM O CÓDIGO QUE DEFINE AS CONFIGURAÇÕES DO AXIOS. O AXIOS É UM COMPONENTE QUE
EXECUTA REQUISIÇÕES HTTP. */

import axios from "axios"; // O Axios é importado.
import * as Env from "../env";

const baseURL = Env.serverUrl

const api = axios.create({
    baseURL,
    timeout: 30000,

    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

export default api; // A instância do axios é exportada para ser acessada por outros componentes.