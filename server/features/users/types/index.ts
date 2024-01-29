export type CreatingUser = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export type EditingUser = CreatingUser & {
  active: boolean;
};
