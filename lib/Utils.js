export function FormatString(inputString) 
{
    // Шаг 1: Приводим к нижнему регистру
    const lowercaseString = inputString.toLowerCase();

    // Шаг 2: Заменяем пробелы на подчеркивания
    const transformedString = lowercaseString.replace(/\s+/g, '_');

    return transformedString;
}

export function ConvertSnakeToCamel(str) 
{
    let newStr = str.replace(/_/g, ' ');
    let words = newStr.split(' ');

    let camelWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    let camelStr = camelWords.join('');
    return camelStr;
}