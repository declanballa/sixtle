export const fetchRandomWord = async () => {
  const response = await fetch(
    'https://random-word-api.vercel.app/api?words=1&length=6'
  );
  const data = await response.json();
  return data[0];
};

export const validateWord = async (word: string) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (response.ok) {
      const data = await response.json();
      return data[0].word.toLowerCase() === word.toLowerCase();
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error validating word:', error);
    return false;
  }
};
