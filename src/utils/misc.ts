export function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
}

export function randomListItem(url: string[], alt: string[]) {
    const choice = Math.floor(Math.random() * url.length);
    return [url[choice], alt[choice]];
}
