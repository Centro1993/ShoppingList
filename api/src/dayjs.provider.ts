import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";

/*
Annoying workaround, cause I can't get plugins for dayjs to work in TS
 */
export class DayjsProvider {

    public dayjs(): Dayjs {
        return dayjs().add(2, 'h')
    }

}