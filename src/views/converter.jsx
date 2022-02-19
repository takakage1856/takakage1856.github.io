const NUMBER_MAPPING = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "A": 10,
    "B": 11,
    "C": 12,
    "D": 13,
    "E": 14,
    "F": 15,
    "G": 16,
    "H": 17,
    "I": 18,
    "J": 19,
    "K": 20,
    "L": 21,
    "M": 22,
    "N": 23,
    "O": 24,
    "P": 25,
    "Q": 26,
    "R": 27,
    "S": 28,
    "T": 29,
    "U": 30,
    "V": 31,
    "W": 32,
    "X": 33,
    "Y": 34,
    "Z": 35,
  };

const Converter = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [shoudUpdateClipboad, setShoudUpdateClipboad] = React.useState(true);

  /**
   *
   * @param {() => {string}} converter
   */
  function proc(converter) {
    try {
      const converted = converter();
      setOutput(converted);
      if(shoudUpdateClipboad){
        navigator.clipboard.writeText(converted);
      }
    } catch (e) {
      window.alert(e.message);
    }
  }

  /**
   * @param {string} value
   */
  function splitSnakeCase(value) {
    return value.split("_");
  }

  /**
   * @param {string} value
   * @returns {string[]}
   */
  function splitCamelCase(value) {
    const results = [];
    Array.from(value).map((e,i) => {
        if(i === 0 || e === e.toUpperCase()){
            results.push('');
        }
        results[results.length - 1] += e;
    });
    return results;
  }

  /**
   *
   * @param {string[]} words
   * @param {boolean} isUpperCase
   * @returns {string}
   */
  function convertToSnakeCase(words, isUpperCase) {
    return words
      .map((e) => (isUpperCase ? e.toUpperCase() : e.toLowerCase()))
      .join("_");
  }

  /**
   *
   * @param {string[]} words
   * @param {boolean} isPascalCase
   * @returns {string}
   */
  function convertToCamelCase(words, isPascalCase) {
    return words
      .map((e, i) => {
        if (!e) {
          return;
        }

        if (i > 0 || isPascalCase) {
          return e.charAt(0).toUpperCase() + e.substring(1).toLowerCase();
        }
        return e.toLowerCase();
      })
      .join("");
  }

  /**
   * baseF進法をbaseT進法に変換
   * @param {string} from
   * @param {number} baseF
   * @param {number} baseT
   */
  function convertPosition(from, baseF, baseT) {
    from = from.toUpperCase();
    let tmp;
    if (baseF === 10) {
      tmp = Number(from);
    } else {
      // 10進数に変換
      tmp = Array.from(from).reduce((previous, current, i) => {
        if (!(current in NUMBER_MAPPING)) {
          throw Error("サポート外");
        }
        return (
          previous + baseF ** (from.length - i - 1) * NUMBER_MAPPING[current]
        );
      }, 0);
    }

    let result = "";
    if (baseT === 10) {
      result = tmp.toString();
    } else {
      while (tmp > 0) {
        const remainder = tmp % baseT;
        result =
          Object.keys(NUMBER_MAPPING).filter(
            (e) => NUMBER_MAPPING[e] === remainder
          )[0] + result;
        tmp = Math.floor(tmp / baseT);
      }
    }
    return result;
  }

  return (
    <div>
      <div>
          クリップボードを更新
          <input type="checkbox" checked={shoudUpdateClipboad} onChange={(e)=>{setShoudUpdateClipboad(e.target.checked)}}/>
      </div>
      <textarea
        placeholder="input"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <div style={{ display: "inline-flex", flexDirection: "column" }}>
        <button
          onClick={() => {
              const left = input;
              const right = output;
              setInput(right);
              setOutput(left);
          }}
        >
          ⇔
        </button>
        <button
          onClick={() => {
            proc(() => {
              return input.toUpperCase();
            });
          }}
        >
          大文字に変換
        </button>
        <button
          onClick={() => {
            proc(() => {
              return input.toLowerCase();
            });
          }}
        >
          小文字に変換
        </button>
        <button
          onClick={() => {
            proc(() =>{
                return convertToCamelCase(splitSnakeCase(input),false);
            });
          }}
        >
          スネークケースをキャメルケースに変換
        </button>
        <button
          onClick={() => {
            proc(() =>{
                return convertToCamelCase(splitSnakeCase(input),true);
            })
          }}
        >
          スネークケースをパスカルケースに変換
        </button>
        <button
          onClick={() => {
            proc(() =>{
                return convertToSnakeCase(splitCamelCase(input),false);
            })
          }}
        >
          キャメルケースをスネークケースに変換
        </button>
        <button
          onClick={() => {
            proc(() =>{
                return convertToSnakeCase(splitCamelCase(input),true);
            })
          }}
        >
          キャメルケースをスネークケース(大文字)に変換
        </button>
        <button
          onClick={() => {
            proc(() => {
              return convertPosition(input, 16, 10);
            });
          }}
        >
          16進数から10進数に変換
        </button>
        <button
          onClick={() => {
            proc(() => {
              return convertPosition(input, 10, 16);
            });
          }}
        >
          10進数から16進数に変換
        </button>
        <button
          onClick={() => {
            setOutput(
              "(" +
                input
                  .split("\n")
                  .map((e) => `'${e}'`)
                  .join(",") +
                ")"
            );
          }}
        >
          改行を区切りとしてIN句作成
        </button>
      </div>
      <textarea value={output} readOnly/>
    </div>
  );
};
