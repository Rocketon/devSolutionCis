import { useRef, useState, type FormEvent } from "react";

type RandomType = 'trivia' | 'year' | 'date' | 'math'

export function APITester() {
  const [placeholder, setPlaceholder] = useState("55");

  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlaceholder(e.target.value === "date" ? "05/12" : "55");
  };

  const responseInputRef = useRef<HTMLTextAreaElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const number = formData.get("number") as string;
      const type = formData.get("type") as string;
      const url = new URL(`${number}/${type}`, location.href);
      const res = await fetch(url);
      if (res.status == 404) {
        responseInputRef.current!.value = 'Введите подходящее число (как в placeholder)';
      } else {
        const data = await res.text();
        responseInputRef.current!.value = data;
      }

    } catch (error) {
      responseInputRef.current!.value = String(error);
    }
  };

  const randomRequest = async (type: RandomType) => {
    try {
      numberInputRef.current!.value = ""
      const url = new URL(`random/${type}`, location.href);
      const res = await fetch(url);
      const data = await res.text();
      responseInputRef.current!.value = data;
    } catch (error) {
      responseInputRef.current!.value = String(error);
    }
  };

  return (
    <div className="api-tester">
      <form onSubmit={onClickHandler} className="endpoint-row">
        <select name="type" className="method" onChange={onTypeChange}>
          <option value="math">Math</option>
          <option value="trivia">Trivia</option>
          <option value="date">Date</option>
        </select>
        <input ref={numberInputRef} type="text" name="number" className="url-input" placeholder={placeholder} />
        <button type="submit" className="send-button">
          Получить
        </button>
      </form>
      <textarea ref={responseInputRef} readOnly placeholder="Response will appear here..." className="response-area" />
      <span>Random</span>
      <div className="random-buttons">
        {(["trivia", "year", "date", "math"] as RandomType[]).map((type) => (
          <button
            key={type}
            type="button"
            className="send-button"
            onClick={() => randomRequest(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
