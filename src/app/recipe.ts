export class Recipe {
  id: number;
  name: string;
  ingredients: string[];
  description: string;
  photoUrl: string;
  youtubeUrl: string;

  constructor(
    id: number,
    name: string,
    ingredients: any,
    description: string,
    photoUrl: string,
    yutubeUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.description = description;
    this.photoUrl = photoUrl;
    this.youtubeUrl = yutubeUrl;
   }
}



