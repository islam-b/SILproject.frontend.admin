export interface UtilisateurFabricant {
  IdUserF: number;
  Mail: string;
  Nom: string;
  Prenom: string;
  Mdp: string;
  NumTel: string;
  Fabricant: number;
  Valide: number;
  Bloque: number;
  marque: {
    NomMarque: string;
  };
  images: [
    {
      CheminImage: string;
    }];
}
