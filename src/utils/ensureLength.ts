export default function ensureLength(number: string, length: number) {
	var str = number.toString();
	while (str.length < length) {
		str = "0" + str;
	}
	return str;
}
