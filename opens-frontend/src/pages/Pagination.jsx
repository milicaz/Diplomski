import { useEffect, useState } from "react";

const Pagination = ({ pages, setCurrentPage, array, limit }) => {
  const numOfPages = [];
  const [currentButton, setCurrentButton] = useState(1);

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  useEffect(() => {
    // Set-ovanje currentButton ako trenutna stranica premašuje broj novih stranica
    if (pages < currentButton) {
      setCurrentButton(pages);
    }
  }, [pages]);

  useEffect(() => {
    // Set-ovanje currentButton 1 na reload
    setCurrentButton(1);
  }, []);

  let startIdx = (currentButton - 1) * limit + 1;
  let endIdx = Math.min(currentButton * limit, array.length);

  if (array.length === 0) {
    startIdx = 0;
    endIdx = 0;
  }

  return (
    <div className="clearfix mt-2">
      <div className="hint-text">
        Prikazuje se{" "}
        <b>
          {startIdx} - {endIdx}
        </b>{" "}
        od <b>{array.length}</b> unosa
      </div>
      <ul className="pagination justify-content-end">
        <li
          className={`${
            currentButton === 1 ? "page-item disabled" : "page-item"
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
            }
          >
            Prethodna
          </button>
        </li>

        {numOfPages.map((page, index) => {
          return (
            <li
              key={index}
              className={`${
                currentButton === page ? "page-item active" : "page-item"
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentButton(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        <li
          className={`${
            currentButton === numOfPages.length
              ? "page-item disabled"
              : "page-item"
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              setCurrentButton((next) =>
                next === numOfPages.length ? next : next + 1
              )
            }
          >
            Sledeća
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
