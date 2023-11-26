export class FormationModel {
    id!: number;
    nom!: string;
    lieu_formation!: string;
    annee!: string;
    description?: string;
    nom_etudiant!: string;
    prenoms_etudiant!: string;
    created_at!: Date;
    updated_at?: Date | null;
}

export class UpdateFormationModel {
    id!: number;
    nom_formation!: string;
    lieu!: string;
    annee!: string;
    description?: string;
}

export class CreateFormationModel {
    nom_formation!: string;
    lieu!: string;
    annee!: string;
    description?: string;
}
