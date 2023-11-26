export class CompetenceModel {
    id!: number;
    nom!: string;
    liste!: string;
    description?: any;
    nom_etudiant!: string;
    prenoms_etudiant!: string;
    created_at!: Date;
    updated_at?: Date | null;
}

export class CreateCompetenceModel {
    nom_competence!: string;
    liste!: string;
    description?: string;
}

export class UpdateCompetenceModel {
    id!: number;
    nom_competence!: string;
    liste!: string;
    description?: string;
}
