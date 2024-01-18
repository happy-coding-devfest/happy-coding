import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BusModel } from "../models/bus.model";

@Injectable()
export class BusService {

   private _dataBus = `5
B 20 6
Ambohitrimanjaka 06:05_AM
Tetezana 06:10_AM
Art_Malagasy 06:14_AM
Score_digue 06:20_AM
Andohatapenaka 06:25_AM
67_Ha 06:32_AM
119 12 8
67_Ha 06:40_AM
Poste 06:43_AM
Andavamamba 06:45_AM
Ampefiloha 06:48_AM
Mahamasina 06:50_AM
Ambohijatovo 06:55_AM
Antsahabe 07:02_AM
Ankatso 07:10_AM
147_Red 15 9
Anosy 06:42_AM
Mahamasina 06:59_AM
Belair 07:10_AM
Besarety 07:15_AM
Avaradoha 07:29_AM
Meteo 07:35_AM
Nanisana 07:40_AM
Ankadindramamy 07:53_AM
Ambatomaro 08:12_AM
147_Blue 15 12
Anosy 06:35_AM
Ambodin_Isotry 06:47_AM
67_Ha 06:55_AM
Ankazomanga 07:01_AM
Behoririka 07:12_AM
Andravoahagny 07:14_AM
Besarety 07:20_AM
Homi 07:30_AM
Meteo 07:35_AM
Ampasampito 07:43_AM
Ankadindramamy 07:50_AM
Ambatomaro 08:05_AM
144 10 5
Besarety 07:22_AM
Avaradoha 07:35_AM
Ampasampito 07:44_AM
Mahazo 07:58_AM
Ambohimahitsy 08:25_AM`;

    private _bus$ = new BehaviorSubject<BusModel[]>([]);
    get bus$(): Observable<BusModel[]> {
        return this._bus$.asObservable();
    }

    private _loading$ = new BehaviorSubject<boolean>(false);
    get loading$(): Observable<boolean> {
        return this._loading$.asObservable();
    }

    private setLoadingStatus(loading: boolean) {
        this._loading$.next(loading);
    }

    processData(): void {
        const arrayBusData = this._dataBus.split("\n");
        
        const nbr_bus_lines = parseInt(arrayBusData[0]);
        const user_route = arrayBusData[arrayBusData.length - 1];

        const busData = arrayBusData.slice(1);
        let index = 0;
        const results: BusModel[] = [];

        for (let i = 0; i < nbr_bus_lines; i++) {
            const [bus_id, frequence, nbrBusStations] = busData[index].split(" ");
            const busStations = busData.slice(index + 1, index + 1 + parseInt(nbrBusStations));
            results.push({ bus_id, frequence, nbrBusStations, busStations });

            index += parseInt(nbrBusStations) + 1;
        }

        this._bus$.next(results);
    }
}
