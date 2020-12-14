import { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import API from '../../store/api'

export const useDashBoard = (key, token, options = "") => {
    const data = useQuery(key, () =>
        axios
            .get(API.BASE_URL + API.DASHBOARD + "?token=" + token + options)
            .then((res) => res.data).catch(() => { })
    );
    return data;
}
