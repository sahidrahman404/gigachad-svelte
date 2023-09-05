function uppercaseFirstLetter(word: string) {
	return word[0].toUpperCase() + word.slice(1);
}

export default function transformName(name: string) {
	if (name.split(' ').length > 1) {
		return name
			.split(' ')
			.map((name) => uppercaseFirstLetter(name))
			.join(' ');
	}
	return uppercaseFirstLetter(name);
}
