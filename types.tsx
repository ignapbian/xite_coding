/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  SearchScreen: undefined;
};
export type song={
  id:string,
  artist:string,
  title:string,
  release_year:string,
  genre_id:number,
  image_url:string
};

export type genre={
  id:string,
  name:string
};
 export type Data={
   genres:genre,
   videos:song
 }