export class CreateTrajetModel {
    depart!: string;
    arrivee!: string;
    heure!: string;
}

export class StationModel {
    bus_id!: string;
    station!: string;
    departureTime!: string;
}

export class OuputModel {
    total!: string;
    frais!: number;
    busStation!: StationModel[];
}