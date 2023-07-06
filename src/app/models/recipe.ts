/*
Rajapintaluokka Recipe määrittää millainen reseptin täytyy olla. 
Tämä on sovelluksen modelin eli tietomallin osa. Varsinainen
data muodostaa loput modelista.
*/
export interface Recipe {
  id: number;
  name: string;
  author: string;
  supplies: [
    {
      name: string;
      quantity: string;
    }
  ];
  recipe: string;
}
