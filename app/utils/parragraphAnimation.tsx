/*import { useRef } from "react";

let refs = useRef([]);

export const splitWords = (phrase: string) => {
  let body: any[] = [];
  phrase.split(" ").forEach((word, i) => {
    const letters = splitLetters(word);
    body.push(<p key={word + "_" + i}>{letters}</p>);
  });
  return body;
};

export const splitLetters = (word: string) => {
  let letters: any[] = [];
  word.split("").forEach((letter, i) => {
    letters.push(
      <span
        key={letter + "_" + i}
        ref={(el) => {
          if (el !== null) {
            refs.current.push(el as never);
          }
        }}
      >
        {letter}
      </span>
    );
  });
  return letters;
};*/
