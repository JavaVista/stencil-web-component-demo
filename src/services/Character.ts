export interface Character {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}