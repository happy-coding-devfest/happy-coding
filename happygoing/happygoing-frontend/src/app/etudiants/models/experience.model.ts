export class ExperienceModel {
    id!: number;
    nom!: string;
    lieu!: string;
    annee!: string;
    description?: string;
    nom_etudiant!: string;
    prenoms_etudiant!: string;
    created_at!: Date;
    updated_at?: Date | null;
}

export class CreateExperienceModel {
    nom_experience!: string;
    lieu!: string;
    annee!: string;
    description?: string;
}

export class UpdateExperienceModel {
    id!: number;
    nom_experience!: string;
    lieu!: string;
    annee!: string;
    description?: string;
}
