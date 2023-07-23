export function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
}

export function randomListItem(items: any[]) {
    const choice = Math.floor(Math.random() * items.length);
    return items[choice];
}
