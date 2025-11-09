// TODO

const dictionary = {
  issue: {
      one: "1 active issue",
      other: "{count} active issues"
  },
};

const plural = function({ count, word, locale = 'en-US' }) {
  if(!dictionary.hasOwnProperty(word)) {
    console.warn(`no dictionary for word: ${word}`)
    return;
  }
  
  const pluralRules = new Intl.PluralRules(locale);
  const pluralForm = pluralRules.select(count);

  const template = dictionary[word][pluralForm] || dictionary[word].other;
  const message = template.replace('{count}', count);

  return message;
}

export { plural };