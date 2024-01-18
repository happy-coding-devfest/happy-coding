import { Injectable } from "@angular/core";
import { CreateTrajetModel, OuputModel } from "../models/trajet.model";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable()
export class TrajetsService {
    private _dataInput = `5
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

    private _trajets$ = new BehaviorSubject<OuputModel[][]>([]);
    get trajets$(): Observable<OuputModel[][]> {
        return this._trajets$.asObservable();
    }
    
    constructor() {}

    private parseTime(timeString: string): number {
        const [time, modifier] = timeString.split('_');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
    }
    
    private addDurationToTime(time: string, duration: string): string {
        const timeInMinutes = this.parseTime(time);
      
        const [hours, minutes] = duration.split('h').map(part => parseInt(part));
      
        const totalTimeInMinutes = timeInMinutes + hours * 60 + minutes;
    
        const totalHours = Math.floor(totalTimeInMinutes / 60);
        const totalMinutes = totalTimeInMinutes % 60;
        const modifier = totalHours >= 12 ? 'PM' : 'AM';
        const formattedHours = ((totalHours + 11) % 12 + 1).toString().padStart(2, '0');
        const formattedMinutes = totalMinutes.toString().padStart(2, '0');
      
        return `${formattedHours}:${formattedMinutes}_${modifier}`;
    }
    
    private timeToString(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const modifier = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = ((hours + 11) % 12 + 1).toString().padStart(2, '0');
        const formattedMinutes = mins.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}_${modifier}`;
    }
    
    private calculateTravelTime(startTime: number, endTime: number): string {
        const totalMinutes = endTime - startTime;
        const hours = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
        const minutes = (totalMinutes % 60).toString().padStart(2, '0');
        return `${hours}h${minutes}m`;
    }
    
    private findRoutes(busLines: any[], start: string, destination: string, departureTime: string): any[] {
        const routes: any[] = [];
    
        const findRoute = (currentStation: string, currentTime: number, visited: Set<string>, route: string[]): void => {
            if (currentStation === destination) {
                const totalTime = this.calculateTravelTime(this.parseTime(departureTime), currentTime);
                routes.push({ totalTime, route });
                return;
            }
    
            busLines.forEach(({ busID, frequency, stations }) => {
                if (visited.has(busID)) return;
    
                const stationIndex = stations.findIndex((s: any) => s.stationName === currentStation);
    
                if (stationIndex !== -1) {
                    const station = stations[stationIndex];
                    let waitTime = currentTime < station.time ? station.time - currentTime : 0;
                    if (waitTime === 0 && currentTime > station.time) {
                        const nextBus = Math.ceil((currentTime - station.time) / frequency) * frequency + station.time;
                        waitTime = nextBus - currentTime;
                    }
    
                    for (let nextIndex = stationIndex + 1; nextIndex < stations.length; ++nextIndex) {
                        const nextStation = stations[nextIndex];
                        const newVisited = new Set(visited);
                        newVisited.add(busID);
                        const newRoute = [...route, `${busID}|${currentStation}|${this.timeToString(currentTime + waitTime)}`];
                        findRoute(nextStation.stationName, currentTime + waitTime + nextStation.time - station.time, newVisited, newRoute);
                    }
                }
            });
        }
    
        const initialVisited = new Set();
        findRoute(start, this.parseTime(departureTime), initialVisited as any, []);
        return routes;
    }
    
    processData(input: string, start: string, destination: string, departureTime: string): string {
        const data = input.split("\n");
    
        const busLines: any[] = [];
        const B: number = parseInt(data.shift() || '0');
    
        for (let i = 0; i < B; i++) {
            const [busID, F, S] = data.shift()!.split(' ');
            const frequency = parseInt(F);
            const stations: any[] = [];
    
            for (let j = 0; j < parseInt(S); j++) {
                const [stationName, time] = data.shift()!.split(' ');
                stations.push({ stationName, time: this.parseTime(time) });
            }
    
            busLines.push({ busID, frequency, stations });
        }
    
        const possibleRoutes = this.findRoutes(busLines, start, destination, departureTime);
    
        possibleRoutes.sort((a, b) => {
            if (a.totalTime === b.totalTime) {
                return a.route.length - b.route.length;
            }
            return a.totalTime.localeCompare(b.totalTime);
        });
    
        const topRoutes = possibleRoutes.slice(0, 3);
    
        const output = topRoutes.map(route => `${route.totalTime} ${route.route.join(' ')} ${destination}|${this.addDurationToTime(departureTime, route.totalTime)}`).join('\n');
        return output || 'IMPOSSIBLE';
    }

    private formatTimeTo12H(inputTime: string): string {
        const [hours, minutes] = inputTime.split(':').map(Number);
        const modifier: string = hours >= 12 ? 'PM' : 'AM';
        const formattedHours: string = ((hours + 11) % 12 + 1).toString().padStart(2, '0');
        const formattedMinutes: string = minutes.toString().padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}_${modifier}`;
    }

    private parseOutput(output: string[]): OuputModel[] {
        return output.map((value) => {
            const elmt = value.split(" ");
            const total = elmt.shift();
            const destination = elmt.pop();
            return {
                total: total,
                frais: (elmt.length - 1) * 600,
                busStation: elmt.map(e => {
                    const data = e.split("|");
                    return {
                      bus_id: data[0],
                      station: data[1],
                      departureTime: data[2]
                    };
                })
            };
        }) as OuputModel[];
    }

    findPath(data: CreateTrajetModel): void {
        const input = this._dataInput + "\n" + `${this._dataInput} ${data.depart} ${data.arrivee} ${this.formatTimeTo12H(data.heure)}`;
        this.trajets$.pipe(
            map(response => {
                const dt = this.processData(input, data.depart, data.arrivee, this.formatTimeTo12H(data.heure));
                response.push(
                    this.parseOutput(dt.split("\n"))
                );
                return response;
            })
        ).subscribe();
    }
    // this.processData(input, data.depart, data.arrivee, this.formatTimeTo12H(data.heure))
}