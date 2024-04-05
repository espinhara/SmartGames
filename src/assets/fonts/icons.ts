export type IconsId = "location" | "user";

export type IconsKey = "Location" | "User";

export enum Icons {
    Location = "location",
    User = "user",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
    [Icons.Location]: "61697",
    [Icons.User]: "61698",
};
